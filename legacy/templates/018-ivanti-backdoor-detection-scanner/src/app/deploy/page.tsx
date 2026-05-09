import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deployment Guide — IvantiShield Backdoor Detection Scanner",
  description:
    "Deploy the IvantiShield scanner on your Ivanti EPMM systems in minutes. Step-by-step instructions for immediate backdoor detection.",
};

const requirements = [
  "Ivanti EPMM (MobileIron Core) version 11.x or 12.x",
  "SSH access to the EPMM server (read-only user sufficient)",
  "Linux-based host (RHEL, CentOS, Ubuntu)",
  "Minimum 512 MB available RAM during scan",
  "Network access for signature update download (optional)",
];

const steps = [
  {
    title: "Download the Scanner Agent",
    code: "curl -sSL https://get.ivantishield.com/agent | bash",
    note: "The installer verifies the binary signature automatically. Requires curl and bash.",
  },
  {
    title: "Configure Access Credentials",
    code: `ivantishield config set \\
  --epmm-host epmm-prod-01.internal \\
  --db-readonly-user scanner \\
  --db-readonly-pass <password>`,
    note: "Use a read-only database user. The scanner never writes to your database or modifies files.",
  },
  {
    title: "Run the Scan",
    code: "ivantishield scan --full --output json,pdf",
    note: "A full scan typically completes in 3–15 minutes depending on deployment size.",
  },
  {
    title: "View Results",
    code: "ivantishield report --open",
    note: "Results are also available in the web dashboard at app.ivantishield.com/dashboard.",
  },
];

export default function Deploy() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Deployment Guide</h1>
        <p className="text-gray-400 text-lg mb-12">
          Get IvantiShield running on your systems in under 5 minutes.
          The scanner operates in read-only mode and causes zero downtime.
        </p>

        {/* Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">System Requirements</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <ul className="space-y-3">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="text-red-500 mt-0.5">●</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.title}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600/20 text-red-400 text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                </div>
                <div className="ml-11">
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre">
                    {s.code}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Advanced Options</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="px-5 py-3 font-medium">Flag</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["--full", "Run all scan modules (filesystem, config, database, network)"],
                  ["--quick", "Filesystem and config scan only (~2 min)"],
                  ["--output <fmt>", "Output format: json, pdf, csv, or html"],
                  ["--air-gapped", "Skip signature update download, use bundled signatures"],
                  ["--threads <n>", "Number of parallel scan threads (default: 4)"],
                  ["--exclude <path>", "Exclude directories from filesystem scan"],
                  ["--verbose", "Enable detailed logging for troubleshooting"],
                ].map(([flag, desc]) => (
                  <tr key={flag} className="border-b border-gray-800/50">
                    <td className="px-5 py-3 font-mono text-red-400 whitespace-nowrap">{flag}</td>
                    <td className="px-5 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Support */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Need Help Deploying?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Our security engineers can assist with deployment on complex environments.
            Enterprise plans include white-glove onboarding.
          </p>
          <a
            href="mailto:support@ivantishield.com"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
}
