"use client";

import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useLocale, useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { resourceRepos } from "@/data/resources/resources.data";
import { XTitle } from "@/app/components/Xtexts";
import { XTextDecrypt } from "@/app/components/Xtexts/XTextDecrypt";
import ColorRain from "@/app/components/ColorRain";
import Footer from "@/app/components/footer/footer";
import styles from "./resources.module.css";
import type { ResourceRepo } from "@/types/resources/resources.types";

function RepoCard({ repo, colorIndex }: { repo: ResourceRepo; colorIndex: number }) {
  const locale = useLocale();
  const hasHref = repo.href !== "";
  const isExternal = hasHref && !repo.href.startsWith("/");
  const href = hasHref && repo.href.startsWith("/") ? `/${locale}${repo.href}` : repo.href;
  const ccVar = `var(--cc${(colorIndex % 6) + 1})`;
  const style = { "--cc": ccVar } as CSSProperties;

  const inner = (
    <div className={styles.panel}>
      <XTextDecrypt
        text={repo.name}
        animateOn="view"
        sequential
        revealDirection="start"
        speed={45}
        maxIterations={6}
        delay={colorIndex * 100 + 150}
        parentClassName={styles.repoName}
        encryptedClassName={styles.encrypted}
      />
    </div>
  );

  if (!hasHref) {
    return (
      <div aria-label={repo.name} className={styles.card} style={style}>
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={repo.name}
      className={styles.card}
      style={style}
    >
      {inner}
    </a>
  );
}

const FILTER_OPTIONS = ["colors", "xfetch", "web", "gitnapse", "xlinux", "xwa", "legacy"];

const cardFilter = (name: string) => (name === "xfetch-cli" ? "xfetch" : name);

export default function ResourcesPage() {
  const t = useT("ResourcesPage");
  usePageMeta(`${t("title1")} ${t("title1Em")}`);
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = resourceRepos.filter((r) => {
    if (!typeFilter) return true;
    return cardFilter(r.name) === typeFilter;
  });

  return (
    <>
      {/* Full-viewport matrix background — same pattern as FlowFieldBg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "var(--background)" }}>
        <ColorRain />
      </div>

      {/* Content in normal flow — the page itself scrolls */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ width: "100%", maxWidth: "72rem", margin: "0 auto" }}>
          <XTitle em={t("title1Em")}>{t("title1")}</XTitle>
        </div>

        <div className={styles.filters}>
          {FILTER_OPTIONS.map((key) => {
            const active = typeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setTypeFilter(active ? "" : key)}
                className={`${styles.filterBtn} ${
                  active ? styles.filterBtnActive : ""
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-thumb"
                    className={styles.filterThumb}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={styles.filterLabel}>{key}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.grid}>
          {filtered.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} colorIndex={i} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}
