"use client";

import { Lenis } from "lenis/react";
import type { ReactNode } from "react";
import type { LenisOptions } from "lenis";

export default function SmoothScrollProvider({
  children,
  enabled,
  options,
}: {
  children: ReactNode;
  enabled: boolean;
  options?: Partial<LenisOptions>;
}) {
  if (!enabled) return <>{children}</>;

  return (
    <Lenis
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
        ...options,
      }}
    >
      {children}
    </Lenis>
  );
}
