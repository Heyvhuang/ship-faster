"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          </span>
          DepRadar
        </Link>
        <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/alerts/a1" className="hover:text-white transition-colors">Alerts</Link>
          <Link href="/onboarding" className="hover:text-white transition-colors">Setup</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/dashboard" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            Get Started
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-zinc-400 hover:text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-zinc-800 md:hidden">
          <div className="flex flex-col gap-2 p-4 text-sm text-zinc-400">
            <Link href="/dashboard" className="py-2 hover:text-white" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link href="/alerts/a1" className="py-2 hover:text-white" onClick={() => setOpen(false)}>Alerts</Link>
            <Link href="/onboarding" className="py-2 hover:text-white" onClick={() => setOpen(false)}>Setup</Link>
            <Link href="/pricing" className="py-2 hover:text-white" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/dashboard" className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-center font-medium text-white" onClick={() => setOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
