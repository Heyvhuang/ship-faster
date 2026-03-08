"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-accent"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>TriageBot</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link href="/#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="text-sm text-muted hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-black hover:bg-accent-hover transition-colors"
          >
            Sign in with GitHub
          </Link>
        </div>

        <button
          className="md:hidden text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border md:hidden bg-background px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            <Link href="/#how-it-works" className="text-sm text-muted" onClick={() => setMobileOpen(false)}>How it works</Link>
            <Link href="/#pricing" className="text-sm text-muted" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/#faq" className="text-sm text-muted" onClick={() => setMobileOpen(false)}>FAQ</Link>
            <Link href="/dashboard" className="text-sm text-muted" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link
              href="/dashboard"
              className="mt-2 rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-black"
              onClick={() => setMobileOpen(false)}
            >
              Sign in with GitHub
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
