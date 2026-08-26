"use client";

interface SocialEntry {
  href: string;
  icon: React.ReactNode;
}

function XCorner() {
  return (
    <g transform="translate(16 14)" opacity="0.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <line x1="1" y1="1" x2="6" y2="6" />
      <line x1="6" y1="1" x2="1" y2="6" />
    </g>
  );
}

function BgCircle() {
  return (
    <circle cx="12" cy="12" r="11" fill="color-mix(in srgb, var(--foreground) 6%, transparent)" stroke="color-mix(in srgb, var(--foreground) 15%, transparent)" strokeWidth="1" />
  );
}

function GitHubSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }} className="group-hover:text-[var(--foreground)] transition-colors">
      <BgCircle />
      <path fill="currentColor" stroke="none" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85.01 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.69-4.57 4.94.36.31.68.94.68 1.89 0 1.36-.01 2.46-.01 2.79 0 .26.18.57.68.48A10.04 10.04 0 0022 12c0-5.52-4.48-10-10-10z" />
      <XCorner />
    </svg>
  );
}

function TelegramSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }} className="group-hover:text-[var(--foreground)] transition-colors">
      <BgCircle />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 13.5l6-6M3 11l5 2 2 5 3-4 4 3 2-14L3 11z" />
      <XCorner />
    </svg>
  );
}

function InstagramSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }} className="group-hover:text-[var(--foreground)] transition-colors">
      <BgCircle />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" />
      <XCorner />
    </svg>
  );
}

function WhatsappSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }} className="group-hover:text-[var(--foreground)] transition-colors">
      <BgCircle />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.1 13.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6-.1-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.3 5.5 4.6.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4z" fill="currentColor" />
      <XCorner />
    </svg>
  );
}

function EmailSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" style={{ color: "color-mix(in srgb, var(--foreground) 70%, transparent)" }} className="group-hover:text-[var(--foreground)] transition-colors">
      <BgCircle />
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
      <XCorner />
    </svg>
  );
}

const socials: SocialEntry[] = [
  { href: "https://github.com/xscriptor", icon: <GitHubSVG /> },
  { href: "https://t.me/xscriptor", icon: <TelegramSVG /> },
  { href: "https://instagram.com/xscriptor", icon: <InstagramSVG /> },
  { href: "https://wa.me/34666938748", icon: <WhatsappSVG /> },
  { href: "mailto:x@xscriptor.com", icon: <EmailSVG /> },
];

export default function SocialGrid() {
  return (
    <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
      {socials.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
          style={{
            border: "1px solid color-mix(in srgb, var(--foreground) 15%, transparent)",
            background: "color-mix(in srgb, var(--foreground) 3%, transparent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "color-mix(in srgb, var(--foreground) 30%, transparent)";
            e.currentTarget.style.background = "color-mix(in srgb, var(--foreground) 7%, transparent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "color-mix(in srgb, var(--foreground) 15%, transparent)";
            e.currentTarget.style.background = "color-mix(in srgb, var(--foreground) 3%, transparent)";
          }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
