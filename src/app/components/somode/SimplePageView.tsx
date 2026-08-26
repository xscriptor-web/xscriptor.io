"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
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
import WebLabIcon from "@/app/components/xcomponents/icons/WebLabIcon";

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
  labelKey: string;
  descKey?: string;
  icon?: React.ReactNode;
};

type PageItem = {
  label: string;
  desc?: string;
  color?: string;
};

const resourceIcons: Record<string, React.ReactNode> = {
  terminal: <TerminalIcon size={14} />,
  vscode: <VscodeIcon size={14} />,
  obsidian: <ObsidianIcon size={14} />,
  jetbrains: <JetBrainsIcon size={14} />,
  xfetch: <XfetchIcon size={14} />,
  ai: <AiIcon size={14} />,
  opencode: <OpenCodeIcon size={14} />,
  web: <WebLabIcon size={14} />,
};

const resourceChildren: SubLink[] = [
  { path: "/resources/terminal", labelKey: "terminal", descKey: "terminalDesc", icon: resourceIcons.terminal },
  { path: "/resources/vscode", labelKey: "vscode", descKey: "vscodeDesc", icon: resourceIcons.vscode },
  { path: "/resources/obsidian", labelKey: "obsidian", descKey: "obsidianDesc", icon: resourceIcons.obsidian },
  { path: "/resources/jetbrains", labelKey: "jetbrains", descKey: "jetbrainsDesc", icon: resourceIcons.jetbrains },
  { path: "/resources/xfetch", labelKey: "xfetch", descKey: "xfetchDesc", icon: resourceIcons.xfetch },
  { path: "/resources/ai", labelKey: "ai", descKey: "aiDesc", icon: resourceIcons.ai },
  { path: "/resources/colors", labelKey: "colors", descKey: "colorsDesc" },
  { path: "/resources/opencode", labelKey: "opencode", descKey: "opencodeDesc", icon: resourceIcons.opencode },
  { path: "/resources/web", labelKey: "web", descKey: "webDesc", icon: resourceIcons.web },
];

const aiChildren: SubLink[] = [
  { path: "/resources/ai/skills/devx", labelKey: "devxName", descKey: "devxDesc" },
  { path: "/resources/ai/skills/xscriptor", labelKey: "xscriptorName", descKey: "xscriptorDesc" },
  { path: "/resources/ai/skills/samurai", labelKey: "samuraiSkillName", descKey: "samuraiSkillDesc" },
];

const webChildren: SubLink[] = [
  { path: "/resources/web/xwa", labelKey: "xwa" },
  { path: "/resources/web/xcomponents", labelKey: "xcomponents" },
];

const xwaChildren: SubLink[] = [
  { path: "/resources/web/xwa/samurai", labelKey: "samurai" },
  { path: "/resources/web/xwa/shinobi", labelKey: "shinobi" },
];

const themeColors: Record<string, string> = {
  "X": "#fc618d", "Madrid": "#cc0033", "Lahabana": "#fc618d",
  "Miami": "#FF4C8B", "Paris": "#fc618d", "Tokio": "#fc618d",
  "Oslo": "#e05561", "Helsinki": "#1faa9e", "Berlin": "#999999",
  "London": "#333333", "Praha": "#FF5555", "Bogota": "#fc618d",
};

const themeList: PageItem[] = [
  { label: "X", color: "#fc618d", desc: "Base palette — warm neon" },
  { label: "Madrid", color: "#cc0033", desc: "Light — editorial contrast" },
  { label: "Lahabana", color: "#fc618d", desc: "Tropical — lime highlights" },
  { label: "Miami", color: "#FF4C8B", desc: "OLED max contrast" },
  { label: "Paris", color: "#fc618d", desc: "Cool cyan — elegant" },
  { label: "Tokio", color: "#fc618d", desc: "Stable neon hierarchy" },
  { label: "Oslo", color: "#e05561", desc: "Nordic muted contrast" },
  { label: "Helsinki", color: "#1faa9e", desc: "Light — earthy warmth" },
  { label: "Berlin", color: "#999999", desc: "Monochrome — brutalist" },
  { label: "London", color: "#333333", desc: "Light grayscale — minimal" },
  { label: "Praha", color: "#FF5555", desc: "Dark — dreamy pastels" },
  { label: "Bogota", color: "#fc618d", desc: "High contrast — cyan/coral" },
];

