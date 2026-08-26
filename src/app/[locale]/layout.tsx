import type { Metadata } from "next";
import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";
import deMessages from "../../../messages/de.json";
import itMessages from "../../../messages/it.json";
import frMessages from "../../../messages/fr.json";
import { I18nProvider } from "@/app/i18n-provider";
import LocaleLayoutClient from "./LocaleLayoutClient";

const allMessages = { en: enMessages, es: esMessages, de: deMessages, it: itMessages, fr: frMessages } as const;

const localeTitles: Record<string, string> = {
  en: "Dev - Xscriptor",
  es: "Dev - Xscriptor",
  de: "Dev - Xscriptor",
  it: "Dev - Xscriptor",
  fr: "Dev - Xscriptor",
};

const localeDescriptions: Record<string, string> = {
  en: "Development portfolio of Xscriptor — themes, tools, AI skills, and open-source projects for VS Code, JetBrains, Obsidian, terminal, and web.",
  es: "Portafolio de desarrollo de Xscriptor — temas, herramientas, habilidades de IA y proyectos de código abierto para VS Code, JetBrains, Obsidian, terminal y web.",
  de: "Entwicklungsportfolio von Xscriptor — Themen, Werkzeuge, KI-Fähigkeiten und Open-Source-Projekte für VS Code, JetBrains, Obsidian, Terminal und Web.",
  it: "Portfolio di sviluppo di Xscriptor — temi, strumenti, competenze AI e progetti open source per VS Code, JetBrains, Obsidian, terminale e web.",
  fr: "Portfolio de développement de Xscriptor — thèmes, outils, compétences IA et projets open source pour VS Code, JetBrains, Obsidian, terminal et web.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: localeTitles[locale] ?? "Dev - Xscriptor",
    description: localeDescriptions[locale] ?? localeDescriptions.en,
    openGraph: {
      title: localeTitles[locale] ?? "Dev - Xscriptor",
      description: localeDescriptions[locale] ?? localeDescriptions.en,
    },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es", "de", "it", "fr"].map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const localeKey = locale as "en" | "es" | "de" | "it" | "fr";
  const messages = allMessages[localeKey] ?? allMessages.en;

  return (
    <I18nProvider locale={localeKey} messages={messages}>
      <LocaleLayoutClient>{children}</LocaleLayoutClient>
    </I18nProvider>
  );
}
