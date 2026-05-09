import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Documentation — MemoryGuard",
  description: "Get started with MemoryGuard. Integration guides, API reference, and best practices.",
};

const sections = [
  {
    title: "Quick Start",
    items: [
      { title: "Installation", content: "npm install @memoryguard/sdk" },
      { title: "Initialize", content: `import { MemoryGuard } from '@memoryguard/sdk';\n\nconst mg = new MemoryGuard({\n  apiKey: 'mg_live_...',\n  agentId: 'support-agent-1'\n});` },
      { title: "Connect Memory", content: `// LangChain example\nmg.connect({\n  source: 'langchain',\n  memoryStore: vectorStore,\n  conversationMemory: bufferMemory\n});` },
      { title: "Run First Scan", content: `const report = await mg.scan();\nconsole.log(report.piiFound); // 127\nconsole.log(report.hygieneScore); // 94` },
    ],
  },
  {
    title: "Integrations",
    items: [
      { title: "LangChain", content: `mg.connect({\n  source: 'langchain',\n  memoryStore: vectorStore\n});` },
      { title: "AutoGen", content: `mg.connect({\n  source: 'autogen',\n  groupChat: groupChat\n});` },
      { title: "Custom Agent", content: `mg.connect({\n  source: 'custom',\n  fetchMemory: async () => [...],\n  writeMemory: async (cleaned) => {...}\n});` },
    ],
  },
  {
    title: "Configuration",
    items: [
      { title: "Custom PII Rules", content: `mg.addRule({\n  name: 'internal-id',\n  pattern: /EMP-\\d{6}/g,\n  type: 'employee_id',\n  action: 'redact'\n});` },
      { title: "Schedule Hygiene", content: `mg.schedule({\n  frequency: 'daily',\n  time: '02:00',\n  timezone: 'UTC',\n  notify: ['ops@company.com']\n});` },
      { title: "Whitelist Patterns", content: `mg.whitelist([\n  'support@company.com',\n  /company\\.com$/,\n  { type: 'name', value: 'MemoryGuard' }\n]);` },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Documentation</h1>
            <p className="text-lg text-muted mb-12">
              Everything you need to integrate MemoryGuard with your AI agents.
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div key={item.title}>
                        <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                        <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                          <code>{item.content}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Need help?</h3>
              <p className="text-sm text-muted">
                Check out our API reference at{" "}
                <span className="text-primary font-medium">docs.memoryguard.io/api</span>, join our community Slack, or email{" "}
                <span className="text-primary font-medium">support@memoryguard.io</span>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
