"use client";

import { useState } from "react";
import { categoryLabels, type Category } from "@/data/decisions";

const categories: Category[] = [
  "database", "caching", "ci-cd", "cloud", "monitoring", "messaging", "auth", "hosting",
];

const clouds = ["AWS", "GCP", "Azure", "Vercel", "Other"];

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    tool: "",
    category: "" as Category | "",
    cloud: "",
    regretScore: 3,
    oneLiner: "",
    fullAdvice: "",
    companyStage: "",
    teamSize: "",
    name: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Decision Submitted!</h1>
        <p className="text-slate-500 mb-8">
          Thanks for sharing your experience. Your submission will be reviewed and published shortly.
        </p>
        <a href="/" className="text-red-500 hover:text-red-600 font-medium">
          Back to all decisions
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Submit a Decision</h1>
      <p className="text-slate-500 mb-8">
        Share your infrastructure decision in under 2 minutes. Help other founders make better choices.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tool / Service Name</label>
            <input
              required
              type="text"
              placeholder="e.g. PostgreSQL, Kubernetes"
              value={form.tool}
              onChange={(e) => setForm({ ...form, tool: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{categoryLabels[c]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cloud Provider</label>
            <select
              required
              value={form.cloud}
              onChange={(e) => setForm({ ...form, cloud: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select cloud</option>
              {clouds.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Regret Score: <span className="font-bold text-lg">{form.regretScore}/5</span>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={form.regretScore}
              onChange={(e) => setForm({ ...form, regretScore: Number(e.target.value) })}
              className="w-full mt-2 accent-red-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>No regret</span>
              <span>Massive regret</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">One-Liner Summary</label>
          <input
            required
            type="text"
            maxLength={120}
            placeholder="One sentence capturing your experience"
            value={form.oneLiner}
            onChange={(e) => setForm({ ...form, oneLiner: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-xs text-slate-400 mt-1">{form.oneLiner.length}/120</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Advice</label>
          <textarea
            required
            rows={5}
            placeholder="What happened? What would you do differently? What should others know?"
            value={form.fullAdvice}
            onChange={(e) => setForm({ ...form, fullAdvice: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Stage</label>
            <select
              required
              value={form.companyStage}
              onChange={(e) => setForm({ ...form, companyStage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select stage</option>
              <option value="Pre-seed">Pre-seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Team Size</label>
            <select
              required
              value={form.teamSize}
              onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select size</option>
              <option value="1-2">1-2</option>
              <option value="3-5">3-5</option>
              <option value="5-10">5-10</option>
              <option value="10-25">10-25</option>
              <option value="25+">25+</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
            <input
              required
              type="text"
              placeholder="Alex K."
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role & Company</label>
            <input
              required
              type="text"
              placeholder="CTO @ StartupName"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Submit Decision
        </button>
      </form>
    </div>
  );
}
