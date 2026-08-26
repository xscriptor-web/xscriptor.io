"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";

export default function TerminalFiltersIcon({
  size = 18,
  title = "Terminal",
  style,
  ...props
}: XIconProps) {
  const iconStyle: CSSProperties = {
    display: "inline-block",
    verticalAlign: "middle",
    ...style,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      style={iconStyle}
      {...props}
    >
      <rect x="32" y="64" width="448" height="384" rx="40" fill="#1e1e2e" />
      <path
        d="M32 104 a40 40 0 0 1 40 -40 h368 a40 40 0 0 1 40 40 v40 h-448 z"
        fill="#181825"
      />
      <circle cx="80" cy="104" r="12" fill="#f38ba8" />
      <circle cx="125" cy="104" r="12" fill="#f9e2af" />
      <circle cx="170" cy="104" r="12" fill="#a6e3a1" />
      <path
        d="M90 200 L140 250 L90 300"
        fill="none"
        stroke="#a6e3a1"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M200 200 L280 300 M280 200 L200 300"
        fill="none"
        stroke="#f38ba8"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M320 300 L380 300"
        fill="none"
        stroke="#89b4fa"
        strokeWidth="32"
        strokeLinecap="round"
      />
    </svg>
  );
}
