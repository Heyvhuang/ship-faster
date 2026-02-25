import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <span className="text-green-400 font-bold">&gt; PaperCode</span>
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link>
          <Link href="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link>
          <span>Terms</span>
          <span>Privacy</span>
        </div>
        <span>&copy; 2026 PaperCode. All rights reserved.</span>
      </div>
    </footer>
  );
}
