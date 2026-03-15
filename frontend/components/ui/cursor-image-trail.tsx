"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type TrailItem = {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
};

interface CursorImageTrailProps {
  images: string[];
  enabled?: boolean;
}

export function CursorImageTrail({ images, enabled = true }: CursorImageTrailProps) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const idRef = useRef(0);
  const imageIndexRef = useRef(0);
  const lastPointRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!enabled || images.length === 0) return;

    const minDistance = 96;

    const onMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance < minDistance) return;
      lastPointRef.current = { x, y };

      const src = images[imageIndexRef.current % images.length];
      imageIndexRef.current += 1;
      const id = idRef.current++;

      setItems((prev) => {
        const next = [
          ...prev,
          {
            id,
            src,
            x,
            y,
            rotate: (Math.random() - 0.5) * 26,
          },
        ];
        return next.slice(-12);
      });

      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, 700);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, images]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <AnimatePresence>
        {items.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}
            alt=""
            className="absolute h-36 w-24 rounded-md object-cover shadow-xl md:h-52 md:w-36"
            style={{ left: item.x - 58, top: item.y - 78 }}
            initial={{ opacity: 0, scale: 0.5, rotate: item.rotate - 6 }}
            animate={{ opacity: 0.95, scale: 1, rotate: item.rotate, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: -24 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
