"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { ASCII_VIDEO } from "./homeShowcaseConfig";
import styles from "./AsciiScrub.module.css";

type AsciiData = {
  cols: number;
  rows: number;
  fps: number;
  frames: string[];
};

export default function AsciiScrub({ progress }: { progress: MotionValue<number> }) {
  const preRef = useRef<HTMLPreElement>(null);
  const dataRef = useRef<AsciiData | null>(null);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);

  const fit = useCallback(() => {
    const pre = preRef.current;
    const data = dataRef.current;
    if (!pre || !data || data.frames.length === 0) return;
    pre.style.fontSize = "100px";
    const scrollW = pre.scrollWidth;
    if (scrollW <= 0) return;
    const fsW = (window.innerWidth / scrollW) * 100;
    const fsH = window.innerHeight / data.rows;
    pre.style.fontSize = `${Math.max(fsW, fsH)}px`;
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(ASCII_VIDEO.url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<AsciiData>;
      })
      .then((data) => {
        if (cancelled || !data.frames.length) return;
        dataRef.current = data;
        const pre = preRef.current;
        if (!pre) return;
        pre.textContent = data.frames[0];
        pre.dataset.idx = "0";
        fit();
        setReady(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [fit]);

  useEffect(() => {
    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(fit);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [fit]);

  useEffect(() => {
    const data = dataRef.current;
    const pre = preRef.current;
    if (!ready || !data || !pre || data.frames.length === 0) return;

    return progress.on("change", (v) => {
      const idx = Math.max(
        0,
        Math.min(data.frames.length - 1, Math.round(v * (data.frames.length - 1)))
      );
      if (pre.dataset.idx !== String(idx)) {
        pre.dataset.idx = String(idx);
        pre.textContent = data.frames[idx];
      }
    });
  }, [ready, progress]);

  return <pre ref={preRef} className={styles.ascii} aria-hidden="true" />;
}
