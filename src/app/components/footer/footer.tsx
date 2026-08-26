"use client";
import { useT } from "@/app/i18n-provider";
import styles from "./footer.module.css";

export default function Footer() {
  const t = useT("Footer");
  return (
    <footer className={styles.footer}>{t("text")} &copy;
    </footer>
  );
}
