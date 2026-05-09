"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-red-500">&#9632;</span>
          <span>
            Ivanti<span className="text-red-500">Shield</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/#threats" className="hover:text-red-400 transition">Threats</Link>
          <Link href="/deploy" className="hover:text-red-400 transition">Deploy</Link>
          <Link href="/dashboard" className="hover:text-red-400 transition">Dashboard</Link>
          <Link href="/pricing" className="hover:text-red-400 transition">Pricing</Link>
          <Link
            href="/pricing"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Start Scan
          </Link>
        </div>
        <button
          className="md:hidden text-gray-300"
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
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link href="/#threats" className="py-2 hover:text-red-400" onClick={() => setOpen(false)}>Threats</Link>
          <Link href="/deploy" className="py-2 hover:text-red-400" onClick={() => setOpen(false)}>Deploy</Link>
          <Link href="/dashboard" className="py-2 hover:text-red-400" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/pricing" className="py-2 hover:text-red-400" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/pricing" className="bg-red-600 text-white text-center px-4 py-2 rounded-lg font-medium" onClick={() => setOpen(false)}>Start Scan</Link>
        </div>
      )}
    </nav>
  );
}
