import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Try PaperCode with no commitment",
    features: [
      "50 prototype generations",
      "Standard generation speed",
      "Basic syntax validation",
      "Download as .zip",
      "Community support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "For active researchers and students",
    features: [
      "500 generations / month",
      "Priority generation queue",
      "Advanced validation & testing",
      "StandardAPI wrapper included",
      "Training loop generation",
      "Email support",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    desc: "For research labs and teams",
    features: [
      "Unlimited generations",
      "Fastest generation speed",
      "Custom API templates",
      "Shared team dashboard",
      "Priority support & Slack",
      "Custom model integrations",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const FAQ = [
  {
    q: "What papers can PaperCode convert?",
    a: "PaperCode works best with ML/DL papers that describe model architectures, training procedures, or novel layers. We support arXiv papers and GitHub repositories with clear methodology descriptions.",
  },
  {
    q: "How accurate is the generated code?",
    a: "Our generated prototypes pass syntax and forward-pass validation with a 94.2% success rate. The code is meant as a starting prototype — you should review and adapt it for production use.",
  },
  {
    q: "What framework does the generated code use?",
    a: "All prototypes are generated in PyTorch with optional FastAPI wrappers for serving. We plan to add JAX and TensorFlow support in the future.",
  },
  {
    q: "Can I use generated code commercially?",
    a: "Yes. All generated code is yours to use under the MIT license. We recommend reviewing the source paper's license for any additional restrictions.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="max-w-5xl mx-auto px-4 py-16 w-full flex-1">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, usage-based pricing
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Start free. Upgrade when you need more generations or faster processing.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`bg-gray-900 rounded-lg p-6 flex flex-col ${
                plan.highlight
                  ? "border-2 border-green-500 relative"
                  : "border border-gray-800"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-gray-950 text-xs font-bold px-3 py-0.5 rounded-full">
                  POPULAR
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-white font-semibold text-lg">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-green-500 text-gray-950 hover:bg-green-400"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                <h3 className="text-white font-medium text-sm mb-2">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
