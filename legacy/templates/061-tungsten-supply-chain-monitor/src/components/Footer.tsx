import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="font-bold text-lg mb-2"><span className="text-accent">◆</span> Tungsten Monitor</p>
            <p className="text-sm text-steel">Critical material intelligence for aerospace & defense manufacturers.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-steel-light">
              <Link href="/features" className="hover:text-white transition">Features</Link>
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
              <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-steel-light">
              <Link href="/demo" className="hover:text-white transition">Request Demo</Link>
              <span>Contact Sales</span>
              <span>Careers</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-steel-light">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security</span>
            </div>
          </div>
        </div>
        <div className="border-t border-card-border mt-8 pt-8 text-center text-sm text-steel">
          © 2026 Tungsten Supply Chain Monitor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
