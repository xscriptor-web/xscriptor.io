"use client";

import type { CSSProperties } from "react";

import type { XIconProps } from "./icons.types";

export default function OpenCodeIcon({
  size = 16,
  color = "currentColor",
  title = "OpenCode",
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
        d="M4.5 3L0 8L4.5 13L5.5 12L2 8L5.5 4L4.5 3ZM11.5 3L10.5 4L14 8L10.5 12L11.5 13L16 8L11.5 3ZM7 2L9 14L10 14L8 2L7 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
