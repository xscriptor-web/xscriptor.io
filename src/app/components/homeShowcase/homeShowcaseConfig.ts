// ============================================================================
//  HOME SHOWCASE — configuración
//  ---------------------------------------------------------------------------
//  Configuración no textual de la home (modo classic).
//  Los textos (hero y capítulos) viven en messages/*.json → namespace
//  "HomeShowcase", traducido a en / es / de / it / fr.
//
//  - ASCII_VIDEO:  el fondo desde la sección 2 es una animación ASCII
//                  generada a partir del vídeo original (scripts/ascii-video.mjs):
//                  498 cuadros de 200×65 caracteres en bloques sólidos de
//                  cuadrante (▘▝▀▖▌▞▛▗▚▐▜▄▙▟█) con boost de brillo (^0.3) para
//                  que el material oscuro se aprecie con detalle
//                  que avanza y retrocede en sincronía con el scroll (scrub)
//  - SNAP_TYPE:    comportamiento del scroll (solo escritorio):
//                    "lock"       -> salta de sección en sección (recomendado)
//                    "mandatory"  -> encaja en la sección más cercana
//                    "proximity"  -> encaje suave
//
//  MÓVIL (max-width: 767px): la home usa un flujo distinto (HomeShowcaseMobile):
//  - scroll natural en CSS (sin Snap, sin secciones forzadas)
//  - el vídeo vertical (videos/homemobile-web.mp4) se convierte al mismo tipo de
//    braille ASCII que el escritorio y se reproduce en bucle como fondo,
//    independiente del scroll (AsciiMobile)
//  - aparece a partir de la segunda sección: la hero cubre el fondo con fondo opaco
//
//  Para regenerar la animación ASCII de escritorio tras cambiar el vídeo:
//    1. Sustituye public/images/home/homevideo.mp4
//    2. Ejecuta: node scripts/ascii-video.mjs
//
//  NOTA: los archivos homevideo.mp4 / homevideo-fallback.mp4 solo se usan
//  como fuente de la conversión; el navegador carga únicamente el JSON.
//  El vídeo móvil public/videos/homemobile-web.mp4 también es solo fuente:
//  el navegador carga public/ascii/homemobile.json.
// ============================================================================

export type SnapType = "lock" | "mandatory" | "proximity";

export const SNAP_TYPE: SnapType = "lock";

export const ASCII_VIDEO = {
  url: "/ascii/homevideo.json",
  cols: 220,
  rows: 70,
  fps: 30,
};

export const ASCII_MOBILE_VIDEO = {
  url: "/ascii/homemobile.json",
  cols: 99,
  rows: 88,
  fps: 30,
};

export const HOME_VIDEO = {
  primary: "/images/home/homevideo.mp4",
  fallback: "/images/home/homevideo-fallback.mp4",
  fps: 30,
};
