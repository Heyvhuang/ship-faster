import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ShieldWatch and our mission to protect enterprise software supply chains through proactive GitHub security intelligence.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Proactive Security Intelligence for the Modern Enterprise
        </h1>
        <p className="text-lg text-foreground/60 leading-relaxed">
          ShieldWatch was founded on a simple observation: security teams spend millions scanning code that&apos;s already in their repositories, while trending open-source libraries with known vulnerabilities get copied into production every day without anyone noticing.
        </p>
      </div>

      {/* Founder */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 mb-20">
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 border border-border flex items-center justify-center mb-4">
            <svg className="w-20 h-20 text-primary/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Alex Mercer</h2>
          <p className="text-primary text-sm font-medium">Founder &amp; CEO</p>
        </div>
        <div className="md:col-span-3">
          <div className="space-y-4 text-foreground/60 text-sm leading-relaxed">
            <p>
              With 12 years in application security, Alex previously led the AppSec team at a Fortune 500 financial services company, where he managed vulnerability assessment for over 400 internal applications and 2,000+ open-source dependencies.
            </p>
            <p>
              Before that, Alex spent five years as a senior security researcher at a leading cybersecurity firm, where he discovered and responsibly disclosed 14 CVEs in widely-used open-source libraries. His work on supply chain security has been presented at Black Hat, DEF CON, and RSA Conference.
            </p>
            <p>
              Alex holds a CISSP, OSCP, and a Master&apos;s degree in Computer Science from Carnegie Mellon University. He is a regular contributor to OWASP projects and serves on the advisory board of the Open Source Security Foundation (OpenSSF).
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            {["CISSP", "OSCP", "GWAPT", "CEH"].map((cert) => (
              <span key={cert} className="text-xs font-mono bg-surface-light border border-border px-3 py-1 rounded-full text-foreground/50">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & values */}
      <div className="bg-surface border border-border rounded-xl p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Approach</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Intelligence Over Scanning",
              desc: "We don't just find vulnerabilities — we contextualize them for your industry, assess business impact, and deliver actionable recommendations your team can act on immediately.",
            },
            {
              title: "Proactive, Not Reactive",
              desc: "By monitoring what's trending on GitHub before your developers discover it, we create a security buffer that traditional tools simply cannot provide.",
            },
            {
              title: "Executive-Ready Output",
              desc: "Our briefings are designed for security leaders who need to communicate risk to both technical teams and business stakeholders — clear, concise, and actionable.",
            },
          ].map((v) => (
            <div key={v.title}>
              <h3 className="text-white font-semibold mb-2">{v.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Industries We Serve</h2>
        <p className="text-foreground/50 max-w-xl mx-auto text-sm">
          Our intelligence is tailored to the specific technology stacks, compliance requirements, and threat landscapes of each vertical.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
        {[
          { name: "Fintech", icon: "💳" },
          { name: "Healthcare", icon: "🏥" },
          { name: "SaaS", icon: "☁️" },
          { name: "E-Commerce", icon: "🛒" },
        ].map((ind) => (
          <div key={ind.name} className="bg-surface border border-border rounded-xl p-6 text-center">
            <span className="text-3xl">{ind.icon}</span>
            <p className="text-white font-semibold mt-2 text-sm">{ind.name}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/#signup"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Get Your Free Security Briefing
        </Link>
      </div>
    </div>
  );
}
