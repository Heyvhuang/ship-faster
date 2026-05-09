"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/radar" className="flex items-center gap-2 font-mono font-bold text-lg">
          <span className="text-green">&#9678;</span>
          <span>DepRadar</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/radar" className="hover:text-foreground transition-colors">
            Scan
          </Link>
          <Link href="/radar/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/radar/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <a
            href="/radar/results"
            className="bg-green/10 text-green border border-green/20 px-3 py-1.5 rounded-md text-xs font-mono hover:bg-green/20 transition-colors"
          >
            Demo Report
          </a>
        </nav>
      </div>
    </header>
  );
}
