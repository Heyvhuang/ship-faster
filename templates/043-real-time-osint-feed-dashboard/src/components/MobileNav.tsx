"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/radar/dashboard", label: "Feed", icon: "◉" },
  { href: "/radar/feeds", label: "Sources", icon: "◈" },
  { href: "/radar/alerts", label: "Alerts", icon: "⚠" },
  { href: "/radar/analytics", label: "Stats", icon: "▤" },
  { href: "/radar/settings", label: "Settings", icon: "⚙" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-card-border flex justify-around py-2 z-50">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-xs py-1 px-2 rounded transition ${
              active ? "text-accent-red" : "text-muted"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
