import type { ComponentType } from "react";

import type { XIconProps } from "@/app/components/xcomponents/icons";

export type ResourceRepo = {
  name: string;
  description: string;
  href: string;
  icon?: ComponentType<XIconProps>;
  iconProps?: XIconProps;
};
