"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/app/i18n-provider";
import { useViewMode } from "@/app/components/somode/ViewModeContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SimpleHome, SimplePageView } from "@/app/components/somode";
import ClassicControls from "@/app/components/classiccontrols/ClassicControls";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import SplashScreen from "@/app/components/SplashScreen";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

export default function LocaleLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [splashDone, setSplashDone] = useState(false);
  const { mode } = useViewMode();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const shown = sessionStorage.getItem("splashShown");
    if (shown) setSplashDone(true);
  }, []);

  const handleSplashDone = useCallback(() => {
    setSplashDone(true);
    try { sessionStorage.setItem("splashShown", "1"); } catch {}
  }, []);

  const cleanPath = pathname.replace(`/${locale}`, "").replace(/\/$/, "") || "/";
  const isHome = cleanPath === "/";

  if (mode === "simple") {
    if (isHome) {
      return (
        <SmoothScrollProvider enabled>
          {!splashDone && <SplashScreen onDone={handleSplashDone} />}
          {splashDone && <SimpleHome />}
        </SmoothScrollProvider>
      );
    }
    return (
      <SmoothScrollProvider enabled>
        <SimplePageView />
      </SmoothScrollProvider>
    );
  }

  return (
    <SmoothScrollProvider
      enabled
      options={isMobile && isHome ? { syncTouch: true, touchMultiplier: 0.9, lerp: 0.12 } : undefined}
    >
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}
      {isHome ? (
        children
      ) : (
        <main id="main-content" className="pb-28">{children}</main>
      )}
      <ClassicControls />
    </SmoothScrollProvider>
  );
}
