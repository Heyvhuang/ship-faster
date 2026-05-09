import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#060a14]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs">
                🛡
              </span>
              <span className="text-white">
                Agent<span className="text-blue-400">Shield</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              AI agent security audits for companies that ship with confidence.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Product</h4>
            <div className="flex flex-col gap-2">
              <Link href="/report" className="text-sm text-slate-500 hover:text-slate-300">Sample Report</Link>
              <Link href="/pricing" className="text-sm text-slate-500 hover:text-slate-300">Pricing</Link>
              <Link href="/checklist" className="text-sm text-slate-500 hover:text-slate-300">Security Checklist</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-slate-500 hover:text-slate-300">Contact</Link>
              <span className="text-sm text-slate-500">Privacy Policy</span>
              <span className="text-sm text-slate-500">Terms of Service</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Connect</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-500">Twitter / X</span>
              <span className="text-sm text-slate-500">LinkedIn</span>
              <span className="text-sm text-slate-500">GitHub</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#1e293b] pt-6 text-center text-sm text-slate-600">
          © 2026 AgentShield. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
