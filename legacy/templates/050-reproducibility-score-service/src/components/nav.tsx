"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/papers", label: "Papers" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-black text-sm font-bold">
            R
          </span>
          <span className="hidden sm:inline">Reproducibility Radar</span>
          <span className="sm:hidden">Radar</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === l.href
                  ? "bg-white/10 text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="ml-2 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-accent/90"
          >
            Get Early Access
          </Link>
        </nav>
      </div>
    </header>
  );
}
