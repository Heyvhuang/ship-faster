import Link from "next/link";

const stats = [
  { label: "Backdoors Detected", value: "2,847" },
  { label: "Systems Scanned", value: "12,400+" },
  { label: "Avg Detection Time", value: "< 4 min" },
  { label: "False Positive Rate", value: "0.02%" },
];

const threats = [
  {
    name: "CVE-2023-35078 Residual Shell",
    severity: "Critical",
    desc: "Dormant web shell persisting after initial CVE-2023-35078 exploitation. Survives standard patching and remains undetected by conventional scanners.",
  },
  {
    name: "EPMM Config Backdoor",
    severity: "High",
    desc: "Modified configuration files that re-enable remote access after system restarts. Alters authentication modules to allow bypass credentials.",
  },
  {
    name: "Scheduled Task Persistence",
    severity: "High",
    desc: "Cron jobs and scheduled tasks installed during initial compromise that periodically re-establish command-and-control connections.",
  },
  {
    name: "API Token Exfiltration Hook",
    severity: "Critical",
    desc: "Injected middleware that silently copies API tokens and session data to external endpoints during normal EPMM operations.",
  },
  {
    name: "Certificate Manipulation",
    severity: "Medium",
    desc: "Rogue certificates installed alongside legitimate ones, enabling man-in-the-middle interception of managed device communications.",
  },
  {
    name: "Database Trigger Backdoor",
    severity: "Critical",
    desc: "Hidden database triggers that execute arbitrary commands when specific records are modified, providing persistent access through normal DB operations.",
  },
];

const steps = [
  {
    num: "01",
    title: "Deploy Scanner",
    desc: "Install our lightweight agent on your Ivanti EPMM server with a single command. No downtime required.",
  },
  {
    num: "02",
    title: "Automated Deep Scan",
    desc: "The scanner analyzes file systems, configurations, scheduled tasks, database triggers, and network connections.",
  },
  {
    num: "03",
    title: "Threat Report",
    desc: "Receive a detailed report of every detected backdoor with severity ratings and evidence artifacts.",
  },
  {
    num: "04",
    title: "Guided Remediation",
    desc: "Follow step-by-step remediation instructions to safely remove each threat without disrupting operations.",
  },
];

const logos = [
  "Acme Corp",
  "GlobalTech",
  "SecureNet",
  "Meridian Health",
  "Apex Finance",
  "Stratos Defense",
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 to-gray-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <div className="inline-block bg-red-600/20 border border-red-600/40 text-red-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            ⚠ Active Threat Advisory — Ivanti EPMM Backdoors Detected in the Wild
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Dormant Backdoors Are
            <br />
            <span className="text-red-500">Hiding in Your Ivanti Systems</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Standard patches don&apos;t remove backdoors planted during initial exploitation.
            IvantiShield performs deep forensic scans to find and eliminate every hidden threat
            before it activates.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg shadow-red-600/20"
            >
              Scan My Systems Now
            </Link>
            <Link
              href="/deploy"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              View Deployment Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold text-red-500">{s.value}</div>
              <div className="mt-1 text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">
            Trusted by security teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {logos.map((l) => (
              <span key={l} className="text-gray-600 font-semibold text-lg">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Threats */}
      <section id="threats" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              Known Ivanti EPMM <span className="text-red-500">Backdoor Signatures</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Our threat intelligence team continuously identifies new backdoor patterns.
              IvantiShield scans for all known signatures and behavioral anomalies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threats.map((t) => (
              <div
                key={t.name}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-800 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      t.severity === "Critical"
                        ? "bg-red-600/20 text-red-400"
                        : t.severity === "High"
                        ? "bg-orange-600/20 text-orange-400"
                        : "bg-yellow-600/20 text-yellow-400"
                    }`}
                  >
                    {t.severity}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900/50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              How <span className="text-red-500">IvantiShield</span> Works
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              From deployment to remediation in under 30 minutes. No downtime, no disruption.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative">
                <div className="text-5xl font-black text-red-600/20 mb-2">{s.num}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don&apos;t Wait for a Breach.<br />
            <span className="text-red-500">Scan Now.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Every day without scanning is another day attackers have silent access to your
            mobile device management infrastructure. Protect your organization today.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition shadow-lg shadow-red-600/20"
          >
            Get Emergency Scan — Starting at $499
          </Link>
        </div>
      </section>
    </div>
  );
}
