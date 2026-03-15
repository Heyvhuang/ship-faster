"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/radar/dashboard", label: "Live Feed", icon: "◉" },
  { href: "/radar/feeds", label: "Feed Sources", icon: "◈" },
  { href: "/radar/alerts", label: "Alerts", icon: "⚠" },
  { href: "/radar/analytics", label: "Analytics", icon: "▤" },
  { href: "/radar/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-card-border bg-card min-h-screen p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 px-2">
        <div className="w-7 h-7 bg-accent-red rounded flex items-center justify-center text-white font-bold text-xs">R</div>
        <span className="font-bold tracking-tight">Radar</span>
      </Link>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition ${
                active
                  ? "bg-accent-red/10 text-accent-red border border-accent-red/20"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-card-border pt-4 mt-4">
        <Link href="/radar/pricing" className="flex items-center gap-3 px-3 py-2 rounded text-sm text-accent-amber hover:bg-white/5 transition">
          <span className="text-base">★</span>
          Upgrade to Pro
        </Link>
      </div>
    </aside>
  );
}
