"use client";

import type { CSSProperties } from "react";
import type { XIconProps } from "./icons.types";

export default function ColorsIcon({
  size = 16,
  color = "currentColor",
  title = "Colors",
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
      <circle cx="8" cy="12" r="4.5" />
      <circle cx="12" cy="14.5" r="4.5" />
      <circle cx="15" cy="12" r="4.5" />
    </svg>
  );
}
