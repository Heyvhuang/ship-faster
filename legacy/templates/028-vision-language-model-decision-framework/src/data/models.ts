export interface VLMModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  huggingFaceUrl: string;
  params: string;
  size: number; // MB
  latency: number; // ms on edge device
  memoryUsage: number; // MB RAM
  powerDraw: number; // watts
  accuracy: Record<string, number>; // 0-100 per use case
  hardware: string[];
  strengths: string[];
  weaknesses: string[];
  edgeReady: boolean;
}

export interface UseCase {
  id: string;
  name: string;
  icon: string;
  description: string;
  keyMetric: string;
}

export const useCases: UseCase[] = [
  {
    id: "object-detection",
    name: "Object Detection",
    icon: "🔍",
    description: "Detect and localize objects in images with bounding boxes and labels",
    keyMetric: "mAP score",
  },
  {
    id: "image-captioning",
    name: "Image Captioning",
    icon: "📝",
    description: "Generate natural language descriptions of image content",
    keyMetric: "CIDEr score",
  },
  {
    id: "vqa",
    name: "Visual Question Answering",
    icon: "❓",
    description: "Answer natural language questions about image content",
    keyMetric: "VQA accuracy",
  },
  {
    id: "ocr",
    name: "OCR & Document Understanding",
    icon: "📄",
    description: "Extract and understand text from images and documents",
    keyMetric: "Text accuracy",
  },
  {
    id: "visual-reasoning",
    name: "Visual Reasoning",
    icon: "🧠",
    description: "Complex multi-step reasoning over visual content",
    keyMetric: "Reasoning accuracy",
  },
];

