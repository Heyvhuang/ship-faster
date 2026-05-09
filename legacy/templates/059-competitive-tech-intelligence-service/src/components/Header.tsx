"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight">
          <span className="inline-block h-3 w-3 rounded-full bg-accent" />
          RADAR
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/#how-it-works" className="text-muted hover:text-foreground transition-colors">How It Works</Link>
          <Link href="/sample-report" className="text-muted hover:text-foreground transition-colors">Sample Report</Link>
          <Link href="/pricing" className="text-muted hover:text-foreground transition-colors">Pricing</Link>
          <Link
            href="/contact"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Book a Call
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-border px-6 py-6 md:hidden">
          <Link href="/#how-it-works" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">How It Works</Link>
          <Link href="/sample-report" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Sample Report</Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Pricing</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Book a Call</Link>
        </nav>
      )}
    </header>
  );
}
