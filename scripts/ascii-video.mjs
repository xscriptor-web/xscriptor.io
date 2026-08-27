// ============================================================================
//  ASCII VIDEO — pre-renderiza los vídeos de la home a cuadros BRAILLE
//  ---------------------------------------------------------------------------
//  - DESKTOP: extrae los frames de public/images/home/homevideo.mp4
//    (HEVC 4K 30fps) y los convierte a un asset de 220×70 caracteres braille
//    (rejilla 2×4 = 8 puntos por carácter). Se muestra con scrub ligado al
//    scroll (AsciiScrub).
//  - MÓVIL: extrae los frames de public/videos/homemobile-web.mp4 (vertical
//    9:16, H.264 30fps) y los convierte a un asset de 99×88 caracteres braille
//    con la misma rejilla y boost. Se muestra en bucle como fondo
//    (AsciiMobile en HomeShowcaseMobile).
//
//  Uso:  node scripts/ascii-video.mjs
// ============================================================================

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, statSync, existsSync } from "node:fs";

let ffmpeg;
try {
  const candidate = (await import("ffmpeg-static")).default;
  ffmpeg = existsSync(candidate) ? candidate : "ffmpeg";
} catch {
  ffmpeg = "ffmpeg";
}

const VIDEO_PRIMARY = "public/images/home/homevideo.mp4";
const VIDEO_FALLBACK = "public/images/home/homevideo-fallback.mp4";
const OUTPUT_DESKTOP = "public/ascii/homevideo.json";

const VIDEO_MOBILE = "public/videos/homemobile-web.mp4";
const OUTPUT_MOBILE = "public/ascii/homemobile.json";

const FPS = 30;
const BOOST = 0.3;
const THRESH = 110;

// --- Config desktop (paisaje 16:9) ------------------------------------------
const D_COLS = 220;
const D_ROWS = 70;
// Cada punto braille cubre SUB_W×SUB_H píxeles de origen
const SUB_W = 4;
const SUB_H = 4;
const D_SRC_W = D_COLS * 2 * SUB_W;
const D_SRC_H = D_ROWS * 4 * SUB_H;

// --- Config móvil (vertical 9:16) -------------------------------------------
// Rejilla con la misma proporción que el vídeo (99/2·3 × 88/4·3 ≈ 594×1056 ≈ 9:16)
const M_COLS = 99;
const M_ROWS = 88;
const M_SUB_W = 3;
const M_SUB_H = 3;
const M_SRC_W = M_COLS * 2 * M_SUB_W;
const M_SRC_H = M_ROWS * 4 * M_SUB_H;

const boostOf = (v) =>
  Math.min(255, Math.round(Math.pow(v / 255, BOOST) * 255));

// Mapea una rejilla 2×4 a un carácter braille (U+2800 + bits)
// fila0: ▸(0x01,0x08) fila1: (0x02,0x10) fila2: (0x04,0x20) fila3: (0x40,0x80)
function frameToBraille(frame, cols, rows, srcW, subW, subH) {
  const lines = [];
  const cells = subW * subH;
  for (let r = 0; r < rows; r++) {
    const y0 = r * 4 * subH;
    let line = "";
    for (let c = 0; c < cols; c++) {
      const x0 = c * 2 * subW;
      let bits = 0;
      for (let dy = 0; dy < 4; dy++) {
        const y = y0 + dy * subH;
        for (let dx = 0; dx < 2; dx++) {
          const x = x0 + dx * subW;
          let sum = 0;
          for (let sy = 0; sy < subH; sy++) {
            const rowOff = (y + sy) * srcW;
            for (let sx = 0; sx < subW; sx++) {
              sum += frame[rowOff + x + sx];
            }
          }
          if (boostOf(sum / cells) >= THRESH) {
            const bit = dy === 3 ? (dx === 0 ? 0x40 : 0x80) : dx === 0 ? 1 << dy : 1 << (dy + 3);
            bits |= bit;
          }
        }
      }
      line += String.fromCodePoint(0x2800 + bits);
    }
    lines.push(line);
  }
  return lines.join("\n");
}

