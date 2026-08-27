"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ASCII_MOBILE_VIDEO } from "./homeShowcaseConfig";
import styles from "./AsciiMobile.module.css";

type AsciiData = {
  cols: number;
  rows: number;
  fps: number;
  frames: string[];
};

export default function AsciiMobile() {
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
    fetch(ASCII_MOBILE_VIDEO.url)
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

    const stepMs = 1000 / data.fps;
    let raf = 0;
    let last = performance.now();
    let idx = 0;

    const tick = (now: number) => {
      if (now - last >= stepMs) {
        idx = (idx + 1) % data.frames.length;
        pre.textContent = data.frames[idx];
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  return <pre ref={preRef} className={styles.ascii} aria-hidden="true" />;
}
