import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-mono text-lg font-bold text-green-400">NotifyScan</p>
            <p className="mt-2 text-sm text-zinc-500">Automated notification compliance audits for iOS apps.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-300">Product</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/scan" className="hover:text-zinc-300">Scanner</Link>
              <Link href="/results" className="hover:text-zinc-300">Demo Report</Link>
              <Link href="/pricing" className="hover:text-zinc-300">Pricing</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-300">Regulations</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-500">
              <span>GDPR</span>
              <span>CCPA</span>
              <span>Apple Guidelines</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-300">Company</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/contact" className="hover:text-zinc-300">Contact</Link>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          &copy; 2026 NotifyScan. All rights reserved. Your IPA files are processed locally and never stored.
        </div>
      </div>
    </footer>
  );
}
