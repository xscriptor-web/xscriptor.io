"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/app/i18n-provider";
import type { ResourceRepo } from "@/types/resources/resources.types";
import styles from "./OrgCard.module.css";

type OrgCardProps = {
  repo: ResourceRepo;
  index?: number;
};

export default function OrgCard({ repo, index = 0 }: OrgCardProps) {
  const locale = useLocale();
  const isExternal = !repo.href.startsWith("/");
  const href = repo.href.startsWith("/") ? `/${locale}${repo.href}` : repo.href;
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;
  const name = repo.displayName ?? repo.name;
  const featuredRepos = repo.repos.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: (index % 6) * 0.06 }}
    >
      <div className={styles.card}>
        <div className={styles.logoTile} aria-hidden="true">
          <img
            src={repo.logo}
            alt=""
            width={64}
            height={64}
            className={repo.darkInvert ? styles.logoDark : undefined}
          />
        </div>

        <div className={styles.body}>
          <a className={styles.orgLink} href={href} target={target} rel={rel}>
            <span className={styles.orgName}>{name}</span>
            <span className={styles.arrow} aria-hidden="true">
              &gt;
            </span>
          </a>

          <ul className={styles.repoList}>
            {featuredRepos.map((r) => (
              <li key={r} className={styles.repoItem}>
                <a className={styles.repoLink} href={href} target={target} rel={rel}>
                  <span className={styles.repoName}>{r}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    &gt;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
