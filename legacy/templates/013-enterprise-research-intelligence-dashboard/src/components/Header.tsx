"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-800">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M8 11h6M11 8v6" strokeLinecap="round" />
          </svg>
          ResearchPulse
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/digest" className="text-sm font-medium text-slate-600 hover:text-blue-700">
            Sample Digest
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-700">
            Dashboard
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-blue-700">
            Pricing
          </Link>
          <Link
            href="/demo"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Request Demo
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/digest" className="text-sm font-medium text-slate-600" onClick={() => setMobileOpen(false)}>
              Sample Digest
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-slate-600" onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            <Link
              href="/demo"
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Request Demo
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
