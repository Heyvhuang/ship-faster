"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-primary">
            <path d="M14 2L3 8v12l11 6 11-6V8L14 2z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity=".15" />
            <path d="M14 8v8m-3-5l3 5 3-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-foreground">Shield<span className="text-primary">Watch</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/sample-report" className="text-foreground/70 hover:text-foreground transition">Sample Report</Link>
          <Link href="/pricing" className="text-foreground/70 hover:text-foreground transition">Pricing</Link>
          <Link href="/about" className="text-foreground/70 hover:text-foreground transition">About</Link>
          <Link href="/#signup" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition">
            Get Free Briefing
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface border-b border-border px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link href="/sample-report" onClick={() => setOpen(false)} className="py-2 text-foreground/70">Sample Report</Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="py-2 text-foreground/70">Pricing</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="py-2 text-foreground/70">About</Link>
          <Link href="/#signup" onClick={() => setOpen(false)} className="bg-primary text-white px-4 py-2 rounded-lg font-medium text-center">
            Get Free Briefing
          </Link>
        </div>
      )}
    </nav>
  );
}
