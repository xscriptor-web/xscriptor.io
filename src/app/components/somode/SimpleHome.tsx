"use client";

import { useEffect, useState, useRef, useCallback, type ReactNode } from "react";
import { useT, useLocale } from "@/app/i18n-provider";
import { useViewMode } from "./ViewModeContext";
import { useTheme } from "@/hooks/useTheme";
import DecryptedText from "../DecryptedText";
import TerminalIcon from "@/app/components/xcomponents/icons/TerminalIcon";
import VscodeIcon from "@/app/components/xcomponents/icons/VscodeIcon";
import ObsidianIcon from "@/app/components/xcomponents/icons/ObsidianIcon";
import JetBrainsIcon from "@/app/components/xcomponents/icons/JetBrainsIcon";
import XfetchIcon from "@/app/components/xcomponents/icons/XfetchIcon";
import AiIcon from "@/app/components/xcomponents/icons/AiIcon";
import OpenCodeIcon from "@/app/components/xcomponents/icons/OpenCodeIcon";

type Locale = "en" | "es" | "de" | "it" | "fr";

const LOCALES: Locale[] = ["en", "es", "de", "it", "fr"];
const LOCALE_PREFIX_RE = /^\/(en|es|de|it|fr)/;

const dProps = {
  animateOn: "view" as const,
  sequential: true,
  revealDirection: "start" as const,
  speed: 25,
  maxIterations: 6,
  encryptedClassName: "simple-encrypted",
};

const internalSectionLinks = [
  { path: "", key: "home", descKey: "homeDesc" },
  { path: "/portfolio", key: "portfolio", descKey: "portfolioDesc" },
] as const;

const resourceIcons: Record<string, ReactNode> = {
  terminal: <TerminalIcon size={14} />,
  vscode: <VscodeIcon size={14} />,
  obsidian: <ObsidianIcon size={14} />,
  jetbrains: <JetBrainsIcon size={14} />,
  xfetch: <XfetchIcon size={14} />,
  ai: <AiIcon size={14} />,
  opencode: <OpenCodeIcon size={14} />,
};

const resourceLinks = [
  { path: "/resources/terminal", key: "terminal", descKey: "terminalDesc" },
  { path: "/resources/vscode", key: "vscode", descKey: "vscodeDesc" },
  { path: "/resources/obsidian", key: "obsidian", descKey: "obsidianDesc" },
  { path: "/resources/jetbrains", key: "jetbrains", descKey: "jetbrainsDesc" },
  { path: "/resources/xfetch", key: "xfetch", descKey: "xfetchDesc" },
  { path: "/resources/ai", key: "ai", descKey: "aiDesc" },
  { path: "/resources/colors", key: "colors", descKey: "colorsDesc" },
  { path: "/resources/opencode", key: "opencode", descKey: "opencodeDesc" },
  { path: "/resources/web", key: "web", descKey: "webDesc" },
] as const;

const webSubLinks = [
  { path: "/resources/web/xcomponents", key: "xcomponents" },
  { path: "/resources/web/xwa", key: "xwa" },
] as const;

const xwaSubLinks = [
  { path: "/resources/web/xwa/samurai", key: "samurai" },
  { path: "/resources/web/xwa/shinobi", key: "shinobi" },
] as const;

const externalLinks = [
  { href: "https://www.xscriptor.com", key: "linkXscriptor" },
  { href: "https://art.xscriptor.com", key: "linkArt" },
  { href: "https://github.com/xscriptor", key: "linkGithub" },
  { href: "https://github.com/xfetch-cli/xfetch", key: "linkXfetch" },
  { href: "https://github.com/xscriptor/xpm", key: "linkXPM" },
  { href: "https://github.com/xscriptor/terminal", key: "linkTerminal" },
] as const;

