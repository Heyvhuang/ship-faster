import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Issue — Radar",
  description: "Read a free sample deep-dive paper summary from Radar.",
};

const papers = [
  {
    title: "Scaling Sparse Mixture-of-Experts to 1T Parameters",
    authors: "Fedus et al. — Google Brain",
    date: "March 17, 2026",
    readTime: "5 min read",
    tldr: "A new routing strategy for MoE models achieves GPT-4 level performance at 1/3 the compute cost by dynamically balancing expert utilization during training.",
    whyItMatters:
      "If you're training large language models or working on efficient inference, this paper changes the cost-performance calculus. The routing improvements mean you can get frontier-level results on a research lab budget.",
    insights: [
      {
        title: "Expert collapse is the real bottleneck",
        body: "Most tokens route to the same few experts during training, wasting capacity. The proposed auxiliary balance loss fixes this without slowing convergence. If you've seen your MoE model plateau early, this is likely why.",
      },
      {
        title: "Fewer experts, smarter routing wins",
        body: "64 experts with the new dynamic routing outperform 256 experts with naive top-2 gating on all benchmarks. This has direct implications for memory and serving costs.",
      },
      {
        title: "The capacity factor sweet spot is 1.25",
        body: "Setting expert capacity factor to 1.25x (vs the standard 1.0x) gives the best trade-off between load balance and performance. Below 1.1x you get token dropping; above 1.5x you waste compute.",
      },
      {
        title: "Fine-tuning MoE requires different LR schedules",
        body: "The router and expert parameters benefit from decoupled learning rates. Using 10x lower LR for the router during fine-tuning prevents catastrophic routing collapse.",
      },
    ],
    codeSnippet: `# Key implementation detail: auxiliary balance loss
def balance_loss(router_probs, expert_mask):
    # router_probs: [batch, num_experts]
    # expert_mask: [batch, num_experts] one-hot
    density = expert_mask.float().mean(dim=0)
    density_proxy = router_probs.mean(dim=0)
    return (density * density_proxy).sum() * num_experts`,
  },
  {
    title: "Constitutional AI Without Human Feedback",
    authors: "Park et al. — Anthropic",
    date: "March 17, 2026",
    readTime: "5 min read",
    tldr: "A self-supervised approach to AI alignment that replaces human preference labels with model-generated critiques, achieving comparable safety scores at 90% lower annotation cost.",
    whyItMatters:
      "RLHF is expensive and doesn't scale. This paper shows a viable path to aligning models without massive human labeling efforts — critical if you're building safety-sensitive applications.",
    insights: [
      {
        title: "Self-critique quality scales with model size",
        body: "Models above 13B parameters generate critiques that correlate 0.85+ with human evaluators. Below 7B, self-critique is unreliable. This sets a clear minimum scale for the approach.",
      },
      {
        title: "Constitutional principles need to be specific",
        body: "Vague principles like 'be helpful' produce inconsistent results. Specific principles like 'refuse to provide instructions for synthesizing dangerous chemicals' improve compliance by 40%.",
      },
      {
        title: "Iterative refinement beats single-pass",
        body: "Three rounds of critique-revision improve safety scores by 25% over single-pass. Diminishing returns after 4 rounds. Budget your compute accordingly.",
      },
    ],
    codeSnippet: null,
  },
  {
    title: "FlashAttention-3: Fast Exact Attention for Long Sequences",
    authors: "Dao et al. — Stanford / Together AI",
    date: "March 17, 2026",
    readTime: "5 min read",
    tldr: "Extends FlashAttention to 1M+ token sequences with a new tiling strategy that achieves 2.3x speedup over FlashAttention-2 on H100 GPUs while maintaining exact computation.",
    whyItMatters:
      "Long-context models are bottlenecked by attention compute. This makes million-token windows practical for training, not just inference — opening up document-level and codebase-level understanding.",
    insights: [
      {
        title: "Asynchronous softmax is the key innovation",
        body: "By overlapping the softmax normalization with the next tile's GEMM, they hide the normalization latency entirely. This is where most of the 2.3x speedup comes from.",
      },
      {
        title: "Memory usage is sublinear in sequence length",
        body: "The new tiling scheme uses O(√N) memory instead of O(N) for intermediates. At 1M tokens, this means 32x less HBM for attention intermediates.",
      },
      {
        title: "Drop-in replacement with one caveat",
        body: "Works as a drop-in for FA2 except when using custom attention masks. Causal and sliding window masks are supported natively; arbitrary masks need the compatibility wrapper (3% overhead).",
      },
      {
        title: "Training throughput gains compound with model parallelism",
        body: "On 8xH100 with tensor parallelism, the effective speedup is 2.8x (vs 2.3x single-GPU) because the reduced memory pressure allows larger micro-batches.",
      },
    ],
    codeSnippet: `# Drop-in replacement for FlashAttention-2
from flash_attn_3 import flash_attn_func

# Same API, just import from flash_attn_3
out = flash_attn_func(
    q, k, v,
    causal=True,
    # New: async_softmax enabled by default
    # New: supports seq_len > 1M
)`,
  },
];

function PaperCard({
  paper,
  index,
}: {
  paper: (typeof papers)[0];
  index: number;
}) {
  return (
    <article className="border border-border rounded-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-accent bg-accent-light px-2 py-0.5 rounded">
          Paper #{index + 1}
        </span>
        <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded font-medium">
          {paper.readTime}
        </span>
        <span className="text-xs text-muted">{paper.date}</span>
      </div>

      <h2 className="font-mono text-xl font-bold mb-1">{paper.title}</h2>
      <p className="text-sm text-muted mb-6 italic">{paper.authors}</p>

      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
          TL;DR
        </h3>
        <p className="text-sm leading-relaxed bg-card-bg p-4 rounded-md border border-border">
          {paper.tldr}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
          Why this matters
        </h3>
        <p className="text-sm leading-relaxed">{paper.whyItMatters}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
          Key Insights
        </h3>
        <div className="space-y-4">
          {paper.insights.map((insight, i) => (
            <div key={i} className="border-l-2 border-accent pl-4">
              <h4 className="font-semibold text-sm mb-1">
                <span className="text-accent">#{i + 1}</span> {insight.title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {insight.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {paper.codeSnippet && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            Implementation
          </h3>
          <pre className="bg-[#1a1a1a] text-[#e5e5e5] rounded-md p-4 text-xs leading-relaxed overflow-x-auto font-mono">
            <code>{paper.codeSnippet}</code>
          </pre>
        </div>
      )}
    </article>
  );
}

export default function SamplePage() {
  return (
    <>
      <nav className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            radar<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-muted hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-muted hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/pricing"
              className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent-light px-3 py-1 rounded-full mb-4 font-medium">
              Free sample issue
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Radar — Issue #42, March 17, 2026
            </h1>
            <p className="text-muted">
              3 papers · 15 min total read time · Scaling, alignment, and
              efficient attention
            </p>
          </div>

          <div className="space-y-8">
            {papers.map((paper, i) => (
              <PaperCard key={i} paper={paper} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center border border-border rounded-lg p-8 bg-card-bg">
            <h2 className="text-xl font-bold mb-2">Like what you see?</h2>
            <p className="text-muted mb-6">
              Get summaries like these delivered every Monday for $9/month.
            </p>
            <Link
              href="/pricing"
              className="bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Subscribe to Radar →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-muted">
          <span>© 2026 Radar</span>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </>
  );
}
