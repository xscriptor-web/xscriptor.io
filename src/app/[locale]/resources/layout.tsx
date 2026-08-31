import type { Metadata } from "next";

const localeMeta: Record<string, { title: string; description: string }> = {
  en: {
    title: "Development lab - Dev Xscriptor",
    description:
      "Xscriptor resources — the organizations behind the ecosystem: themes, editors, IDEs, CLI tools, web, AI, and security.",
  },
  es: {
    title: "Laboratorio de desarrollo - Dev Xscriptor",
    description:
      "Recursos de Xscriptor — las organizaciones detrás del ecosistema: temas, editores, IDEs, herramientas CLI, web, IA y seguridad.",
  },
  de: {
    title: "Entwicklungs-labor - Dev Xscriptor",
    description:
      "Xscriptor-Ressourcen — die Organisationen hinter dem Ökosystem: Themes, Editoren, IDEs, CLI-Tools, Web, KI und Sicherheit.",
  },
  it: {
    title: "Laboratorio di sviluppo - Dev Xscriptor",
    description:
      "Risorse Xscriptor — le organizzazioni dietro l'ecosistema: temi, editor, IDE, strumenti CLI, web, AI e sicurezza.",
  },
  fr: {
    title: "Laboratoire de développement - Dev Xscriptor",
    description:
      "Ressources Xscriptor — les organisations derrière l'écosystème : thèmes, éditeurs, IDE, outils CLI, web, IA et sécurité.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMeta[locale] ?? localeMeta.en;
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
