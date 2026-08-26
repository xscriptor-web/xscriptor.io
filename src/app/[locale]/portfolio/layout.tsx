import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Dev Xscriptor",
  description: "Portfolio of Xscriptor — timeline of projects, tools, and themes across the ecosystem.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
