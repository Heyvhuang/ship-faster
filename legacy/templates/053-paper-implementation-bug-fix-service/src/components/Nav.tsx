"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/radar" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="inline-block w-3 h-3 rounded-full bg-accent" />
          Radar
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link href="/radar#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
          <Link href="/radar/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link>
          <Link href="/radar/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/radar/faq" className="hover:text-foreground transition-colors">FAQ</Link>
          <Link
            href="/radar/book"
            className="ml-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Book Consultation
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-muted hover:text-foreground"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4 text-sm bg-background">
          <Link href="/radar#how-it-works" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">How it Works</Link>
          <Link href="/radar/case-studies" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Case Studies</Link>
          <Link href="/radar/pricing" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Pricing</Link>
          <Link href="/radar/faq" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">FAQ</Link>
          <Link href="/radar/book" onClick={() => setOpen(false)} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white text-center hover:bg-accent-hover">Book Consultation</Link>
        </div>
      )}
    </nav>
  );
}