export const models: VLMModel[] = [
  {
    id: "moondream2",
    name: "Moondream2",
    provider: "vikhyatk",
    description: "Tiny but capable VLM optimized for edge deployment. Excellent latency-to-accuracy ratio.",
    huggingFaceUrl: "https://huggingface.co/vikhyatk/moondream2",
    params: "1.86B",
    size: 3700,
    latency: 45,
    memoryUsage: 2800,
    powerDraw: 8,
    accuracy: { "object-detection": 62, "image-captioning": 71, vqa: 68, ocr: 58, "visual-reasoning": 52 },
    hardware: ["cpu", "gpu", "jetson", "rpi5"],
    strengths: ["Extremely lightweight", "Fast inference", "Runs on CPU"],
    weaknesses: ["Limited complex reasoning", "Lower accuracy on OCR"],
    edgeReady: true,
  },
  {
    id: "paligemma-3b",
    name: "PaliGemma 3B",
    provider: "Google",
    description: "Versatile VLM built on SigLIP and Gemma. Strong across multiple vision tasks.",
    huggingFaceUrl: "https://huggingface.co/google/paligemma-3b-pt-224",
    params: "2.92B",
    size: 5800,
    latency: 85,
    memoryUsage: 4500,
    powerDraw: 12,
    accuracy: { "object-detection": 74, "image-captioning": 78, vqa: 76, ocr: 72, "visual-reasoning": 65 },
    hardware: ["gpu", "jetson"],
    strengths: ["Multi-task capable", "Good accuracy-size ratio", "Fine-tunable"],
    weaknesses: ["Requires GPU for real-time", "Moderate memory usage"],
    edgeReady: true,
  },
  {
    id: "florence-2-base",
    name: "Florence-2-base",
    provider: "Microsoft",
    description: "Unified vision foundation model excelling at detection and captioning tasks.",
    huggingFaceUrl: "https://huggingface.co/microsoft/Florence-2-base",
    params: "0.23B",
    size: 460,
    latency: 28,
    memoryUsage: 1200,
    powerDraw: 5,
    accuracy: { "object-detection": 78, "image-captioning": 75, vqa: 60, ocr: 70, "visual-reasoning": 45 },
    hardware: ["cpu", "gpu", "jetson", "rpi5", "mobile"],
    strengths: ["Very small", "Fastest inference", "Runs anywhere"],
    weaknesses: ["Weak on reasoning tasks", "Limited VQA capability"],
    edgeReady: true,
  },
  {
    id: "qwen2-vl-2b",
    name: "Qwen2-VL-2B",
    provider: "Alibaba",
    description: "Compact multimodal model with strong OCR and document understanding.",
    huggingFaceUrl: "https://huggingface.co/Qwen/Qwen2-VL-2B-Instruct",
    params: "2.21B",
    size: 4400,
    latency: 72,
    memoryUsage: 3800,
    powerDraw: 10,
    accuracy: { "object-detection": 68, "image-captioning": 76, vqa: 74, ocr: 82, "visual-reasoning": 63 },
    hardware: ["gpu", "jetson"],
    strengths: ["Best-in-class OCR", "Good document understanding", "Multi-language support"],
    weaknesses: ["Higher memory than alternatives", "GPU recommended"],
    edgeReady: true,
  },
  {
    id: "qwen2-vl-7b",
    name: "Qwen2-VL-7B",
    provider: "Alibaba",
    description: "Powerful multimodal model with state-of-the-art performance on vision-language benchmarks.",
    huggingFaceUrl: "https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct",
    params: "7.61B",
    size: 15200,
    latency: 180,
    memoryUsage: 12000,
    powerDraw: 35,
    accuracy: { "object-detection": 81, "image-captioning": 88, vqa: 86, ocr: 90, "visual-reasoning": 82 },
    hardware: ["gpu"],
    strengths: ["Top-tier accuracy", "Excellent OCR", "Strong reasoning"],
    weaknesses: ["Large model size", "High memory requirement", "Not edge-friendly"],
    edgeReady: false,
  },
  {
    id: "llava-1.6-7b",
    name: "LLaVA-1.6-7B",
    provider: "LLaVA Team",
    description: "Popular open-source VLM with strong visual conversation and reasoning abilities.",
    huggingFaceUrl: "https://huggingface.co/llava-hf/llava-v1.6-mistral-7b-hf",
    params: "7.06B",
    size: 14100,
    latency: 165,
    memoryUsage: 11500,
    powerDraw: 32,
    accuracy: { "object-detection": 70, "image-captioning": 85, vqa: 83, ocr: 68, "visual-reasoning": 79 },
    hardware: ["gpu"],
    strengths: ["Strong conversational ability", "Good visual reasoning", "Large community"],
    weaknesses: ["Large footprint", "Weaker on detection tasks"],
    edgeReady: false,
  },
  {
    id: "phi-3.5-vision",
    name: "Phi-3.5-Vision",
    provider: "Microsoft",
    description: "Efficient multimodal model balancing capability with deployability.",
    huggingFaceUrl: "https://huggingface.co/microsoft/Phi-3.5-vision-instruct",
    params: "4.15B",
    size: 8300,
    latency: 110,
    memoryUsage: 7200,
    powerDraw: 18,
    accuracy: { "object-detection": 72, "image-captioning": 82, vqa: 80, ocr: 77, "visual-reasoning": 74 },
    hardware: ["gpu", "jetson"],
    strengths: ["Good balance of size and capability", "Strong reasoning for size", "Efficient architecture"],
    weaknesses: ["Needs decent GPU", "Mid-range on detection"],
    edgeReady: true,
  },
  {
    id: "internvl2-2b",
    name: "InternVL2-2B",
    provider: "OpenGVLab",
    description: "Competitive small VLM with strong multi-task vision performance.",
    huggingFaceUrl: "https://huggingface.co/OpenGVLab/InternVL2-2B",
    params: "2.21B",
    size: 4400,
    latency: 68,
    memoryUsage: 3600,
    powerDraw: 10,
    accuracy: { "object-detection": 70, "image-captioning": 74, vqa: 72, ocr: 69, "visual-reasoning": 60 },
    hardware: ["gpu", "jetson"],
    strengths: ["Competitive at small scale", "Multi-task versatile", "Active development"],
    weaknesses: ["Requires GPU", "Mid-range accuracy"],
    edgeReady: true,
  },
  {
    id: "idefics2-8b",
    name: "IDEFICS2-8B",
    provider: "Hugging Face",
    description: "Open multimodal model with strong document and chart understanding.",
    huggingFaceUrl: "https://huggingface.co/HuggingFaceM4/idefics2-8b",
    params: "8.36B",
    size: 16700,
    latency: 200,
    memoryUsage: 13500,
    powerDraw: 38,
    accuracy: { "object-detection": 65, "image-captioning": 83, vqa: 81, ocr: 84, "visual-reasoning": 76 },
    hardware: ["gpu"],
    strengths: ["Excellent document understanding", "Strong chart/table parsing", "Open weights"],
    weaknesses: ["Very large", "Slow inference", "Not edge-deployable"],
    edgeReady: false,
  },
  {
    id: "mobilevlm-3b",
    name: "MobileVLM-3B",
    provider: "Meituan",
    description: "Purpose-built for mobile and edge deployment with optimized architecture.",
    huggingFaceUrl: "https://huggingface.co/mtgv/MobileVLM-3B",
    params: "2.96B",
    size: 5900,
    latency: 55,
    memoryUsage: 3200,
    powerDraw: 9,
    accuracy: { "object-detection": 66, "image-captioning": 70, vqa: 67, ocr: 60, "visual-reasoning": 55 },
    hardware: ["gpu", "jetson", "mobile"],
    strengths: ["Mobile-optimized", "Low power consumption", "Fast on-device"],
    weaknesses: ["Lower accuracy ceiling", "Limited reasoning"],
    edgeReady: true,
  },
];

