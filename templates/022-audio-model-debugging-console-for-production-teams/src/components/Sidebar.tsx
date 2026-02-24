"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "◉" },
  { href: "/failures", label: "Failure Analysis", icon: "⚠" },
  { href: "/samples", label: "Audio Samples", icon: "♫" },
  { href: "/alerts", label: "Alerts Config", icon: "🔔" },
  { href: "/integration", label: "Integration", icon: "⚡" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-card-border flex items-center gap-2 px-3 py-2 overflow-x-auto">
        <Link href="/" className="font-bold text-accent-blue text-sm mr-2 shrink-0">
          AudioSAE
        </Link>
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`text-xs px-2 py-1 rounded shrink-0 ${
              pathname === n.href
                ? "bg-accent-blue/20 text-accent-blue"
                : "text-muted hover:text-foreground"
            }`}
          >
            {n.label}
          </Link>
        ))}
      </div>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-card border-r border-card-border h-screen sticky top-0">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-5 border-b border-card-border"
        >
          <span className="w-7 h-7 rounded bg-accent-blue flex items-center justify-center text-white font-bold text-sm">
            A
          </span>
          <span className="font-bold text-sm">AudioSAE Console</span>
        </Link>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                pathname === n.href
                  ? "bg-accent-blue/15 text-accent-blue"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <span>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-card-border text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-dot" />
            All systems operational
          </div>
        </div>
      </aside>
    </>
  );
}
