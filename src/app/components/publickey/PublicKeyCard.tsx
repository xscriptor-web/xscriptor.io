"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { useT } from "@/app/i18n-provider";
import { XTextDecrypt } from "@/app/components/Xtexts/XTextDecrypt";
import SocialGrid from "@/app/components/socialgrid/SocialGrid";
import styles from "./PublicKeyCard.module.css";

const FINGERPRINT = "43086B71054295FF252949AD3F03BDE89BE5176F";

const fingerprintFormatted = FINGERPRINT.match(/.{1,4}/g)?.join(" ") ?? FINGERPRINT;

export default function PublicKeyCard() {
  const t = useT("ContactPage");
  const [keyText, setKeyText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/x-public.asc")
      .then((r) => r.text())
      .then((text) => setKeyText(text.trim()))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(FINGERPRINT, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 168,
      color: { dark: "#171717", light: "#ffffff" },
    }).then((url) => {
      if (active) setQrDataUrl(url);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleCopy = useMemo(
    () => async () => {
      if (!keyText) return;
      try {
        await navigator.clipboard.writeText(keyText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    },
    [keyText]
  );

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.qrBlock}>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="PGP fingerprint QR" width={168} height={168} />
          ) : (
            <div className={styles.qrPlaceholder} />
          )}
          <span className={styles.qrHint}>{t("scanToVerify")}</span>
        </div>

        <div className={styles.infoBlock}>
          <div className={styles.header}>
            <span className={styles.dot} />
            <span className={styles.title}>{t("pgpTitle")}</span>
            <a className={styles.downloadLink} href="/x-public.asc" download>
              .asc
            </a>
          </div>

          <div className={styles.uid}>x &lt;x@xscriptor.com&gt;</div>

          <code className={styles.fingerprint}>
            <XTextDecrypt
              text={fingerprintFormatted}
              animateOn="view"
              speed={30}
              maxIterations={8}
              delay={100}
              encryptedClassName={styles.encrypted}
            />
          </code>

          <div className={styles.keyWrap}>
            {keyText ? (
              <pre className={`${styles.keyText} ${styles.keyEnter}`}>{keyText}</pre>
            ) : (
              <pre className={styles.keyText}>{t("loading")}</pre>
            )}
          </div>

          <div className={styles.actions}>
            <button className={styles.copyBtn} onClick={handleCopy} disabled={!keyText}>
              {copied ? t("copiedKey") : t("copyKey")}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.socialBlock}>
        <SocialGrid />
      </div>
    </div>
  );
}
