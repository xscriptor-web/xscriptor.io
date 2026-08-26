"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";

export default function JetBrainsIcon({
  size = 16,
  color = "currentColor",
  title = "JetBrains",
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
        d="M2 2H14V14H2V2ZM3 3V13H13V3H3ZM5.5 10.5H9.5V11.5H5.5V10.5ZM5.5 5H8.5C8.776 5 9 5.224 9 5.5V7.5C9 7.776 8.776 8 8.5 8H5.5V5ZM6.5 6V7H8V6H6.5ZM11.5 5H10.5V11H11.5V5Z"
        fill="currentColor"
      />
      <g transform="translate(0 0) scale(1 1)" fill="currentColor">
        <path d="M11 11 L12 11 L15 14 L14 14 Z" />
        <path d="M14 11 L15 11 L12 14 L11 14 Z" />
      </g>
    </svg>
  );
}
