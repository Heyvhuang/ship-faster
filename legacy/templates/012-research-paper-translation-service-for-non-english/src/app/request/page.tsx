"use client";

import { useState } from "react";

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-2">
          Request a Translation
        </h1>
        <p className="text-muted mb-8">
          Submit any AI research paper for priority translation into Chinese.
          Professional plan members get 48-hour turnaround.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-xl font-bold text-green-800 mb-2">
              Request Submitted
            </h2>
            <p className="text-green-700 mb-4">
              Your translation request has been received. You&apos;ll get an email
              notification when it&apos;s ready (estimated 48 hours).
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary hover:text-primary-light font-medium"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1">
                Paper URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://arxiv.org/abs/2401.12345"
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-muted mt-1">
                Accepts arXiv, Hugging Face Papers, OpenReview, or direct PDF links
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1">
                Paper Title
              </label>
              <input
                type="text"
                placeholder="e.g., Attention Is All You Need"
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1">
                Research Area
              </label>
              <select className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>Large Language Models</option>
                <option>Computer Vision</option>
                <option>Multimodal AI</option>
                <option>Reinforcement Learning</option>
                <option>Generative AI</option>
                <option>AI Safety</option>
                <option>AI for Science</option>
                <option>Natural Language Processing</option>
                <option>MLOps</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1">
                Priority Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { level: "Standard", time: "5 business days", desc: "Included in plan" },
                  { level: "Priority", time: "48 hours", desc: "Uses 1 priority request" },
                  { level: "Urgent", time: "24 hours", desc: "Team plan only" },
                ].map((p) => (
                  <label
                    key={p.level}
                    className="border border-border rounded-lg p-3 cursor-pointer hover:border-primary has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                  >
                    <input
                      type="radio"
                      name="priority"
                      defaultChecked={p.level === "Priority"}
                      className="sr-only"
                    />
                    <div className="text-sm font-semibold text-primary-dark">
                      {p.level}
                    </div>
                    <div className="text-xs text-accent">{p.time}</div>
                    <div className="text-xs text-muted">{p.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1">
                Special Instructions (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Any specific terminology preferences or context for the translator..."
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Submit Translation Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
