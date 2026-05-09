import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-bold text-lg mb-2">
            <span className="text-teal">◈</span> Radar
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Data-driven content strategy for developer marketing teams.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Product</h4>
          <div className="flex flex-col gap-2 text-muted">
            <Link href="/sample-report" className="hover:text-foreground transition-colors">Sample Report</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/methodology" className="hover:text-foreground transition-colors">Methodology</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Company</h4>
          <div className="flex flex-col gap-2 text-muted">
            <Link href="/demo" className="hover:text-foreground transition-colors">Book a Demo</Link>
            <span className="cursor-default">Blog</span>
            <span className="cursor-default">Careers</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Legal</h4>
          <div className="flex flex-col gap-2 text-muted">
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms of Service</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border text-center text-xs text-muted py-6">
        © 2026 Radar. All rights reserved.
      </div>
    </footer>
  );
}
