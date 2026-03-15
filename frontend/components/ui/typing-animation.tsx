"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  words: string[];
  loop?: boolean;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export function TypingAnimation({
  words,
  loop = true,
  className,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseMs = 1200,
}: TypingAnimationProps) {
  const safeWords = useMemo(() => words.filter((word) => word.trim().length > 0), [words]);
  const [state, setState] = useState({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });

  const currentWord = safeWords[state.wordIndex] ?? "";
  const displayedText = currentWord.slice(0, state.charIndex);

  useEffect(() => {
    if (safeWords.length === 0) return;

    const lastIndex = safeWords.length - 1;
    const isCompleteOnLastWord =
      !loop &&
      state.wordIndex === lastIndex &&
      !state.isDeleting &&
      state.charIndex === currentWord.length;

    if (isCompleteOnLastWord) return;

    const speed =
      !state.isDeleting && state.charIndex === currentWord.length
        ? pauseMs
        : state.isDeleting
          ? deletingSpeed
          : typingSpeed;

    const timer = setTimeout(() => {
      setState((prev) => {
        const activeWord = safeWords[prev.wordIndex] ?? "";
        const atWordEnd = prev.charIndex === activeWord.length;
        const atWordStart = prev.charIndex === 0;
        const atLastWord = prev.wordIndex === safeWords.length - 1;

        if (!prev.isDeleting) {
          if (!atWordEnd) {
            return { ...prev, charIndex: prev.charIndex + 1 };
          }

          if (!loop && atLastWord) {
            return prev;
          }

          return { ...prev, isDeleting: true };
        }

        if (!atWordStart) {
          return { ...prev, charIndex: prev.charIndex - 1 };
        }

        if (!loop && atLastWord) {
          return { ...prev, isDeleting: false };
        }

        return {
          wordIndex: atLastWord ? 0 : prev.wordIndex + 1,
          charIndex: 0,
          isDeleting: false,
        };
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [currentWord.length, deletingSpeed, loop, pauseMs, safeWords, state, typingSpeed]);

  if (safeWords.length === 0) return null;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{displayedText}</span>
      <span className="ml-1 inline-block h-[1.1em] w-[0.08em] animate-pulse bg-current" aria-hidden="true" />
    </span>
  );
}
