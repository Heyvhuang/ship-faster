import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 font-bold">TriageBot</h3>
            <p className="text-sm text-muted">
              AI triage agent for GitHub maintainers. Save hours on issue and PR responses.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
              <Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          © 2026 TriageBot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
