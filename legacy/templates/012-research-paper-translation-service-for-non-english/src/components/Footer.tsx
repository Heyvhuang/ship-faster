import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PB</span>
              </div>
              <span className="text-xl font-bold">PaperBridge</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Technical-grade AI research paper translation for Chinese research
              teams. Precision that Google Translate cannot match.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <Link href="/library" className="hover:text-white">
                  Paper Library
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-white">
                  Request Translation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Research Areas</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>Large Language Models</li>
              <li>Computer Vision</li>
              <li>Reinforcement Learning</li>
              <li>Multimodal AI</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>hello@paperbridge.ai</li>
              <li>WeChat: PaperBridge_AI</li>
              <li>Twitter: @PaperBridgeAI</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-300">
          © 2026 PaperBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
