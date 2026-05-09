"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-black text-xl font-bold">
          R
        </div>
        <h1 className="mt-4 text-2xl font-bold">Get Early Access</h1>
        <p className="mt-2 text-muted">
          Join the waitlist for Reproducibility Radar. We&apos;ll email you when
          your spot opens up.
        </p>
      </div>

      {submitted ? (
        <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-6 text-center">
          <div className="text-accent text-2xl mb-2">✓</div>
          <h2 className="font-semibold">You&apos;re on the list!</h2>
          <p className="text-sm text-muted mt-1">
            We&apos;ll reach out soon with your early access invite.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-accent hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="text-sm text-muted block mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-muted block mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="jane@research.ai"
              className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-muted block mb-1">
              How do you discover ML papers? (optional)
            </label>
            <select className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-foreground">
              <option value="">Select…</option>
              <option>arXiv daily digest</option>
              <option>Twitter / X</option>
              <option>Papers With Code</option>
              <option>Hugging Face</option>
              <option>Reddit / HN</option>
              <option>Lab / team recommendations</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-accent py-2.5 font-medium text-black transition-colors hover:bg-accent/90"
          >
            Join Waitlist
          </button>
          <p className="text-xs text-muted text-center">
            No spam. We&apos;ll only email about your early access.
          </p>
        </form>
      )}
    </div>
  );
}
