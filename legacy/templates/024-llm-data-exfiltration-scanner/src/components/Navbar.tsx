"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#0a0a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="inline-block h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          ExfilGuard
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/report" className="text-sm text-gray-400 hover:text-white transition">
            Sample Report
          </Link>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition">
            Pricing
          </a>
          <Link
            href="/dashboard"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Start Scanning
          </Link>
        </div>
        <button className="md:hidden text-gray-400" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-800 md:hidden px-6 py-4 flex flex-col gap-4">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/report" className="text-sm text-gray-400 hover:text-white" onClick={() => setOpen(false)}>Sample Report</Link>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white" onClick={() => setOpen(false)}>Pricing</a>
          <Link href="/dashboard" className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white text-center" onClick={() => setOpen(false)}>Start Scanning</Link>
        </div>
      )}
    </nav>
  );
}
