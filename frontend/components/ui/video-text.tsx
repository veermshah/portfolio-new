"use client";

import React, { type ElementType, type ReactNode, useEffect, useRef, useState } from "react";

export interface VideoTextProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  children: ReactNode;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
  as?: ElementType;
}

const cx = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");
  const [videoFailed, setVideoFailed] = useState(false);
  const [maskSupported, setMaskSupported] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const content = React.Children.toArray(children).join("");

  const responsiveFontSize =
    typeof fontSize === "number" ? `${fontSize}vw` : fontSize;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsMask =
      CSS.supports("mask-image", "url('data:image/svg+xml,<svg></svg>')") ||
      CSS.supports("-webkit-mask-image", "url('data:image/svg+xml,<svg></svg>')");
    setMaskSupported(supportsMask);
  }, []);

  useEffect(() => {
    const updateSvgMask = () => {
      const escapedContent = content
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'>${escapedContent}</text></svg>`;
      setSvgMask(newSvgMask);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  useEffect(() => {
    if (!autoPlay) return;

    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = muted;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Mobile browsers may still block autoplay in low-power or data-saver modes.
        });
      }
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, [autoPlay, src]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;
  const shouldFallback = videoFailed || !maskSupported || !svgMask;

  return (
    <Component className={cx("relative size-full", className)}>
      {shouldFallback ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            style={{
              fontSize: responsiveFontSize,
              fontWeight,
              fontFamily,
              lineHeight: 0.82,
              letterSpacing: "0.06em",
            }}
          >
            {content}
          </span>
        </div>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            maskImage: dataUrlMask,
            WebkitMaskImage: dataUrlMask,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            preload={preload}
            playsInline
            onError={() => setVideoFailed(true)}
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <span className="sr-only">{content}</span>
    </Component>
  );
}
