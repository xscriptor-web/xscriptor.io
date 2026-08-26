"use client";

import type { CSSProperties } from "react";
import type { XIconProps } from "./icons.types";

export default function HyprlandIcon({
  size = 16,
  color = "currentColor",
  title = "Hyprland",
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
      <rect x="3" y="4" width="18" height="15" rx="2" />
      <path d="M8 9l3.5 3.5L8 16" />
      <path d="M13 16h3" />
    </svg>
  );
}
