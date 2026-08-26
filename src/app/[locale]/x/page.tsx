"use client";
import { useEffect } from "react";
import { usePageMeta } from "@/app/hooks/usePageMeta";

export default function XPage() {
  usePageMeta("X");
  useEffect(() => {
    window.location.replace("https://xscriptor.github.io/x-repo");
  }, []);

  return (
    <div className="flex justify-center mt-12">
      <p>Redirecting to X repository...</p>
    </div>
  );
}
