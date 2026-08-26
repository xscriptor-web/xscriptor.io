# Xscriptor Dev

Source code for **xscriptor.io** — the development portfolio and ecosystem hub of Xscriptor.

A static, multilingual (5 locales) Next.js site featuring an ASCII-art home that scrubs through a video as you scroll, a resources hub, a portfolio timeline, and a contact page with a GPG public key.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Internationalization](#internationalization)
- [View Modes](#view-modes)
- [Documentation](#documentation)
- [Scripts](#scripts)

---

## Overview

The site is a **static export** (`next build` → `out/`) deployed to Hostinger. It is fully bilingual-agnostic by design: content lives in per-locale JSON message files and every route is nested under a `[locale]` segment (`en`, `es`, `de`, `it`, `fr`).

Two rendering "view modes" share the same routes:

- **Classic** — the full experience (splash, cinematic home, controls).
- **Simple** — a minimal file-tree explorer UI.

The home (desktop, classic mode) renders the intro video as **braille ASCII art** that advances in sync with the scroll position — pre-rendered offline from the video into a single JSON asset.

---

## Features

- **ASCII home** — the hero video is converted to 220×70 braille characters (2×4 dot grid per cell, 8 points) across 498 frames and scrubbed with the scroll.
- **i18n** — `en`, `es`, `de`, `it`, `fr` with a custom provider (no external i18n library).
- **Two view modes** — classic and simple, switchable from the UI (persisted in localStorage + URL).
- **Dark / light themes** driven by CSS variables and a `useTheme` hook.
- **Resources hub** — filterable card grid (colors, xfetch-cli, web, gitnapse, xlinux, xwa, legacy).
- **Portfolio timeline** — milestone cards (2014 → present).
- **Contact** — form plus an armored GPG public key card.
- **Static export** — no server required; deployable to any static host.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules + Tailwind CSS v4 + `custom.css` (CSS variables) |
| Animation | framer-motion, Lenis (smooth scroll) |
| i18n | Custom provider (`i18n-provider.tsx`) |
| Images | `sharp` (`scripts/optimize-images.mjs`) |
| ASCII generation | `ffmpeg-static` (`scripts/ascii-video.mjs`) |
| Sitemap | `next-sitemap` (postbuild) |

---

## Getting Started

Prerequisites: **Node.js 20+** and **npm**.

```bash
# install dependencies
npm install

# development server
npm run dev

# production build (static export → out/)
npm run build

# lint
npm run lint
```

> The project ships both `package-lock.json` (npm — use this) and a leftover `pnpm-lock.yaml`. Install with `npm`.

### Deploy

The build produces a fully static `out/` directory. Upload its contents to your static host (the site is deployed to **Hostinger**). See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## Project Structure

```
xscriptor.io/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Route pages
│   │   │   ├── page.tsx           #   Home (classic: ASCII showcase)
│   │   │   ├── portfolio/         #   Portfolio timeline
│   │   │   ├── contact/           #   Contact + GPG key
│   │   │   ├── x/                 #   Redirect → x-repo
│   │   │   └── resources/         #   Resources hub (card grid + filters)
│   │   ├── components/
│   │   │   ├── somode/            #   View-mode system (classic/simple)
│   │   │   ├── homeShowcase/      #   Home hero: AsciiScrub + mobile video
│   │   │   ├── Xtexts/            #   XText, XTextDecrypt, XTitle
│   │   │   ├── classiccontrols/   #   Classic floating controls
│   │   │   ├── xcomponents/       #   Reusable backgrounds, icons, particles
│   │   │   ├── footer/  publickey/  socialgrid/  timeline/
│   │   │   ├── ColorRain.tsx  SplashScreen.tsx  SmoothScrollProvider.tsx …
│   │   ├── data/
│   │   │   └── resources/resources.data.ts   # Resources hub cards
│   │   ├── hooks/                 # usePageMeta, useTheme, useIsMobile
│   │   ├── types/                 # ResourceRepo types
│   │   ├── i18n-provider.tsx      # Custom i18n provider
│   │   ├── globals.css  custom.css  layout.tsx  not-found.tsx
│   ├── data/  hooks/  types/
├── messages/{en,es,de,it,fr}.json  # All UI text, per locale
├── public/                        # Static assets (fonts, ascii JSON, videos, headers)
├── scripts/
│   ├── ascii-video.mjs            # Video → braille JSON
│   └── optimize-images.mjs        # PNG/JPG → WebP
├── colors/colors.md               # Theme color palettes (source data)
├── docs/                          # Detailed documentation
├── .gitattributes  .gitignore
└── next.config.ts
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full walkthrough.

---

## Internationalization

All text lives in `messages/{locale}.json`. Each page reads its namespace through the custom provider:

```tsx
const t = useT("HomeShowcase");
t("hero.name");
t.raw<SomeType>("hero");   // typed raw access
```

Locales: `en` (default), `es`, `de`, `it`, `fr`. A locale prefix is required on every route (`/en/resources`).

---

## View Modes

Controlled by `ViewModeContext` (`src/app/components/somode/ViewModeContext.tsx`).

| Mode | Renders |
|------|---------|
| `classic` | Splash screen → page content → `ClassicControls` |
| `simple` | `SimpleHome` (home) or `SimplePageView` (tree UI) for every other route |

Mode is read from the `?mode=` URL param, then localStorage, then defaults to `simple`.

---

## Documentation

- [Architecture & Technical Reference](docs/TECHNICAL_REFERENCE.md) — routing, view modes, i18n, theming, backgrounds, directory deep-dive.
- [ASCII Rendering](docs/ASCII_RENDERING.md) — how the home video becomes scrub-synced braille, the asset format, and how to regenerate/tune it.
- [Deployment](docs/DEPLOYMENT.md) — static export, Hostinger, security headers, sitemap, and what is intentionally git-ignored.

---

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js development server |
| `npm run build` | Static export to `out/` (+ sitemap via postbuild) |
| `npm run start` | Serve the built output |
| `npm run lint` | ESLint |
| `node scripts/ascii-video.mjs` | Regenerate `public/ascii/homevideo.json` from the home video |
| `node scripts/optimize-images.mjs` | Convert PNG/JPG sources to WebP |

---

*Built with Next.js · TypeScript · framer-motion · Tailwind CSS*
