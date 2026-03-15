"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface RoundedSquareCursorProps {
  enabled?: boolean;
}

export function RoundedSquareCursor({ enabled = true }: RoundedSquareCursorProps) {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isInteractiveHover, setIsInteractiveHover] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);
  const [isImageHover, setIsImageHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const smoothX = useSpring(x, { stiffness: 540, damping: 42, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 540, damping: 42, mass: 0.35 });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateMode = () => setIsDesktopPointer(pointerQuery.matches);
    updateMode();

    const onMove = (event: MouseEvent) => {
      const hoveredElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      const hoveredImage = hoveredElement?.closest("img, video, canvas") as HTMLElement | null;
      const interactive = hoveredElement?.closest("a, button, [role='button'], input, textarea, select");
      const textNode = hoveredElement?.closest(
        "p, span, h1, h2, h3, h4, h5, h6, li, blockquote, label, a, button, strong, em"
      );

      const isOnImage = Boolean(hoveredImage);
      const hasReadableText =
        Boolean(textNode) ||
        Boolean(interactive && interactive.textContent && interactive.textContent.trim().length > 0);
      const isOnText = hasReadableText;

      const activeSize = isOnText || isOnImage ? 52 : interactive ? 34 : 24;
      x.set(event.clientX - activeSize / 2);
      y.set(event.clientY - activeSize / 2);

      setIsInteractiveHover(Boolean(interactive));
      setIsTextHover(isOnText);
      setIsImageHover(isOnImage);

    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);

    pointerQuery.addEventListener("change", updateMode);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      pointerQuery.removeEventListener("change", updateMode);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, x, y]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    if (isDesktopPointer) {
      root.classList.add("custom-square-cursor");
    } else {
      root.classList.remove("custom-square-cursor");
    }

    return () => {
      root.classList.remove("custom-square-cursor");
    };
  }, [isDesktopPointer]);

  if (!enabled || !isDesktopPointer || !mounted || typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[2147483647] overflow-hidden"
      style={{
        x: smoothX,
        y: smoothY,
        backgroundColor: "#ffffff",
        border: "none",
        mixBlendMode: "difference",
        boxShadow: "none",
        willChange: "transform,width,height",
      }}
      animate={{
        width: isTextHover || isImageHover ? 52 : isInteractiveHover ? 34 : 24,
        height: isTextHover || isImageHover ? 52 : isInteractiveHover ? 34 : 24,
        scale: isPressed ? 0.84 : 1,
        rotate: isPressed ? -12 : 0,
        borderRadius: 7,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />,
    document.body
  );
}
