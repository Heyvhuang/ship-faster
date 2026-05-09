import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#060a14]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-white">MCP Radar</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Enterprise security validation for Model Context Protocol tools.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/radar/scanner" className="hover:text-slate-300 transition-colors">Scanner</Link></li>
              <li><Link href="/radar/pricing" className="hover:text-slate-300 transition-colors">Pricing</Link></li>
              <li><Link href="/radar/docs" className="hover:text-slate-300 transition-colors">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Security</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><span className="hover:text-slate-300 transition-colors cursor-default">SOC 2 Type II</span></li>
              <li><span className="hover:text-slate-300 transition-colors cursor-default">GDPR Compliant</span></li>
              <li><span className="hover:text-slate-300 transition-colors cursor-default">ISO 27001</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/radar#contact" className="hover:text-slate-300 transition-colors">Contact</Link></li>
              <li><span className="cursor-default">Security Policy</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">&copy; 2026 MCP Radar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
