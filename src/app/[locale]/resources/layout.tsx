import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Dev Xscriptor",
  description: "Xscriptor resources — terminal themes, VS Code themes, IDE extensions, Obsidian themes, and more.",
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
