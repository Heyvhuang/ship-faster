import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — IvantiShield Backdoor Detection Scanner",
  description:
    "Emergency scan pricing for Ivanti EPMM backdoor detection. Protect your systems starting at $499.",
};

const plans = [
  {
    name: "Emergency Scan",
    price: "$499",
    period: "per scan",
    desc: "Single system scan with full threat report",
    features: [
      "1 EPMM server scan",
      "All known backdoor signatures",
      "Detailed threat report (PDF)",
      "Severity-ranked findings",
      "24-hour scan turnaround",
      "Email support",
    ],
    cta: "Start Emergency Scan",
    highlight: false,
  },
  {
    name: "Enterprise Scan",
    price: "$1,299",
    period: "per scan",
    desc: "Multi-server scan with guided remediation",
    features: [
      "Up to 5 EPMM servers",
      "All known + behavioral signatures",
      "Detailed threat report (PDF + JSON)",
      "Remediation playbook",
      "4-hour priority turnaround",
      "Dedicated security engineer",
      "Post-remediation verification scan",
    ],
    cta: "Start Enterprise Scan",
    highlight: true,
  },
  {
    name: "Continuous Protection",
    price: "$1,999",
    period: "per month",
    desc: "Ongoing monitoring and weekly scans",
    features: [
      "Unlimited EPMM servers",
      "Weekly automated scans",
      "Real-time threat signature updates",
      "Instant alert notifications",
      "Dedicated security team",
      "Compliance-ready reporting",
      "SLA-backed response times",
      "Quarterly threat briefings",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "How long does a scan take?",
    a: "A typical scan completes in under 15 minutes per server. Results are available immediately in the dashboard, and PDF reports are generated within the selected turnaround window.",
  },
  {
    q: "Do I need to provide root access?",
    a: "The scanner agent requires read-only access to the file system, database, and cron configuration. No write access is needed during scanning. We provide a minimal-privilege setup guide.",
  },
  {
    q: "Will scanning cause downtime?",
    a: "No. The scanner is designed as a read-only, low-overhead agent that does not modify any files or configurations. Your EPMM systems continue operating normally during the scan.",
  },
  {
    q: "What happens if threats are found?",
    a: "You receive a detailed report with each threat's location, severity, evidence artifacts, and step-by-step remediation instructions. Enterprise plans include guided remediation with a security engineer.",
  },
  {
    q: "Can I scan systems that have already been patched?",
    a: "Absolutely — that's exactly what IvantiShield is designed for. Standard patches close the initial vulnerability but don't remove backdoors planted during exploitation. Scanning post-patch is critical.",
  },
];

export default function Pricing() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Scan Pricing
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the scan tier that matches your deployment size.
            Every minute counts — start protecting your systems today.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl p-8 flex flex-col ${
                p.highlight
                  ? "bg-gradient-to-b from-red-950/60 to-gray-900 border-2 border-red-600 relative"
                  : "bg-gray-900 border border-gray-800"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{p.desc}</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-bold text-white">{p.price}</span>
                <span className="text-gray-400 ml-2 text-sm">/{p.period}</span>
              </div>
              <ul className="space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-red-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className={`mt-8 text-center py-3 rounded-lg font-semibold transition ${
                  p.highlight
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                    : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">{f.q}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
