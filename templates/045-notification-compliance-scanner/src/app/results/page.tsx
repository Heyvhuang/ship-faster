import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance Report — NotifyScan",
  description: "Sample notification compliance audit report for an iOS application.",
};

type Check = {
  rule: string;
  regulation: string;
  status: "pass" | "fail" | "warn";
  detail: string;
  fix?: string;
};

const checks: Check[] = [
  {
    rule: "UNNotification entitlement declared",
    regulation: "Apple",
    status: "pass",
    detail: "The app includes the push notification entitlement in its provisioning profile.",
  },
  {
    rule: "NSUserNotificationsUsageDescription present",
    regulation: "Apple",
    status: "pass",
    detail: 'Info.plist contains: "We send you updates about your orders and delivery status."',
  },
  {
    rule: "Permission justification is specific",
    regulation: "GDPR Art. 7",
    status: "fail",
    detail: 'The usage description "We may send you notifications" is too vague. GDPR requires specific purpose disclosure.',
    fix: "Update NSUserNotificationsUsageDescription to specify exact notification types (e.g., order updates, shipping alerts).",
  },
  {
    rule: "Consent collected before push registration",
    regulation: "GDPR Art. 6",
    status: "fail",
    detail: "Push notification registration (registerForRemoteNotifications) is called in application(_:didFinishLaunchingWithOptions:) before any user interaction.",
    fix: "Move push registration to after onboarding flow or first meaningful user action. Show a pre-permission screen explaining notification value.",
  },
  {
    rule: "Opt-out mechanism accessible",
    regulation: "CCPA §1798.120",
    status: "warn",
    detail: "No in-app notification preference screen detected. Users must use iOS Settings to manage notifications.",
    fix: "Add an in-app notification preferences screen accessible from Settings. Include toggle controls for each notification category.",
  },
  {
    rule: "No silent push without disclosure",
    regulation: "CCPA",
    status: "pass",
    detail: "Silent push notifications (content-available) are only used for background data sync, properly documented.",
  },
  {
    rule: "Notification categories declared",
    regulation: "Apple HIG",
    status: "pass",
    detail: "UNNotificationCategory objects are registered for: orders, promotions, account alerts.",
  },
  {
    rule: "Provisional notification handling",
    regulation: "Apple",
    status: "pass",
    detail: "App uses provisional authorization for non-critical updates, reducing permission prompt fatigue.",
  },
  {
    rule: "Data processing agreement reference",
    regulation: "GDPR Art. 28",
    status: "warn",
    detail: "No reference to a Data Processing Agreement for push notification service provider (APNs) found in privacy policy.",
    fix: "Add a section to your privacy policy documenting APNs as a data processor and the data shared (device tokens, notification content).",
  },
  {
    rule: "Right to withdraw consent",
    regulation: "GDPR Art. 7(3)",
    status: "fail",
    detail: "No mechanism to withdraw notification consent from within the app. GDPR requires consent withdrawal to be as easy as giving consent.",
    fix: "Implement an in-app unsubscribe flow that calls UNUserNotificationCenter.removeAllDeliveredNotifications() and unregisters from remote notifications.",
  },
  {
    rule: "Minor user protections",
    regulation: "GDPR Art. 8",
    status: "warn",
    detail: "No age gate detected. If the app serves users under 16, parental consent is required for notification data processing.",
    fix: "If your audience includes minors, implement age verification and parental consent flow before enabling notifications.",
  },
  {
    rule: "Do Not Sell disclosure",
    regulation: "CCPA §1798.115",
    status: "pass",
    detail: 'Privacy policy includes "Do Not Sell My Personal Information" link. Notification-related data (device tokens) covered.',
  },
];

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pass: "bg-green-500/10 text-green-400 border-green-500/20",
    fail: "bg-red-500/10 text-red-400 border-red-500/20",
    warn: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };
  const labels: Record<string, string> = { pass: "PASS", fail: "FAIL", warn: "WARN" };
  return (
    <span className={`inline-block rounded border px-2 py-0.5 font-mono text-xs ${map[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function ResultsPage() {
  const passCount = checks.filter((c) => c.status === "pass").length;
  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const score = Math.round((passCount / checks.length) * 100);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Compliance Report</p>
              <h1 className="mt-1 text-3xl font-bold">MyApp v2.1</h1>
              <p className="mt-1 font-mono text-sm text-zinc-500">com.example.myapp — Scanned Mar 17, 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className={`text-4xl font-bold ${score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                  {score}
                </p>
                <p className="text-xs text-zinc-500">Score</p>
              </div>
              <button className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 transition-colors">
                Export PDF
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 text-center">
              <p className="text-2xl font-bold text-green-400">{passCount}</p>
              <p className="text-xs text-zinc-500">Passed</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-center">
              <p className="text-2xl font-bold text-red-400">{failCount}</p>
              <p className="text-xs text-zinc-500">Failed</p>
            </div>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">{warnCount}</p>
              <p className="text-xs text-zinc-500">Warnings</p>
            </div>
          </div>

          {/* Checks */}
          <div className="mt-10 space-y-4">
            {checks.map((c, i) => (
              <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge status={c.status} />
                      <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400">
                        {c.regulation}
                      </span>
                    </div>
                    <h3 className="mt-2 font-semibold">{c.rule}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{c.detail}</p>
                    {c.fix && (
                      <div className="mt-3 rounded border border-zinc-800 bg-zinc-950 p-3">
                        <p className="text-xs font-medium text-green-400">Recommended Fix</p>
                        <p className="mt-1 text-xs text-zinc-400">{c.fix}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          <div className="mt-10 rounded-lg border border-green-500/20 bg-green-500/5 p-6 text-center">
            <h3 className="text-lg font-semibold">Get the Full Audit Report</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Upgrade to receive a downloadable PDF report with detailed regulation citations, code-level fix suggestions, and compliance certification badge.
            </p>
            <button className="mt-4 rounded-md bg-green-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-green-400 transition-colors">
              Unlock Full Report — $49
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
