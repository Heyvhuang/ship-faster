import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="font-extrabold text-black text-lg mb-3">CarbCoach</p>
            <p className="text-sm text-gray-400">AI-powered carb counting for insulin-dependent diabetics.</p>
          </div>
          <div>
            <p className="font-semibold text-black text-sm mb-3">Product</p>
            <div className="space-y-2 text-sm text-gray-500">
              <Link href="/demo" className="block hover:text-black transition-colors">Demo</Link>
              <Link href="/dashboard" className="block hover:text-black transition-colors">Dashboard</Link>
              <Link href="/pricing" className="block hover:text-black transition-colors">Pricing</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-black text-sm mb-3">Integrations</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Dexcom G6/G7</p>
              <p>Freestyle Libre</p>
              <p>Omnipod</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-black text-sm mb-3">Legal</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>HIPAA Compliance</p>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; 2026 CarbCoach. All rights reserved. Not a substitute for medical advice.
        </div>
      </div>
    </footer>
  );
}
