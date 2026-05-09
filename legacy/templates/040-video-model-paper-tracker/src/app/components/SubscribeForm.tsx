"use client";

import { useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ backgroundColor: "var(--accent-bg)" }}
      >
        <p className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
          You&apos;re in! 🎉
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Your first digest arrives within 48 hours. Check your inbox Tuesday morning.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2"
        style={{
          borderColor: "var(--card-border)",
          backgroundColor: "var(--card-bg)",
          color: "var(--foreground)",
        }}
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg text-white font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
        style={{ backgroundColor: "var(--primary)" }}
      >
        Subscribe Free
      </button>
    </form>
  );
}
