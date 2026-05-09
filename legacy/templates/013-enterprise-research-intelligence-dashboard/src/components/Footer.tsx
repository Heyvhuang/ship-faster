import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-bold text-blue-800">ResearchPulse</h3>
            <p className="mt-2 text-sm text-slate-500">
              Enterprise research intelligence for healthcare AI companies.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-700">Product</h4>
            <ul className="mt-2 space-y-1">
              <li><Link href="/digest" className="text-sm text-slate-500 hover:text-blue-700">Sample Digest</Link></li>
              <li><Link href="/dashboard" className="text-sm text-slate-500 hover:text-blue-700">Dashboard</Link></li>
              <li><Link href="/pricing" className="text-sm text-slate-500 hover:text-blue-700">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-700">Company</h4>
            <ul className="mt-2 space-y-1">
              <li><span className="text-sm text-slate-500">About</span></li>
              <li><span className="text-sm text-slate-500">Careers</span></li>
              <li><span className="text-sm text-slate-500">Blog</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-700">Legal</h4>
            <ul className="mt-2 space-y-1">
              <li><span className="text-sm text-slate-500">Privacy Policy</span></li>
              <li><span className="text-sm text-slate-500">Terms of Service</span></li>
              <li><span className="text-sm text-slate-500">Security</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} ResearchPulse, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
