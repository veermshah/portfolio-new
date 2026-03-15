"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";

import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
}

export function TextReveal({ children, className }: TextRevealProps) {
  const words = children.split(" ");
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-12% 0px -12% 0px",
  });

  return (
    <motion.p
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("text-lg leading-8 text-black dark:text-[color:var(--muted-strong)]", className)}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0.08, filter: "blur(5px)", y: 8 }}
          animate={{
            opacity: isInView ? 1 : 0.08,
            filter: isInView ? "blur(0px)" : "blur(5px)",
            y: isInView ? 0 : 8,
          }}
          transition={{ duration: 0.32, delay: index * 0.022, ease: "easeOut" }}
          className="inline-block"
        >
          {word}
          {"\u00A0"}
        </motion.span>
      ))}
    </motion.p>
  );
}