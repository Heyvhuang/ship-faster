import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/deploy" className="hover:text-red-400">Deploy Scanner</Link></li>
              <li><Link href="/dashboard" className="hover:text-red-400">Dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-red-400">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#threats" className="hover:text-red-400">Threat Intel</Link></li>
              <li><Link href="/deploy" className="hover:text-red-400">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="cursor-default">About</span></li>
              <li><span className="cursor-default">Contact</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="cursor-default">Privacy Policy</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2026 IvantiShield. All rights reserved.</p>
          <p>Protecting enterprises from dormant backdoor threats.</p>
        </div>
      </div>
    </footer>
  );
}
