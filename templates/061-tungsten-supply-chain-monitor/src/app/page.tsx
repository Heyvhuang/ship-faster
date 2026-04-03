import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const priceData = [
  { grade: "APT (88.5% WO₃)", region: "China", price: "$315.20", change: "+2.4%", trend: "up" },
  { grade: "Ferro-Tungsten", region: "Europe", price: "$42.80/kg", change: "+1.1%", trend: "up" },
  { grade: "Tungsten Carbide Powder", region: "US", price: "$38.50/kg", change: "-0.6%", trend: "down" },
  { grade: "Ammonium Metatungstate", region: "Global", price: "$328.00", change: "+3.2%", trend: "up" },
  { grade: "Tungsten Concentrate (65%)", region: "China", price: "$148.50", change: "+0.8%", trend: "up" },
];

const suppliers = [
  { name: "Xiamen Tungsten Co.", country: "China", risk: 32, status: "Low Risk" },
  { name: "Global Tungsten & Powders", country: "USA", risk: 18, status: "Low Risk" },
  { name: "H.C. Starck", country: "Germany", risk: 24, status: "Low Risk" },
  { name: "Sandvik AB", country: "Sweden", risk: 41, status: "Medium Risk" },
  { name: "Wolfram Bergbau", country: "Austria", risk: 22, status: "Low Risk" },
];

