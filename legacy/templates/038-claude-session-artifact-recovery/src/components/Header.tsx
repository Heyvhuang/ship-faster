"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold">
          <span className="text-accent">{">"}</span>
          <span>SessionRecover</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/#how-it-works" className="text-muted hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="/recover" className="text-muted hover:text-foreground transition-colors">
            Recover
          </Link>
          <Link href="/pricing" className="text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link
            href="/recover"
            className="rounded-md bg-accent px-4 py-1.5 text-sm font-semibold text-black hover:bg-accent-dim transition-colors"
          >
            Try Free
          </Link>
        </nav>
        <button
          className="md:hidden text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <nav className="flex flex-col gap-3 border-t border-border px-4 py-4 md:hidden">
          <Link href="/#how-it-works" className="text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            How It Works
          </Link>
          <Link href="/recover" className="text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Recover
          </Link>
          <Link href="/pricing" className="text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link
            href="/recover"
            className="mt-1 rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-black"
            onClick={() => setMobileOpen(false)}
          >
            Try Free
          </Link>
        </nav>
      )}
    </header>
  );
}
