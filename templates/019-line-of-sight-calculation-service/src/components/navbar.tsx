"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
            <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor" opacity="0.2" />
            <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          <span>
            Sight<span className="text-accent">Line</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/docs" className="text-sm text-muted hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="/pricing" className="text-sm text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/results" className="text-sm text-muted hover:text-foreground transition-colors">
            Demo
          </Link>
          <Link
            href="/docs"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background hover:bg-accent/90 transition-colors"
          >
            Get API Key
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-muted" aria-label="Toggle menu">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-card-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/docs" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-foreground">Documentation</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-foreground">Pricing</Link>
            <Link href="/results" onClick={() => setOpen(false)} className="text-sm text-muted hover:text-foreground">Demo</Link>
            <Link href="/docs" onClick={() => setOpen(false)} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background text-center">Get API Key</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
