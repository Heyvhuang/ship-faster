"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-xl px-4">
          <h1 className="text-3xl font-bold text-center">Contact Us</h1>
          <p className="mt-3 text-center text-zinc-400">
            Questions about compliance consulting, enterprise plans, or partnership opportunities? We&apos;d love to hear from you.
          </p>

          {!submitted ? (
            <form
              className="mt-10 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-300">Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300">Inquiry Type</label>
                <select className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
                  <option>Compliance Consulting</option>
                  <option>Enterprise Plan</option>
                  <option>Partnership</option>
                  <option>Bug Report</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300">Company</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Acme Inc. (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300">Message</label>
                <textarea
                  required
                  rows={5}
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Tell us about your compliance needs..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 py-3 text-sm font-semibold text-zinc-950 hover:bg-green-400 transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          ) : (
            <div className="mt-10 rounded-lg border border-green-500/20 bg-green-500/5 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400 text-2xl">
                ✓
              </div>
              <h2 className="text-xl font-semibold">Message Sent</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Thanks for reaching out. We typically respond within 24 hours on business days.
              </p>
            </div>
          )}

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <p className="text-sm font-semibold text-zinc-300">Email</p>
              <p className="mt-1 font-mono text-sm text-green-400">hello@notifyscan.com</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <p className="text-sm font-semibold text-zinc-300">Response Time</p>
              <p className="mt-1 text-sm text-zinc-400">Within 24 hours (business days)</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
