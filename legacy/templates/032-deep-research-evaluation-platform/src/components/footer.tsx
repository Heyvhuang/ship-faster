import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-lg font-bold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs text-white">
                D
              </span>
              DREAM Eval
            </div>
            <p className="mt-3 text-sm text-muted">
              Benchmark AI research agents with agentic reasoning metrics.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/how-it-works" className="hover:text-foreground">How It Works</Link>
              <Link href="/reports" className="hover:text-foreground">Sample Reports</Link>
              <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Resources</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <span>API Docs</span>
              <span>Research Paper</span>
              <span>Changelog</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-card-border pt-6 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} DREAM Eval. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
