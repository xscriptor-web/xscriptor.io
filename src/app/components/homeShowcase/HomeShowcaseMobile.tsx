"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useT } from "@/app/i18n-provider";
import { XTextDecrypt } from "../Xtexts/XTextDecrypt";
import { XParticles } from "../xcomponents/xbackgrounds";
import { SNAP_TYPE } from "./homeShowcaseConfig";
import styles from "./HomeShowcaseMobile.module.css";

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

export default function HomeShowcaseMobile() {
  const t = useT("HomeShowcase");
  const hero = t.raw<HeroText>("hero");
  const chapters = t.raw<ShowcaseChapter[]>("chapters");
  const total = chapters.length + 1;
  const lenis = useLenis();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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

  const registerRef = (el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className={styles.stack}>
      <div className={styles.videoBg}>
        <video
          className={styles.video}
          src="/videos/homemobile-web.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.videoScrim} />
      </div>

      <HeroSection hero={hero} index={0} total={total} registerRef={registerRef} />

      {chapters.map((chapter, i) => (
        <ChapterSection
          key={chapter.id}
          chapter={chapter}
          index={i + 1}
          total={total}
          registerRef={registerRef}
        />
      ))}
    </div>
  );
}

type RegisterRef = (el: HTMLElement | null, index: number) => void;

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
  return (
    <section
      ref={(el) => registerRef(el, index)}
      className={styles.hero}
    >
      <div className={styles.particles}>
        <XParticles particleCount={700} absolute />
      </div>
      <div className={styles.heroInner}>
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
          <svg
            className={styles.heroChevron}
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6 L8 11 L13 6" />
          </svg>
        </div>
      </div>
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
  registerRef,
}: {
  chapter: ShowcaseChapter;
  index: number;
  total: number;
  registerRef: RegisterRef;
}) {
  return (
    <section
      ref={(el) => registerRef(el, index)}
      className={styles.chapter}
    >
      <div className={styles.copy}>
        {chapter.eyebrow && <span className={styles.copyEyebrow}>{chapter.eyebrow}</span>}
        {chapter.title && <span className={styles.copyTitle}>{chapter.title}</span>}
        {chapter.description && <span className={styles.copyDesc}>{chapter.description}</span>}
      </div>
      <span className={styles.slideMeta}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </section>
  );
}
