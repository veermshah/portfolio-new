const fontPreviews = [
  {
    label: "Dirtyline 36daysoftype 2022",
    family: "Dirtyline 36daysoftype 2022",
    file: "Dirtyline 36daysoftype 2022.ttf",
    format: "truetype",
  },
  {
    label: "Harmond ExtBdItaExp",
    family: "Harmond ExtBdItaExp",
    file: "Harmond-ExtBdItaExp.otf",
    format: "opentype",
  },
  {
    label: "Harmond ExtraBoldExpanded",
    family: "Harmond ExtraBoldExpanded",
    file: "Harmond-ExtraBoldExpanded.otf",
    format: "opentype",
  },
  {
    label: "Harmond SemBdItaCond",
    family: "Harmond SemBdItaCond",
    file: "Harmond-SemBdItaCond.otf",
    format: "opentype",
  },
  {
    label: "Harmond SemiBoldCondensed",
    family: "Harmond SemiBoldCondensed",
    file: "Harmond-SemiBoldCondensed.otf",
    format: "opentype",
  },
  {
    label: "Heming Variable",
    family: "Heming Variable",
    file: "Heming Variable.ttf",
    format: "truetype",
  },
  {
    label: "HKGroteskWide Black",
    family: "HKGroteskWide Black",
    file: "HKGroteskWide-Black.otf",
    format: "opentype",
  },
  {
    label: "MilkyWalky Regular",
    family: "MilkyWalky Regular",
    file: "MilkyWalky-Regular.ttf",
    format: "truetype",
  },
  {
    label: "NeueMetanaNext SemiBold",
    family: "NeueMetanaNext SemiBold",
    file: "NeueMetanaNext-SemiBold.otf",
    format: "opentype",
  },
  {
    label: "NeueMetanaNextOutline Black",
    family: "NeueMetanaNextOutline Black",
    file: "NeueMetanaNextOutline-Black.otf",
    format: "opentype",
  },
] as const;

export default function FontsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Font Picker</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Previewing VEER SHAH in every custom font from public/fonts.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {fontPreviews.map((font) => (
          <section
            key={font.family}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              {font.label}
            </p>
            <p
              className="mt-4 break-words text-[12vw] leading-[0.86] sm:text-[9vw] md:text-[4.2vw]"
              style={{ fontFamily: `"${font.family}", ui-sans-serif, system-ui, sans-serif` }}
            >
              VEER SHAH
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">/{font.file}</p>
          </section>
        ))}
      </div>

      <style>{`
        ${fontPreviews
          .map((font) => {
            const encodedFile = encodeURIComponent(font.file);
            return `@font-face {
  font-family: "${font.family}";
  src: url("/fonts/${encodedFile}") format("${font.format}");
  font-display: swap;
}`;
          })
          .join("\n")}
      `}</style>
    </main>
  );
}
