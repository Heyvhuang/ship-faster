"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-bold text-green-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          NotifyScan
        </Link>
        <div className="hidden gap-6 text-sm md:flex">
          <Link href="/scan" className="text-zinc-400 hover:text-zinc-100 transition-colors">Scan</Link>
          <Link href="/results" className="text-zinc-400 hover:text-zinc-100 transition-colors">Demo Report</Link>
          <Link href="/pricing" className="text-zinc-400 hover:text-zinc-100 transition-colors">Pricing</Link>
          <Link href="/contact" className="text-zinc-400 hover:text-zinc-100 transition-colors">Contact</Link>
        </div>
        <Link href="/scan" className="hidden rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-green-400 transition-colors md:block">
          Start Scan
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden text-zinc-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden flex flex-col gap-3 text-sm">
          <Link href="/scan" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-100">Scan</Link>
          <Link href="/results" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-100">Demo Report</Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-100">Pricing</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-100">Contact</Link>
          <Link href="/scan" onClick={() => setOpen(false)} className="rounded-md bg-green-500 px-4 py-2 text-center font-medium text-zinc-950">Start Scan</Link>
        </div>
      )}
    </nav>
  );
}
