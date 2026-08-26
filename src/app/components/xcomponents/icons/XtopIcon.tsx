"use client";

import type { CSSProperties } from "react";
import type { XIconProps } from "./icons.types";

export default function XtopIcon({
  size = 16,
  color = "currentColor",
  title = "Xtop",
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
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      style={iconStyle}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M6 16v-3.5" />
      <path d="M10 16v-6" />
      <path d="M14 16v-4.5" />
      <path d="M18 16v-7" />
    </svg>
  );
}
