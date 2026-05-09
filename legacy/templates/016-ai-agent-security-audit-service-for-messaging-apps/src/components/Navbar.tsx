"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-red-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="font-bold text-xl text-slate-900">AgentShield</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm text-slate-600 hover:text-red-accent transition-colors">The Threat</a>
            <a href="#services" className="text-sm text-slate-600 hover:text-red-accent transition-colors">Services</a>
            <a href="#process" className="text-sm text-slate-600 hover:text-red-accent transition-colors">Process</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-red-accent transition-colors">Pricing</a>
            <a href="#contact" className="inline-flex items-center px-4 py-2 bg-red-accent text-white text-sm font-medium rounded-lg hover:bg-red-dark transition-colors">
              Book Assessment
            </a>
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100">
            <div className="flex flex-col gap-3 pt-4">
              <a href="#problem" className="text-sm text-slate-600 hover:text-red-accent" onClick={() => setMobileOpen(false)}>The Threat</a>
              <a href="#services" className="text-sm text-slate-600 hover:text-red-accent" onClick={() => setMobileOpen(false)}>Services</a>
              <a href="#process" className="text-sm text-slate-600 hover:text-red-accent" onClick={() => setMobileOpen(false)}>Process</a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-red-accent" onClick={() => setMobileOpen(false)}>Pricing</a>
              <a href="#contact" className="inline-flex items-center justify-center px-4 py-2 bg-red-accent text-white text-sm font-medium rounded-lg" onClick={() => setMobileOpen(false)}>
                Book Assessment
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