const colorsThemeList: PageItem[] = [
  { label: "X", color: "#fc618d" },
  { label: "Madrid", color: "#990026" },
  { label: "Lahabana", color: "#fc618d" },
  { label: "Miami", color: "#FF4C8B" },
  { label: "Paris", color: "#fc618d" },
  { label: "Tokio", color: "#fc618d" },
  { label: "Oslo", color: "#e05561" },
  { label: "Helsinki", color: "#1faa9e" },
  { label: "Berlin", color: "#999999" },
  { label: "London", color: "#333333" },
  { label: "Praha", color: "#FF5555" },
  { label: "Bogota", color: "#fc618d" },
];

const jetbrainsThemeList: PageItem[] = [
  { label: "X", color: "#fc618d", desc: "dark" },
  { label: "Lahabana", color: "#fc618d", desc: "dark" },
  { label: "Miami", color: "#FF4C8B", desc: "dark" },
  { label: "Paris", color: "#fc618d", desc: "dark" },
  { label: "Tokio", color: "#fc618d", desc: "dark" },
  { label: "Oslo", color: "#e05561", desc: "dark" },
  { label: "Berlin", color: "#999999", desc: "dark" },
  { label: "Praha", color: "#FF5555", desc: "dark" },
  { label: "Bogota", color: "#fc618d", desc: "dark" },
  { label: "Madrid", color: "#cc0033", desc: "light" },
  { label: "Helsinki", color: "#1faa9e", desc: "light" },
  { label: "London", color: "#333333", desc: "light" },
];

const timelineYears: PageItem[] = [
  { label: "2014", desc: "Systems & infrastructure" },
  { label: "2017", desc: "Big data & governance" },
  { label: "2018", desc: "Security & routing" },
  { label: "Present", desc: "Full-stack & X ecosystem" },
];

const xwaCapabilities: PageItem[] = [
  { label: "SAMURAI", color: "#fc618d", desc: "Vuln discovery & recon" },
  { label: "SHINOBI", color: "#7bd88f", desc: "Silent web scraper" },
];

const samuraiCapabilities: PageItem[] = [
  { label: "Port Scanning", color: "#fc618d", desc: "Nmap engine" },
  { label: "SQL Injection", color: "#fd9353", desc: "SQLMap detection" },
  { label: "Template Scan", color: "#948ae3", desc: "Nuclei engine" },
  { label: "Browser Crawl", color: "#5ad4e6", desc: "Playwright automation" },
  { label: "Recon", color: "#7bd88f", desc: "Subdomain & endpoint discovery" },
  { label: "Export", color: "#fce566", desc: "CSV, JSON, PDF, BIN" },
];

const shinobiCapabilities: PageItem[] = [
  { label: "Anti-Blocking", color: "#fc618d", desc: "UA rotation, header randomize" },
  { label: "Deep Crawl", color: "#7bd88f", desc: "BFS recursive with depth" },
  { label: "JS Rendering", color: "#5ad4e6", desc: "Headless Chromium" },
  { label: "Asset Download", color: "#fd9353", desc: "HTML/CSS/JS/images/PDF" },
  { label: "Proxy Rotation", color: "#948ae3", desc: "HTTP/HTTPS/SOCKS5" },
  { label: "Fast Mode", color: "#fce566", desc: "Pure Rust — zero deps" },
];

const xcomponentsList: PageItem[] = [
  { label: "XDecryptedText", desc: "Scramble-reveal animation" },
  { label: "XInteractivePhrase", desc: "Clickable word interactions" },
  { label: "XSkillNetwork", desc: "Constellation skill graph" },
  { label: "XStaticGallery", desc: "Responsive image grid" },
  { label: "XGlassNavbar", desc: "Frosted-glass navigation" },
  { label: "XMicroGalleryText", desc: "Auto-shuffle gallery" },
  { label: "XBookFullDecrypt", desc: "Full-text decrypt reader" },
  { label: "XSeparator", desc: "Decorative dividers" },
  { label: "XZigZagLayout", desc: "Alternating layout" },
  { label: "XContactForm", desc: "Configurable contact form" },
  { label: "XFooter", desc: "Full site footer" },
  { label: "XMinimalFooter", desc: "Compact footer" },
  { label: "XCompleteBook", desc: "Full book reader" },
];

