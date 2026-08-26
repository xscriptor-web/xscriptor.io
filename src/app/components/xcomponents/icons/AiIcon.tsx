"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";

export default function AiIcon({
  size = 16,
  color = "currentColor",
  title = "AI",
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
      <path
        d="M8 1C4.5 1 2 3 1.5 5.5C0.5 6 0 7.5 0 9C0 10.5 1 12 2.5 12.5C3 14.5 5.5 16 9 16C12 16 14.5 14.5 15 12.5C16 12 16.5 10.5 16.5 9C16.5 7.5 16 6 15 5.5C14.5 3 12 1 9 1H8Z"
        fill="currentColor"
        opacity="0.3"
      />
      <circle cx="5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="4.5" r="1.5" fill="currentColor" />
      <circle cx="11" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="11.5" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.8" />
      <line x1="6.5" y1="6.5" x2="7.5" y2="5.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="9.5" y1="6.5" x2="8.5" y2="5.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="6.5" y1="9.5" x2="7.5" y2="10.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="9.5" y1="9.5" x2="8.5" y2="10.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="6" y1="8" x2="6.5" y2="7" stroke="currentColor" strokeWidth="0.6" />
      <line x1="10" y1="8" x2="9.5" y2="7" stroke="currentColor" strokeWidth="0.6" />
      <line x1="6" y1="8" x2="6.5" y2="9" stroke="currentColor" strokeWidth="0.6" />
      <line x1="10" y1="8" x2="9.5" y2="9" stroke="currentColor" strokeWidth="0.6" />
      <line x1="5" y1="9.5" x2="6.5" y2="10.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="5" y1="6.5" x2="6.5" y2="5.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="11" y1="6.5" x2="9.5" y2="5.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="11" y1="9.5" x2="9.5" y2="10.5" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
