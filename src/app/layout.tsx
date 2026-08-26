import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./custom.css";
import { ViewModeProvider } from "@/app/components/somode/ViewModeContext";
import ErrorBoundary from "@/app/components/ErrorBoundary";

export const metadata: Metadata = {
  title: {
    default: "Dev - Xscriptor",
    template: "%s | Dev - Xscriptor",
  },
  description:
    "Development portfolio of Xscriptor — themes, tools, AI skills, and open-source projects for VS Code, JetBrains, Obsidian, terminal, and web.",
  keywords: [
    "Xscriptor",
    "developer",
    "portfolio",
    "themes",
    "VS Code",
    "JetBrains",
    "Obsidian",
    "terminal",
    "AI",
    "open-source",
  ],
  authors: [{ name: "Xscriptor" }],
  openGraph: {
    title: "Dev - Xscriptor",
    description:
      "Development portfolio of Xscriptor — themes, tools, AI skills, and open-source projects.",
    siteName: "Dev - Xscriptor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');else document.documentElement.classList.add('light');var m=window.location.pathname.match(/^\\/(en|es|de|it|fr)/);if(m)document.documentElement.lang=m[1]}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:font-bold focus:rounded">
          Skip to content
        </a>
        <ErrorBoundary>
          <ViewModeProvider>{children}</ViewModeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
