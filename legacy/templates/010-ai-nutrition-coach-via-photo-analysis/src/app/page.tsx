import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Endocrinologist, Stanford Medical",
    quote:
      "CarbCoach gives my patients the accuracy they need for tight glycemic control. I recommend it to every insulin-dependent patient I see.",
  },
  {
    name: "Marcus J.",
    role: "Type 1 Diabetic, 14 years",
    quote:
      "My A1C dropped from 7.8 to 6.4 in three months. I actually log every meal now because it takes 10 seconds instead of 5 minutes.",
  },
  {
    name: "Priya R.",
    role: "Type 2 Diabetic, Insulin-dependent",
    quote:
      "The mixed dish breakdown is a game changer. I can finally count carbs in homemade Indian food accurately.",
  },
];

const faqs = [
  {
    q: "How accurate is the AI for homemade meals?",
    a: "Our AI decomposes mixed dishes into individual ingredients with 92% accuracy on average. Each ingredient shows a confidence score, and you can tap to correct any misidentified item. The system learns your cooking patterns over time.",
  },
  {
    q: "How does insulin dose calculation work?",
    a: "You set your personal insulin-to-carb ratio and correction factor (from your endocrinologist). CarbCoach multiplies total carbs by your ratio and factors in insulin on board (IOB) from recent doses. This is a suggestion — always verify with your care team.",
  },
  {
    q: "Is my health data private and secure?",
    a: "Absolutely. CarbCoach is HIPAA-compliant. All data is encrypted at rest and in transit. We never sell your data. You can export or delete all your information at any time.",
  },
  {
    q: "Does it work with my CGM or insulin pump?",
    a: "We integrate with Dexcom G6/G7, Freestyle Libre 2/3, and Medtronic Guardian sensors. Insulin pump integration with Omnipod and t:slim is available on the annual plan.",
  },
  {
    q: "What if the AI identifies a food incorrectly?",
    a: "You can tap any item to search and swap it. Voice confirmation mode reads back identified foods so you can verify before logging. Every correction improves the AI for future scans.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-6">
                Built for insulin-dependent diabetics
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
                Log your meal in{" "}
                <span className="text-green-600">10 seconds.</span>
                <br />
                Not 5 minutes.
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                Snap a photo. Get instant carb counts with confidence scores.
                Calculate your insulin dose — all in one tap.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center bg-black text-white text-lg font-semibold px-8 py-4 rounded-2xl hover:bg-gray-800 transition-colors"
                >
                  Try Free for 7 Days
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border-2 border-gray-200 text-black text-lg font-semibold px-8 py-4 rounded-2xl hover:border-gray-400 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  HIPAA Compliant
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  No credit card required
                </span>
              </div>
            </div>

            {/* Mock phone demo */}
            <div className="flex justify-center">
              <div className="relative w-72 sm:w-80">
                <div className="bg-gray-950 rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-xs text-gray-500 font-medium">
                      <span>9:41</span>
                      <span>CarbCoach</span>
                      <span>100%</span>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center">
                      <div className="text-6xl mb-2">🍝</div>
                      <p className="text-xs text-gray-400">Spaghetti Bolognese detected</p>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-black">Total Carbs</span>
                        <span className="text-2xl font-extrabold text-black">62g</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "62%" }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span className="text-green-600 font-medium">Low</span>
                        <span className="text-yellow-600 font-bold">Medium</span>
                        <span className="text-red-600 font-medium">High</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Spaghetti (180g)</span>
                          <span className="font-semibold">48g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Bolognese sauce</span>
                          <span className="font-semibold">10g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Parmesan (15g)</span>
                          <span className="font-semibold">4g</span>
                        </div>
                      </div>
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                        <p className="text-xs text-green-700 font-medium">Suggested Insulin</p>
                        <p className="text-xl font-extrabold text-green-700">5.2 units</p>
                        <p className="text-xs text-green-600">Based on 1:12 ratio &middot; 0.8u IOB</p>
                      </div>
                      <div className="text-center">
                        <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                          97% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-4">
            Stop wasting time searching food databases
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
            80% of users abandon nutrition apps because manual logging takes too long.
            CarbCoach replaces 5-minute searches with one photo.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-red-100">
              <div className="text-red-500 font-bold text-sm mb-4 uppercase tracking-wide">The old way — 5 minutes</div>
              <div className="space-y-4 text-sm text-gray-600">
                {[
                  "Open app → Search \"spaghetti bolognese\"",
                  "Scroll through 47 results with different carb counts",
                  "Guess serving size in grams while food gets cold",
                  "Manually calculate insulin from carb total",
                  "Give up and just guess your dose",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 shrink-0">&#10005;</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-green-100">
              <div className="text-green-600 font-bold text-sm mb-4 uppercase tracking-wide">CarbCoach — 10 seconds</div>
              <div className="space-y-4 text-sm text-gray-600">
                {[
                  "Snap a photo of your plate",
                  "AI identifies every ingredient with gram-level precision",
                  "See total carbs, broken down by ingredient",
                  "Get insulin suggestion based on your personal ratio",
                  "Confirm and eat. Meal logged automatically.",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            Built exclusively for diabetics who count every carb
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12">
            Generic calorie counters optimize for weight loss. We optimize for blood sugar control.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📸", title: "Instant Photo Recognition", desc: "Snap and get gram-level macro breakdown in under 3 seconds" },
              { icon: "🧮", title: "Insulin Dose Calculator", desc: "Personalized suggestions using your carb ratio and active insulin on board" },
              { icon: "🍛", title: "Mixed Dish Decomposition", desc: "AI breaks down complex homemade meals into individual ingredients" },
              { icon: "🗣️", title: "Voice Confirmation", desc: "Audio readback of identified foods for visually impaired users" },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 text-left">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-black mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-4">How it works</h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-12">From photo to insulin dose in four simple steps.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Snap a photo", desc: "Take a picture or select from your camera roll" },
              { step: "2", title: "AI identifies foods", desc: "See total carbs with confidence % in 3 seconds" },
              { step: "3", title: "Confirm or edit", desc: "Tap to swap misidentified items like rice → cauliflower rice" },
              { step: "4", title: "Get insulin suggestion", desc: "Calculated from your carb ratio and insulin on board" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="font-bold text-black mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk mitigation */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-4">Mixed homemade meal? No problem.</h2>
            <p className="text-gray-600 mb-6">Our AI deconstructs ingredients line-by-line with confidence scores.</p>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">Example: Chicken Stir-Fry</p>
              <div className="space-y-2">
                {[
                  { item: "Jasmine rice (200g)", carbs: "52g", conf: "98%", color: "bg-green-500" },
                  { item: "Chicken breast (150g)", carbs: "0g", conf: "96%", color: "bg-green-500" },
                  { item: "Bell peppers (80g)", carbs: "5g", conf: "94%", color: "bg-green-500" },
                  { item: "Teriyaki sauce (30ml)", carbs: "8g", conf: "87%", color: "bg-yellow-500" },
                  { item: "Sesame oil (1 tbsp)", carbs: "0g", conf: "91%", color: "bg-green-500" },
                ].map((row) => (
                  <div key={row.item} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{row.item}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold">{row.carbs}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full text-white ${row.color}`}>{row.conf}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-black">Total Carbs</span>
                <span className="text-2xl font-extrabold text-black">65g</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-12">Trusted by endocrinologists and diabetics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-bold text-black text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center opacity-40">
            {["Dexcom", "Omnipod", "Medtronic", "Freestyle Libre", "t:slim"].map((b) => (
              <span key={b} className="text-lg font-bold text-gray-400">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-4">Simple, transparent pricing</h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-12">Start free. Upgrade when you need insulin dosing recommendations and CGM integration.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8">
              <h3 className="font-bold text-black mb-1">Free Trial</h3>
              <p className="text-sm text-gray-400 mb-4">7 days or 50 photos</p>
              <div className="mb-6"><span className="text-4xl font-extrabold text-black">$0</span></div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {["Photo food recognition", "Carb breakdown by ingredient", "Confidence scores", "Daily meal diary"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/demo" className="block text-center bg-gray-100 text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">Start Free Trial</Link>
            </div>
            <div className="bg-black text-white rounded-2xl p-8 relative shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="font-bold mb-1">Monthly</h3>
              <p className="text-sm text-gray-400 mb-4">Full access, cancel anytime</p>
              <div className="mb-6"><span className="text-4xl font-extrabold">$29</span><span className="text-gray-400 text-sm">/month</span></div>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {["Everything in Free", "Insulin dose suggestions", "Unlimited photo logs", "CGM data correlation", "Export to glucose monitors", "Carb precision reports"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/demo" className="block text-center bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors">Start Free Trial</Link>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8">
              <h3 className="font-bold text-black mb-1">Annual</h3>
              <p className="text-sm text-gray-400 mb-4">Save $149/year</p>
              <div className="mb-6"><span className="text-4xl font-extrabold text-black">$199</span><span className="text-gray-400 text-sm">/year</span></div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {["Everything in Monthly", "Insulin pump integration", "Priority AI processing", "Endocrinologist report exports"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/demo" className="block text-center bg-gray-100 text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">Start Free Trial</Link>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
              HIPAA Compliant
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              SOC 2 Type II
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
              256-bit encryption
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-2xl p-6 group">
                <summary className="font-semibold text-black cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">Ready to count carbs in 10 seconds?</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">Join 12,000+ diabetics who log every meal without the friction. Start your free trial today.</p>
          <Link href="/demo" className="inline-flex items-center justify-center bg-black text-white text-lg font-semibold px-10 py-4 rounded-2xl hover:bg-gray-800 transition-colors">Try Free for 7 Days</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
