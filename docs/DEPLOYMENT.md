# Deployment

The site is a fully static export and is hosted on **Hostinger**.

## Build

```bash
npm install
npm run build
```

`next.config.ts` uses `output: "export"`, so the build produces a self-contained **`out/`** directory (no server needed). `postbuild` runs `next-sitemap`, which generates `public/sitemap.xml`, `public/sitemap-0.xml`, and `public/robots.txt`.

```bash
npm run build   # → out/ (static) + sitemap/robots
```

## Uploading

Upload the **contents of `out/`** to your Hostinger document root (e.g. `public_html`). The entire `public/` tree is copied into `out/`, so fonts, the ASCII asset, videos, headers and keys are included automatically.

## Serving files shipped in the build

| File | Purpose |
|------|---------|
| `public/_headers` | Security headers (CSP, HSTS, X-Frame-Options, …) |
| `public/.htaccess` | Apache rules for Hostinger |
| `public/x-public.asc` | Armored GPG public key (contact page) |
| `public/.well-known/security.txt` | Security contact info |
| `public/ascii/homevideo.json` | Home ASCII frames |

## Sitemap

`next-sitemap.config.js` drives the `postbuild` step. Because sitemaps and `robots.txt` are regenerated on every build, they are **git-ignored** (`public/sitemap.xml`, `public/sitemap-*.xml`, `public/robots.txt`). They still land in `out/` and get deployed.

## What is intentionally not in git

| Path | Reason |
|------|--------|
| `node_modules/`, `.next/`, `out/` | Tooling/build output |
| `public/images/home/homevideo*.mp4` | Source material for ASCII regeneration only; not served by the site |
| `public/sitemap*.xml`, `public/robots.txt` | Regenerated on every build |
| `.env*` (except `.env.example`) | Secrets |

The **generated** ASCII asset (`public/ascii/homevideo.json`) **is** committed — the site needs it at runtime. See [ASCII_RENDERING.md](ASCII_RENDERING.md).

## Line endings & binary handling

`.gitattributes` normalizes line endings (`text eol=lf`) for code, config and data files, and marks media (`png`, `jpg`, `webp`, `mp4`, `ttf`, `woff2`, …) as `binary`. `public/ascii/homevideo.json` is marked `linguist-generated` so it stays out of GitHub diff views.

## Domains & subdomains

- Main site: `xscriptor.io`.
- Individual projects are planned to live on their own subdomains; the resources hub cards point at external URLs (or remain placeholders) until those are up.
