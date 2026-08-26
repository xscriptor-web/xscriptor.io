# ASCII Rendering

The desktop home (classic mode) replaces a video player with **braille ASCII art** that advances as the user scrolls. Frames are pre-rendered offline into a single JSON asset, so the browser only fetches and displays them.

## How it works

1. **Offline** — `scripts/ascii-video.mjs` reads the home video (`public/images/home/homevideo.mp4`, HEVC, 4K, 30 fps) with `ffmpeg` and converts every frame into a grid of **braille characters**.
2. **Asset** — the result is written to `public/ascii/homevideo.json`:
   ```json
   {
     "cols": 220,
     "rows": 70,
     "fps": 30,
     "frames": [ "⠁⠂⠃…", "…" ]
   }
   ```
   Each frame is a string of `cols × rows` braille code points. A braille character encodes a **2×4 dot grid** (8 points), giving much finer detail than plain blocks.
3. **Runtime** — `AsciiScrub` (`src/app/components/homeShowcase/AsciiScrub.tsx`) fetches the JSON, sizes the `<pre>` to fill the viewport, and on every scroll change swaps in the frame whose index matches `scrollY` progress.

## Pipeline detail

`scripts/ascii-video.mjs`:

- Samples each frame to `cols × rows` braille cells, each cell covering a `2×4` grid of source pixels.
- Computes the average luminance per dot, applies a brightness **boost** (`BOOST`, default `0.3`) because the source material is very dark, and turns a dot on when its boosted value passes **`THRESH`** (default `110`).
- Falls back to `public/images/home/homevideo-fallback.mp4` (H.264) if the HEVC source fails to decode.

## Configuration

Tuning knobs live at the top of `scripts/ascii-video.mjs`:

| Constant | Default | Effect |
|----------|---------|--------|
| `D_COLS` / `D_ROWS` | `220` / `70` | Grid resolution (more cells = smaller blocks on screen) |
| `THRESH` | `110` | Dot on/off threshold (higher = cleaner/darker, lower = more detail) |
| `BOOST` | `0.3` | Luminance lift for dark material |
| `FPS` | `30` | Frame extraction rate |

The on-screen config (`cols`, `rows`, `fps`, `url`) is mirrored in `homeShowcaseConfig.ts` (`ASCII_VIDEO`).

## Regenerating the asset

```bash
node scripts/ascii-video.mjs
```

Writes `public/ascii/homevideo.json` (≈ 23 MB, 498 frames). Run it whenever the source video changes or you tune the constants.

> The source videos are **git-ignored** (`public/images/home/homevideo*.mp4`) — they are only needed locally to regenerate the JSON. The generated JSON is committed because the site serves it.

## Runtime component

`AsciiScrub` (`src/app/components/homeShowcase/AsciiScrub.tsx`):

- Fetches `ASCII_VIDEO.url` and caches the frame data.
- `fit()` scales the `<pre>` font so the grid fills the viewport (also re-runs on window resize).
- Subscribes to the scroll `MotionValue` from `HomeShowcase` and only updates the DOM when the frame index actually changes.

Mobile keeps a normal `<video>` loop (`public/videos/homemobile-web.mp4`), rendered by `HomeShowcaseMobile`.