const skillItems: Record<string, PageItem[]> = {
  devx: [
    { label: "CSS Tokens", color: "#fc618d", desc: "15+ design tokens" },
    { label: "Typography", color: "#7bd88f", desc: "6 type levels" },
    { label: "Palette", color: "#fd9353", desc: "Dual light/dark" },
    { label: "Spacing", color: "#948ae3", desc: "Consistent scale" },
    { label: "Borders", color: "#5ad4e6", desc: "4 radius levels" },
  ],
  xscriptor: [
    { label: "Typography", color: "#fc618d", desc: "EB Garamond scale" },
    { label: "Palette", color: "#7bd88f", desc: "Dual light/dark" },
    { label: "i18n", color: "#fd9353", desc: "5 locales, 100%" },
    { label: "Content", color: "#948ae3", desc: "Poetry, prose, blog" },
    { label: "Art Gallery", color: "#5ad4e6", desc: "Masonry grid" },
  ],
  samurai: [
    { label: "Severity", color: "#fc618d", desc: "5-level CVSS scoring" },
    { label: "Scan Engines", color: "#7bd88f", desc: "Nmap, SQLMap, Nuclei, Playwright" },
    { label: "WebSocket", color: "#5ad4e6", desc: "Real-time push" },
    { label: "Export", color: "#fd9353", desc: "CSV/JSON/PDF/BIN" },
    { label: "Schema", color: "#948ae3", desc: "PostgreSQL with cascade" },
  ],
};

