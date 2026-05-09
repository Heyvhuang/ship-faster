import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Paper Reproducibility Cloud",
  description: "Learn how to use PaperCloud to reproduce ML papers instantly.",
};

const sections = [
  {
    title: "Getting Started",
    id: "getting-started",
    content: [
      {
        heading: "Quick Start",
        text: "To reproduce a paper, simply paste its HuggingFace URL into the search bar on the homepage and click \"Reproduce Now\". Our system automatically detects the framework, resolves dependencies, and spins up a pre-built container.",
      },
      {
        heading: "Supported Paper Sources",
        text: "We currently support papers from HuggingFace Papers, arXiv (with linked code), and Papers With Code. The paper must have an associated code repository with a requirements.txt, environment.yml, or setup.py file.",
      },
    ],
  },
  {
    title: "Environments",
    id: "environments",
    content: [
      {
        heading: "Pre-built Containers",
        text: "Our top 50 trending papers have manually verified, pre-built Docker containers that launch in under 60 seconds. These environments are tested weekly to ensure all dependencies remain compatible.",
      },
      {
        heading: "Auto-resolved Environments",
        text: "For papers outside the top 50, our AI-powered dependency resolver analyzes the codebase and builds a container on-the-fly. This typically takes 2-5 minutes and succeeds 94% of the time.",
      },
      {
        heading: "Custom Environments",
        text: "Lab plan users can provide their own Dockerfile or environment specification. Upload it alongside the paper URL and we'll build a custom container to your exact specifications.",
      },
    ],
  },
  {
    title: "IDE Access",
    id: "ide",
    content: [
      {
        heading: "JupyterLab",
        text: "Every reproduction session includes a browser-based JupyterLab instance with the paper's code pre-loaded in the working directory. All notebooks from the repository are automatically opened.",
      },
      {
        heading: "VSCode (Browser)",
        text: "Prefer VSCode? Toggle to the VSCode interface from your session dashboard. All extensions for Python, PyTorch, and data visualization are pre-installed.",
      },
    ],
  },
  {
    title: "GPU & Compute",
    id: "gpu",
    content: [
      {
        heading: "GPU Types",
        text: "Pay-per-paper and Researcher plans include T4 (16GB) and A10G (24GB) GPUs. Lab plans include A100 (40GB) access. GPU type is automatically selected based on model requirements.",
      },
      {
        heading: "Session Limits",
        text: "Pay-per-paper: 2 hours max. Researcher: 8 hours max. Lab: unlimited. Sessions can be paused and resumed within the time limit.",
      },
    ],
  },
  {
    title: "API Reference",
    id: "api",
    content: [
      {
        heading: "REST API",
        code: `curl -X POST https://api.papercloud.dev/v1/reproduce \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"paper_url": "https://huggingface.co/papers/example"}'`,
      },
      {
        heading: "Python SDK",
        code: `from papercloud import PaperCloud

client = PaperCloud(api_key="YOUR_API_KEY")
session = client.reproduce("https://huggingface.co/papers/example")
print(session.jupyter_url)  # Open in browser`,
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          <h1 className="font-mono text-3xl font-bold">Documentation</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Everything you need to reproduce ML papers with PaperCloud.
          </p>

          <div className="mt-12 space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="font-mono text-xl font-bold border-b border-zinc-800 pb-3">
                  {section.title}
                </h2>
                <div className="mt-6 space-y-8">
                  {section.content.map((item) => (
                    <div key={item.heading}>
                      <h3 className="text-sm font-semibold text-zinc-200">{item.heading}</h3>
                      {"text" in item && (
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.text}</p>
                      )}
                      {"code" in item && (
                        <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">
                          {item.code}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
