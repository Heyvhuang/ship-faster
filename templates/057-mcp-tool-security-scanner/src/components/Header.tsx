"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/radar" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="6" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">MCP Radar</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/radar" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
          <Link href="/radar/scanner" className="text-sm text-slate-400 hover:text-white transition-colors">Scanner</Link>
          <Link href="/radar/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/radar/docs" className="text-sm text-slate-400 hover:text-white transition-colors">API Docs</Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/radar/scanner"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            Start Scan
          </Link>
        </div>

        <button
          className="md:hidden text-slate-400"
          onClick={() => setMenuOpen(!menuOpen)}
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
        <div className="border-t border-white/5 bg-[#0a0f1c] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/radar" className="text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/radar/scanner" className="text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>Scanner</Link>
            <Link href="/radar/pricing" className="text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <Link href="/radar/docs" className="text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>API Docs</Link>
            <Link href="/radar/scanner" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white text-center" onClick={() => setMenuOpen(false)}>Start Scan</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
