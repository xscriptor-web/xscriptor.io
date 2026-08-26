"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#fbbf24", "#fc618d", "#7bd88f", "#fce566", "#fd9353", "#948ae3", "#5ad4e6"];

interface ColorRainProps {
  lightBg?: string;
  darkBg?: string;
}

export default function ColorRain({
  lightBg = "230,230,230",
  darkBg = "10,10,10",
}: ColorRainProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const chars = "XSCRIPTORDEVX▣◈◇◎●◉✦✧⬡▥▣△▽▲▼◆○◌◍◐◑◒◓✓✕✖◆◇○◎▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅";
    const fontSize = 18;
    const columns = Math.floor(W / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const colorIdx: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * COLORS.length));

    let isDark = document.documentElement.classList.contains("dark");
    const getBg = () => isDark ? darkBg : lightBg;

    function draw() {
      c.fillStyle = `rgba(${getBg()},0.06)`;
      c.fillRect(0, 0, W, H);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        c.fillStyle = COLORS[colorIdx[i] % COLORS.length];
        c.font = `${fontSize}px monospace`;
        const alpha = drops[i] / 20;
        c.globalAlpha = Math.min(alpha, 0.8);
        c.fillText(char, i * fontSize, drops[i] * fontSize);
        c.globalAlpha = 1;

        if (drops[i] * fontSize > H && Math.random() > 0.975) {
          drops[i] = 0;
          colorIdx[i] = Math.floor(Math.random() * COLORS.length);
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 40);

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, [lightBg, darkBg]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
