import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold mb-4">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent" />
              Radar
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Specialized bug-fix service for ML paper implementations.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Service</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/radar#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
              <Link href="/radar/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/radar/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Resources</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <Link href="/radar/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/radar/book" className="hover:text-foreground transition-colors">Book Consultation</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Connect</h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a href="https://twitter.com" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="mailto:hello@radarfix.dev" className="hover:text-foreground transition-colors">Email</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-xs text-muted">
          &copy; 2026 Radar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
