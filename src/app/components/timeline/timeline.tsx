"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useT } from "@/app/i18n-provider";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const t = useT("PortfolioTimeline");
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const xRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div
      className="w-full"
      ref={containerRef}
    >
      <div className="">
        <p className="" style={{ color: 'var(--text-muted)' }}>
          {t("intro")}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
                <div className="h-4 w-4 rounded-full p-2" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }} />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold" style={{ color: 'var(--text-muted)' }}>
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-right font-bold" style={{ color: 'var(--text-muted)' }}>
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
            background: `linear-gradient(to bottom, transparent 0%, var(--border) 50%, transparent 99%)`,
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background: `linear-gradient(to top, var(--primary), var(--primary) 10%, transparent)`,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
        </div>
        <motion.div
          style={{
            y: heightTransform,
            rotate: xRotation,
          }}
          className="absolute left-[23px] md:left-[23px] top-0 flex items-center justify-center w-5 h-5 pointer-events-none"
        >
          <span className="text-xs font-bold leading-none" style={{ color: 'var(--primary)' }}>X</span>
        </motion.div>
      </div>
    </div>
  );
};
