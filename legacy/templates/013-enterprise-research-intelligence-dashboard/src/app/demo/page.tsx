"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900">Demo Request Received!</h1>
          <p className="mt-3 text-slate-500">
            Our team will reach out within 1 business day with a custom sample digest based on your research areas.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left info */}
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Request a Demo</h1>
            <p className="mt-4 text-lg text-slate-500">
              Tell us about your research focus areas and we&apos;ll prepare a custom sample digest showing exactly what ResearchPulse can do for your team.
            </p>
            <div className="mt-10 space-y-6">
              {[
                { title: "Custom Sample Digest", desc: "Receive a personalized digest within 3 business days based on your specific focus areas." },
                { title: "Live Dashboard Walkthrough", desc: "30-minute call with our team to explore the competitor tracking dashboard." },
                { title: "No Commitment", desc: "Free sample with no credit card required. See the value before you subscribe." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">First Name</label>
                <input
                  required
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Last Name</label>
                <input
                  required
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700">Work Email</label>
              <input
                required
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700">Company</label>
              <input
                required
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700">Job Title</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700">Research Focus Areas</label>
              <textarea
                required
                rows={3}
                placeholder="e.g., Medical imaging AI, FDA SaMD regulations, NLP for clinical trials..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700">
                Key Competitors to Track <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g., Google Health, Tempus, PathAI..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-700 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Request Demo
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
              No credit card required. We&apos;ll respond within 1 business day.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
