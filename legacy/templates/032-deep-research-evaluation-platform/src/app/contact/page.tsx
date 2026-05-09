"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const evalTypes = ["Quick Eval ($500)", "Standard Eval ($1,200)", "Enterprise ($2,000+)", "Not sure yet"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Request a Demo</h1>
          <p className="mt-4 text-lg text-muted">
            Tell us about your agent and we&apos;ll set up a pilot evaluation within 48 hours.
          </p>
        </div>

        {submitted ? (
          <div className="mt-16 rounded-xl border border-green-500/30 bg-green-500/5 p-10 text-center">
            <div className="text-4xl">✓</div>
            <h2 className="mt-4 text-xl font-semibold">Request Received</h2>
            <p className="mt-2 text-sm text-muted">
              We&apos;ll reach out within 24 hours to schedule your demo and pilot evaluation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Work Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
                  placeholder="jane@company.ai"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Company</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
                  placeholder="Acme AI"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Evaluation Tier</label>
                <select
                  required
                  className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="">Select a tier</option>
                  {evalTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Tell us about your agent
              </label>
              <textarea
                rows={4}
                required
                className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
                placeholder="What does your agent do? What framework is it built on? What are you hoping to learn from the evaluation?"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Agent Endpoint (optional)
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
                placeholder="https://api.yourcompany.ai/agent"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent-bright"
            >
              Submit Request
            </button>

            <p className="text-center text-xs text-muted">
              We&apos;ll never share your data. Read our privacy policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
