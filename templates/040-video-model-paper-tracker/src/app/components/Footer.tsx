import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t py-8 mt-16"
      style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>&copy; 2026 VideoModelWeekly. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/archive" className="hover:opacity-70 transition-opacity">
            Archive
          </Link>
          <Link href="/pricing" className="hover:opacity-70 transition-opacity">
            Pricing
          </Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">
            Unsubscribe
          </Link>
        </div>
      </div>
    </footer>
  );
}
