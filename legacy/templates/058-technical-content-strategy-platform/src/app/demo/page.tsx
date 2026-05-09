"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Demo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Nav />
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a demo</h1>
            <p className="text-muted">
              See how Radar can transform your developer content strategy. We&apos;ll walk you through
              a live report for your target vertical.
            </p>
          </div>

          {submitted ? (
            <div className="bg-surface border border-border rounded-xl p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-xl font-bold mb-2">Thanks for your interest!</h2>
              <p className="text-muted text-sm">
                We&apos;ll be in touch within 24 hours to schedule your demo. In the meantime, check out
                our{" "}
                <a href="/sample-report" className="text-teal hover:text-teal-dark">
                  sample report
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              className="bg-surface border border-border rounded-xl p-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">First name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Last name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Work email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Company</label>
                <input
                  type="text"
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Which technology verticals are you targeting?</label>
                <select
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal transition-colors text-muted"
                >
                  <option value="">Select a vertical</option>
                  <option>JavaScript / TypeScript Ecosystem</option>
                  <option>Python / ML / Data Science</option>
                  <option>DevOps / Infrastructure</option>
                  <option>Cloud Native / Kubernetes</option>
                  <option>Rust / Systems Programming</option>
                  <option>Mobile Development</option>
                  <option>AI / LLM Tooling</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Anything else we should know? <span className="text-muted font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal hover:bg-teal-dark text-background font-semibold py-3 rounded-lg transition-colors"
              >
                Request Demo
              </button>
              <p className="text-xs text-muted text-center">
                No spam. We&apos;ll reach out within one business day.
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
