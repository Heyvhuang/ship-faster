import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-green-400 to-emerald-600 text-[10px] font-black text-black">
                CS
              </span>
              CoreScope
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              Apple Silicon build performance, decoded.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/docs" className="hover:text-zinc-300">Documentation</Link>
              <Link href="/pricing" className="hover:text-zinc-300">Pricing</Link>
              <Link href="/dashboard" className="hover:text-zinc-300">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">Resources</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <span className="cursor-default">GitHub</span>
              <span className="cursor-default">Slack Community</span>
              <span className="cursor-default">Status</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} CoreScope. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