const testimonials = [
  {
    quote: "Tungsten Monitor saved us from a 6-week supply disruption. The early warning system paid for itself in the first month.",
    name: "Sarah Chen",
    title: "VP Supply Chain, Northrop Dynamics",
  },
  {
    quote: "We reduced our tungsten procurement costs by 12% using the price trend analytics. Essential tool for our sourcing team.",
    name: "James Rodriguez",
    title: "Director of Procurement, AeroCore Systems",
  },
  {
    quote: "The supplier risk scoring helped us diversify our tungsten sourcing before trade restrictions hit. Invaluable foresight.",
    name: "Dr. Marcus Weber",
    title: "Materials Director, Titan Defense Group",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-background to-navy-light" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full mb-6 border border-accent/20">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                Live pricing updated 4 min ago
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Never Run Out of{" "}
                <span className="text-accent">Tungsten</span>
              </h1>
              <p className="text-lg sm:text-xl text-steel-light mb-8 max-w-2xl">
                Real-time pricing, supplier risk intelligence, and availability alerts for aerospace and defense manufacturers who depend on predictable tungsten sourcing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3.5 rounded-lg text-center transition"
                >
                  Request Demo
                </Link>
                <Link
                  href="/dashboard"
                  className="border border-card-border hover:border-steel text-steel-light hover:text-white font-medium px-8 py-3.5 rounded-lg text-center transition"
                >
                  View Live Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-navy py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Supply Chain Risk is Growing</h2>
              <p className="text-steel-light max-w-2xl mx-auto">
                85% of global tungsten production is concentrated in China. One export restriction, one policy shift, and your production line stops.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: "85%", label: "of tungsten mined in China", desc: "Extreme geographic concentration creates single-point-of-failure risk" },
                { stat: "47%", label: "price volatility (2024)", desc: "Unpredictable price swings make budgeting and forward-planning difficult" },
                { stat: "6-12 wks", label: "average lead time increase", desc: "Delivery delays have doubled since 2022 due to logistics bottlenecks" },
              ].map((item) => (
                <div key={item.stat} className="bg-card border border-card-border rounded-xl p-6">
                  <p className="text-3xl font-bold text-accent mb-1">{item.stat}</p>
                  <p className="font-semibold mb-2">{item.label}</p>
                  <p className="text-sm text-steel-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution — Dashboard Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Tungsten Intelligence Dashboard</h2>
              <p className="text-steel-light max-w-2xl mx-auto">
                Live pricing by grade and region, supplier risk scores, and custom availability alerts — all in one place.
              </p>
            </div>
            {/* Mock dashboard */}
            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div className="border-b border-card-border px-6 py-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-4 text-sm text-steel">Tungsten Monitor — Weekly Price Index</span>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-steel text-left border-b border-card-border">
                      <th className="pb-3 font-medium">Grade</th>
                      <th className="pb-3 font-medium">Region</th>
                      <th className="pb-3 font-medium text-right">Price (MTU/kg)</th>
                      <th className="pb-3 font-medium text-right">7d Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData.map((row) => (
                      <tr key={row.grade} className="border-b border-card-border/50 hover:bg-navy-light/50 transition">
                        <td className="py-3 font-medium">{row.grade}</td>
                        <td className="py-3 text-steel-light">{row.region}</td>
                        <td className="py-3 text-right font-mono">{row.price}</td>
                        <td className={`py-3 text-right font-mono ${row.trend === "up" ? "text-success" : "text-danger"}`}>
                          {row.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Supplier Risk */}
        <section className="bg-navy py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Supplier Risk Scoring</h2>
                <p className="text-steel-light mb-6">
                  We monitor 50+ tungsten suppliers globally, scoring each on financial stability, geopolitical risk, delivery reliability, and capacity utilization.
                </p>
                <ul className="space-y-3 text-sm">
                  {["Real-time risk score updates", "Geopolitical event impact analysis", "Financial health monitoring", "Delivery performance tracking", "Capacity utilization alerts"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-success">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="text-sm font-medium text-steel mb-4">Top Suppliers — Risk Assessment</h3>
                <div className="space-y-4">
                  {suppliers.map((s) => (
                    <div key={s.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-steel">{s.country}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-navy-light rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${s.risk < 30 ? "bg-success" : s.risk < 50 ? "bg-warning" : "bg-danger"}`}
                            style={{ width: `${s.risk}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${s.risk < 30 ? "text-success" : s.risk < 50 ? "text-warning" : "text-danger"}`}>
                          {s.risk}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Built for Aerospace & Defense</h2>
            <p className="text-steel-light max-w-2xl mx-auto mb-12">
              Designed specifically for procurement teams, supply chain managers, and materials engineers at defense and aerospace manufacturers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🏭", title: "OEMs", desc: "Primes and Tier 1 manufacturers" },
                { icon: "✈️", title: "Aerospace", desc: "Turbine blade & tooling producers" },
                { icon: "🛡️", title: "Defense", desc: "Armor-piercing & munitions manufacturers" },
                { icon: "⚙️", title: "Industrial", desc: "Cutting tool & wear part makers" },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-card-border rounded-xl p-6">
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-steel-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="bg-navy py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-steel-light max-w-2xl mx-auto">
                Choose the plan that fits your monitoring needs. All plans include the weekly price index.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Basic",
                  price: "$500",
                  desc: "Essential tungsten price tracking",
                  features: ["Weekly price index (all grades)", "5 supplier risk profiles", "Email availability alerts", "12-month price history", "Monthly market summary"],
                },
                {
                  name: "Pro",
                  price: "$1,200",
                  desc: "Advanced analytics & alerts",
                  features: ["Everything in Basic", "25 supplier risk profiles", "Real-time SMS & email alerts", "Custom grade tracking", "Quarterly market outlook report", "API access for ERP integration"],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "Full-service supply intelligence",
                  features: ["Everything in Pro", "50+ supplier profiles", "Dedicated account manager", "Custom reporting & analytics", "Supply chain disruption modeling", "Quarterly business reviews"],
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`bg-card border rounded-xl p-6 flex flex-col ${
                    tier.popular ? "border-accent ring-1 ring-accent" : "border-card-border"
                  }`}
                >
                  {tier.popular && (
                    <span className="self-start text-xs font-semibold bg-accent text-white px-2 py-0.5 rounded mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-steel-light mb-4">{tier.desc}</p>
                  <p className="text-3xl font-bold mb-1">
                    {tier.price}
                    {tier.price !== "Custom" && <span className="text-sm font-normal text-steel">/mo</span>}
                  </p>
                  <ul className="mt-6 space-y-2 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-steel-light">
                        <span className="text-success mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/demo"
                    className={`mt-6 text-center py-2.5 rounded-lg font-medium text-sm transition ${
                      tier.popular
                        ? "bg-accent hover:bg-accent-hover text-white"
                        : "border border-card-border hover:border-steel text-steel-light hover:text-white"
                    }`}
                  >
                    {tier.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Defense & Aerospace Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-card border border-card-border rounded-xl p-6">
                  <p className="text-sm text-steel-light mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-steel">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-accent/20 via-navy to-accent/20 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Secure Your Tungsten Supply Chain</h2>
            <p className="text-steel-light mb-8">
              Join the manufacturers who never get caught off guard by tungsten supply disruptions.
            </p>
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
