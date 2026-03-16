import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 font-mono text-xs font-bold text-zinc-950">
                P
              </div>
              <span className="font-mono text-sm font-semibold">PaperCloud</span>
            </div>
            <p className="text-xs text-zinc-500">
              Reproduce any paper.
              <br />
              No setup required.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Product</h3>
            <div className="flex flex-col gap-2">
              <Link href="/radar/papers" className="text-xs text-zinc-500 hover:text-zinc-300">Papers</Link>
              <Link href="/radar/pricing" className="text-xs text-zinc-500 hover:text-zinc-300">Pricing</Link>
              <Link href="/radar/docs" className="text-xs text-zinc-500 hover:text-zinc-300">Docs</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Resources</h3>
            <div className="flex flex-col gap-2">
              <Link href="/radar/docs" className="text-xs text-zinc-500 hover:text-zinc-300">Documentation</Link>
              <Link href="/radar/docs#api" className="text-xs text-zinc-500 hover:text-zinc-300">API Reference</Link>
              <Link href="/radar" className="text-xs text-zinc-500 hover:text-zinc-300">Status</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link href="/radar" className="text-xs text-zinc-500 hover:text-zinc-300">Privacy</Link>
              <Link href="/radar" className="text-xs text-zinc-500 hover:text-zinc-300">Terms</Link>
              <Link href="/radar" className="text-xs text-zinc-500 hover:text-zinc-300">Licenses</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center">
          <p className="text-xs text-zinc-600">&copy; 2026 PaperCloud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
