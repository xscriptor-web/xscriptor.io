"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

export type XTitleAlign = "left" | "center" | "right";
export type XTitleLevel = "h1" | "h2" | "h3";
export type XTitleUnderline = "none" | "solid" | "dashed";
export type XTitleSize = "sm" | "md" | "lg" | "xl";
export type XTitleVariant = "page" | "hero" | "section" | "subsection" | "display" | "subtitle" | "label";

type XTitleLine = {
  text: string;
  em?: string;
};

export type TitleSegment = {
  text: string;
  em?: string;
  href?: string;
};

export type XTitleLink = {
  href: string;
  hover?: CSSProperties;
  underline?: "none" | "solid" | "dashed";
};

export type XTitleProps = {
  children?: ReactNode;
  em?: string;
  lines?: XTitleLine[];
  segments?: TitleSegment[];
  as?: XTitleLevel;
  align?: XTitleAlign;
  underline?: XTitleUnderline;
  size?: XTitleSize;
  variant?: XTitleVariant;
  color?: string;
  link?: XTitleLink;
  ariaLabel?: string;
  style?: CSSProperties;
  className?: string;
};

const ALIGN_MAP: Record<XTitleAlign, string> = {
  left: "0",
  center: "0 auto",
  right: "0 0 0 auto",
};

const SIZE_STYLES: Record<XTitleSize, string> = {
  sm: "clamp(1.15rem, 2.5vw, 1.6rem)",
  md: "clamp(1.4rem, 3vw, 2rem)",
  lg: "clamp(1.6rem, 4vw, 2.6rem)",
  xl: "clamp(2rem, 5vw, 3.2rem)",
};

const VARIANT_STYLES: Record<XTitleVariant, CSSProperties> = {
  page: {},
  hero: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 800,
    letterSpacing: "-0.01em",
  },
  section: {
    fontSize: "clamp(1.3rem, 2.5vw, 1.5rem)",
    fontWeight: 700,
  },
  subsection: {
    fontSize: "clamp(1.05rem, 2vw, 1.15rem)",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
    fontWeight: 600,
  },
  label: {
    fontSize: "clamp(0.78rem, 1.5vw, 0.85rem)",
    fontWeight: 600,
  },
  display: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 900,
    color: "var(--primary)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
};

export default function XTitle({
  children,
  em,
  lines,
  segments,
  as: Tag = "h1",
  align = "center",
  underline = "none",
  size,
  variant,
  color,
  link,
  ariaLabel,
  style,
  className = "",
}: XTitleProps) {
  const [hovered, setHovered] = useState(false);
  const [segHovered, setSegHovered] = useState<number | null>(null);
  const variantStyle = variant ? VARIANT_STYLES[variant] : {};
  const underlineStyle =
    underline === "none"
      ? undefined
      : `0.5px ${underline === "dashed" ? "dashed" : "solid"} var(--primary)`;

  const content = segments ? (
    segments.map((seg, i) => {
      const segHov = segHovered === i;
      const inner = <>{seg.text}{seg.em ? <em style={{ fontStyle: "italic", color: "inherit" }}>{seg.em}</em> : null}</>;
      if (seg.href) {
        return (
          <a
            key={i}
            href={seg.href}
            style={{
              color: "inherit",
              textDecorationLine: "underline",
              textDecorationStyle: "dashed",
              textDecorationColor: segHov ? "var(--primary)" : "transparent",
              transform: segHov ? "scale(1.03)" : "scale(1)",
              transition: "color 0.25s ease, text-decoration-color 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={() => setSegHovered(i)}
            onMouseLeave={() => setSegHovered(null)}
          >{inner}</a>
        );
      }
      return <span key={i}>{inner}</span>;
    })
  ) : lines ? (
    lines.map((line, i) => (
      <span key={i} className="inline lg:block">
        {line.text}{line.em ? <> <em style={{ fontStyle: "italic", color: "inherit" }}>{line.em} </em></> : null}
      </span>
    ))
  ) : (
    <span className="inline lg:block">
      {children}{em ? <> <em style={{ fontStyle: "italic", color: "inherit" }}>{em} </em></> : null}
    </span>
  );

  const tagStyle: CSSProperties = {
    ...variantStyle,
    ...style,
    ...(hovered ? link?.hover : {}),
    fontSize: size ? SIZE_STYLES[size] : variantStyle.fontSize,
    marginLeft: ALIGN_MAP[align],
    marginRight: ALIGN_MAP[align],
    textAlign: align,
    borderBottom: underlineStyle,
    paddingBottom: underline !== "none" ? "0.4rem" : undefined,
    color: color ?? variantStyle.color,
    width: "100%",
  };

  const commonProps = {
    className,
    style: tagStyle,
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
  };

  if (link) {
    const linkUnderline = link.underline ?? "none";
    return (
      <Tag {...commonProps}>
        <a
          href={link.href}
          style={{
            textDecorationLine: hovered && linkUnderline !== "none" ? "underline" : "none",
            textDecorationStyle: linkUnderline === "dashed" ? "dashed" : "solid",
            textDecorationColor: hovered ? "var(--primary)" : "transparent",
            color: "inherit",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "color 0.25s ease, text-decoration-color 0.25s ease, transform 0.25s ease",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
        >
          {content}
        </a>
      </Tag>
    );
  }

  return (
    <Tag {...commonProps}>
      {content}
    </Tag>
  );
}
