import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-mono text-sm font-bold text-green">SandboxKit</h3>
            <p className="text-xs text-muted">Managed secure sandboxes for AI agents.</p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="text-muted hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-muted hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/docs" className="text-muted hover:text-foreground transition-colors">Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="text-muted hover:text-foreground transition-colors">API Reference</Link></li>
              <li><Link href="/docs" className="text-muted hover:text-foreground transition-colors">Quickstart</Link></li>
              <li><span className="text-muted">Status Page</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted">GitHub</span></li>
              <li><span className="text-muted">Twitter</span></li>
              <li><span className="text-muted">Contact</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          &copy; 2026 SandboxKit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
