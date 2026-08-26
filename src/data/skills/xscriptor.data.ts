export const LIGHT_SWATCHES = [
  { hex: "#ffffff", name: "Paper", role: "Main page surface (--background)" },
  { hex: "#171717", name: "Ink", role: "Primary readable text (--foreground)" },
  { hex: "#4328a8", name: "Violet", role: "Links, accents, active states (--primary)" },
  { hex: "#6b7280", name: "Stone", role: "Secondary copy, muted text (--text-muted)" },
  { hex: "#e5e7eb", name: "Border", role: "Borders and separators (--border)" },
  { hex: "#fc618d", name: "Accent", role: "Brand accent (X theme color1)" },
  { hex: "#7bd88f", name: "Mint", role: "Supporting accent (X theme color2)" },
  { hex: "#948ae3", name: "Lilac", role: "Secondary accent (X theme color5)" },
];

export const DARK_SWATCHES = [
  { hex: "#0a0a0a", name: "Night", role: "Main page surface (--background)" },
  { hex: "#ededed", name: "Ivory", role: "Primary readable text (--foreground)" },
  { hex: "#fbbf24", name: "Gold", role: "Links, accents, active states (--primary)" },
  { hex: "#9ca3af", name: "Zinc", role: "Secondary copy, muted text (--text-muted)" },
  { hex: "#27272a", name: "Umber", role: "Borders and separators (--border dark)" },
  { hex: "#fc618d", name: "Accent", role: "Brand accent (X theme color1)" },
  { hex: "#7bd88f", name: "Mint", role: "Supporting accent (X theme color2)" },
  { hex: "#fce566", name: "Gold", role: "Warning accent (X theme color3)" },
];

export const FONT_WEIGHTS = [
  { weight: 300, label: "Light", css: "font-weight: 300" },
  { weight: 400, label: "Regular", css: "font-weight: 400" },
  { weight: 500, label: "Medium", css: "font-weight: 500" },
  { weight: 700, label: "Bold", css: "font-weight: 700" },
];

export const LINE_HEIGHTS = [
  { value: "2.0", label: "Poetry", usage: "Verse lines, epigraphs, stanza breaks" },
  { value: "1.8", label: "Prose", usage: "Body paragraphs, essays, long-form reading" },
  { value: "1.4", label: "Compact", usage: "Card excerpts, metadata, descriptions" },
  { value: "1.1", label: "Title", usage: "Chapter headings, section titles, display text" },
];

export const BORDER_STYLES = [
  { style: "1px solid color-mix(in srgb, var(--border) 50%, transparent)", label: "Delicate", desc: "Standard card outlines, section dividers — a whisper of boundary that barely touches the eye before yielding to content." },
  { style: "1px solid color-mix(in srgb, var(--primary) 50%, transparent)", label: "Accent", desc: "Active states, selected items, focused inputs — the primary hue bleeding softly into the edge to signal attention without alarm." },
  { style: "1px dashed color-mix(in srgb, var(--border) 60%, transparent)", label: "Annotation", desc: "Editorial notes, marginalia containers, draft indicators — the broken line suggests impermanence and the provisional nature of annotation." },
  { style: "2px double color-mix(in srgb, var(--foreground) 20%, transparent)", label: "Epigraph", desc: "Pull quotes, epigraphs, chapter openers — a double line that frames borrowed words with the dignity they deserve." },
];

export const RADII = [
  { value: "0", label: "Sharp", usage: "Literary blocks, verse containers, code excerpts" },
  { value: "4px", label: "Soft", usage: "Cards, buttons, input fields, info panels" },
  { value: "8px", label: "Rounded", usage: "Media embeds, images, profile portraits" },
  { value: "999px", label: "Full", usage: "Author avatars, language badges, tag pills" },
];

export const SPACING_LEVELS = [
  { name: "Verse", px: 4, rem: "0.25rem", desc: "Inline gaps between badges, close punctuation, nested ornament" },
  { name: "Stanza", px: 12, rem: "0.75rem", desc: "Card padding, button groups, adjacent metadata fields" },
  { name: "Chapter", px: 24, rem: "1.5rem", desc: "Section margins, grid gutters, hero padding" },
  { name: "Section", px: 48, rem: "3rem", desc: "Major page divisions, part breaks, full-width banners" },
];

export const CONTENT_TYPES = [
  { name: "Blog", icon: "B", desc: "Long-form essays, literary criticism, personal reflections with categories, dates, and reading-time estimates", components: "XBlogPost, XBlogGrid, XBlogSidebar" },
  { name: "Books", icon: "Bk", desc: "Full book listings with cover art, metadata panels, language availability, and reader components", components: "XBookCard, XBookReader, XBookShelf" },
  { name: "Poetry", icon: "P", desc: "Verse collections with stanza-aware pagination, line-numbering, and bilingual side-by-side rendering", components: "XPoemViewer, XStanzaNav, XPoemIndex" },
  { name: "Art", icon: "A", desc: "Visual portfolio with masonry galleries, lightbox previews, medium metadata, and exhibition chronology", components: "XArtGrid, XLightbox, XExhibitionTimeline" },
];

export const I18N_LOCALES = [
  { code: "en", name: "English", flag: "GB", desc: "Primary authoring language. All prose, essays, and poetry composed first in English before translation." },
  { code: "es", name: "Spanish", flag: "ES", desc: "Native literary language. Rich tradition of magical realism and lyrical prose permeates the Spanish corpus." },
  { code: "de", name: "German", flag: "DE", desc: "Secondary translation language. Philosophical precision and compound-word poetry explored in the German editions." },
];
