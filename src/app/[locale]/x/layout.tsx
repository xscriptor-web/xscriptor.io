import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X - Dev Xscriptor",
  description: "Redirect to Xscriptor X repository.",
};

export default function XLayout({ children }: { children: React.ReactNode }) {
  return children;
}
