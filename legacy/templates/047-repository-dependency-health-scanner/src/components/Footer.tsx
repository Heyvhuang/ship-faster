import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
        <div className="flex items-center gap-2">
          <span className="text-green">&#9678;</span>
          <span>DepRadar</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/radar/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/radar/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <span className="text-border">|</span>
          <span>&copy; 2026 DepRadar</span>
        </div>
      </div>
    </footer>
  );
}
