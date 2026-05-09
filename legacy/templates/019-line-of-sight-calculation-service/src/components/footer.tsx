import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-lg font-bold mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
                <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor" opacity="0.2" />
                <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
              Sight<span className="text-accent">Line</span>
            </div>
            <p className="text-sm text-muted">Precise line-of-sight calculations via API.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <div className="flex flex-col gap-2">
              <Link href="/docs" className="text-sm text-muted hover:text-foreground transition-colors">API Docs</Link>
              <Link href="/pricing" className="text-sm text-muted hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/results" className="text-sm text-muted hover:text-foreground transition-colors">Demo</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Use Cases</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted">Photography</span>
              <span className="text-sm text-muted">Telecom Planning</span>
              <span className="text-sm text-muted">Real Estate</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <div className="flex flex-col gap-2">
              <Link href="/docs" className="text-sm text-muted hover:text-foreground transition-colors">Contact</Link>
              <Link href="/docs" className="text-sm text-muted hover:text-foreground transition-colors">Status</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-card-border pt-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} SightLine API. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
