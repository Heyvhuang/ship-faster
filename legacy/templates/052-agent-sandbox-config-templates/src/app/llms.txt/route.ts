import { templates } from "@/lib/data";

export function GET() {
  const lines = [
    "# Safespace Templates",
    "",
    "Pre-built macOS sandbox configuration templates for AI agents (Claude, GPT, Ollama).",
    "Each template is a .safespace config file with granular filesystem, network, and process permissions.",
    "",
    "## Available Templates",
    "",
    ...templates.map(
      (t) =>
        `- ${t.title} (v${t.version}): ${t.description} — supports ${t.agents.join(", ")}`
    ),
    "",
    "## How It Works",
    "1. Choose a use-case template",
    "2. Select your agent (Claude, GPT, or Ollama)",
    "3. Download the .safespace config file",
    "4. Import into Agent Safehouse on macOS",
    "5. Run your agent securely in a sandboxed environment",
    "",
    "## Pricing",
    "Free for the first 100 users. Pro template packs ($9.99 one-time) coming soon.",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
