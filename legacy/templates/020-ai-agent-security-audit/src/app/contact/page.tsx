"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Get Your Security Audit
        </h1>
        <p className="mt-3 text-muted">
          Submit your agent details and we&apos;ll send you a quote within 24
          hours. First audit is free for qualifying startups.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-xl border border-accent-green/30 bg-accent-green/5 p-10 text-center">
            <div className="text-4xl">✓</div>
            <h2 className="mt-4 text-2xl font-bold">
              Request Received
            </h2>
            <p className="mt-3 text-muted">
              We&apos;ll review your submission and get back to you within 24
              hours with a custom quote and next steps.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 rounded-xl border border-card-border bg-card p-6 sm:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Company Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
                placeholder="Acme Inc"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Agent Type
              </label>
              <select
                required
                className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent-blue focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select agent type
                </option>
                <option>Customer Service Chatbot</option>
                <option>Sales / Lead Gen Bot</option>
                <option>Internal Knowledge Assistant</option>
                <option>Code Generation Agent</option>
                <option>Autonomous Task Agent</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Agent Endpoint or Demo URL
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
                placeholder="https://your-agent.com/api/chat"
              />
              <p className="mt-1 text-xs text-muted">
                Optional. You can also provide this later.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Additional Details
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent-blue focus:outline-none"
                placeholder="Tell us about your agent, what it does, and any specific security concerns..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                How did you hear about us?
              </label>
              <select
                className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent-blue focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                <option>Twitter / X</option>
                <option>LinkedIn</option>
                <option>Product Hunt</option>
                <option>Referral</option>
                <option>Google Search</option>
                <option>AI/ML Conference</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-accent-blue py-3 font-medium text-white transition hover:bg-accent-blue/90"
            >
              Submit for Quote
            </button>
            <p className="text-center text-xs text-muted">
              We&apos;ll respond within 24 hours. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
