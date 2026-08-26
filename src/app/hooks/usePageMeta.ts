"use client";
import { useEffect } from "react";

export function usePageMeta(title: string) {
  useEffect(() => {
    const fullTitle = `${title} | Dev - Xscriptor`;
    if (document.title !== fullTitle) {
      document.title = fullTitle;
    }
  }, [title]);
}
