"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionValue, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { XTextDecrypt } from "../Xtexts/XTextDecrypt";
import { XParticles } from "../xcomponents/xbackgrounds";
import { useT } from "@/app/i18n-provider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SNAP_TYPE } from "./homeShowcaseConfig";
import AsciiScrub from "./AsciiScrub";
import HomeShowcaseMobile from "./HomeShowcaseMobile";
import styles from "./HomeShowcase.module.css";

type HeroText = {
  path: string;
  name: string;
  role: string;
  paragraph: string;
  scrollHint: string;
};

type ShowcaseChapter = {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

const dProps = {
  animateOn: "view" as const,
  sequential: true,
  revealDirection: "start" as const,
  maxIterations: 6,
};

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

type RegisterRef = (el: HTMLElement | null, index: number) => void;

export default function HomeShowcase() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <HomeShowcaseMobile />;
  }

  return <HomeShowcaseDesktop />;
}

function HomeShowcaseDesktop() {
  const t = useT("HomeShowcase");
  const hero = t.raw<HeroText>("hero");
  const chapters = t.raw<ShowcaseChapter[]>("chapters");
  const lenis = useLenis();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { scrollY } = useScroll();
  const videoProgress = useTransform(scrollY, (y) => {
    const h = window.innerHeight;
    const zoneLength = (chapters.length - 1) * h;
    if (zoneLength <= 0) return y > h ? 1 : 0;
    return Math.max(0, Math.min(1, (y - h) / zoneLength));
  });

  useEffect(() => {
    if (!lenis) return;
    const snap = new Snap(lenis, {
      type: SNAP_TYPE,
      distanceThreshold: "100%",
      debounce: 0,
    });
    sectionRefs.current.forEach((el) => {
      if (el) snap.addElement(el, { align: "start" });
    });
    return () => {
      snap.destroy();
    };
  }, [lenis]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const index = Math.round(window.scrollY / window.innerHeight);
      setActiveIndex(Math.max(0, Math.min(chapters.length, index)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const registerRef: RegisterRef = (el, index) => {
    sectionRefs.current[index] = el;
  };

  const total = chapters.length + 1;

  return (
    <div className={styles.stack}>
      <div className={styles.videoWrap}>
        <AsciiScrub progress={videoProgress} />
        <div className={styles.videoScrim} />
      </div>

      <HeroSection hero={hero} index={0} total={total} registerRef={registerRef} />

      {chapters.map((chapter, i) => (
        <ChapterSection
          key={chapter.id}
          chapter={chapter}
          index={i + 1}
          total={total}
          active={activeIndex === i + 1}
          registerRef={registerRef}
        />
      ))}
    </div>
  );
}

function useExitScale(ref: RefObject<HTMLElement | null>): {
  scale: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
} {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  return { scale, scrollYProgress };
}

function HeroSection({
  hero,
  index,
  total,
  registerRef,
}: {
  hero: HeroText;
  index: number;
  total: number;
  registerRef: RegisterRef;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scale } = useExitScale(ref);
  const contentOpacity = useTransform(scale, [1, 0.9], [1, 0]);
  const particlesOpacity = useTransform(scale, [1, 0.9], [1, 0]);
  const bgOpacity = useTransform(scale, [1, 0.9], [1, 0]);

  return (
    <section
      ref={(el) => {
        ref.current = el;
        registerRef(el, index);
      }}
      className={styles.hero}
    >
      <motion.div style={{ opacity: bgOpacity }} className={styles.heroBg} />
      <motion.div style={{ opacity: particlesOpacity }} className={styles.particles}>
        <XParticles />
      </motion.div>
      <motion.div style={{ scale, opacity: contentOpacity }} className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.heroPath}>
            <XTextDecrypt text={hero.path} {...dProps} speed={40} encryptedClassName={styles.encrypted} />
          </p>
          <h1 className={styles.heroName}>
            <XTextDecrypt text={hero.name} {...dProps} speed={30} encryptedClassName={styles.encrypted} />
          </h1>
          <p className={styles.heroRole}>
            <XTextDecrypt text={hero.role} {...dProps} speed={15} encryptedClassName={styles.encrypted} />
          </p>
          <p className={styles.heroParagraph}>
            <XTextDecrypt text={hero.paragraph} {...dProps} speed={6} encryptedClassName={styles.encrypted} />
          </p>
        </div>
        <div className={styles.heroFooter} aria-hidden="true">
          <span className={styles.heroFooterHint}>{hero.scrollHint}</span>
          <svg className={styles.heroChevron} viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6 L8 11 L13 6" />
          </svg>
        </div>
      </motion.div>
      <span className={styles.slideMeta}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </section>
  );
}

function ChapterSection({
  chapter,
  index,
  total,
  active,
  registerRef,
}: {
  chapter: ShowcaseChapter;
  index: number;
  total: number;
  active: boolean;
  registerRef: RegisterRef;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scale } = useExitScale(ref);

  return (
    <section
      ref={(el) => {
        ref.current = el;
        registerRef(el, index);
      }}
      className={styles.chapter}
    >
      <motion.div style={{ scale }} className={styles.chapterInner}>
        {(chapter.eyebrow || chapter.title || chapter.description) && (
          <motion.div
            className={styles.copy}
            variants={copyContainer}
            initial="hidden"
            animate={active ? "show" : "hidden"}
          >
            {chapter.eyebrow && (
              <motion.span variants={copyItem} className={styles.copyEyebrow}>
                {chapter.eyebrow}
              </motion.span>
            )}
            {chapter.title && (
              <motion.span variants={copyItem} className={styles.copyTitle}>
                {chapter.title}
              </motion.span>
            )}
            {chapter.description && (
              <motion.span variants={copyItem} className={styles.copyDesc}>
                {chapter.description}
              </motion.span>
            )}
          </motion.div>
        )}
      </motion.div>
      <span className={styles.slideMeta}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </section>
  );
}
