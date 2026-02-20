"use client";
import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";

const suggestedDeps = [
  { name: "jsonwebtoken", category: "Auth" },
  { name: "bcrypt", category: "Crypto" },
  { name: "express", category: "Framework" },
  { name: "lodash", category: "Utility" },
  { name: "axios", category: "HTTP" },
  { name: "next", category: "Framework" },
  { name: "prisma", category: "ORM" },
  { name: "zod", category: "Validation" },
  { name: "passport", category: "Auth" },
  { name: "helmet", category: "Security" },
  { name: "cors", category: "Security" },
  { name: "mongoose", category: "ORM" },
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string[]>(["jsonwebtoken", "bcrypt", "express"]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);

  const toggle = (name: string) => {
    setSelected((s) => s.includes(name) ? s.filter((n) => n !== name) : [...s, name]);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold sm:text-3xl">Set Up Monitoring</h1>
          <p className="mt-2 text-zinc-400">Add your critical production dependencies in under 2 minutes</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${step >= s ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-500"}`}>
                {step > s ? "✓" : s}
              </div>
              {s < 3 && <div className={`h-0.5 flex-1 rounded ${step > s ? "bg-red-600" : "bg-zinc-800"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select dependencies to monitor</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {suggestedDeps.map((dep) => (
                <button
                  key={dep.name}
                  onClick={() => toggle(dep.name)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    selected.includes(dep.name)
                      ? "border-red-500/50 bg-red-500/10 text-red-400"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  <code>{dep.name}</code>
                  <span className="ml-2 text-xs text-zinc-500">{dep.category}</span>
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label className="text-sm text-zinc-400 mb-2 block">Or paste from package.json</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"dependencies": {"express": "^4.18.2", ...}}'
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-mono text-zinc-200 placeholder:text-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 h-28 resize-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500">{selected.length} selected</span>
              <button onClick={() => setStep(2)} className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Configure alerts</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 p-5">
                <h3 className="font-medium mb-3">Alert channels</h3>
                <div className="space-y-3">
                  {[
                    { name: "Email", desc: "team@company.com", checked: true },
                    { name: "Slack", desc: "#engineering-alerts", checked: true },
                    { name: "Webhook", desc: "Custom HTTP endpoint", checked: false },
                  ].map((ch) => (
                    <label key={ch.name} className="flex items-center gap-3 cursor-pointer">
                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${ch.checked ? "bg-red-600 border-red-600" : "border-zinc-600"}`}>
                        {ch.checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-3 w-3"><path d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{ch.name}</div>
                        <div className="text-xs text-zinc-500">{ch.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 p-5">
                <h3 className="font-medium mb-3">Alert threshold</h3>
                <div className="space-y-2">
                  {["Critical only", "Critical + High", "All risk levels"].map((opt, i) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${i === 1 ? "border-red-500" : "border-zinc-600"}`}>
                        {i === 1 && <div className="h-2 w-2 rounded-full bg-red-500" />}
                      </div>
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setStep(1)} className="text-sm text-zinc-400 hover:text-white transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8 text-emerald-500"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Monitoring Active</h2>
            <p className="text-zinc-400 mb-2">We&apos;re now monitoring {selected.length} dependencies for emerging risks.</p>
            <p className="text-sm text-zinc-500 mb-8">First scan results will appear within 5 minutes.</p>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 mb-6 text-left">
              <h3 className="text-sm font-medium mb-3">Monitoring summary</h3>
              <div className="flex flex-wrap gap-2">
                {selected.map((name) => (
                  <code key={name} className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300">{name}</code>
                ))}
              </div>
            </div>
            <Link href="/dashboard" className="inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
