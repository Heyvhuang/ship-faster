export interface Paper {
  title: string;
  summary: string;
  category: "generation" | "editing";
  modelName: string;
  modelSize?: string;
  dataset?: string;
  arxivUrl: string;
  repoUrl: string;
  repoType: "github" | "huggingface";
  benchmarks: { metric: string; score: string; delta?: string }[];
}

export interface Issue {
  id: number;
  date: string;
  title: string;
  papers: Paper[];
}

export const issues: Issue[] = [
  {
    id: 12,
    date: "2026-03-03",
    title: "Issue #12 — Sora-Level Open Models & New VBench Records",
    papers: [
      {
        title: "OpenSora v2: Scaling Video Diffusion to 1080p with 3D-VAE",
        summary:
          "Introduces a 3D variational autoencoder that enables 1080p video generation at 24fps with significantly reduced memory cost.",
        category: "generation",
        modelName: "OpenSora-v2",
        modelSize: "3.2B",
        dataset: "WebVid-10M + Panda-70M",
        arxivUrl: "https://arxiv.org/abs/2603.01234",
        repoUrl: "https://github.com/hpcaitech/Open-Sora",
        repoType: "github",
        benchmarks: [
          { metric: "VBench Total", score: "84.3", delta: "+2.1" },
          { metric: "FVD (UCF-101)", score: "198", delta: "-47" },
          { metric: "CLIPSIM", score: "0.312", delta: "+0.008" },
          { metric: "Temporal Consistency", score: "97.1", delta: "+1.4" },
        ],
      },
      {
        title: "VideoEdit-XL: Instruction-Based Video Editing with Flow Matching",
        summary:
          "A flow-matching approach for instruction-guided video editing that preserves temporal coherence across 128-frame clips.",
        category: "editing",
        modelName: "VideoEdit-XL",
        modelSize: "1.8B",
        dataset: "InstructVid-2M",
        arxivUrl: "https://arxiv.org/abs/2603.01567",
        repoUrl: "https://huggingface.co/videoedit/xl-v1",
        repoType: "huggingface",
        benchmarks: [
          { metric: "Edit Accuracy", score: "91.2%", delta: "+3.8%" },
          { metric: "Temporal Consistency", score: "95.6", delta: "+2.3" },
          { metric: "CLIPSIM", score: "0.298" },
          { metric: "FVD", score: "312", delta: "-28" },
        ],
      },
      {
        title: "CogVideoX-5B: Scaling Expert Mixture for Long Video Generation",
        summary:
          "Mixture-of-experts architecture generating coherent 60-second videos with consistent characters and scene transitions.",
        category: "generation",
        modelName: "CogVideoX-5B",
        modelSize: "5B",
        dataset: "CogVid-Internal + WebVid-10M",
        arxivUrl: "https://arxiv.org/abs/2603.02345",
        repoUrl: "https://github.com/THUDM/CogVideo",
        repoType: "github",
        benchmarks: [
          { metric: "VBench Total", score: "83.7", delta: "+1.9" },
          { metric: "FVD (UCF-101)", score: "211", delta: "-35" },
          { metric: "Subject Consistency", score: "96.8", delta: "+2.1" },
          { metric: "CLIPSIM", score: "0.307", delta: "+0.005" },
        ],
      },
      {
        title: "StableVideo 3.0: Diffusion Transformers for 4K Video Inpainting",
        summary:
          "DiT-based inpainting model that handles 4K resolution video with spatiotemporal attention for seamless object removal.",
        category: "editing",
        modelName: "StableVideo-3.0",
        modelSize: "2.4B",
        dataset: "DAVIS + YouTube-VOS + Internal",
        arxivUrl: "https://arxiv.org/abs/2603.02789",
        repoUrl: "https://huggingface.co/stabilityai/stable-video-3",
        repoType: "huggingface",
        benchmarks: [
          { metric: "Inpainting PSNR", score: "34.2dB", delta: "+1.8dB" },
          { metric: "LPIPS", score: "0.042", delta: "-0.011" },
          { metric: "Temporal Flicker", score: "0.98", delta: "+0.03" },
        ],
      },
      {
        title:
          "MotionForge: Physics-Aware Video Generation with World Models",
        summary:
          "Combines a learned world model with diffusion generation to produce physically plausible motion and object interactions.",
        category: "generation",
        modelName: "MotionForge",
        modelSize: "4.1B",
        dataset: "PhysVid-500K",
        arxivUrl: "https://arxiv.org/abs/2603.03012",
        repoUrl: "https://github.com/motionforge/motionforge",
        repoType: "github",
        benchmarks: [
          { metric: "VBench Physics", score: "78.9", delta: "+5.2" },
          { metric: "FVD (Kinetics)", score: "267", delta: "-41" },
          { metric: "Motion Realism", score: "88.4", delta: "+3.7" },
        ],
      },
      {
        title: "VidStyler: Zero-Shot Video Style Transfer via Adaptive LoRA",
        summary:
          "Applies artistic styles to video with zero-shot generalization using adaptive low-rank adaptation modules per frame.",
        category: "editing",
        modelName: "VidStyler",
        modelSize: "890M",
        arxivUrl: "https://arxiv.org/abs/2603.03456",
        repoUrl: "https://github.com/vidstyler/vidstyler",
        repoType: "github",
        benchmarks: [
          { metric: "Style Accuracy", score: "87.3%", delta: "+4.1%" },
          { metric: "Temporal Consistency", score: "94.2", delta: "+1.9" },
          { metric: "CLIPSIM", score: "0.285" },
        ],
      },
    ],
  },
  {
    id: 11,
    date: "2026-02-24",
    title: "Issue #11 — Text-to-4D Breakthroughs & Editing Benchmarks",
    papers: [
      {
        title: "DreamVideo4D: Text-to-4D Dynamic Scene Generation",
        summary:
          "First open-source model generating dynamic 4D scenes from text prompts with consistent geometry across time.",
        category: "generation",
        modelName: "DreamVideo4D",
        modelSize: "2.8B",
        dataset: "Objaverse + WebVid-2M",
        arxivUrl: "https://arxiv.org/abs/2602.08901",
        repoUrl: "https://github.com/dreamvideo4d/dv4d",
        repoType: "github",
        benchmarks: [
          { metric: "4D-FID", score: "42.3", delta: "-8.7" },
          { metric: "Geometry Consistency", score: "91.2", delta: "+3.4" },
          { metric: "CLIPSIM", score: "0.291", delta: "+0.012" },
        ],
      },
      {
        title: "FastEdit: Real-Time Video Editing with Latent Caching",
        summary:
          "Achieves near-real-time video editing by caching latent features and only recomputing edited regions.",
        category: "editing",
        modelName: "FastEdit",
        modelSize: "1.2B",
        arxivUrl: "https://arxiv.org/abs/2602.09123",
        repoUrl: "https://github.com/fastedit/fastedit",
        repoType: "github",
        benchmarks: [
          { metric: "Edit Speed (fps)", score: "18.4", delta: "+12.1" },
          { metric: "Edit Accuracy", score: "88.7%", delta: "+1.2%" },
          { metric: "FVD", score: "345", delta: "-22" },
        ],
      },
      {
        title: "LumaGen-2: Cascaded Video Diffusion at Scale",
        summary:
          "Two-stage cascaded diffusion pipeline generating 720p videos with improved temporal coherence.",
        category: "generation",
        modelName: "LumaGen-2",
        modelSize: "6.1B",
        dataset: "LumaVid-Internal",
        arxivUrl: "https://arxiv.org/abs/2602.09456",
        repoUrl: "https://huggingface.co/lumagen/v2",
        repoType: "huggingface",
        benchmarks: [
          { metric: "VBench Total", score: "82.1", delta: "+1.5" },
          { metric: "FVD (UCF-101)", score: "245", delta: "-19" },
          { metric: "Aesthetic Score", score: "6.8", delta: "+0.3" },
        ],
      },
      {
        title: "ControlVideo-2: Multi-Condition Controllable Video Generation",
        summary:
          "Supports simultaneous depth, pose, and edge control signals for precise video generation.",
        category: "generation",
        modelName: "ControlVideo-2",
        modelSize: "2.1B",
        dataset: "WebVid-10M",
        arxivUrl: "https://arxiv.org/abs/2602.09789",
        repoUrl: "https://github.com/controlvideo/cv2",
        repoType: "github",
        benchmarks: [
          { metric: "Control Accuracy", score: "93.1%", delta: "+4.2%" },
          { metric: "FVD", score: "278", delta: "-33" },
          { metric: "CLIPSIM", score: "0.301", delta: "+0.009" },
        ],
      },
      {
        title: "VideoRecolor: Semantic Color Grading for Video Clips",
        summary:
          "Automatic semantic-aware color grading that can restyle entire video clips while preserving content.",
        category: "editing",
        modelName: "VideoRecolor",
        modelSize: "650M",
        arxivUrl: "https://arxiv.org/abs/2602.10012",
        repoUrl: "https://github.com/videorecolor/vrc",
        repoType: "github",
        benchmarks: [
          { metric: "Color Accuracy", score: "94.5%", delta: "+2.8%" },
          { metric: "Temporal Consistency", score: "96.1", delta: "+1.2" },
        ],
      },
    ],
  },
  {
    id: 10,
    date: "2026-02-17",
    title: "Issue #10 — Milestone: 10 Issues & New GenAI Leaderboards",
    papers: [
      {
        title: "AnimateDiff-XL: High-Resolution Animation from Still Images",
        summary:
          "Extends AnimateDiff to XL resolution with improved motion modules for photorealistic animation.",
        category: "generation",
        modelName: "AnimateDiff-XL",
        modelSize: "3.5B",
        dataset: "WebVid-10M + LAION-Aesthetics",
        arxivUrl: "https://arxiv.org/abs/2602.05678",
        repoUrl: "https://github.com/guoyww/AnimateDiff",
        repoType: "github",
        benchmarks: [
          { metric: "VBench Total", score: "81.9", delta: "+2.3" },
          { metric: "FVD (UCF-101)", score: "256", delta: "-28" },
          { metric: "Motion Quality", score: "89.1", delta: "+3.5" },
        ],
      },
      {
        title: "ProPainter-v2: Propagation-Based Video Inpainting",
        summary:
          "Improved propagation-based approach for video inpainting with better handling of complex motions.",
        category: "editing",
        modelName: "ProPainter-v2",
        modelSize: "1.1B",
        arxivUrl: "https://arxiv.org/abs/2602.06012",
        repoUrl: "https://github.com/sczhou/ProPainter",
        repoType: "github",
        benchmarks: [
          { metric: "PSNR", score: "33.8dB", delta: "+1.2dB" },
          { metric: "SSIM", score: "0.967", delta: "+0.008" },
          { metric: "FVD", score: "189", delta: "-34" },
        ],
      },
      {
        title: "Wan2.1: Scalable Video Foundation Model",
        summary:
          "Open-source video foundation model with state-of-the-art results across multiple generation benchmarks.",
        category: "generation",
        modelName: "Wan2.1",
        modelSize: "14B",
        dataset: "Internal-200M",
        arxivUrl: "https://arxiv.org/abs/2602.06789",
        repoUrl: "https://huggingface.co/Wan-AI/Wan2.1-T2V-14B",
        repoType: "huggingface",
        benchmarks: [
          { metric: "VBench Total", score: "85.1", delta: "+2.8" },
          { metric: "FVD (UCF-101)", score: "178", delta: "-52" },
          { metric: "CLIPSIM", score: "0.318", delta: "+0.011" },
          { metric: "Aesthetic Score", score: "7.1", delta: "+0.4" },
        ],
      },
    ],
  },
];

export const categories = ["all", "generation", "editing"] as const;
