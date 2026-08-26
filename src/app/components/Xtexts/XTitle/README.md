# Xtexts — Title system

Sistema unificado de títulos. Usa las variables CSS del tema (`var(--foreground)`, `var(--primary)`, etc.) por defecto.

## XTitle

```tsx
import { XTitle } from "@/app/components/Xtexts";
```

### Modo simple (una línea)

```tsx
<XTitle em="Lab">Resources</XTitle>
{/* → <h1>Resources <em>Lab</em></h1> */}

<XTitle>Contact</XTitle>
{/* → <h1>Contact</h1> */}

<XTitle as="h2" variant="section">{t("featuresTitle")}</XTitle>
{/* → <h2>...</h2> */}

<XTitle as="h3" variant="label">Install manually</XTitle>
{/* → <h3>...</h3> */}
```

### Modo multi-línea

```tsx
<XTitle lines={[
  { text: "Discover the", em: "depth" },
  { text: "and", em: "finesse" },
  { text: "of our work" },
]} />
```

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Texto principal (modo simple) |
| `em` | `string` | — | Porción en cursiva |
| `lines` | `{ text, em? }[]` | — | Array para multi-línea |
| `segments` | `TitleSegment[]` | — | Segmentos inline con `href` opcional por cada uno |
| `as` | `"h1" \| "h2" \| "h3"` | `"h1"` | Nivel semántico |
| `variant` | `"page" \| "hero" \| "section" \| "subsection" \| "display" \| "subtitle" \| "label"` | — | Variante de estilo |
| `align` | `"left" \| "center" \| "right"` | `"center"` | Alineación |
| `underline` | `"none" \| "solid" \| "dashed"` | `"none"` | Subrayado (borderBottom del Tag) |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | — | Tamaño (sobrescribe variant) |
| `color` | `string` | — | Color CSS. Si no se pasa, usa el del variant o el del tema |
| `link` | `XTitleLink` | — | Envuelve todo en `<a>`. `underline: "dashed"` para subrayado discontinuo en hover |
| `ariaLabel` | `string` | — | `aria-label` en el Tag y en el `<a>` si hay link |
| `style` | `CSSProperties` | — | Estilos inline adicionales |
| `className` | `string` | `""` | Clases adicionales |

### Variants

| Variant | Uso típico | fontSize | weight |
|---------|-----------|----------|--------|
| `page` | h1 de página estándar | global h1 | 300 |
| `hero` | Skills / landing pages | `clamp(2.5rem, 6vw, 4.5rem)` | 800 |
| `section` | h2 de sección principal | `clamp(1.3rem, 2.5vw, 1.5rem)` | 700 |
| `subsection` | h2 de subsección | `clamp(1.05rem, 2vw, 1.15rem)` | 600 |
| `display` | h1 uppercase primary | `clamp(2.5rem, 6vw, 4.5rem)` | 900 |
| `subtitle` | h3 subtítulo | `clamp(0.9rem, 1.8vw, 1rem)` | 600 |
| `label` | h3 etiqueta pequeña | `clamp(0.78rem, 1.5vw, 0.85rem)` | 600 |

### Enlace completo (link prop)

```tsx
<XTitle as="h2" link={{ href: "/page" }}>Title completo como enlace</XTitle>

<XTitle as="h2" link={{ href: "/page", underline: "dashed", hover: { color: "var(--primary)" } }}>
  Subrayado dashed solo en hover
</XTitle>
```

### Enlace parcial (segments)

```tsx
<XTitle as="h2" variant="subsection" size="md" segments={[
  { text: "Solo esto es link", href: "/page" },
  { text: " — y esto texto plano" },
]} />
```

### Ejemplos con color

```tsx
<XTitle color="#ff0000" em="Lab">Resources</XTitle>
<XTitle as="h2" variant="section" color="var(--accent)">{t("title")}</XTitle>
<XTitle>Default — usa el color del CSS global</XTitle>
```
