"use client";

import Link from "next/link";
import { useState } from "react";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [plan, setPlan] = useState("full");

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-lg text-slate-900">Radar</span>
            </Link>
          </div>
        </nav>
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Idea Submitted!</h1>
          <p className="text-lg text-slate-600 mb-2">
            We&apos;re matching you with the best expert for your domain.
          </p>
          <p className="text-slate-500 mb-8">
            You&apos;ll receive an email confirmation within 1 hour, and your validation report within 48 hours.
          </p>
          <Link href="/" className="text-blue-600 font-medium hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg text-slate-900">Radar</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Submit your startup idea</h1>
        <p className="text-slate-600 mb-10">
          Fill out the details below and we&apos;ll match you with an expert validator within 1 hour.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-6"
        >
          {/* Plan selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Validation Plan</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "basic", label: "Basic", price: "$97" },
                { id: "full", label: "Full", price: "$197" },
                { id: "premium", label: "Premium", price: "$297" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  className={`p-3 rounded-xl border text-center transition ${
                    plan === p.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="font-semibold">{p.label}</div>
                  <div className="text-sm">{p.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="jane@startup.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Idea Title <span className="text-slate-400">(one sentence)</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="e.g., Marketplace for startup idea validation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Describe your idea
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
              placeholder="What problem does it solve? Who is it for? How does it work?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Market</label>
            <select
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition bg-white"
            >
              <option value="">Select a market</option>
              <option>SaaS / B2B Software</option>
              <option>Consumer / Social</option>
              <option>Marketplace</option>
              <option>Fintech</option>
              <option>E-commerce / D2C</option>
              <option>AI / Machine Learning</option>
              <option>Developer Tools</option>
              <option>Health & Wellness</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Known Competitors <span className="text-slate-400">(if any)</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              placeholder="e.g., Competitor A, Competitor B"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Your Core Hypothesis
            </label>
            <textarea
              required
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
              placeholder="e.g., Founders will pay $200 for data-backed validation because they currently spend $5K+ building MVPs for untested ideas."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition"
          >
            Submit & Continue to Payment
          </button>

          <p className="text-xs text-slate-400 text-center">
            You won&apos;t be charged until you confirm payment on the next step. 100% money-back guarantee.
          </p>
        </form>
      </div>
    </div>
  );
}
