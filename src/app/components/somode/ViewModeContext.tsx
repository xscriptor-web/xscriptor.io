"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";

export type ViewMode = "classic" | "simple";

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
};

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

const STORAGE_KEY = "devxscriptor-view-mode";

function getStoredMode(): ViewMode | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "classic" || saved === "simple") return saved;
  } catch {}
  return null;
}

function saveStoredMode(mode: ViewMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {}
}

function getModeFromUrl(): ViewMode {
  if (typeof window === "undefined") return "simple";
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  if (mode === "classic" || mode === "simple") return mode;
  return getStoredMode() ?? "simple";
}

function updateUrl(mode: ViewMode) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  window.history.replaceState({}, "", url.toString());
}

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("simple");
  const initialSync = useRef(true);

  useEffect(() => {
    const urlMode = getModeFromUrl();
    setMode(urlMode);
    saveStoredMode(urlMode);
  }, []);

  useEffect(() => {
    if (initialSync.current) {
      initialSync.current = false;
      return;
    }
    updateUrl(mode);
    saveStoredMode(mode);
  }, [mode]);

  const setModeWithUrl = useCallback((newMode: ViewMode) => {
    setMode(newMode);
  }, []);

  return (
    <ViewModeContext.Provider value={{ mode, setMode: setModeWithUrl }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used within ViewModeProvider");
  return ctx;
}
