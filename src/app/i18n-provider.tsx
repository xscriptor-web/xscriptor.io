"use client";
import { createContext, useContext, ReactNode } from "react";

type Messages = Record<string, unknown>;
type Locale = "en" | "es" | "de" | "it" | "fr";

const I18nContext = createContext<{
  locale: Locale;
  messages: Messages;
} | null>(null);

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(I18nContext);
  return ctx?.locale ?? "en";
}

function resolvePath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object" && k in o) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

function interpolate(str: string, params?: Record<string, unknown>): string {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    const val = params[key];
    return val != null ? String(val) : `{${key}}`;
  });
}

export function useT(namespace?: string) {
  const ctx = useContext(I18nContext);

  const t = (key: string, params?: Record<string, unknown>): string => {
    if (!ctx) return key;
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const val = resolvePath(ctx.messages, fullKey);
    if (val == null) return fullKey;
    return interpolate(String(val), params);
  };

  (t as unknown as { raw: <T>(key: string) => T }).raw = <T = unknown>(
    key: string
  ): T => {
    if (!ctx) {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      return fullKey as unknown as T;
    }
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return resolvePath(ctx.messages, fullKey) as T;
  };

  return t as ((key: string, params?: Record<string, unknown>) => string) & {
    raw: <T>(key: string) => T;
  };
}
