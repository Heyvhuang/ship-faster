import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson/20 border border-crimson/40">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#dc2626" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="8" r="2" fill="#dc2626" />
                </svg>
              </div>
              <span className="font-mono text-lg font-bold">AgentGuard</span>
            </div>
            <p className="text-sm text-muted">
              Pre-deployment safety for multi-agent AI systems in regulated industries.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-sm font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              <Link href="/simulator" className="block text-sm text-muted hover:text-foreground transition-colors">Simulator</Link>
              <Link href="/dashboard" className="block text-sm text-muted hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="/pricing" className="block text-sm text-muted hover:text-foreground transition-colors">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-sm font-semibold mb-4">Compliance</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted">SEC Rule Engine</span>
              <span className="block text-sm text-muted">Audit Trail</span>
              <span className="block text-sm text-muted">SOC 2 Type II</span>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-sm font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted">About</span>
              <span className="block text-sm text-muted">Security</span>
              <span className="block text-sm text-muted">Contact</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">&copy; 2026 AgentGuard, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-muted">Privacy Policy</span>
            <span className="text-xs text-muted">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
