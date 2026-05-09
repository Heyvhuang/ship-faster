import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="font-mono text-lg font-bold tracking-tight">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent mr-2" />
              RADAR
            </Link>
            <p className="mt-3 text-sm text-muted">
              Competitive tech intelligence through GitHub activity analysis.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link href="/sample-report" className="text-foreground/70 hover:text-foreground transition-colors">Sample Report</Link></li>
              <li><Link href="/pricing" className="text-foreground/70 hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link></li>
              <li><span className="text-foreground/70">Privacy Policy</span></li>
              <li><span className="text-foreground/70">Terms of Service</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-foreground/70">Twitter</span></li>
              <li><span className="text-foreground/70">LinkedIn</span></li>
              <li><a href="mailto:hello@radarintel.io" className="text-foreground/70 hover:text-foreground transition-colors">hello@radarintel.io</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Radar Intelligence Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
