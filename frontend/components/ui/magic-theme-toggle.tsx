"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function MagicThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-[74px] rounded-full border border-zinc-300/70" />;
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-[74px] rounded-full border border-zinc-300/70 bg-zinc-100/70 p-1 transition-colors dark:border-zinc-700/80 dark:bg-zinc-900/70"
    >
      <motion.span
        initial={false}
        animate={{ x: isDark ? 34 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm dark:bg-zinc-200"
      >
        {isDark ? <Moon size={15} /> : <Sun size={15} />}
      </motion.span>
    </button>
  );
}
