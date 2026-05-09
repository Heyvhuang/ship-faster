"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4">Request a Demo</h1>
              <p className="text-steel-light">
                See how Tungsten Monitor can protect your supply chain. Fill out the form and our team will reach out within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-card border border-success/30 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h2 className="text-xl font-bold mb-2">Thank you!</h2>
                <p className="text-steel-light">
                  We&apos;ve received your request. A member of our team will contact you within 24 hours to schedule your personalized demo.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="bg-card border border-card-border rounded-xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">First Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-navy-light border border-card-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Last Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-navy-light border border-card-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Work Email</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-navy-light border border-card-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Company</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-navy-light border border-card-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
                    placeholder="Acme Aerospace"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Job Title</label>
                  <input
                    type="text"
                    className="w-full bg-navy-light border border-card-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent"
                    placeholder="Director of Procurement"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Which tungsten grades do you source?</label>
                  <select className="w-full bg-navy-light border border-card-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent text-steel-light">
                    <option>APT (Ammonium Paratungstate)</option>
                    <option>Ferro-Tungsten</option>
                    <option>Tungsten Carbide Powder</option>
                    <option>Ammonium Metatungstate</option>
                    <option>Tungsten Concentrate</option>
                    <option>Multiple grades</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Message (optional)</label>
                  <textarea
                    rows={3}
                    className="w-full bg-navy-light border border-card-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent resize-none"
                    placeholder="Tell us about your tungsten supply chain needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-lg transition"
                >
                  Request Demo
                </button>
                <p className="text-xs text-steel text-center">
                  By submitting, you agree to our privacy policy. We&apos;ll never share your information.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
