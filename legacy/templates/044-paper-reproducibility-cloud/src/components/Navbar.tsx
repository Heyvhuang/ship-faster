"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/radar" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-mono text-sm font-bold text-zinc-950">
              P
            </div>
            <span className="font-mono text-lg font-semibold text-zinc-50">
              PaperCloud
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/radar/papers"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
            >
              Papers
            </Link>
            <Link
              href="/radar/pricing"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
            >
              Pricing
            </Link>
            <Link
              href="/radar/docs"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
            >
              Docs
            </Link>
            <Link
              href="/radar"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-zinc-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-zinc-800 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/radar/papers" className="text-sm text-zinc-400 hover:text-zinc-50" onClick={() => setMobileOpen(false)}>Papers</Link>
              <Link href="/radar/pricing" className="text-sm text-zinc-400 hover:text-zinc-50" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link href="/radar/docs" className="text-sm text-zinc-400 hover:text-zinc-50" onClick={() => setMobileOpen(false)}>Docs</Link>
              <Link href="/radar" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 text-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
