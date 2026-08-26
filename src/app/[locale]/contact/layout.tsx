import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Dev Xscriptor",
  description: "Get in touch with Xscriptor — available via email, Telegram, WhatsApp, Instagram, and GitHub.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
