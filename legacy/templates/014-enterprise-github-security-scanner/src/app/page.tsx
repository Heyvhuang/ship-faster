"use client";
import Link from "next/link";
import { useState } from "react";

const vulnerabilities = [
  {
    repo: "fastapi-toolkit",
    stars: "12.4k",
    severity: "Critical",
    color: "text-critical",
    bg: "bg-critical/10 border-critical/30",
    cve: "CVE-2025-31842",
    desc: "SQL injection via unvalidated query parameters in ORM abstraction layer",
    lang: "Python",
  },
  {
    repo: "react-dashboard-pro",
    stars: "8.7k",
    severity: "High",
    color: "text-high",
    bg: "bg-high/10 border-high/30",
    cve: "CVE-2025-28911",
    desc: "Stored XSS through unsanitized SVG uploads in chart rendering component",
    lang: "TypeScript",
  },
  {
    repo: "node-auth-utils",
    stars: "5.2k",
    severity: "Critical",
    color: "text-critical",
    bg: "bg-critical/10 border-critical/30",
    cve: "CVE-2025-33017",
    desc: "Hardcoded JWT secret key and missing token expiry validation",
    lang: "JavaScript",
  },
];

const stats = [
  { value: "147", label: "Vulnerabilities Found This Month" },
  { value: "50+", label: "Trending Repos Scanned Weekly" },
  { value: "23", label: "Critical CVEs Identified" },
  { value: "98%", label: "Client Retention Rate" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)/15_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-critical/10 border border-critical/30 text-critical text-xs font-semibold px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-critical rounded-full animate-pulse" />
              3 Critical Vulnerabilities Found This Week
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
              Stop vulnerable GitHub repos{" "}
              <span className="text-primary">before</span> they reach production
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl">
              Weekly security intelligence that identifies trending repositories with known vulnerabilities — delivered to your inbox before your developers discover and copy them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#signup"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition text-center"
              >
                Get Free Security Briefing
              </Link>
              <Link
                href="/sample-report"
                className="border border-border hover:border-foreground/30 text-foreground/80 font-semibold px-8 py-3 rounded-lg transition text-center"
              >
                View Sample Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
              <p className="text-xs md:text-sm text-foreground/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Vulnerability Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            This Week&apos;s Trending Threats
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Real vulnerabilities found in repositories trending on GitHub right now. These repos are being starred, forked, and copied into production code today.
          </p>
        </div>

        <div className="grid gap-4">
          {vulnerabilities.map((v) => (
            <div
              key={v.repo}
              className={`border rounded-xl p-5 md:p-6 ${v.bg} flex flex-col md:flex-row md:items-center gap-4`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono font-bold text-white">{v.repo}</span>
                  <span className="text-foreground/40 text-sm">{v.lang}</span>
                  <span className="text-foreground/40 text-sm flex items-center gap-1">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>
                    {v.stars}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm">{v.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-foreground/40">{v.cve}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${v.color} bg-black/20`}>
                  {v.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How ShieldWatch Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "We Scan Trending Repos",
                desc: "Every week we analyze the top 50 trending GitHub repositories, cross-referencing against CVE databases and running static analysis.",
              },
              {
                step: "02",
                title: "Industry-Specific Assessment",
                desc: "We filter and prioritize findings relevant to your tech stack and industry vertical — fintech, healthcare, SaaS, and more.",
              },
              {
                step: "03",
                title: "Executive Briefing Delivered",
                desc: "Every Tuesday morning, your security team receives an actionable intelligence report with severity scores and developer communication templates.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-surface-light rounded-xl p-6 border border-border">
                <span className="text-primary font-mono text-sm font-bold">{item.step}</span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Existing Tools Miss This
          </h2>
          <p className="text-foreground/60">
            Traditional security scanners analyze code after it&apos;s already in your repository. ShieldWatch monitors trending repositories proactively — an intelligence approach vs. a scanning approach.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-surface rounded-xl p-6 border border-border">
            <p className="text-foreground/40 text-sm font-semibold mb-4 uppercase tracking-wide">Traditional Scanners</p>
            <ul className="space-y-3 text-sm text-foreground/60">
              {["Scan after code is committed", "React to known vulnerabilities", "Developer must adopt & configure", "No industry context"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-critical mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/30">
            <p className="text-primary text-sm font-semibold mb-4 uppercase tracking-wide">ShieldWatch Intelligence</p>
            <ul className="space-y-3 text-sm text-foreground/80">
              {["Catches threats before adoption", "Proactive trending repo monitoring", "Zero setup — delivered to your inbox", "Industry-specific threat assessments"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-low mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Signup */}
      <section id="signup" className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Free Security Briefing
            </h2>
            <p className="text-foreground/60 mb-8">
              Receive a complimentary intelligence report showing 2-3 vulnerable trending repositories relevant to your industry — delivered within 24 hours.
            </p>
            {submitted ? (
              <div className="bg-low/10 border border-low/30 rounded-xl p-6 text-low font-semibold">
                Thank you! Your first briefing will be delivered within 24 hours.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="work@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition whitespace-nowrap"
                >
                  Request Free Briefing
                </button>
              </form>
            )}
            <p className="text-xs text-foreground/30 mt-4">No credit card required. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Trusted by Security Leaders</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: "ShieldWatch caught a critical auth bypass in a trending Node.js library two weeks before one of our junior devs tried to add it to our payments service.", name: "Sarah Chen", role: "CISO, Meridian Financial" },
            { quote: "The Tuesday briefings have become essential reading for our entire security team. The industry-specific context saves us hours of triage.", name: "Marcus Rivera", role: "VP Engineering, HealthBridge" },
            { quote: "We prevented three potential supply chain incidents in Q4 alone. The ROI on the subscription is orders of magnitude.", name: "David Park", role: "Head of Security, ScaleOps" },
          ].map((t) => (
            <div key={t.name} className="bg-surface rounded-xl p-6 border border-border">
              <p className="text-foreground/70 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-white font-semibold text-sm">{t.name}</p>
              <p className="text-foreground/40 text-xs">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
