import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "Getting Started",
    content: `AgentLit converts AI agent conversations into literate programming documents. Here's how to use it:

1. **Paste your conversation** — Copy the full text from your agent chat (Claude, GPT, Gemini, or any markdown-formatted log).
2. **Click Convert** — AgentLit parses the conversation, extracts code blocks with language detection, and formats the surrounding prose.
3. **Export** — Copy the full markdown, extract just the code blocks, or download as a .md file.`,
  },
  {
    title: "Supported Formats",
    content: `AgentLit works with any text that contains markdown-style code blocks (\`\`\`). It also handles:

- **Claude conversations** — Copy from claude.ai or use the JSON export
- **ChatGPT exports** — Paste the conversation text or use the data export JSON
- **Gemini conversations** — Copy the conversation text
- **Plain text with indented code** — AgentLit will detect code-like patterns (imports, function definitions, etc.) even without markdown fences
- **Raw markdown** — Any markdown with triple-backtick code blocks`,
  },
  {
    title: "Language Detection",
    content: `Code blocks are automatically tagged with the correct language when possible. AgentLit detects:

TypeScript/JavaScript, Python, Go, Rust, HTML, JSON, Bash, SQL, and more. If a code block already has a language tag (e.g. \`\`\`python), that tag is preserved.`,
  },
  {
    title: "Export Options",
    content: `After conversion, you have three export options:

- **Copy Markdown** — Copies the full literate document (prose + code blocks) as markdown to your clipboard
- **Copy All Code** — Extracts only the code blocks, separated by language comments, perfect for pasting into your editor
- **Download .md** — Downloads the full markdown document as a file`,
  },
  {
    title: "API Access (Team Plan)",
    content: `Team plan subscribers get API access for programmatic conversions:

\`POST /api/convert\`

Request body:
\`{ "input": "your conversation text", "format": "markdown" }\`

Response:
\`{ "blocks": [...], "markdown": "..." }\`

Rate limit: 1000 requests/hour per team.`,
  },
  {
    title: "Privacy & Security",
    content: `- **Free tier**: All processing happens client-side in your browser. No data is sent to any server.
- **Pro/Team tiers**: Documents are stored encrypted at rest (AES-256) for your library and history features. You can delete your data at any time.
- We never use your conversations for training or any other purpose.`,
  },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Documentation</h1>
          <p className="text-muted mb-12">
            Everything you need to know about AgentLit.
          </p>

          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                  {section.title}
                </h2>
                <div className="text-sm text-muted leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
