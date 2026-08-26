"use client";

import type { CSSProperties } from "react";
import type { XIconProps } from "./icons.types";

export default function HelixIcon({
  size = 16,
  color = "currentColor",
  title = "Helix",
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
      <path d="M6 3 q3 2.5 0 5 q-3 2.5 0 5 q3 2.5 0 5 q-3 2.5 0 5" />
      <path d="M18 3 q-3 2.5 0 5 q3 2.5 0 5 q-3 2.5 0 5 q3 2.5 0 5" />
    </svg>
  );
}
