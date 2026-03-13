export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8 text-sm text-neutral-600">
        <div>
          <div className="flex items-center gap-2 font-bold text-neutral-900 mb-2">
            <span className="inline-block w-5 h-5 bg-hn-orange rounded-sm" />
            HN Filter
          </div>
          <p className="max-w-xs">
            Open-source browser extension for filtering Hacker News by account age and karma.
          </p>
        </div>
        <div className="flex gap-12">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Product</h4>
            <ul className="space-y-1">
              <li><a href="/features" className="hover:text-hn-orange">Features</a></li>
              <li><a href="/pricing" className="hover:text-hn-orange">Pricing</a></li>
              <li><a href="#faq" className="hover:text-hn-orange">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Community</h4>
            <ul className="space-y-1">
              <li><a href="https://github.com/hn-filter/extension" target="_blank" rel="noopener noreferrer" className="hover:text-hn-orange">GitHub</a></li>
              <li><a href="mailto:support@hnfilter.dev" className="hover:text-hn-orange">Support</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-8 pt-6 border-t border-neutral-200 text-xs text-neutral-400">
        &copy; {new Date().getFullYear()} HN Filter. Not affiliated with Hacker News or Y Combinator.
      </div>
    </footer>
  );
}
