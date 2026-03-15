import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "veermickey";
  const perPage = Number(searchParams.get("per_page") ?? "24");

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: "Missing Unsplash access key" }, { status: 500 });
  }

  const endpoint = new URL(`https://api.unsplash.com/users/${username}/photos`);
  endpoint.searchParams.set("per_page", String(Math.min(Math.max(perPage, 6), 30)));
  endpoint.searchParams.set("orientation", "landscape");

  try {
    const response = await fetch(endpoint.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
      next: { revalidate: 60 * 30 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Unsplash photos" }, { status: response.status });
    }

    const data = (await response.json()) as Array<{
      id: string;
      urls: {
        small?: string;
        regular?: string;
        full?: string;
        raw?: string;
      };
      alt_description?: string | null;
    }>;

    const photos = data
      .map((photo) => ({
        id: photo.id,
        // Prefer higher-quality sources for large panel backgrounds.
        src: photo.urls.regular ?? photo.urls.full ?? photo.urls.raw ?? photo.urls.small ?? "",
        alt: photo.alt_description ?? "Unsplash photo",
      }))
      .filter((photo) => photo.src.length > 0);

    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ error: "Unexpected Unsplash error" }, { status: 500 });
  }
}
