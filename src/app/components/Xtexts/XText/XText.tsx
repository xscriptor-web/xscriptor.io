"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { XTextDecrypt } from "../XTextDecrypt";

export type XTextVariant = "body" | "description" | "muted" | "label" | "caption";
export type XTextSize = "sm" | "md" | "lg";
export type XTextAlign = "left" | "center" | "right" | "inherit";

export type XTextSegment = {
  text: string;
  em?: string;
  href?: string;
  strong?: boolean;
};

export type XTextLink = {
  href: string;
  hover?: CSSProperties;
  underline?: "none" | "solid" | "dashed";
};

export type XTextProps = {
  children?: ReactNode;
  em?: string;
  italic?: boolean;
  as?: "p" | "span" | "em" | "div";
  variant?: XTextVariant;
  size?: XTextSize;
  align?: XTextAlign;
  color?: string;
  segments?: XTextSegment[];
  link?: XTextLink;
  ariaLabel?: string;
  style?: CSSProperties;
  className?: string;

  // Decrypted mode
  decrypted?: boolean;
  text?: string;
  animateOn?: "view" | "hover";
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  encryptedClassName?: string;
  parentClassName?: string;
};

const VARIANT_STYLES: Record<XTextVariant, CSSProperties> = {
  body: {
    color: "inherit",
    maxWidth: "48rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  description: {
    color: "var(--text-muted)",
    fontSize: "1rem",
    lineHeight: "1.8",
    maxWidth: "68ch",
  },
  muted: {
    color: "var(--text-muted)",
    fontSize: "0.875rem",
  },
  label: {
    color: "inherit",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  caption: {
    color: "var(--text-muted)",
    fontSize: "0.75rem",
  },
};

const SIZE_STYLES: Record<XTextSize, string> = {
  sm: "clamp(0.75rem, 1.5vw, 0.875rem)",
  md: "clamp(1rem, 1.8vw, 1.15rem)",
  lg: "clamp(1.15rem, 2.5vw, 1.3rem)",
};

export default function XText({
  children,
  em,
  italic = false,
  as: Tag = "p",
  variant = "body",
  size,
  align = "inherit",
  color,
  segments,
  link,
  ariaLabel,
  style,
  className = "",

  decrypted = false,
  text,
  animateOn = "hover",
  speed,
  maxIterations,
  sequential,
  revealDirection,
  useOriginalCharsOnly,
  characters,
  encryptedClassName = "",
  parentClassName = "",
}: XTextProps) {
  const [hovered, setHovered] = useState(false);
  const [segHovered, setSegHovered] = useState<number | null>(null);

  const variantStyle = VARIANT_STYLES[variant];

  const tagStyle: CSSProperties = {
    ...variantStyle,
    ...style,
    ...(size && { fontSize: SIZE_STYLES[size] }),
    textAlign: align,
    color: color ?? variantStyle.color ?? "inherit",
    transition: "color 0.3s ease",
    ...(hovered && link?.hover ? link.hover : {}),
  };

  const commonProps = {
    className,
    style: tagStyle,
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
  };

  // --- Decrypted mode ---
  if (decrypted) {
    const decryptEl = (
      <XTextDecrypt
        text={text ?? (typeof children === "string" ? children : "")}
        animateOn={animateOn}
        speed={speed}
        maxIterations={maxIterations}
        sequential={sequential}
        revealDirection={revealDirection}
        useOriginalCharsOnly={useOriginalCharsOnly}
        characters={characters}
        encryptedClassName={encryptedClassName}
        parentClassName={parentClassName}
      />
    );
    return (
      <Tag {...commonProps}>
        {italic ? <em>{decryptEl}</em> : decryptEl}
        {em && <em style={{ fontStyle: "italic", color: "inherit" }}> {em}</em>}
      </Tag>
    );
  }

  // --- Segments mode ---
  if (segments) {
    const segContent = segments.map((seg, i) => {
      const segHov = segHovered === i;
      let inner = (
        <>
          {seg.text}
          {seg.em && <em style={{ fontStyle: "italic", color: "inherit" }}>{seg.em}</em>}
        </>
      );
      if (seg.strong) inner = <strong>{inner}</strong>;
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
          >
            {inner}
          </a>
        );
      }
      return <span key={i}>{inner}</span>;
    });

    const segWrapped = italic ? <em>{segContent}</em> : segContent;

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
          >
            {segWrapped}
          </a>
        </Tag>
      );
    }

    return <Tag {...commonProps}>{segWrapped}</Tag>;
  }

  // --- Link mode ---
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
        >
          {italic ? <em>{children}</em> : children}
          {em && <em style={{ fontStyle: "italic", color: "inherit" }}> {em}</em>}
        </a>
      </Tag>
    );
  }

  // --- Simple mode ---
  return (
    <Tag {...commonProps}>
      {italic ? <em>{children}</em> : children}
      {em && <em style={{ fontStyle: "italic", color: "inherit" }}> {em}</em>}
    </Tag>
  );
}
