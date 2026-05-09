import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Features | Tungsten Supply Chain Monitor",
  description: "Weekly price indexes, supplier risk scoring, availability alerts, and more.",
};

const features = [
  {
    title: "Weekly Price Index",
    desc: "Track tungsten prices by grade (APT, Ferro-W, Carbide, AMT, Concentrate) and region (China, Europe, US, Global). Updated every Monday with intraweek flash alerts for significant moves.",
    details: ["APT 88.5% WO₃ benchmark pricing", "Ferro-Tungsten per kg tracking", "Carbide powder spot & contract prices", "Regional arbitrage analysis"],
  },
  {
    title: "Supplier Risk Scoring",
    desc: "Continuous monitoring of 50+ tungsten suppliers across financial health, geopolitical exposure, delivery performance, and capacity utilization.",
    details: ["Composite risk score (0–100)", "Financial stability monitoring", "Geopolitical risk overlay", "Delivery reliability tracking"],
  },
  {
    title: "Availability Alerts",
    desc: "Get notified the moment inventory drops below your custom threshold. SMS, email, and webhook delivery options.",
    details: ["Custom threshold by grade", "Multi-channel notifications", "Webhook for ERP integration", "Escalation policies"],
  },
  {
    title: "Historical Analytics",
    desc: "12-month lookback on all price data with trend analysis, seasonality patterns, and forward curve estimates.",
    details: ["Interactive trend charts", "Seasonality pattern detection", "YoY comparison views", "Forward price estimates"],
  },
  {
    title: "Market Outlook Reports",
    desc: "Quarterly reports from our analysts covering macroeconomic factors, policy changes, and demand forecasts.",
    details: ["China policy impact analysis", "Demand forecast by sector", "New mine/capacity pipeline", "Trade flow modeling"],
  },
  {
    title: "API & Integrations",
    desc: "REST API for programmatic access. Push data directly into your ERP, procurement, or BI systems.",
    details: ["RESTful JSON API", "Webhook real-time events", "CSV/PDF export", "SAP & Oracle connectors"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Everything You Need to Monitor Tungsten</h1>
            <p className="text-steel-light max-w-xl mx-auto">
              Purpose-built for procurement teams at aerospace and defense manufacturers.
            </p>
          </div>

          <div className="space-y-12">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-2xl font-bold mb-3">{f.title}</h2>
                  <p className="text-steel-light mb-4">{f.desc}</p>
                  <ul className="space-y-2">
                    {f.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm">
                        <span className="text-accent">→</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-card border border-card-border rounded-xl p-8 flex items-center justify-center min-h-[200px] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="text-center text-steel">
                    <div className="text-4xl mb-2">
                      {["📊", "🛡️", "🔔", "📈", "📋", "🔌"][i]}
                    </div>
                    <p className="text-sm font-medium">{f.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/demo"
              className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3.5 rounded-lg transition"
            >
              Request Demo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
