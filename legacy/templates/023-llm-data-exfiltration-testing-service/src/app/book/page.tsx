"use client";

import Link from "next/link";

export default function BookPage() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-mono font-bold text-sm">
              EG
            </div>
            <span className="font-semibold text-lg tracking-tight">
              ExfilGuard
            </span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Book Your Free Assessment
          </h1>
          <p className="mt-4 text-slate-400 text-center text-lg">
            30 minutes. No commitment. We&apos;ll identify your highest-risk
            LLM exfiltration vectors.
          </p>

          <form
            className="mt-12 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Acme Corp"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Role
              </label>
              <select className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Select your role</option>
                <option>CTO / VP Engineering</option>
                <option>CISO / Security Lead</option>
                <option>DevSecOps Engineer</option>
                <option>Engineering Manager</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Which messaging platforms do your LLM agents use?
              </label>
              <div className="flex flex-wrap gap-3">
                {["Slack", "Microsoft Teams", "Discord", "Other"].map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm cursor-pointer hover:border-slate-500 transition"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-slate-600"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Briefly describe your LLM agent setup
              </label>
              <textarea
                rows={4}
                placeholder="e.g., We use a GPT-4 agent in Slack connected to our CRM and knowledge base for customer support triage..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3.5 rounded-lg text-base transition"
            >
              Request Free Assessment Call
            </button>

            <p className="text-xs text-slate-500 text-center">
              We&apos;ll respond within 24 hours with available time slots.
              Your information is kept strictly confidential.
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
