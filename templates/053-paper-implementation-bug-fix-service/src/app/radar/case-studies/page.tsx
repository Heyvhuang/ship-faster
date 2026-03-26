import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies | Radar",
  description: "Real bugs we've fixed in paper implementations for production ML teams.",
};

const cases = [
  {
    title: "NeRF Ray Sampling Bug",
    paper: "NeRF: Representing Scenes as Neural Radiance Fields (Mildenhall et al., 2020)",
    client: "Percepto AI",
    problem:
      "Novel view synthesis produced blurry artifacts at object boundaries. Training metrics looked correct but visual quality degraded at inference.",
    rootCause:
      "The open-source implementation sampled rays uniformly instead of using stratified sampling with the hierarchical refinement described in Section 5.2. Additionally, the near/far bounds were hardcoded instead of being scene-adaptive.",
    fix: "Implemented proper stratified sampling with coarse-to-fine hierarchy. Added dynamic near/far bound computation based on scene bounding box. Added a regression test comparing ray sample distributions against the paper's Figure 5.",
    impact: "PSNR improved from 26.3 to 31.1 on the Blender dataset, matching paper-reported results.",
    time: "4 hours",
    tier: "Quick Fix",
  },
  {
    title: "Diffusion Model Gradient Computation",
    paper: "Denoising Diffusion Probabilistic Models (Ho et al., 2020)",
    client: "SynthLab",
    problem:
      "Generated images had persistent high-frequency noise that didn't decrease with more sampling steps. FID scores were 3x worse than reported.",
    rootCause:
      "The noise schedule implementation used a linear beta schedule when the paper specifies a cosine schedule for the particular model variant. The variance was also computed using the wrong timestep indexing (off-by-one), causing cumulative error.",
    fix: "Replaced linear beta schedule with cosine schedule from the Improved DDPM paper. Fixed timestep indexing in variance computation. Added validation tests comparing alpha_cumprod values against Table 1 in the paper.",
    impact: "FID improved from 35.2 to 11.8 on CIFAR-10, within 5% of paper-reported results.",
    time: "3 days",
    tier: "Deep Diagnosis",
  },
  {
    title: "Transformer Attention Scaling",
    paper: "Attention Is All You Need (Vaswani et al., 2017)",
    client: "LangCore",
    problem:
      "Custom Transformer variant showed training instability after 10K steps. Loss would spike and never recover, despite careful learning rate tuning.",
    rootCause:
      "The attention scaling factor was applied after softmax instead of before, causing extreme values in the attention weights. Combined with float16 training, this led to overflow in gradient computation. The reference implementation also had a subtle bug where the causal mask was applied after scaling rather than before.",
    fix: "Moved scaling factor before softmax as specified in Equation 1 of the paper. Reordered causal mask application. Added numerical stability checks and attention weight distribution logging.",
    impact: "Training stabilized for 100K+ steps. Perplexity on WikiText-103 matched the paper's reported 18.3.",
    time: "2 days",
    tier: "Deep Diagnosis",
  },
  {
    title: "Full Pipeline: Vision Transformer for Medical Imaging",
    paper: "An Image is Worth 16x16 Words (Dosovitskiy et al., 2020)",
    client: "MedScan",
    problem:
      "ViT fine-tuned on chest X-rays showed 15% lower accuracy than expected from the paper. The team had spent 6 weeks tuning hyperparameters with no improvement.",
    rootCause:
      "Multiple compounding issues: (1) Patch embedding used overlapping patches instead of non-overlapping, (2) Position embeddings were randomly initialized instead of being interpolated from pretrained model, (3) Classification token was appended instead of prepended, (4) Layer norm was applied in pre-norm style when the pretrained weights used post-norm.",
    fix: "Comprehensive pipeline audit and 4 targeted fixes aligned with Sections 3.1-3.3 of the paper. Added a paper-alignment test suite that validates each component against expected intermediate shapes and value ranges.",
    impact: "Accuracy improved from 78.2% to 93.1%, exceeding the fine-tuning baseline in Table 5.",
    time: "8 days",
    tier: "Full Pipeline Review",
  },
];

export default function CaseStudies() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h1>
      <p className="text-muted mb-16 max-w-xl">
        Real bugs we&apos;ve found and fixed in paper implementations. Names shared with client permission.
      </p>

      <div className="space-y-16">
        {cases.map((c) => (
          <article key={c.title} className="rounded-xl border border-border bg-surface p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2 py-1 rounded bg-accent/10 text-accent">
                {c.tier}
              </span>
              <span className="text-xs text-muted">{c.time} to fix</span>
              <span className="text-xs text-muted">&middot; {c.client}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
            <p className="text-xs text-muted font-mono mb-6">{c.paper}</p>

            <div className="space-y-5 text-sm">
              <div>
                <h3 className="font-medium text-red-400 mb-1">Problem</h3>
                <p className="text-muted leading-relaxed">{c.problem}</p>
              </div>
              <div>
                <h3 className="font-medium text-yellow-400 mb-1">Root Cause</h3>
                <p className="text-muted leading-relaxed">{c.rootCause}</p>
              </div>
              <div>
                <h3 className="font-medium text-green-400 mb-1">Fix</h3>
                <p className="text-muted leading-relaxed">{c.fix}</p>
              </div>
              <div>
                <h3 className="font-medium text-accent mb-1">Impact</h3>
                <p className="text-muted leading-relaxed">{c.impact}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted mb-6">Have a similar issue?</p>
        <Link
          href="/radar/book"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
        >
          Book Free Consultation
        </Link>
      </div>
    </div>
  );
}
