import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample Validation Report — Radar",
  description: "See what a Radar validation report looks like with real market data and competitor analysis.",
};

export default function ReportSamplePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg text-slate-900">Radar</span>
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Get Your Report
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          This is a sample report for demonstration purposes. Your report will be customized to your specific idea.
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-medium">Full Validation</span>
            <span>·</span>
            <span>Delivered March 15, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Validation Report: &ldquo;PetMatch&rdquo;
          </h1>
          <p className="text-lg text-slate-600">
            AI-powered pet adoption matching platform connecting shelters with adopters
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span>Expert: <strong className="text-slate-700">Sarah Chen</strong></span>
            <span>·</span>
            <span>Domain: Marketplace / Consumer</span>
          </div>
        </div>

        {/* Verdict */}
        <div className="mb-12 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">✅</span>
            <h2 className="text-xl font-bold text-slate-900">Verdict: Conditional GO</h2>
          </div>
          <p className="text-slate-700 leading-relaxed">
            The idea has strong market fundamentals and a clear underserved need. However, the AI matching component needs validation with shelter operators before building. Recommend launching with manual matching first, then layering AI. The market is large enough to support a venture-scale business if executed correctly.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Market Size */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>📊</span> Market Size Analysis
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <div className="text-2xl font-bold text-slate-900">$320B</div>
                <div className="text-xs text-slate-500 mt-1">TAM (US Pet Industry)</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <div className="text-2xl font-bold text-slate-900">$4.2B</div>
                <div className="text-xs text-slate-500 mt-1">SAM (Pet Adoption Market)</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <div className="text-2xl font-bold text-slate-900">$180M</div>
                <div className="text-xs text-slate-500 mt-1">SOM (Year 5 Target)</div>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">
              The US pet industry reached $320B in 2025, growing at 6.1% CAGR. Pet adoption specifically accounts for ~6.5M shelter animals annually, with 4.1M adopted. The technology-enabled adoption segment is nascent but growing rapidly. Key growth driver: 78% of Gen Z adopters research online before visiting shelters (source: ASPCA 2025 Report).
            </p>
          </section>

          {/* Competitor Landscape */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🏆</span> Competitor Landscape
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 pr-4 text-left font-semibold text-slate-700">Competitor</th>
                    <th className="py-3 pr-4 text-left font-semibold text-slate-700">Type</th>
                    <th className="py-3 pr-4 text-left font-semibold text-slate-700">Strength</th>
                    <th className="py-3 text-left font-semibold text-slate-700">Weakness</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium">Petfinder</td>
                    <td className="py-3 pr-4">Direct</td>
                    <td className="py-3 pr-4">Largest database (11K+ shelters)</td>
                    <td className="py-3">No matching, just search/filter</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium">Adopt-a-Pet</td>
                    <td className="py-3 pr-4">Direct</td>
                    <td className="py-3 pr-4">Good UX, mobile app</td>
                    <td className="py-3">Generic recommendations</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium">Shelter Animals Count</td>
                    <td className="py-3 pr-4">Indirect</td>
                    <td className="py-3 pr-4">Data infrastructure for shelters</td>
                    <td className="py-3">B2B only, no consumer matching</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">ASPCA</td>
                    <td className="py-3 pr-4">Indirect</td>
                    <td className="py-3 pr-4">Brand trust, rescue network</td>
                    <td className="py-3">Not a tech platform</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Key Gap:</strong> No existing platform uses AI/ML matching to connect adopters with pets based on lifestyle, living situation, and personality compatibility. All current solutions are search-based, not match-based.
              </p>
            </div>
          </section>

          {/* Target Users */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🎯</span> Target User Validation
            </h2>
            <div className="p-5 bg-slate-50 rounded-xl mb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Primary ICP: Urban Millennial/Gen Z First-Time Pet Owner</h3>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Ages 25-38, living in metro areas, renting or first-time homeowner</li>
                <li>• Researches extensively before adopting (avg 3-6 weeks of browsing)</li>
                <li>• Willing to pay premium for confidence in match ($50-150 for matching fee)</li>
                <li>• High social media engagement — strong viral/referral potential</li>
              </ul>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Demand signals are strong: &ldquo;best dog for apartment&rdquo; searches up 340% since 2022. r/dogs adoption advice threads average 200+ comments. Pet adoption TikTok content receives 3x engagement vs. general pet content.
            </p>
          </section>

          {/* Red Flags */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🚩</span> Red Flags & Risks
            </h2>
            <div className="space-y-3">
              {[
                { severity: "High", flag: "Shelter onboarding friction — shelters are understaffed and tech-averse. Need extremely simple integration.", color: "red" },
                { severity: "Medium", flag: "AI matching accuracy is unproven for pet-human compatibility. Could lead to failed adoptions and reputation damage.", color: "amber" },
                { severity: "Medium", flag: "Petfinder has massive distribution advantage. Competing on database size is a losing strategy.", color: "amber" },
                { severity: "Low", flag: "Regulatory complexity varies by state for animal adoption facilitation.", color: "slate" },
              ].map((r, i) => (
                <div key={i} className={`p-4 rounded-xl border ${r.color === "red" ? "bg-red-50 border-red-100" : r.color === "amber" ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"}`}>
                  <span className={`text-xs font-semibold ${r.color === "red" ? "text-red-700" : r.color === "amber" ? "text-amber-700" : "text-slate-500"}`}>
                    {r.severity} Risk
                  </span>
                  <p className="text-sm text-slate-700 mt-1">{r.flag}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🗺️</span> Recommended Next Steps
            </h2>
            <ol className="space-y-4">
              {[
                "Interview 10 shelter managers about their adoption process and tech willingness (Week 1-2)",
                "Build a simple matching quiz (no AI) and test with 50 potential adopters (Week 2-3)",
                "Partner with 3 local shelters for a manual matching pilot (Week 3-6)",
                "Measure: match-to-adoption rate, time-to-adoption, return rate vs. baseline (Week 6-10)",
                "If pilot succeeds: layer in AI matching, raise pre-seed round targeting $500K",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-600 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Want a report like this for your idea?</h3>
          <p className="text-slate-600 mb-6">Get expert validation with real data in 48 hours.</p>
          <Link
            href="/submit"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition"
          >
            Get Your Validation Report
          </Link>
        </div>
      </div>
    </div>
  );
}
