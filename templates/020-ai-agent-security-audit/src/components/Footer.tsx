import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-bold">
              Agent<span className="text-accent-blue">Shield</span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              AI agent security audits that protect your business from prompt
              injection, data leakage, and model manipulation attacks.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/audit-report" className="text-muted hover:text-foreground">Sample Report</Link></li>
              <li><Link href="/pricing" className="text-muted hover:text-foreground">Pricing</Link></li>
              <li><Link href="/checklist" className="text-muted hover:text-foreground">Security Checklist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-muted hover:text-foreground">Contact</Link></li>
              <li><span className="text-muted">Blog (Coming Soon)</span></li>
              <li><span className="text-muted">Careers</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted">Privacy Policy</span></li>
              <li><span className="text-muted">Terms of Service</span></li>
              <li><span className="text-muted">SOC 2 Compliant</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-card-border pt-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} AgentShield. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
