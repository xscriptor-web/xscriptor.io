"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.match(/^\/(en|es|de|it|fr)/)?.[1] ?? "en";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Page not found</h2>
      <p className="text-[var(--text-muted)] mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href={`/${locale}/`}
        className="inline-block px-6 py-3 rounded-full border border-[var(--border)] hover:bg-[var(--card-bg)] transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
