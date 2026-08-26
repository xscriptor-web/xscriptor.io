"use client";
import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = getSystemTheme();
    setThemeState(t);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setThemeState(isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [mounted]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(next);
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
    localStorage.setItem("theme", t);
    setThemeState(t);
  }, []);

  return { theme, isDark: theme === "dark", toggleTheme, setTheme, mounted };
}
