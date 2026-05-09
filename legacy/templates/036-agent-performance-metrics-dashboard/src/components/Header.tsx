"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg">
          <span className="text-green-accent">▲</span> AgentMetrics
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link
            href="/dashboard"
            className="ml-2 px-3 py-1.5 bg-green-accent text-black rounded text-sm font-medium hover:bg-green-muted transition-colors"
          >
            Sign in with GitHub
          </Link>
        </nav>

        <button
          className="md:hidden text-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-3 text-sm bg-background">
          <Link href="/dashboard" className="text-muted hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/pricing" className="text-muted hover:text-foreground">
            Pricing
          </Link>
          <Link href="/docs" className="text-muted hover:text-foreground">
            Docs
          </Link>
          <Link
            href="/dashboard"
            className="px-3 py-1.5 bg-green-accent text-black rounded text-sm font-medium text-center"
          >
            Sign in with GitHub
          </Link>
        </nav>
      )}
    </header>
  );
}
