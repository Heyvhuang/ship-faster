"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-foreground">MemoryGuard</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            Start free trial
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          <Link href="/features" className="text-sm font-medium text-muted hover:text-foreground py-2">Features</Link>
          <Link href="/pricing" className="text-sm font-medium text-muted hover:text-foreground py-2">Pricing</Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-foreground py-2">Dashboard</Link>
          <Link href="/docs" className="text-sm font-medium text-muted hover:text-foreground py-2">Docs</Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors text-center mt-2"
          >
            Start free trial
          </Link>
        </div>
      )}
    </header>
  );
}
