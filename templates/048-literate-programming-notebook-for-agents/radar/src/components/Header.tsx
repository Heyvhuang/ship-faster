"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg">
          <span className="text-accent">{"</"}</span>
          <span>AgentLit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link href="/#features" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <button className="ml-2 px-4 py-1.5 rounded-md bg-card border border-border text-foreground text-sm hover:bg-border transition-colors">
            Sign in with GitHub
          </button>
        </nav>

        <button
          className="md:hidden text-muted hover:text-foreground"
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
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3 text-sm">
          <Link href="/#features" className="text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Features
          </Link>
          <Link href="/pricing" className="text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link href="/docs" className="text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Docs
          </Link>
          <button className="mt-2 px-4 py-2 rounded-md bg-card border border-border text-foreground text-sm">
            Sign in with GitHub
          </button>
        </div>
      )}
    </header>
  );
}