export default function SimplePageView() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useT("SimpleHome");
  const tPages = useT("SimplePages");
  const tXwa = useT("XwaProjects");
  const tWeb = useT("WebLab");
  const tTimeline = useT("PortfolioTimeline");
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
    if (cleanPath === "/resources/terminal") return t("terminalDesc");
    if (cleanPath === "/resources/vscode") return t("vscodeDesc");
    if (cleanPath === "/resources/obsidian") return t("obsidianDesc");
    if (cleanPath === "/resources/jetbrains") return t("jetbrainsDesc");
    if (cleanPath === "/resources/xfetch") return t("xfetchDesc");
    if (cleanPath === "/resources/ai") return t("aiDesc");
    if (cleanPath === "/resources/ai/skills/devx") return tPages("devxDesc");
    if (cleanPath === "/resources/ai/skills/xscriptor") return tPages("xscriptorDesc");
    if (cleanPath === "/resources/ai/skills/samurai") return tPages("samuraiSkillDesc");
    if (cleanPath === "/resources/colors") return t("colorsDesc");
    if (cleanPath === "/resources/opencode") return t("opencodeDesc");
    if (cleanPath === "/resources/web") return t("webDesc");
    if (cleanPath === "/resources/web/xwa") return tXwa("pageSub");
    if (cleanPath === "/resources/web/xwa/samurai") return tXwa("samuraiDesc");
    if (cleanPath === "/resources/web/xwa/shinobi") return tXwa("shinobiDesc");
    if (cleanPath === "/resources/web/xcomponents") return tWeb("xcomponentsDesc");
    if (cleanPath === "/contact") return t("contactDesc");
    return "";
  }, [cleanPath, t, tPages, tXwa, tWeb]);

  const getItems = useCallback((): PageItem[] | null => {
    if (cleanPath === "/resources/terminal") return themeList;
    if (cleanPath === "/resources/vscode") return themeList;
    if (cleanPath === "/resources/jetbrains") return jetbrainsThemeList;
    if (cleanPath === "/resources/colors") return colorsThemeList;
    if (cleanPath === "/resources/opencode") return themeList;
    if (cleanPath === "/resources/obsidian") {
      return [
        { label: "EB Garamond", color: "#fc618d", desc: "Serif typography" },
        { label: "Light/Dark", color: "#7bd88f", desc: "Dual mode" },
        { label: "Frosted Glass", color: "#5ad4e6", desc: "Blur effects" },
        { label: "Code Blocks", color: "#fd9353", desc: "Syntax styling" },
        { label: "Style Settings", color: "#948ae3", desc: "Customizable UI" },
      ];
    }
    if (cleanPath === "/portfolio") return timelineYears;
    if (cleanPath === "/resources/web/xwa") return xwaCapabilities;
    if (cleanPath === "/resources/web/xwa/samurai") return samuraiCapabilities;
    if (cleanPath === "/resources/web/xwa/shinobi") return shinobiCapabilities;
    if (cleanPath === "/resources/web/xcomponents") return xcomponentsList;
    if (cleanPath === "/resources/ai/skills/devx") return skillItems.devx;
    if (cleanPath === "/resources/ai/skills/xscriptor") return skillItems.xscriptor;
    if (cleanPath === "/resources/ai/skills/samurai") return skillItems.samurai;
    if (cleanPath === "/contact") {
      return [
        { label: "Telegram", color: "#fc618d", desc: "@xscriptor" },
        { label: "Email", color: "#7bd88f", desc: "x@xscriptor.com" },
        { label: "GitHub", color: "#5ad4e6", desc: "github.com/xscriptor" },
        { label: "Instagram", color: "#fd9353", desc: "@dev.xscriptor" },
        { label: "WhatsApp", color: "#948ae3", desc: "contact number" },
      ];
    }
    if (cleanPath === "/resources") {
      return [
        { label: "Themes", desc: "Terminal, VSCode, Obsidian, JetBrains, Colors" },
        { label: "Tools", desc: "Xfetch, OpenCode CLI" },
        { label: "AI", desc: "Prompts, agents & skill configs" },
      ];
    }
    if (cleanPath === "/resources/xfetch") {
      return [
        { label: "Language", color: "#fc618d", desc: "Rust" },
        { label: "Layouts", color: "#7bd88f", desc: "Default, side-block, section, tree" },
        { label: "Modules", color: "#5ad4e6", desc: "15+ system info modules" },
        { label: "Cross-platform", color: "#fd9353", desc: "Linux, Windows, macOS" },
      ];
    }
    if (cleanPath === "/resources/web") {
      return [
        { label: "XW Web Analysis", color: "#fc618d", desc: "Security analysis tools" },
        { label: "XComponents", color: "#7bd88f", desc: "React/Next.js component library" },
      ];
    }
    if (cleanPath === "/resources/ai") {
      return [
        { label: "Agents", desc: "200+ specialized agents" },
        { label: "Skills", desc: "3 skill packages" },
        { label: "Categories", desc: "web, cloud, mobile, security & more" },
      ];
    }
    return null;
  }, [cleanPath]);

  const getChildren = useCallback((): SubLink[] | null => {
    if (cleanPath === "/resources") return resourceChildren;
    if (cleanPath === "/resources/ai") return aiChildren;
    if (cleanPath === "/resources/web") return webChildren;
    if (cleanPath === "/resources/web/xwa") return xwaChildren;
    return null;
  }, [cleanPath]);

  const getChildLabel = useCallback((child: SubLink): string => {
    if (aiChildren.includes(child)) return tPages(child.labelKey);
    return t(child.labelKey);
  }, [t, tPages]);

  const getChildDesc = useCallback((child: SubLink): string => {
    if (!child.descKey) return "";
    if (aiChildren.includes(child)) return tPages(child.descKey);
    if (child.descKey === "xwaTitle") return tWeb("xwaTitle");
    if (child.descKey === "xcomponentsDesc") return tWeb("xcomponentsDesc");
    if (child.descKey === "samuraiDesc") return tXwa("samuraiDesc");
    if (child.descKey === "shinobiDesc") return tXwa("shinobiDesc");
    if (child.descKey === "xwaDesc") return tWeb("xwaDesc");
    return t(child.descKey);
  }, [t, tPages, tWeb, tXwa]);

  const isLeaf = useCallback((): boolean => {
    const leafPaths = [
      "/portfolio", "/resources/terminal", "/resources/vscode",
      "/resources/obsidian", "/resources/jetbrains", "/resources/xfetch",
      "/resources/colors", "/resources/opencode",
      "/resources/ai/skills/devx", "/resources/ai/skills/xscriptor",
      "/resources/ai/skills/samurai", "/resources/web/xwa/samurai",
      "/resources/web/xwa/shinobi", "/resources/web/xcomponents", "/contact",
    ];
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
              {children!.map((child, i) => (
                <button
                  key={child.path}
                  onClick={() => handleNav(child.path)}
                  className="tree-item tree-item-link tree-child-item"
                >
                  <span className="tree-prefix">
                    {i < children!.length - 1 ? "├──" : "└──"}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    {child.icon && (
                      <span style={{ display: "inline-flex", opacity: 0.7, flexShrink: 0 }}>{child.icon}</span>
                    )}
                    <span className="tree-label">
                      <DecryptedText text={getChildLabel(child)} {...dProps} className="tree-label-text" parentClassName="inline" />
                    </span>
                  </span>
                  {getChildDesc(child) && (
                    <span className="tree-meta">
                      <DecryptedText text={getChildDesc(child)} {...dProps} className="tree-meta-text" parentClassName="inline" />
                    </span>
                  )}
                </button>
              ))}
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
