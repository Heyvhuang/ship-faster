import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const features = [
  {
    title: "IPA Binary Analysis",
    desc: "Upload your IPA file and we extract notification entitlements, permission requests, and justification strings directly from the binary.",
    icon: "📦",
  },
  {
    title: "Multi-Regulation Engine",
    desc: "Score your app against GDPR, CCPA, and Apple Human Interface Guidelines with pass/fail results for each rule.",
    icon: "⚖️",
  },
  {
    title: "Permission Text Audit",
    desc: "Detect missing or vague NSUserNotificationsUsageDescription strings that could trigger App Store rejections.",
    icon: "🔍",
  },
  {
    title: "Opt-in Timing Check",
    desc: "Flag premature notification permission requests that fire before meaningful user interaction—a GDPR red flag.",
    icon: "⏱️",
  },
  {
    title: "PDF Compliance Report",
    desc: "Generate exportable PDF audit reports formatted for legal teams, complete with regulation citations and fix recommendations.",
    icon: "📄",
  },
  {
    title: "Batch Scanning",
    desc: "Agencies managing multiple apps can scan entire portfolios in one session with consolidated reporting.",
    icon: "📊",
  },
];

const stats = [
  { value: "2,400+", label: "Apps Scanned" },
  { value: "98%", label: "Issue Detection Rate" },
  { value: "12", label: "Compliance Rules" },
  { value: "<30s", label: "Average Scan Time" },
];

const sampleChecks = [
  { rule: "UNNotification entitlement present", reg: "Apple", status: "pass" },
  { rule: "NSUserNotificationsUsageDescription set", reg: "Apple", status: "pass" },
  { rule: "Permission justification non-generic", reg: "GDPR", status: "fail" },
  { rule: "Consent collected before push registration", reg: "GDPR", status: "fail" },
  { rule: "Opt-out mechanism documented", reg: "CCPA", status: "warn" },
  { rule: "No silent push without disclosure", reg: "CCPA", status: "pass" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-block rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-400">
            Now supporting iOS 17 &amp; Xcode 15 entitlements
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Scan Your iOS App for{" "}
            <span className="text-green-400">Notification Compliance</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Upload an IPA file and get an instant audit against GDPR, CCPA, and Apple notification
            permission requirements. Fix issues before they become fines.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/scan"
              className="rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-green-400 transition-colors"
            >
              Scan Your App Free
            </Link>
            <Link
              href="/results"
              className="rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-zinc-500 transition-colors"
            >
              View Sample Report
            </Link>
          </div>
        </div>
      </section>

      {/* Live demo preview */}
      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 font-mono text-sm">
          <div className="mb-4 flex items-center gap-2 text-zinc-500">
            <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
            <span className="inline-block h-3 w-3 rounded-full bg-yellow-500" />
            <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2">notifyscan — compliance_report.json</span>
          </div>
          <div className="space-y-1.5">
            {sampleChecks.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={
                    c.status === "pass"
                      ? "text-green-400"
                      : c.status === "fail"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {c.status === "pass" ? "✓ PASS" : c.status === "fail" ? "✗ FAIL" : "⚠ WARN"}
                </span>
                <span className="text-zinc-500">[{c.reg}]</span>
                <span className="text-zinc-300">{c.rule}</span>
              </div>
            ))}
            <div className="mt-3 border-t border-zinc-800 pt-3 text-zinc-500">
              Score: <span className="text-yellow-400">67/100</span> — 2 critical issues found
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-green-400">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
            A complete compliance audit pipeline from binary extraction to legal-ready reports.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-12 text-center">
          <h2 className="text-2xl font-bold">Ready to audit your app?</h2>
          <p className="mt-3 text-zinc-400">
            Get your first basic scan free. Full audit reports start at $49 per app.
          </p>
          <Link
            href="/scan"
            className="mt-6 inline-block rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-green-400 transition-colors"
          >
            Upload Your IPA
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
