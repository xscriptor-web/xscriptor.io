"use client";
import { useT } from "@/app/i18n-provider";
import { usePageMeta } from "@/app/hooks/usePageMeta";
import { XTitle } from "@/app/components/Xtexts";
import PublicKeyCard from "@/app/components/publickey/PublicKeyCard";
import { FloatingPaths } from "@/app/components/xcomponents/FloatingPaths";
import Footer from "@/app/components/footer/footer";
import styles from './contact.module.css';

export default function Contact() {
  const t = useT("ContactPage");
  usePageMeta(t("title"));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: "html,body{overflow:hidden}" }} />

      <div className={styles.contactContainer}>
        <FloatingPaths />
      </div>

      <div className={`${styles.contactMain} ${styles.fadeInUp}`}>
        <div style={{
          width: '100%',
          maxWidth: '80rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
        }}>
          <XTitle>{t("title")}</XTitle>

          <div className="flex flex-col items-center justify-center gap-6" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '1rem 0' }}>
            <PublicKeyCard />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
