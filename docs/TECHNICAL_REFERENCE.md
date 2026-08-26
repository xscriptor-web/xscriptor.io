# Project Technical Reference

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS Modules + `custom.css` (CSS variables)
- **Animation:** framer-motion ^12.19.1
- **i18n:** Custom provider (`i18n-provider.tsx`) — no external lib
- **Deployment:** Static export (`next export` → `out/`)
- **Domain:** xscriptor.io

---

## Routing

| Pattern | File |
|---------|------|
| `/[locale]` | `src/app/[locale]/page.tsx` |
| `/[locale]/resources` | `src/app/[locale]/resources/page.tsx` |
| `/[locale]/resources/vscode` | `src/app/[locale]/resources/vscode/page.tsx` |
| `/[locale]/resources/colors` | `src/app/[locale]/resources/colors/page.tsx` |
| `/[locale]/resources/vscode?mode=classic` | Same page, `ViewModeContext` reads `?mode=` |

**Locales:** `en`, `es`, `de`, `it`, `fr`

---

## Layout Hierarchy

```
RootLayout (layout.tsx) — ViewModeProvider + ErrorBoundary
  └── LocaleLayoutClient ([locale]/LocaleLayoutClient.tsx)
        ├── mode="so"   → SODesktop > children
        ├── mode="simple" → SimpleHome (/) | SimplePageView (other)
        └── default      → SplashScreen + main + Navbar
```

---

## View Modes

Controlled by `src/app/components/somode/ViewModeContext.tsx`:

| Mode | Behavior |
|------|----------|
| `classic` | Standard layout: Splash → `<main>` + `<Navbar>` |
| `simple` | Minimal layout: Splash → SimpleHome (/) or SimplePageView |
| `so` | Desktop OS simulation: `SODesktop` with window manager |

- Mode is read from `?mode=` URL param, falls back to localStorage, then `"simple"`
- Changing mode updates both URL and localStorage

---

## Theme System

Defined in `src/app/custom.css`:

| Variable | Light | Dark |
|----------|-------|------|
| `--background` | `#ffffff` | `#0a0a0a` |
| `--foreground` | `#171717` | `#ededed` |
| `--primary` | `#4328a8` | `#fbbf24` |
| `--border` | `#e5e7eb` | `#374151` |
| `--card-bg` | `#f9fafb` | `#1f2937` |
| `--text-muted` | `#6b7280` | `#9ca3af` |

- Toggled by `.dark` / `.light` class on `<html>`
- `useTheme` hook in `src/hooks/useTheme.ts`
- `useIsDark` pattern used by bg components for canvas/SVG theming

---

## Background Components (Reusable)

All follow same pattern: `absolute inset-0 pointer-events-none overflow-hidden`

| Component | Description | Props |
|-----------|-------------|-------|
| `FloatingPaths` | Two layers of 36 animated SVG bezier curves | `className` |
| `LightLines` | Animated horizontal light beams, dark/light aware | `className`, `lineCount` |
| `DotGridBg` | Static multicolor dot grid via CSS radial-gradient | `className` |
| `FlowFieldBg` | Canvas-based particle flow field, mouse interaction | `className`, `particleCount`, `speed`, `trailOpacity` |
| `ColorRain` | Matrix-style canvas character rain | `className`, `colors`, `speed`, `direction` |
| `DarkVeil` | Dark overlay | `className` |
| `TerminalBgPaths` | Terminal-inspired animated paths | `className` |

### Usage pattern

```tsx
import { FloatingPaths } from "@/app/components/xcomponents/FloatingPaths";
// or
import { LightLines } from "@/app/components/xcomponents/LightLines";

// In page:
<div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
  <LightLines lineCount={16} />
</div>
<div className="relative z-10">
  {/* page content */}
</div>
```

---

## i18n

Custom provider at `src/app/i18n-provider.tsx`:

```tsx
const { locale } = useLocale();
const t = useT("Namespace"); // returns (key, params?) => string
t("title")    // → "Namespace.title" in current locale
t.raw("key")  // → typed raw value
```

Messages are loaded per-locale from `messages/{locale}.json`.

---

## Key Dirs

```
src/
├── app/
│   ├── [locale]/          # Route pages (resources, contact, portfolio, etc.)
│   ├── components/
│   │   ├── somode/        # View mode system (SODesktop, ViewModeContext, etc.)
│   │   ├── navbar/        # Navbar + navLink
│   │   ├── footer/        # Footer
│   │   └── xcomponents/   # Reusable components (FloatingPaths, LightLines, etc.)
│   ├── custom.css          # All CSS variables + global styles
│   └── i18n-provider.tsx
├── data/
│   ├── resources/          # Resource data (vscodeThemes, colors, terminal, etc.)
│   └── skills/             # Skill data (devx, samurai, xscriptor)
├── types/
│   └── resources/          # TypeScript types for resources
├── hooks/
│   └── useTheme.ts
└── xcomponents/            # Extra component library (content, forms, gallery, layout, navigation, social)
```

---

## Adding a Background to Any Page

1. Import the bg component:
   ```tsx
   import { LightLines } from "@/app/components/xcomponents/LightLines";
   ```

2. Add fixed background div with low z-index:
   ```tsx
   <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
     <LightLines lineCount={16} />
   </div>
   <div className="relative z-10">
     {/* content */}
   </div>
   ```

3. Available bg components: `FloatingPaths`, `LightLines`, `DotGridBg`, `FlowFieldBg`, `ColorRain`, `DarkVeil`, `TerminalBgPaths`

---

## Build & Deploy

```bash
npm run dev      # Next.js dev server
npm run build    # Static export to out/
npm run lint     # ESLint
```
