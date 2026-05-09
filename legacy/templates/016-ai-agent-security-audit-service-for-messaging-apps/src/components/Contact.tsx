"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Book Your Security Assessment
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Get a free initial assessment of your AI agent&apos;s security posture. We&apos;ll identify if your deployment is vulnerable within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">Assessment Request Received</h3>
            <p className="mt-2 text-slate-600">We&apos;ll review your submission and respond within 24 hours.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-white rounded-xl border border-slate-200 p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-accent/20 focus:border-red-accent outline-none transition"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-accent/20 focus:border-red-accent outline-none transition"
                  placeholder="jane@company.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-accent/20 focus:border-red-accent outline-none transition"
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <label htmlFor="agent" className="block text-sm font-medium text-slate-700 mb-1">
                AI Agent Details
              </label>
              <textarea
                id="agent"
                rows={4}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-accent/20 focus:border-red-accent outline-none transition resize-none"
                placeholder="Describe your AI agent(s): what platforms they run on, what data they access, and any specific security concerns..."
              />
            </div>
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-slate-700 mb-1">
                Messaging Platform(s)
              </label>
              <select
                id="platform"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-accent/20 focus:border-red-accent outline-none transition bg-white"
              >
                <option value="">Select platform</option>
                <option value="slack">Slack</option>
                <option value="teams">Microsoft Teams</option>
                <option value="discord">Discord</option>
                <option value="whatsapp">WhatsApp Business</option>
                <option value="custom">Custom / Other</option>
                <option value="multiple">Multiple Platforms</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-red-accent text-white font-semibold rounded-lg hover:bg-red-dark transition-colors text-base"
            >
              Request Free Assessment
            </button>
            <p className="text-xs text-slate-500 text-center">
              No commitment required. We&apos;ll provide an initial risk assessment within 24 hours.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
