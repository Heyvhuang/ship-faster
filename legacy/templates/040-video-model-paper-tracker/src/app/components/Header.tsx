"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="border-b sticky top-0 z-50"
      style={{
        borderColor: "var(--card-border)",
        backgroundColor: "var(--background)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🎬</span>
          <span>VideoModelWeekly</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/archive"
            className="hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)" }}
          >
            Archive
          </Link>
          <Link
            href="/pricing"
            className="hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted)" }}
          >
            Pricing
          </Link>
          <Link
            href="#subscribe"
            className="px-4 py-2 rounded-lg text-white font-medium text-sm transition-colors"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Subscribe
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-3"
          style={{ borderColor: "var(--card-border)" }}
        >
          <Link href="/archive" onClick={() => setMenuOpen(false)}>
            Archive
          </Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link
            href="#subscribe"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-lg text-white font-medium text-sm text-center"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Subscribe
          </Link>
        </div>
      )}
    </header>
  );
}