function runFfmpeg(videoPath, filter, srcW, srcH, converter) {
  return new Promise((resolve, reject) => {
    const args = [
      "-hide_banner",
      "-i", videoPath,
      "-an", "-sn",
      "-vf", filter,
      "-f", "rawvideo",
      "-pix_fmt", "gray",
      "-",
    ];
    const child = spawn(ffmpeg, args, { stdio: ["ignore", "pipe", "inherit"] });

    const frameSize = srcW * srcH;
    let buf = Buffer.alloc(0);
    const frames = [];

    child.stdout.on("data", (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      while (buf.length >= frameSize) {
        const frame = buf.subarray(0, frameSize);
        buf = buf.subarray(frameSize);
        frames.push(converter(frame));
        if (frames.length % 100 === 0) {
          console.log(`  ${frames.length} frames...`);
        }
      }
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) return reject(new Error(`ffmpeg exit ${code}`));
      resolve(frames);
    });
  });
}

async function getFrames(videoPath, filter, srcW, srcH, converter) {
  try {
    return await runFfmpeg(videoPath, filter, srcW, srcH, converter);
  } catch (err) {
    if (videoPath === VIDEO_PRIMARY) {
      console.warn(`  fallo con HEVC (${err.message}), reintento con H.264`);
      return runFfmpeg(VIDEO_FALLBACK, filter, srcW, srcH, converter);
    }
    throw err;
  }
}

async function writeAsset(frames, cols, rows, output, label) {
  const payload = JSON.stringify({ cols, rows, fps: FPS, frames });
  mkdirSync(new URL(`../public/ascii`, import.meta.url), { recursive: true });
  writeFileSync(output, payload);
  const outputKB = Buffer.byteLength(payload) / 1024;
  const perFrame = outputKB / frames.length;
  console.log(`OK   ${label} ${frames.length} frames (${cols}x${rows})`);
  console.log(`     → ${output} ${(outputKB / 1024).toFixed(1)}MB (${perFrame.toFixed(2)}KB/frame)`);
}

async function main() {
  const videoPath = VIDEO_PRIMARY;

  console.log(`Braille ${D_COLS}×${D_ROWS} (rejilla 2×4, boost ${BOOST}, THRESH ${THRESH})...`);
  const deskFrames = await getFrames(
    videoPath,
    `fps=${FPS},scale=${D_SRC_W}:${D_SRC_H},format=gray`,
    D_SRC_W,
    D_SRC_H,
    (f) => frameToBraille(f, D_COLS, D_ROWS, D_SRC_W, SUB_W, SUB_H)
  );
  await writeAsset(deskFrames, D_COLS, D_ROWS, OUTPUT_DESKTOP, "desktop");

  console.log(`Braille ${M_COLS}×${M_ROWS} (rejilla 2×4, boost ${BOOST}, THRESH ${THRESH})...`);
  const mobFrames = await getFrames(
    VIDEO_MOBILE,
    `fps=${FPS},scale=${M_SRC_W}:${M_SRC_H},format=gray`,
    M_SRC_W,
    M_SRC_H,
    (f) => frameToBraille(f, M_COLS, M_ROWS, M_SRC_W, M_SUB_W, M_SUB_H)
  );
  await writeAsset(mobFrames, M_COLS, M_ROWS, OUTPUT_MOBILE, "mobile");

  console.log(`Fuente: ${videoPath} / ${VIDEO_MOBILE}`);
  console.log(`  desktop → ${(statSync(OUTPUT_DESKTOP).size / 1024 / 1024).toFixed(1)}MB`);
  console.log(`  mobile  → ${(statSync(OUTPUT_MOBILE).size / 1024 / 1024).toFixed(1)}MB`);
}

main().catch((err) => {
  console.error(`ERROR ${err.message}`);
  process.exit(1);
});
