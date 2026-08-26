export const LIGHT_SWATCHES = [
  { hex: "#FAFAFA", name: "Background", role: "Main page surface" },
  { hex: "#1A1A2E", name: "Foreground", role: "Primary readable text" },
  { hex: "#CC2233", name: "Primary", role: "Active states, scan alerts" },
  { hex: "#8E8E9A", name: "Text Muted", role: "Secondary copy" },
  { hex: "#D4D4DC", name: "Border", role: "Separators, outlines" },
  { hex: "#F0F0F5", name: "Card BG", role: "Surface blending helper" },
];

export const DARK_SWATCHES = [
  { hex: "#0A0A14", name: "Background", role: "Main page surface" },
  { hex: "#E8E8F0", name: "Foreground", role: "Primary readable text" },
  { hex: "#FF3355", name: "Primary", role: "Active states, scan alerts" },
  { hex: "#6B6B7B", name: "Text Muted", role: "Secondary copy" },
  { hex: "#1E1E30", name: "Border", role: "Separators, outlines" },
  { hex: "#12121E", name: "Card BG", role: "Surface blending helper" },
];

export const SEVERITY_HEX: Record<string, { hex: string; cvssRange: string; desc: string }> = {
  critical: { hex: "#FF2222", cvssRange: "9.0-10.0", desc: "Exploitation likely, immediate patching required" },
  high: { hex: "#FF8800", cvssRange: "7.0-8.9", desc: "Exploitation feasible, urgent review needed" },
  medium: { hex: "#FFCC00", cvssRange: "4.0-6.9", desc: "Exploitation possible under specific conditions" },
  low: { hex: "#44BB44", cvssRange: "0.1-3.9", desc: "Limited impact, schedule for next cycle" },
  info: { hex: "#4488FF", cvssRange: "0.0", desc: "Informational, no direct security impact" },
};

export const FONT_WEIGHTS = [
  { weight: 300, label: "Light", css: "font-weight: 300" },
  { weight: 400, label: "Regular", css: "font-weight: 400" },
  { weight: 500, label: "Medium", css: "font-weight: 500" },
  { weight: 700, label: "Bold", css: "font-weight: 700" },
];

export const LINE_HEIGHTS = [
  { value: "1.2", label: "compact", usage: "Section headers, metric values, stat displays" },
  { value: "1.4", label: "data", usage: "Table cells, finding descriptions, scan results" },
  { value: "1.6", label: "code", usage: "Terminal output, payload previews, config blocks" },
  { value: "1.0", label: "label", usage: "Badges, tags, severity markers, status pills" },
];

export const SPACING_LEVELS = [
  { name: "xs", px: 4, rem: "0.25rem", usage: "Inline gaps between badges, icon spacing" },
  { name: "sm", px: 8, rem: "0.5rem", usage: "Button groups, field-label adjacency" },
  { name: "md", px: 16, rem: "1rem", usage: "Card padding, grid gutters between sections" },
  { name: "lg", px: 32, rem: "2rem", usage: "Section margins, hero padding, modal interiors" },
];

export const API_ENDPOINTS = [
  { method: "POST", path: "/api/scan/start", type: "REST", desc: "Initiate a new security scan against a target domain" },
  { method: "GET", path: "/api/scan/{id}/status", type: "REST", desc: "Retrieve current scan status and progress percentage" },
  { method: "GET", path: "/api/scan/{id}/findings", type: "REST", desc: "List all findings for a completed scan with severity filters" },
  { method: "DELETE", path: "/api/scan/{id}", type: "REST", desc: "Cancel a running scan or delete a completed scan record" },
  { method: "WS", path: "/ws/scan/{id}/live", type: "WebSocket", desc: "Real-time stream of scan progress events and new findings" },
  { method: "WS", path: "/ws/dashboard/stats", type: "WebSocket", desc: "Live dashboard statistics: active scans, queue depth, rate" },
];
