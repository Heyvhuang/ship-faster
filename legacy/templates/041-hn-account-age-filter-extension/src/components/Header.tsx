"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-block w-6 h-6 bg-hn-orange rounded-sm" />
          <span>HN Filter</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/features" className="hover:text-hn-orange transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-hn-orange transition-colors">
            Pricing
          </Link>
          <a
            href="#faq"
            className="hover:text-hn-orange transition-colors"
          >
            FAQ
          </a>
          <a
            href="https://github.com/hn-filter/extension"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hn-orange transition-colors"
          >
            GitHub
          </a>
          <a
            href="#install"
            className="bg-hn-orange text-white px-4 py-2 rounded-md hover:bg-hn-orange-light transition-colors"
          >
            Install Free
          </a>
        </nav>
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/features" className="hover:text-hn-orange" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/pricing" className="hover:text-hn-orange" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <a href="#faq" className="hover:text-hn-orange" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="https://github.com/hn-filter/extension" target="_blank" rel="noopener noreferrer" className="hover:text-hn-orange">GitHub</a>
          <a href="#install" className="bg-hn-orange text-white px-4 py-2 rounded-md text-center hover:bg-hn-orange-light" onClick={() => setMenuOpen(false)}>Install Free</a>
        </nav>
      )}
    </header>
  );
}
