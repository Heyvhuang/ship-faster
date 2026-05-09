export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url: string;
  score: number;
  codeAvailability: number;
  codeQuality: number;
  setupEase: number;
  repoUrl: string | null;
  stars: number | null;
  summary: string;
  rationale: string;
  tags: string[];
  scoredAt: string;
}

export const papers: Paper[] = [
  {
    id: "llama-3",
    title: "LLaMA 3: Open Foundation and Fine-Tuned Chat Models",
    authors: ["Meta AI Research"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2407.21783",
    score: 92,
    codeAvailability: 95,
    codeQuality: 90,
    setupEase: 88,
    repoUrl: "https://github.com/meta-llama/llama3",
    stars: 24800,
    summary: "Third generation of Meta's open LLM family with improved reasoning and instruction following.",
    rationale: "Official repo with clear README, Docker support, pip install, and HuggingFace integration. Model weights freely available. Active maintenance with 200+ contributors.",
    tags: ["LLM", "NLP", "Open Source"],
    scoredAt: "2024-12-15",
  },
  {
    id: "flux-1",
    title: "FLUX.1: Scaling Rectified Flow Transformers for Image Generation",
    authors: ["Black Forest Labs"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2403.03206",
    score: 88,
    codeAvailability: 90,
    codeQuality: 88,
    setupEase: 85,
    repoUrl: "https://github.com/black-forest-labs/flux",
    stars: 18200,
    summary: "State-of-the-art text-to-image model using rectified flow transformers.",
    rationale: "Clean Python package with pip install, comprehensive examples, and HuggingFace diffusers integration. Multiple model variants available.",
    tags: ["Image Generation", "Diffusion", "Open Source"],
    scoredAt: "2024-12-14",
  },
  {
    id: "mamba-2",
    title: "Mamba-2: Structured State Space Duality",
    authors: ["Tri Dao", "Albert Gu"],
    venue: "ICML 2024",
    year: 2024,
    url: "https://arxiv.org/abs/2405.21060",
    score: 85,
    codeAvailability: 90,
    codeQuality: 85,
    setupEase: 78,
    repoUrl: "https://github.com/state-spaces/mamba",
    stars: 14300,
    summary: "Improved selective state space model achieving transformer-level performance with linear scaling.",
    rationale: "Well-structured repo with setup.py, CUDA kernels compile cleanly, pretrained checkpoints available. Requires specific CUDA version.",
    tags: ["SSM", "Architecture", "Efficient"],
    scoredAt: "2024-12-13",
  },
  {
    id: "deepseekcoder-v2",
    title: "DeepSeek-Coder-V2: Breaking the Barrier of Closed-Source Models in Code Intelligence",
    authors: ["DeepSeek AI"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2406.11931",
    score: 83,
    codeAvailability: 88,
    codeQuality: 82,
    setupEase: 78,
    repoUrl: "https://github.com/deepseek-ai/DeepSeek-Coder-V2",
    stars: 8400,
    summary: "Open-source code LLM rivaling GPT-4 on coding benchmarks.",
    rationale: "Model weights on HuggingFace, vLLM-compatible, clear inference scripts. Large model size requires significant GPU memory.",
    tags: ["Code", "LLM", "Open Source"],
    scoredAt: "2024-12-12",
  },
  {
    id: "kolors",
    title: "Kolors: Effective Training of Diffusion Models for Photorealistic Text-to-Image Synthesis",
    authors: ["Kuaishou Technology"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2408.13000",
    score: 79,
    codeAvailability: 85,
    codeQuality: 75,
    setupEase: 76,
    repoUrl: "https://github.com/Kwai-Kolors/Kolors",
    stars: 5200,
    summary: "Bilingual text-to-image model with photorealistic output quality.",
    rationale: "Inference code and weights available. Documentation is adequate but some Chinese-only sections. Diffusers integration works.",
    tags: ["Image Generation", "Diffusion", "Bilingual"],
    scoredAt: "2024-12-11",
  },
  {
    id: "janus-pro",
    title: "Janus-Pro: Unified Autoregressive Multimodal Understanding and Generation",
    authors: ["DeepSeek AI"],
    venue: "arXiv",
    year: 2025,
    url: "https://arxiv.org/abs/2501.02714",
    score: 76,
    codeAvailability: 80,
    codeQuality: 78,
    setupEase: 68,
    repoUrl: "https://github.com/deepseek-ai/Janus",
    stars: 12100,
    summary: "Unified model for both multimodal understanding and visual generation tasks.",
    rationale: "Code and model weights released. Gradio demo works. Some dependency conflicts with newer torch versions.",
    tags: ["Multimodal", "Vision", "Generation"],
    scoredAt: "2024-12-10",
  },
  {
    id: "qwen2-vl",
    title: "Qwen2-VL: Enhancing Vision-Language Model's Perception at Any Resolution",
    authors: ["Alibaba Cloud"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2409.12191",
    score: 81,
    codeAvailability: 85,
    codeQuality: 80,
    setupEase: 77,
    repoUrl: "https://github.com/QwenLM/Qwen2-VL",
    stars: 9800,
    summary: "Vision-language model supporting dynamic resolution and video understanding.",
    rationale: "HuggingFace transformers integration, clear examples, multiple model sizes. Flash-attention optional but recommended.",
    tags: ["VLM", "Multimodal", "Open Source"],
    scoredAt: "2024-12-09",
  },
  {
    id: "cosyvoice",
    title: "CosyVoice: A Scalable Multilingual Text-to-Speech Synthesizer Based on Supervised Semantic Tokens",
    authors: ["Alibaba DAMO Academy"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2407.05407",
    score: 72,
    codeAvailability: 78,
    codeQuality: 70,
    setupEase: 65,
    repoUrl: "https://github.com/FunAudioLLM/CosyVoice",
    stars: 7600,
    summary: "Multilingual TTS with voice cloning and emotional speech synthesis.",
    rationale: "Inference code works but setup requires multiple manual steps. Some model files hosted on ModelScope only.",
    tags: ["TTS", "Audio", "Multilingual"],
    scoredAt: "2024-12-08",
  },
  {
    id: "world-model-survey",
    title: "A Survey on World Models for Autonomous Driving",
    authors: ["Various"],
    venue: "TPAMI 2024",
    year: 2024,
    url: "https://arxiv.org/abs/2403.02622",
    score: 35,
    codeAvailability: 30,
    codeQuality: 40,
    setupEase: 35,
    repoUrl: null,
    stars: null,
    summary: "Comprehensive survey of world models applied to autonomous driving scenarios.",
    rationale: "Survey paper with no original code. Links to referenced implementations vary in quality. No unified codebase.",
    tags: ["Survey", "Autonomous Driving", "World Models"],
    scoredAt: "2024-12-07",
  },
  {
    id: "nerf-studio",
    title: "Nerfstudio: A Modular Framework for Neural Radiance Field Development",
    authors: ["Matthew Tancik", "et al."],
    venue: "SIGGRAPH 2023",
    year: 2023,
    url: "https://arxiv.org/abs/2302.04264",
    score: 95,
    codeAvailability: 98,
    codeQuality: 95,
    setupEase: 90,
    repoUrl: "https://github.com/nerfstudio-project/nerfstudio",
    stars: 9700,
    summary: "Modular framework simplifying NeRF development with plug-and-play components.",
    rationale: "Exceptional documentation, pip install, CLI tools, viewer included. CI/CD, extensive tests, active community. One of the best ML codebases.",
    tags: ["3D", "NeRF", "Framework"],
    scoredAt: "2024-12-06",
  },
  {
    id: "segment-anything-2",
    title: "SAM 2: Segment Anything in Images and Videos",
    authors: ["Meta AI Research"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2408.00714",
    score: 91,
    codeAvailability: 95,
    codeQuality: 92,
    setupEase: 85,
    repoUrl: "https://github.com/facebookresearch/sam2",
    stars: 13500,
    summary: "Extended Segment Anything Model for video segmentation with memory-based tracking.",
    rationale: "Clean repo structure, pip installable, Jupyter notebooks, pretrained models auto-download. Well-documented API.",
    tags: ["Segmentation", "Vision", "Video"],
    scoredAt: "2024-12-05",
  },
  {
    id: "olmoe",
    title: "OLMoE: Open Mixture-of-Experts Language Models",
    authors: ["Allen AI"],
    venue: "arXiv",
    year: 2024,
    url: "https://arxiv.org/abs/2409.02060",
    score: 68,
    codeAvailability: 75,
    codeQuality: 70,
    setupEase: 58,
    repoUrl: "https://github.com/allenai/OLMoE",
    stars: 2100,
    summary: "Fully open mixture-of-experts LLM with transparent training data and code.",
    rationale: "Training and inference code available. Requires custom OLMo library installation. Documentation is sparse in places.",
    tags: ["MoE", "LLM", "Open Science"],
    scoredAt: "2024-12-04",
  },
];

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-accent";
  if (score >= 60) return "text-accent-yellow";
  return "text-accent-red";
}

export function getScoreBg(score: number): string {
  if (score >= 80) return "bg-green-500/10 border-green-500/30";
  if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30";
  return "bg-red-500/10 border-red-500/30";
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Poor";
  return "Very Poor";
}
