"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, CreditCard, Settings, Gem } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { isPrivilegedRole } from "../lib/services/credits";

interface UserMenuProps {
    user: {
        email?: string;
    };
    signOut: () => void;
}

export function UserMenu({ user, signOut }: UserMenuProps) {
    const { supabase, user: authUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [creditsBalance, setCreditsBalance] = useState<number | null>(null);
    const [plan, setPlan] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoadingCredits, setIsLoadingCredits] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const userEmail = user.email || "User";
    const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(userEmail)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    const hasUnlimitedCredits = isPrivilegedRole(role);
    const roleLabel = role === "admin" ? "Admin" : role === "developer" ? "Developer" : null;
    const planLabel = roleLabel ?? (plan === "enterprise" ? "Enterprise Plan" : plan === "pro" ? "Pro Plan" : "Free Plan");
    const creditsLabel =
        hasUnlimitedCredits
            ? "Unlimited Credits"
            : creditsBalance === null
                ? "N/A"
                : `${creditsBalance} Credits`;

    useEffect(() => {
        if (!isOpen || !authUser?.id) return;
        let cancelled = false;

        const loadCredits = async () => {
            setIsLoadingCredits(true);
            const { data, error } = await supabase
                .from("user_profiles")
                .select("credits_balance, plan, role")
                .eq("id", authUser.id)
                .single();

            if (cancelled) return;

            if (error) {
                console.error("Failed to load credits balance", error);
                setCreditsBalance(null);
                setPlan(null);
                setRole(null);
            } else {
                setCreditsBalance(data?.credits_balance ?? 0);
                setPlan(data?.plan ?? "free");
                setRole(data?.role ?? "user");
            }
            setIsLoadingCredits(false);
        };

        loadCredits();

        return () => {
            cancelled = true;
        };
    }, [authUser?.id, isOpen, supabase]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 pl-2 rounded-full hover:bg-ink-100 transition-all group outline-none focus:ring-2 focus:ring-ink-200"
            >
                <div className="flex flex-col items-end hidden md:flex">
                    <span className="text-xs font-bold text-ink-900 leading-none mb-0.5">{userEmail.split('@')[0]}</span>
                    <span className="text-[10px] text-ink-500 leading-none">{planLabel}</span>
                </div>
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full shadow-sm border-2 border-white ring-1 ring-ink-100 group-hover:shadow-md transition-all bg-ink-100"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-ink-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in origin-top-right">
                    <div className="px-4 py-3 border-b border-ink-100">
                        <p className="text-sm font-bold text-ink-900 truncate">{userEmail}</p>
                        <div className="flex items-center gap-1.5 mt-2 bg-accent/10 px-2 py-1.5 rounded-md border border-accent/20">
                            <Gem size={12} className="text-accent fill-accent" />
                            <span className="text-xs font-bold text-accent">
                                {isLoadingCredits ? "..." : creditsLabel}
                            </span>
                        </div>
                        {roleLabel && (
                            <div className="mt-2 text-[10px] uppercase tracking-wide text-ink-500 font-semibold">
                                {roleLabel}
                            </div>
                        )}
                    </div>

                    <div className="py-2">
                        <Link
                            href="/billing"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-600 hover:text-ink-900 hover:bg-ink-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <CreditCard size={16} />
                            Billing History
                        </Link>
                        <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink-600 hover:text-ink-900 hover:bg-ink-50 transition-colors pointer-events-none opacity-50"
                        >
                            <Settings size={16} />
                            Settings
                        </button>
                    </div>

                    <div className="border-t border-ink-100 mt-1 pt-1">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                signOut();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
