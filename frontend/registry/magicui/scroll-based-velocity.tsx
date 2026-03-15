"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type ScrollVelocityContainerProps = {
  children: ReactNode;
  className?: string;
};

type ScrollVelocityRowProps = {
  children: ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
};

export function ScrollVelocityContainer({ children, className }: ScrollVelocityContainerProps) {
  return (
    <div className={cn("flex w-full flex-col overflow-hidden whitespace-nowrap", className)}>
      {children}
    </div>
  );
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 20,
  direction = 1,
  className,
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 3], { clamp: false });
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const updateWidth = () => setContentWidth(node.offsetWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const vf = velocityFactor.get();
    const speed = baseVelocity + Math.abs(vf) * baseVelocity;
    const moveBy = direction * speed * (delta / 1000);

    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (value) => {
    if (!contentWidth) return "0px";
    return `${wrap(-contentWidth, 0, value)}px`;
  });

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div style={{ x }} className={cn("flex flex-nowrap", className)}>
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            key={`velocity-copy-${index}`}
            ref={index === 0 ? contentRef : undefined}
            className="inline-block pr-12 md:pr-16"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
