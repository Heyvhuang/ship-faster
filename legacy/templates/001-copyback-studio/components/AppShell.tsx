"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, CreditCard, User, Menu, X } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { useAuth } from "./AuthProvider";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const { user, supabase, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/studio") {
      return pathname?.startsWith("/studio");
    }
    if (path === "/billing") {
      return pathname?.startsWith("/billing");
    }
    return pathname === path;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-ink-900 bg-paper">
      <header className="sticky top-0 z-50 w-full border-b border-ink-200/60 bg-paper/80 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <div className="w-6 h-6 bg-ink-900 text-white flex items-center justify-center rounded-sm">
              <Command size={14} />
            </div>
            CopyBack Studio
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-ink-600">
            <Link
              href="/studio"
              className={`hover:text-ink-900 transition-colors ${isActive("/studio") ? "text-ink-900" : ""
                }`}
            >
              Studio
            </Link>
            <Link
              href="/billing"
              className={`flex items-center gap-1.5 hover:text-ink-900 transition-colors ${isActive("/billing") ? "text-ink-900" : ""
                }`}
            >
              <CreditCard size={14} />
              Billing
            </Link>
            {!loading && (
              <>
                {user ? (
                  <UserMenu user={user} signOut={handleSignOut} />
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 hover:text-ink-900 transition-colors"
                  >
                    <User size={14} />
                    Sign in
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 rounded-md hover:bg-ink-100 text-ink-700"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden border-t border-ink-200/60 bg-paper/95 backdrop-blur-sm">
            <div className="px-4 py-3 flex flex-col gap-2 text-sm font-medium text-ink-700">
              <Link
                href="/studio"
                className={`rounded-md px-2 py-2 hover:bg-ink-100 transition-colors ${isActive("/studio") ? "text-ink-900 bg-ink-100" : ""
                  }`}
              >
                Studio
              </Link>
              <Link
                href="/billing"
                className={`rounded-md px-2 py-2 hover:bg-ink-100 transition-colors ${isActive("/billing") ? "text-ink-900 bg-ink-100" : ""
                  }`}
              >
                Billing
              </Link>
              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="rounded-md px-2 py-2 text-left text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link href="/login" className="rounded-md px-2 py-2 hover:bg-ink-100">
                      Sign in
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto">{children}</main>
    </div>
  );
};
