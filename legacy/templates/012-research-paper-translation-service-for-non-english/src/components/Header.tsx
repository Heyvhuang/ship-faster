"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PB</span>
            </div>
            <span className="text-xl font-bold text-primary-dark">
              PaperBridge
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/library"
              className="text-muted hover:text-primary font-medium transition-colors"
            >
              Paper Library
            </Link>
            <Link
              href="/pricing"
              className="text-muted hover:text-primary font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="text-muted hover:text-primary font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/request"
              className="text-muted hover:text-primary font-medium transition-colors"
            >
              Request Translation
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-light transition-colors font-medium"
            >
              Sign In
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-primary-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4 flex flex-col gap-3">
            <Link
              href="/library"
              className="text-muted hover:text-primary font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Paper Library
            </Link>
            <Link
              href="/pricing"
              className="text-muted hover:text-primary font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="text-muted hover:text-primary font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/request"
              className="text-muted hover:text-primary font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Request Translation
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary text-white px-5 py-2 rounded-lg text-center font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
