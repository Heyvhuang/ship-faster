"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Get Your Security Audit</h1>
          <p className="mt-4 text-slate-400">
            Tell us about your AI agent and we&apos;ll send you a custom quote within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <div className="text-4xl">✓</div>
            <h2 className="mt-4 text-xl font-bold text-white">Request Received</h2>
            <p className="mt-2 text-slate-400">
              We&apos;ll review your submission and get back to you within 24 hours with a custom quote.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-[#1e293b] bg-[#111827] px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-[#1e293b] bg-[#111827] px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Company Name *
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-[#1e293b] bg-[#111827] px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Agent Type
              </label>
              <select className="w-full rounded-lg border border-[#1e293b] bg-[#111827] px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                <option value="">Select agent type...</option>
                <option>Customer Service Chatbot</option>
                <option>Internal Copilot / Assistant</option>
                <option>Autonomous Coding Agent</option>
                <option>RAG-powered Search</option>
                <option>Sales / Marketing Bot</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Agent URL or API Endpoint
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-[#1e293b] bg-[#111827] px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="https://api.example.com/chat or demo link"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tell us about your agent
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-[#1e293b] bg-[#111827] px-4 py-3 text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
                placeholder="What does your agent do? What data does it have access to? Any specific security concerns?"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Timeline
              </label>
              <select className="w-full rounded-lg border border-[#1e293b] bg-[#111827] px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                <option value="">When do you need results?</option>
                <option>ASAP — launching this week</option>
                <option>Within 2 weeks</option>
                <option>Within a month</option>
                <option>Just exploring options</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-500"
            >
              Request Audit Quote
            </button>

            <p className="text-center text-xs text-slate-600">
              We&apos;ll respond within 24 hours. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
