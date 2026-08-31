"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useT, useLocale } from "@/app/i18n-provider";
import { useViewMode } from "./ViewModeContext";
import { useTheme } from "@/hooks/useTheme";
import DecryptedText from "../DecryptedText";
import { orgLinks, type OrgRepoLink } from "./orgLinks";

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

type SubLink = {
  path: string;
  labelKey?: string;
  label?: string;
  key?: string;
  href?: string;
  icon?: React.ReactNode;
  repos?: OrgRepoLink[];
};

type PageItem = {
  label: string;
  desc?: string;
  color?: string;
};

const resourceChildren: SubLink[] = orgLinks;

const timelineYears: PageItem[] = [
  { label: "2014", desc: "Systems & infrastructure" },
  { label: "2017", desc: "Big data & governance" },
  { label: "2018", desc: "Security & routing" },
  { label: "Present", desc: "Full-stack & X ecosystem" },
];

export default function SimplePageView() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useT("SimpleHome");
  const tPages = useT("SimplePages");
  const tRes = useT("Resources");
  const { setMode } = useViewMode();
  const { theme, toggleTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const cleanPath = pathname.replace(`/${locale}`, "").replace(/\/$/, "") || "/";
  const segments = cleanPath.split("/").filter(Boolean);
  const currentPathDisplay = "~/" + (segments.length > 0 ? segments.join("/") + "/" : "");

  const getDesc = useCallback(() => {
    if (cleanPath === "/portfolio") return t("portfolioDesc");
    if (cleanPath === "/resources") return t("resourcesDesc");
    if (cleanPath === "/contact") return t("contactDesc");
    return "";
  }, [cleanPath, t]);

  const getItems = useCallback((): PageItem[] | null => {
    if (cleanPath === "/portfolio") return timelineYears;
    if (cleanPath === "/contact") {
      return [
        { label: "Telegram", color: "#fc618d", desc: "@xscriptor" },
        { label: "Email", color: "#7bd88f", desc: "x@xscriptor.com" },
        { label: "GitHub", color: "#5ad4e6", desc: "github.com/xscriptor" },
        { label: "Instagram", color: "#fd9353", desc: "@dev.xscriptor" },
        { label: "WhatsApp", color: "#948ae3", desc: "contact number" },
      ];
    }
    return null;
  }, [cleanPath]);

  const getChildren = useCallback((): SubLink[] | null => {
    if (cleanPath === "/resources") return resourceChildren;
    return null;
  }, [cleanPath]);

  const getChildLabel = useCallback(
    (child: SubLink): string => {
      if (child.label) return child.label;
      return t(child.labelKey ?? "");
    },
    [t]
  );

  const getOrgDesc = useCallback(
    (orgKey: string): string => {
      if (!orgKey) return "";
      const desc = tRes(`org.${orgKey}`);
      return desc === `org.${orgKey}` ? "" : desc;
    },
    [tRes]
  );

  const getRepoDesc = useCallback(
    (orgKey: string, repoName: string): string => {
      if (!orgKey || !repoName) return "";
      const map = tRes.raw<Record<string, string> | undefined>(`repo.${orgKey}`);
      return map?.[repoName] ?? "";
    },
    [tRes]
  );

  const isLeaf = useCallback((): boolean => {
    const leafPaths = ["/portfolio", "/contact"];
    return leafPaths.includes(cleanPath);
  }, [cleanPath]);

  const getParent = useCallback((): string => {
    if (segments.length <= 1) return "/";
    return "/" + segments.slice(0, -1).join("/");
  }, [segments]);

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
    window.location.href = `/${locale}${path}?mode=simple`;
  };

  const handleGoClassic = () => {
    window.location.href = `/${locale}${cleanPath}?mode=classic`;
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

  const desc = getDesc();
  const items = getItems();
  const children = getChildren();
  const leaf = isLeaf();
  const parentPath = getParent();
  const hasChildren = children && children.length > 0;

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
            <DecryptedText text={currentPathDisplay} {...dProps} className="tree-root" parentClassName="inline" />
          </div>

          {desc && (
            <div className="tree-item tree-child" style={{ marginBottom: "0.5rem" }}>
              <span className="tree-prefix">├──</span>
              <span className="tree-meta" style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                <DecryptedText text={desc} {...dProps} className="tree-meta-text" parentClassName="inline" />
              </span>
            </div>
          )}

          {items && items.length > 0 && (
            <div style={{ marginTop: "0.15rem", marginBottom: leaf ? "0.25rem" : "0.5rem" }}>
              {items.map((item, i) => (
                <div key={i} className="tree-item tree-child-item" style={{ marginBottom: "0.1rem" }}>
                  <span className="tree-prefix">{i < items.length - 1 ? "├──" : "└──"}</span>
                  {item.color && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        flexShrink: 0,
                        marginRight: "0.15rem",
                      }}
                    />
                  )}
                  <span className="tree-label">
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{item.label}</span>
                    {item.desc && (
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "0.35rem" }}>
                        {item.desc}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          {leaf && (
            <button onClick={handleGoClassic} className="tree-item tree-item-link" style={{ marginBottom: "0.35rem", marginTop: "0.15rem" }}>
              <span className="tree-prefix">│</span>
              <span className="tree-label" style={{ fontSize: "0.8rem", color: "var(--primary)" }}>
                <DecryptedText text={tPages("goToPage")} {...dProps} className="tree-label-text" parentClassName="inline" />
              </span>
            </button>
          )}

          {hasChildren && items && items.length > 0 && (
            <div style={{
              width: "100%",
              height: "1px",
              background: "var(--border)",
              margin: "0.5rem 0",
              opacity: 0.3,
            }} />
          )}

          {hasChildren && (
            <div>
              {children!.map((child, i) => {
                const isLastOrg = i === children!.length - 1;
                return (
                  <div key={child.path}>
                    <div className="tree-item tree-child-item">
                      <span className="tree-prefix">{isLastOrg ? "└──" : "├──"}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                        {child.icon && (
                          <span style={{ display: "inline-flex", opacity: 0.7, flexShrink: 0 }}>{child.icon}</span>
                        )}
                        <span className="tree-label">
                          <DecryptedText text={getChildLabel(child)} {...dProps} className="tree-label-text" parentClassName="inline" />
                        </span>
                      </span>
                      {child.key && getOrgDesc(child.key) && (
                        <span className="tree-meta">
                          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{getOrgDesc(child.key)}</span>
                        </span>
                      )}
                    </div>
                    {child.repos && child.repos.length > 0 && (
                      <div className="tree-children">
                        {child.repos.map((repo, j) => {
                          const repoPrefix = j < child.repos!.length - 1 ? "│  ├──" : "│  └──";
                          const repoDesc = child.key ? getRepoDesc(child.key, repo.name) : "";
                          return (
                            <a
                              key={repo.name}
                              href={repo.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tree-item tree-item-link tree-child-item"
                            >
                              <span className="tree-prefix">{repoPrefix}</span>
                              <span className="tree-label">
                                <DecryptedText text={repo.name} {...dProps} className="tree-label-text tree-external-label" parentClassName="inline" />
                                {repoDesc && (
                                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "0.35rem" }}>
                                    {repoDesc}
                                  </span>
                                )}
                              </span>
                              <span className="tree-arrow">→</span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="tree-spacer" />

          {parentPath !== "" && (
            <button onClick={() => handleNav(parentPath)} className="tree-item tree-item-link">
              <span className="tree-prefix">└──</span>
              <span className="tree-label" style={{ color: "var(--text-muted)" }}>
                <DecryptedText text={".."} {...dProps} className="tree-label-text" parentClassName="inline" />
              </span>
              <span className="tree-meta">
                <DecryptedText text={tPages("goUp")} {...dProps} className="tree-meta-text" parentClassName="inline" />
              </span>
            </button>
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
