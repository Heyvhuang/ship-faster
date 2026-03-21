import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-accent">{"</"}</span>
          <span className="text-foreground font-bold">AgentLit</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <a
            href="https://x.com/agentlit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Twitter/X
          </a>
          <a
            href="https://github.com/agentlit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
        <p>&copy; 2026 AgentLit. All rights reserved.</p>
      </div>
    </footer>
  );
}
