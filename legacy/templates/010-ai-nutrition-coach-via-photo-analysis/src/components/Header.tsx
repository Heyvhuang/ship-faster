"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-extrabold text-black tracking-tight">
          CarbCoach
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/demo" className="hover:text-black transition-colors">Demo</Link>
          <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
          <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
          <Link href="/demo" className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors">
            Start Free Trial
          </Link>
        </nav>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/demo" className="block text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>Demo</Link>
          <Link href="/dashboard" className="block text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/pricing" className="block text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/demo" className="block text-center bg-black text-white text-sm font-semibold py-3 rounded-xl" onClick={() => setOpen(false)}>Start Free Trial</Link>
        </div>
      )}
    </header>
  );
}
