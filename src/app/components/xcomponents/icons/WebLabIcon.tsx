"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";

export default function WebLabIcon({
  size = 16,
  color = "currentColor",
  title = "Web Lab",
  style,
  ...props
}: XIconProps) {
  const iconStyle: CSSProperties = {
    color,
    display: "inline-block",
    verticalAlign: "middle",
    ...style,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      role="img"
      aria-label={title}
      style={iconStyle}
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="8" cy="8" rx="3" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 8h13" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
