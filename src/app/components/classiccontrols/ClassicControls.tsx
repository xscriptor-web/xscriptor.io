"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useT, useLocale } from "@/app/i18n-provider";
import { useViewMode } from "@/app/components/somode/ViewModeContext";
import { useTheme } from "@/hooks/useTheme";
import { XTextDecrypt } from "@/app/components/Xtexts/XTextDecrypt";
import styles from "./ClassicControls.module.css";

type Locale = "en" | "es" | "de" | "it" | "fr";

const LOCALE_PREFIX_RE = /^\/(en|es|de|it|fr)/;
const LOCALES: Locale[] = ["en", "es", "de", "it", "fr"];

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  de: "DE",
  it: "IT",
  fr: "FR",
};

const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
};

function stripLocale(path: string): string {
  return path.replace(LOCALE_PREFIX_RE, "") || "/";
}

export default function ClassicControls() {
  const t = useT("ClassicControls");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { mode: viewMode, setMode: setViewMode } = useViewMode();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (
        menuOpen &&
        controlsRef.current &&
        !controlsRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const links = [
    { id: "home", url: `/${locale}/?mode=classic`, labelKey: "menuHome", ariaKey: "home" },
    { id: "resources", url: `/${locale}/resources`, labelKey: "menuResources", ariaKey: "resources" },
    { id: "portfolio", url: `/${locale}/portfolio`, labelKey: "menuPortfolio", ariaKey: "portfolio" },
    { id: "contact", url: `/${locale}/contact`, labelKey: "menuContact", ariaKey: "contact" },
    { id: "xscriptor.com", url: "https://xscriptor.com", labelKey: "menuXscriptor", ariaKey: "xscriptor", external: true },
  ];

  const navT = useT("Navbar");
  const pathWithoutLocale = pathname.replace(LOCALE_PREFIX_RE, "") || "/";

  const switchLocale = (nextLocale: Locale) => {
    const currentPath = stripLocale(pathname);
    const target =
      currentPath === "/" ? `/${nextLocale}/` : `/${nextLocale}${currentPath}`;
    window.location.href = target;
  };

  const handleSimpleMode = () => {
    setViewMode("simple");
    window.location.href = `/${locale}/?mode=simple`;
  };

  if (isIframe) return null;

  const isActive = (url: string) => {
    if (!url.startsWith("/")) return false;
    const linkPath = stripLocale(url);
    return linkPath === "/"
      ? pathWithoutLocale === "/"
      : pathWithoutLocale.startsWith(linkPath);
  };

  return (
    <>
      <div ref={controlsRef} className={styles.container}>
        <div className={styles.frame}>
          <div className={styles.panel}>
          <div className={styles.segment} role="group" aria-label={t("theme")}>
            <span
              aria-hidden="true"
              className={`${styles.thumb} ${theme === "dark" ? styles.thumbDark : ""}`}
            />
            <button
              type="button"
              onClick={() => setTheme("light")}
              aria-pressed={theme === "light"}
              className={`${styles.segmentBtn} ${
                theme === "light" ? styles.segmentBtnActive : ""
              }`}
            >
              {t("light")}
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              aria-pressed={theme === "dark"}
              className={`${styles.segmentBtn} ${
                theme === "dark" ? styles.segmentBtnActive : ""
              }`}
            >
              {t("dark")}
            </button>
          </div>

          <span className={styles.divider} aria-hidden="true" />

          <div ref={langRef} className={styles.lang}>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setLangOpen((v) => !v);
              }}
              aria-expanded={langOpen}
              aria-label={t("changeLanguage")}
              className={styles.langBtn}
            >
              <span>{localeLabels[locale]}</span>
              <span
                aria-hidden="true"
                className={`${styles.caret} ${langOpen ? styles.caretUp : ""}`}
              />
            </button>

            {langOpen && (
              <div className={styles.langMenu}>
                <div className={styles.langPanel} role="menu">
                  {LOCALES.filter((l) => l !== locale).map((l) => (
                    <button
                      key={l}
                      type="button"
                      role="menuitem"
                      onClick={() => switchLocale(l)}
                      className={styles.langItem}
                    >
                      <span className={styles.langCode}>{localeLabels[l]}</span>
                      <span className={styles.langName}>{localeNames[l]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            onClick={() => {
              setLangOpen(false);
              setMenuOpen((v) => !v);
            }}
            aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
            aria-expanded={menuOpen}
            className={`${styles.square} ${menuOpen ? styles.squareOpen : ""}`}
          >
            <span className={styles.bars} aria-hidden="true">
              <span className={`${styles.bar} ${styles.barTop}`} />
              <span className={`${styles.bar} ${styles.barMid}`} />
              <span className={`${styles.bar} ${styles.barBottom}`} />
            </span>
          </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.menu}>
            <div className={styles.menuPanel}>
              <span className={styles.menuLabel}>{t("navigation")}</span>

              <nav aria-label={t("navigation")}>
                <ol className={styles.linkList}>
                  {links.map((link, i) => (
                    <li
                      key={link.id}
                      className={styles.linkItem}
                      style={{ animationDelay: `${i * 50 + 60}ms` }}
                    >
                    <a
                      href={link.url}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={navT(link.ariaKey)}
                      onClick={() => setMenuOpen(false)}
                      style={{ "--cc": `var(--cc${i + 1})` } as CSSProperties}
                      className={`${styles.menuLink} ${
                        isActive(link.url) ? styles.menuLinkActive : ""
                      }`}
                    >
                      <span className={styles.linkIndex}>0{i + 1}</span>
                      <XTextDecrypt
                        text={t(link.labelKey)}
                        animateOn="view"
                        sequential
                        revealDirection="start"
                        speed={45}
                        maxIterations={6}
                        delay={i * 140 + 200}
                        parentClassName={styles.linkText}
                        encryptedClassName={styles.encrypted}
                      />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className={styles.modeRow} role="group" aria-label="View mode">
                <button
                  type="button"
                  onClick={handleSimpleMode}
                  aria-pressed={viewMode === "simple"}
                  className={`${styles.modeBtn} ${
                    viewMode === "simple" ? styles.modeBtnActive : ""
                  }`}
                >
                  {t("simpleMode")}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("classic")}
                  aria-pressed={viewMode === "classic"}
                  className={`${styles.modeBtn} ${
                    viewMode === "classic" ? styles.modeBtnActive : ""
                  }`}
                >
                  {t("classicMode")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
