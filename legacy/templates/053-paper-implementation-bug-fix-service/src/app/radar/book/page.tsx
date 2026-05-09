"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function Book() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
          <span className="text-green-400 text-2xl">&#10003;</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Consultation Booked</h1>
        <p className="text-muted mb-8">
          We&apos;ll review your submission and reply within 24 hours with available time slots.
          Check your email for a confirmation.
        </p>
        <a
          href="/radar"
          className="text-sm text-accent hover:underline"
        >
          &larr; Back to home
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Free Consultation</h1>
      <p className="text-muted mb-12">
        Tell us about your bug. We&apos;ll assess the scope and get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            placeholder="Your company (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Which paper are you implementing?</label>
          <input
            type="text"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            placeholder='e.g., "Attention Is All You Need" or arXiv link'
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Framework</label>
          <select
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
            defaultValue=""
          >
            <option value="" disabled>
              Select framework
            </option>
            <option>PyTorch</option>
            <option>JAX / Flax</option>
            <option>TensorFlow / Keras</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Describe the bug</label>
          <textarea
            required
            rows={5}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-y"
            placeholder="What's the expected behavior? What's actually happening? Include error messages if applicable."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Repository link{" "}
            <span className="text-muted font-normal">(optional)</span>
          </label>
          <input
            type="url"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Estimated complexity</label>
          <div className="flex flex-wrap gap-3">
            {["Quick Fix ($500)", "Deep Diagnosis ($2,000)", "Full Review ($5,000)", "Not sure"].map(
              (option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted cursor-pointer hover:border-accent/30 has-[:checked]:border-accent has-[:checked]:text-foreground transition-colors"
                >
                  <input type="radio" name="complexity" value={option} className="sr-only" />
                  {option}
                </label>
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
        >
          Submit Request
        </button>
        <p className="text-xs text-muted text-center">
          Free consultation. No commitment. We&apos;ll reply within 24 hours.
        </p>
      </form>
    </div>
  );
}
