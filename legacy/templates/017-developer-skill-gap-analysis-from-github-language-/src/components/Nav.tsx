"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 bg-[#010409]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-green-400">Dev</span>Gap
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/demo" className="text-sm text-gray-400 hover:text-white">
            Demo
          </Link>
          <Link href="/pricing" className="text-sm text-gray-400 hover:text-white">
            Pricing
          </Link>
          <Link
            href="/results"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500"
          >
            View Sample Report
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-800 px-4 pb-4 md:hidden">
          <Link href="/demo" className="block py-2 text-sm text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
            Demo
          </Link>
          <Link href="/pricing" className="block py-2 text-sm text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link
            href="/results"
            className="mt-2 block rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500"
            onClick={() => setOpen(false)}
          >
            View Sample Report
          </Link>
        </div>
      )}
    </nav>
  );
}
