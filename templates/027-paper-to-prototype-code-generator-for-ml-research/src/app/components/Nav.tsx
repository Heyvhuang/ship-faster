"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-green-400 font-bold text-lg tracking-tight">
          &gt; PaperCode
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-green-400 transition-colors">
            Dashboard
          </Link>
          <Link href="/pricing" className="hover:text-green-400 transition-colors">
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="bg-green-500 text-gray-950 px-4 py-1.5 rounded hover:bg-green-400 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-400 hover:text-green-400"
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
        <div className="md:hidden border-t border-gray-800 px-4 py-3 flex flex-col gap-3 text-sm text-gray-400">
          <Link href="/dashboard" onClick={() => setOpen(false)} className="hover:text-green-400">Dashboard</Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="hover:text-green-400">Pricing</Link>
          <Link href="/dashboard" onClick={() => setOpen(false)} className="bg-green-500 text-gray-950 px-4 py-1.5 rounded text-center font-medium">Get Started</Link>
        </div>
      )}
    </nav>
  );
}
