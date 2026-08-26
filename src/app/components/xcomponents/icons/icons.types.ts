import type { ComponentPropsWithoutRef } from "react";

export type XIconProps = Omit<ComponentPropsWithoutRef<"svg">, "color"> & {
  size?: number | string;
  color?: string;
  title?: string;
};
