"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold text-green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m7 8 3 3-3 3"/><line x1="13" y1="14" x2="16" y2="14"/></svg>
          SandboxKit
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#features" className="text-sm text-muted hover:text-foreground transition-colors">Features</Link>
          <Link href="/pricing" className="text-sm text-muted hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/docs" className="text-sm text-muted hover:text-foreground transition-colors">Docs</Link>
          <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors">Dashboard</Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-green px-4 py-1.5 text-sm font-medium text-background hover:brightness-110 transition"
          >
            Start Building
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-muted md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-4 md:hidden flex flex-col gap-3">
          <Link href="/#features" className="text-sm text-muted" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/pricing" className="text-sm text-muted" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/docs" className="text-sm text-muted" onClick={() => setOpen(false)}>Docs</Link>
          <Link href="/dashboard" className="text-sm text-muted" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/dashboard" className="rounded-md bg-green px-4 py-2 text-sm font-medium text-background text-center" onClick={() => setOpen(false)}>Start Building</Link>
        </div>
      )}
    </nav>
  );
}
