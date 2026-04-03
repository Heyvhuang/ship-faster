"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-accent">◆</span> Tungsten Monitor
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-steel-light">
          <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/features" className="hover:text-white transition">Features</Link>
          <Link href="/demo" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-medium transition">
            Request Demo
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-steel-light">
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
        <div className="md:hidden bg-navy border-t border-card-border px-4 py-4 flex flex-col gap-4 text-sm">
          <Link href="/dashboard" className="text-steel-light hover:text-white" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/pricing" className="text-steel-light hover:text-white" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/features" className="text-steel-light hover:text-white" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/demo" className="bg-accent text-white px-4 py-2 rounded-lg text-center font-medium" onClick={() => setOpen(false)}>
            Request Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
