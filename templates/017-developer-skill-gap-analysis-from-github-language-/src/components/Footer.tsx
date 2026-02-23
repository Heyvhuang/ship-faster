import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#010409]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold">
              <span className="text-green-400">Dev</span>Gap
            </p>
            <p className="mt-2 text-sm text-gray-500">
              GitHub-powered skill gap analysis for scaling engineering teams.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-400">Product</p>
            <Link href="/demo" className="block text-sm text-gray-500 hover:text-white">Demo</Link>
            <Link href="/pricing" className="block text-sm text-gray-500 hover:text-white">Pricing</Link>
            <Link href="/results" className="block text-sm text-gray-500 hover:text-white">Sample Report</Link>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-400">Company</p>
            <span className="block text-sm text-gray-500">hello@devgap.dev</span>
            <span className="block text-sm text-gray-500">Twitter / X</span>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-600">
          &copy; 2026 DevGap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
