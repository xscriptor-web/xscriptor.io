"use client";

import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { resourceRepos } from "@/data/resources/resources.data";
import { XTitle } from "@/app/components/Xtexts";
import OrgCard from "@/app/components/OrgCard/OrgCard";
import ColorRain from "@/app/components/ColorRain";
import Footer from "@/app/components/footer/footer";
import styles from "./resources.module.css";

export default function ResourcesPage() {
  const t = useT("ResourcesPage");
  usePageMeta(`${t("title1")} ${t("title1Em")}`);

  return (
    <>
      {/* Full-viewport matrix background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "var(--background)" }}>
        <ColorRain />
      </div>

      <div className={styles.page}>
        <div className={styles.heading}>
          <XTitle em={t("title1Em")}>{t("title1")}</XTitle>
        </div>

        <div className={styles.grid}>
          {resourceRepos.map((repo, i) => (
            <OrgCard key={repo.name} repo={repo} index={i} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}