export interface Constraints {
  maxLatency: number;
  maxMemory: number;
  maxPower: number;
  hardware: string;
}

export interface RankedModel {
  model: VLMModel;
  score: number;
  matchDetails: {
    latencyMatch: boolean;
    memoryMatch: boolean;
    powerMatch: boolean;
    hardwareMatch: boolean;
    accuracyScore: number;
  };
}

export function rankModels(useCase: string, constraints: Constraints): RankedModel[] {
  return models
    .map((model) => {
      const latencyMatch = model.latency <= constraints.maxLatency;
      const memoryMatch = model.memoryUsage <= constraints.maxMemory;
      const powerMatch = model.powerDraw <= constraints.maxPower;
      const hardwareMatch = model.hardware.includes(constraints.hardware);
      const accuracyScore = model.accuracy[useCase] || 0;

      const hardConstraintsPassed = [latencyMatch, memoryMatch, powerMatch, hardwareMatch].filter(Boolean).length;
      const allPassed = hardConstraintsPassed === 4;

      // Score: accuracy weighted heavily, but penalize constraint violations
      const score = allPassed
        ? accuracyScore * 1.0 + (1 - model.latency / 300) * 10 + (1 - model.memoryUsage / 16000) * 5
        : accuracyScore * 0.3 + hardConstraintsPassed * 5;

      return {
        model,
        score: Math.round(score * 10) / 10,
        matchDetails: { latencyMatch, memoryMatch, powerMatch, hardwareMatch, accuracyScore },
      };
    })
    .sort((a, b) => b.score - a.score);
}

export const hardwareOptions = [
  { id: "gpu", name: "NVIDIA GPU", description: "Desktop/server GPU (RTX, A100, etc.)" },
  { id: "jetson", name: "Jetson (Edge GPU)", description: "NVIDIA Jetson Nano/Xavier/Orin" },
  { id: "cpu", name: "CPU Only", description: "x86/ARM CPU without GPU acceleration" },
  { id: "rpi5", name: "Raspberry Pi 5", description: "ARM SBC with limited resources" },
  { id: "mobile", name: "Mobile Device", description: "iOS/Android phone or tablet" },
];
