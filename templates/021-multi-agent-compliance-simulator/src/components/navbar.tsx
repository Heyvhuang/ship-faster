"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson/20 border border-crimson/40">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#dc2626" strokeWidth="1.5" fill="none" />
              <circle cx="8" cy="8" r="2" fill="#dc2626" />
            </svg>
          </div>
          <span className="font-mono text-lg font-bold tracking-tight">
            AgentGuard
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/simulator" className="text-sm text-muted hover:text-foreground transition-colors">
            Simulator
          </Link>
          <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/pricing" className="text-sm text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link
            href="/simulator"
            className="rounded-lg bg-crimson px-4 py-2 text-sm font-medium text-white hover:bg-crimson/90 transition-colors"
          >
            Start Simulation
          </Link>
        </div>

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
        <div className="md:hidden border-t border-card-border bg-background px-6 py-4 space-y-4">
          <Link href="/simulator" className="block text-sm text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Simulator
          </Link>
          <Link href="/dashboard" className="block text-sm text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Dashboard
          </Link>
          <Link href="/pricing" className="block text-sm text-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          <Link
            href="/simulator"
            className="block rounded-lg bg-crimson px-4 py-2 text-sm font-medium text-white text-center"
            onClick={() => setMobileOpen(false)}
          >
            Start Simulation
          </Link>
        </div>
      )}
    </nav>
  );
}
