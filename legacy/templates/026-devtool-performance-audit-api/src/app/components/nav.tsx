"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-green-400 to-emerald-600 text-xs font-black text-black">
            CS
          </span>
          CoreScope
        </Link>

        <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <a
            href="/docs"
            className="rounded-md bg-green-500 px-4 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
          >
            Get Started
          </a>
        </div>

        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-zinc-400">
            <Link href="/docs" className="hover:text-white" onClick={() => setOpen(false)}>Docs</Link>
            <Link href="/pricing" className="hover:text-white" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/dashboard" className="hover:text-white" onClick={() => setOpen(false)}>Dashboard</Link>
            <a
              href="/docs"
              className="mt-2 rounded-md bg-green-500 px-4 py-2 text-center text-sm font-semibold text-black"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
