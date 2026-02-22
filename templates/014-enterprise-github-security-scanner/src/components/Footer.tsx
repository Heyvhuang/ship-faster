import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-foreground/60">
        <div>
          <p className="text-foreground font-bold text-lg mb-2">Shield<span className="text-primary">Watch</span></p>
          <p>Enterprise GitHub security intelligence. Protecting your software supply chain before threats reach production.</p>
        </div>
        <div>
          <p className="text-foreground font-semibold mb-3">Product</p>
          <ul className="space-y-2">
            <li><Link href="/sample-report" className="hover:text-foreground transition">Sample Report</Link></li>
            <li><Link href="/pricing" className="hover:text-foreground transition">Pricing</Link></li>
            <li><Link href="/#signup" className="hover:text-foreground transition">Free Briefing</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-foreground font-semibold mb-3">Company</p>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-foreground transition">About</Link></li>
            <li><span className="cursor-default">Blog</span></li>
            <li><span className="cursor-default">Careers</span></li>
          </ul>
        </div>
        <div>
          <p className="text-foreground font-semibold mb-3">Contact</p>
          <ul className="space-y-2">
            <li>briefings@shieldwatch.io</li>
            <li>San Francisco, CA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border text-center text-xs text-foreground/40 py-6">
        &copy; {new Date().getFullYear()} ShieldWatch Inc. All rights reserved.
      </div>
    </footer>
  );
}
