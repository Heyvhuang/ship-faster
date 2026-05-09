import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0a0d14]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white">
                L
              </span>
              Ledger<span className="text-blue-400">AI</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              AI-powered bookkeeping built for content creators and freelancers.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-300">Product</h4>
            <div className="flex flex-col gap-2">
              <Link href="/features" className="text-sm text-slate-500 hover:text-slate-300">Features</Link>
              <Link href="/pricing" className="text-sm text-slate-500 hover:text-slate-300">Pricing</Link>
              <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-300">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-300">Legal</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-500">Privacy Policy</span>
              <span className="text-sm text-slate-500">Terms of Service</span>
              <span className="text-sm text-slate-500">Security</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-300">Security</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                256-bit SSL Encryption
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                SOC 2 Compliant
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                IRS e-file Authorized
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-600">
          &copy; 2026 LedgerAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
