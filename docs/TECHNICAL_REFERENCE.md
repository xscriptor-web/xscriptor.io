# Architecture & Technical Reference

Deep dive into how xscriptor.io is built and organized.

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + CSS Modules + `custom.css` (design tokens)
- **Animation:** framer-motion ^12, Lenis (smooth scroll + snap)
- **i18n:** Custom provider (`src/app/i18n-provider.tsx`) — no external library
- **Rendering:** Static export (`output: "export"` → `out/`)
- **Deployment:** Hostinger (see [DEPLOYMENT.md](DEPLOYMENT.md))

## Routing

All routes are nested under a `[locale]` dynamic segment. `generateStaticParams` returns the 5 locales and `dynamicParams = false`.

| Route | File | Notes |
|-------|------|-------|
| `/[locale]` | `src/app/[locale]/page.tsx` | Home — always renders `HomeShowcase` |
| `/[locale]/portfolio` | `src/app/[locale]/portfolio/page.tsx` | Timeline |
| `/[locale]/contact` | `src/app/[locale]/contact/page.tsx` | Contact + GPG key card |
| `/[locale]/x` | `src/app/[locale]/x/page.tsx` | Client-side redirect to the x-repo |
| `/[locale]/resources` | `src/app/[locale]/resources/page.tsx` | Resources hub |

**Locales:** `en`, `es`, `de`, `it`, `fr` — message files in `messages/{locale}.json`.

## Layout Hierarchy

```
RootLayout (src/app/layout.tsx)
  └── ViewModeProvider + ErrorBoundary
        └── LocaleLayoutClient ([locale]/LocaleLayoutClient.tsx)
              ├── mode="simple" → SimpleHome (home) | SimplePageView (other routes)
              └── mode="classic" → SplashScreen → children → ClassicControls
```

`LocaleLayoutClient` decides the shell based on the active view mode. The route page content (`children`) only renders in **classic** mode; simple mode replaces it entirely.

## View Modes

`src/app/components/somode/ViewModeContext.tsx`

- `ViewMode = "classic" | "simple"`.
- Resolved from `?mode=` URL param → `localStorage` (`devxscriptor-view-mode`) → default `"simple"`.
- Changing the mode updates both the URL and localStorage.
- Consumers: `LocaleLayoutClient`, `ClassicControls`, `SimpleHome`, `SimplePageView`.

## Home & the ASCII Showcase

`src/app/[locale]/page.tsx` → `HomeShowcase`:

- **Mobile** (`HomeShowcaseMobile`): loops `public/videos/homemobile-web.mp4` as a background.
- **Desktop** (`HomeShowcase` → `HomeShowcaseDesktop`): renders `AsciiScrub`, which displays pre-rendered **braille** frames and scrubs them from the scroll position (a `MotionValue` derived from `scrollY`).

Full details in [ASCII_RENDERING.md](ASCII_RENDERING.md).

## Resources Hub

`/[locale]/resources` renders a card grid driven by `src/data/resources/resources.data.ts`.

- Each card is a `ResourceRepo` (`name`, `description`, `href`, optional icon).
- An empty `href` renders the card as a non-clickable placeholder (future subdomains).
- Filter buttons (colors, xfetch, web, gitnapse, xlinux, xwa, legacy) narrow the grid; `xfetch-cli` maps to the `xfetch` filter.
- Icons are intentionally omitted for now and will be added later.

## i18n

`src/app/i18n-provider.tsx` provides:

```tsx
const { locale } = useLocale();
const t = useT("Namespace");      // (key, params?) => string
t("title");
t.raw<SomeType>("typedKey");
```

Messages are per-locale JSON files under `messages/`. Namespaces mirror page/component names (`HomeShowcase`, `ClassicControls`, `SimpleHome`, `ResourcesPage`, …).

## Theming

Design tokens live in `src/app/custom.css` as CSS variables, with `.dark` / `.light` on `<html>`:

| Variable | Light | Dark |
|----------|-------|------|
| `--background` | `#ffffff` | `#0a0a0a` |
| `--foreground` | `#171717` | `#ededed` |
| `--primary` | `#4328a8` | `#fbbf24` |
| `--border` | `#e5e7eb` | `#374151` |
| `--text-muted` | `#6b7280` | `#9ca3af` |

`useTheme` (`src/hooks/useTheme.ts`) toggles the class and persists the choice.

## Backgrounds & Reusable Components

Reusable visual components in `src/app/components/`:

| Component | Purpose |
|-----------|---------|
| `xcomponents/FloatingPaths` | Animated SVG bezier curves |
| `xcomponents/FlowFieldBg` | Canvas particle flow field (mouse reactive) |
| `xcomponents/xbackgrounds/xparticles` | Canvas particle field (used on home) |
| `ColorRain` | Matrix-style canvas character rain (resources hub) |
| `xcomponents/icons/*` | Small themed SVG icon set |

Each background follows the same usage pattern:

```tsx
<div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
  <ColorRain />
</div>
<div className="relative z-10">{/* content */}</div>
```

## Key Directories

```
src/
├── app/
│   ├── [locale]/              # Route pages
│   ├── components/
│   │   ├── somode/            # View mode: ViewModeContext, SimpleHome, SimplePageView
│   │   ├── homeShowcase/      # HomeShowcase, HomeShowcaseMobile, AsciiScrub, config
│   │   ├── Xtexts/            # XText, XTextDecrypt, XTitle
│   │   ├── classiccontrols/   # Floating theme/language/menu controls
│   │   ├── xcomponents/       # Backgrounds, icons, particles
│   │   ├── footer/  publickey/  socialgrid/  timeline/
│   │   └── ColorRain.tsx, SplashScreen.tsx, SmoothScrollProvider.tsx, …
│   ├── data/resources/        # Resources hub data
│   ├── hooks/                 # usePageMeta, useTheme, useIsMobile
│   ├── types/                 # Shared TypeScript types
│   ├── i18n-provider.tsx
│   └── globals.css, custom.css, layout.tsx, not-found.tsx, icon.svg
├── data/  hooks/  types/      # Non-app data, hooks, types
messages/{en,es,de,it,fr}.json  # All translatable strings
public/                         # Static assets (served as-is)
scripts/                        # ascii-video.mjs, optimize-images.mjs
colors/colors.md                # Theme palette source data
```

## Build & Lint

```bash
npm run dev      # Development server
npm run build    # Static export to out/ (+ next-sitemap)
npm run lint     # ESLint
```