export default function SimpleHome() {
  const t = useT("SimpleHome");
  const locale = useLocale() as Locale;
  const { setMode } = useViewMode();
  const { theme, toggleTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (path: string) => {
    window.location.href = `${path}?mode=simple`;
  };

  const switchLocale = useCallback(
    (nextLocale: Locale) => {
      const currentPath = window.location.pathname.replace(LOCALE_PREFIX_RE, "") || "/";
      const target =
        currentPath === "/"
          ? `/${nextLocale}/`
          : `/${nextLocale}${currentPath}`;
      const params = new URLSearchParams(window.location.search);
      const qs = params.toString();
      window.location.href = qs ? `${target}?${qs}` : target;
    },
    []
  );

  const localeLabels: Record<Locale, string> = { en: "EN", es: "ES", de: "DE", it: "IT", fr: "FR" };
  const localeNames: Record<Locale, string> = { en: "English", es: "Español", de: "Deutsch", it: "Italiano", fr: "Français" };

  return (
    <div className="simple-home-container">
      <div className={`simple-home-content ${ready ? "fade-in" : ""}`}>
        <div className="simple-home-header">
          <span className="simple-home-title">
            <DecryptedText text={t("title")} {...dProps} className="simple-home-title" parentClassName="inline" />
          </span>
          <span className="simple-home-prompt">
            <DecryptedText text="~$ _" {...dProps} speed={40} maxIterations={4} className="simple-home-prompt" parentClassName="inline" />
          </span>
        </div>

        <div className="simple-home-tree">
          <div className="tree-root">
            <DecryptedText text="~/" {...dProps} className="tree-root" parentClassName="inline" />
          </div>

          {internalSectionLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNav(`/${locale}${link.path}`)}
              className="tree-item tree-item-link"
            >
              <span className="tree-prefix">├──</span>
              <span className="tree-label">
                <DecryptedText text={t(link.key)} {...dProps} className="tree-label-text" parentClassName="inline" />
              </span>
              <span className="tree-meta">
                <DecryptedText text={t(link.descKey)} {...dProps} className="tree-meta-text" parentClassName="inline" />
              </span>
            </button>
          ))}

          <button
            onClick={() => handleNav(`/${locale}/resources`)}
            className="tree-item tree-item-link"
          >
            <span className="tree-prefix">├──</span>
            <span className="tree-label">
              <DecryptedText text={t("resources")} {...dProps} className="tree-label-text" parentClassName="inline" />
            </span>
            <span className="tree-meta">
              <DecryptedText text={t("resourcesDesc")} {...dProps} className="tree-meta-text" parentClassName="inline" />
            </span>
          </button>

          <div className="tree-children">
            {resourceLinks.map((link, i) => (
              <button
                key={link.key}
                onClick={() => handleNav(`/${locale}${link.path}`)}
                className="tree-item tree-item-link tree-child-item"
              >
                <span className="tree-prefix">
                  {i < resourceLinks.length - 1 ? "│  ├──" : "│  └──"}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  {resourceIcons[link.key] && (
                    <span style={{ display: "inline-flex", opacity: 0.7, flexShrink: 0 }}>{resourceIcons[link.key]}</span>
                  )}
                  <span className="tree-label">
                    <DecryptedText text={t(link.key)} {...dProps} className="tree-label-text" parentClassName="inline" />
                  </span>
                </span>
                <span className="tree-meta">
                  <DecryptedText text={t(link.descKey)} {...dProps} className="tree-meta-text" parentClassName="inline" />
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNav(`/${locale}/resources/web`)}
            className="tree-item tree-item-link"
          >
            <span className="tree-prefix">├──</span>
            <span className="tree-label">
              <DecryptedText text={t("web")} {...dProps} className="tree-label-text" parentClassName="inline" />
            </span>
            <span className="tree-meta">
              <DecryptedText text={t("webDesc")} {...dProps} className="tree-meta-text" parentClassName="inline" />
            </span>
          </button>

          <div className="tree-children">
            {webSubLinks.map((link, i) => (
              <div key={link.key}>
                <button
                  onClick={() => handleNav(`/${locale}${link.path}`)}
                  className="tree-item tree-item-link tree-child-item"
                >
                  <span className="tree-prefix">
                    {i < webSubLinks.length - 1 ? "│  ├──" : "│  └──"}
                  </span>
                  <span className="tree-label">
                    <DecryptedText text={t(link.key)} {...dProps} className="tree-label-text" parentClassName="inline" />
                  </span>
                </button>
                {link.key === "xwa" && (
                  <div style={{ marginLeft: "1.5rem" }}>
                    {xwaSubLinks.map((sub, j) => (
                      <button
                        key={sub.key}
                        onClick={() => handleNav(`/${locale}${sub.path}`)}
                        className="tree-item tree-item-link tree-child-item"
                      >
                        <span className="tree-prefix">
                          {j < xwaSubLinks.length - 1 ? "│  ├──" : "│  └──"}
                        </span>
                        <span className="tree-label">
                          <DecryptedText text={t(sub.key)} {...dProps} className="tree-label-text" parentClassName="inline" />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ fontFamily: "monospace", fontSize: "0.875rem", lineHeight: 2, color: "var(--text-muted)", paddingLeft: 0 }}>│</div>

          <button
            onClick={() => handleNav(`/${locale}/contact`)}
            className="tree-item tree-item-link"
          >
            <span className="tree-prefix">└──</span>
            <span className="tree-label">
              <DecryptedText text={t("contact")} {...dProps} className="tree-label-text" parentClassName="inline" />
            </span>
            <span className="tree-meta">
              <DecryptedText text={t("contactDesc")} {...dProps} className="tree-meta-text" parentClassName="inline" />
            </span>
          </button>

          <div className="tree-spacer" />
          <div className="tree-root">
            <DecryptedText text="~/links/" {...dProps} className="tree-root" parentClassName="inline" />
          </div>

          {externalLinks.map((link, i) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tree-item tree-item-link tree-external"
            >
              <span className="tree-prefix">{i < externalLinks.length - 1 ? "├──" : "└──"}</span>
              <span className="tree-label">
                <DecryptedText text={t(link.key)} {...dProps} className="tree-label-text tree-external-label" parentClassName="inline" />
              </span>
              <span className="tree-arrow">→</span>
            </a>
          ))}

          {t("moreExternal") && (
            <div className="tree-item tree-child">
              <span className="tree-prefix">&nbsp;&nbsp;&nbsp;└──</span>
              <span className="tree-label tree-more">{t("moreExternal")}</span>
            </div>
          )}
        </div>

        <div className="simple-home-actions">
          <button onClick={() => setMode("classic")} className="simple-home-btn">
            <DecryptedText text={t("classicMode")} {...dProps} className="simple-home-btn-text" parentClassName="inline" />
          </button>

          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="simple-home-btn simple-home-lang-btn"
              aria-expanded={langOpen}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="8" />
                <ellipse cx="10" cy="10" rx="4" ry="8" />
                <path d="M2 10 h16" />
              </svg>
              <span className="font-mono font-bold text-[10px]">
                <DecryptedText text={localeLabels[locale]} {...dProps} className="simple-home-btn-text" parentClassName="inline" />
              </span>
              <svg
                className={`w-2 h-2 transition-transform ${langOpen ? "rotate-180" : ""}`}
                viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              >
                <path d="M2.5 3.5 L5 6.5 L7.5 3.5" />
              </svg>
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 min-w-[120px] rounded-lg border border-[var(--border)]
                bg-[var(--background)]/95 backdrop-blur-xl shadow-xl transition-all duration-200 origin-bottom z-50
                ${langOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              role="menu"
            >
              {LOCALES.filter((l) => l !== locale).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-mono
                    text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--card-bg)] transition-colors
                    first:rounded-t-lg last:rounded-b-lg cursor-pointer"
                  role="menuitem"
                >
                  <span className="font-bold">{localeLabels[l]}</span>
                  <span className="text-[10px] opacity-60">{localeNames[l]}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="simple-home-btn simple-home-lang-btn"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
