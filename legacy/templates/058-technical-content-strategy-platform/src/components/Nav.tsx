"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-teal">◈</span> Radar
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link href="/sample-report" className="hover:text-foreground transition-colors">
            Sample Report
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/methodology" className="hover:text-foreground transition-colors">
            Methodology
          </Link>
          <Link
            href="/demo"
            className="bg-teal hover:bg-teal-dark text-background font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 text-sm">
          <Link href="/sample-report" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
            Sample Report
          </Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
            Pricing
          </Link>
          <Link href="/methodology" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
            Methodology
          </Link>
          <Link
            href="/demo"
            onClick={() => setOpen(false)}
            className="bg-teal text-background font-medium px-4 py-2 rounded-lg text-center"
          >
            Book a Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
