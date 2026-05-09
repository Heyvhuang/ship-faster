import { fal } from "@fal-ai/client";
import sharp from "sharp";
import { TextBlock } from "../types";

export type AspectRatio =
  | "21:9"
  | "16:9"
  | "3:2"
  | "4:3"
  | "5:4"
  | "1:1"
  | "4:5"
  | "3:4"
  | "2:3"
  | "9:16";

export type Resolution = "1K" | "2K" | "4K";

interface InpaintOptions {
  aspectRatio?: AspectRatio;
  resolution?: Resolution;
  numImages?: number;
}

const MODEL_ID = "fal-ai/nano-banana-pro/edit";
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_DIMENSION_BY_RESOLUTION: Record<Resolution, number> = {
  "1K": 1280,
  "2K": 2048,
  "4K": 3072,
};

const SUPPORTED_INPUT_TYPES = new Set(["image/jpeg", "image/png", "image/jpg", "image/webp"]);

let falConfigured = false;

const ensureFalConfigured = () => {
  if (falConfigured) return;
  const apiKey = process.env.VERCEL_FAL_KEY || process.env.FAL_KEY;
  if (!apiKey) {
    throw new Error("Missing FAL API key. Set FAL_KEY or VERCEL_FAL_KEY.");
  }
  fal.config({ credentials: apiKey });
  falConfigured = true;
};

const parseDataUrl = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(.+?);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid data URL");
  }
  return { mimeType: match[1], buffer: Buffer.from(match[2], "base64") };
};

const fetchImageBuffer = async (sourceUrl: string): Promise<{ buffer: Buffer; mimeType: string }> => {
  if (sourceUrl.startsWith("data:")) {
    return parseDataUrl(sourceUrl);
  }

  let response: Response;
  try {
    response = await fetch(sourceUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to download source image: ${message}`);
  }

  if (!response.ok) {
    throw new Error(`Failed to download source image (HTTP ${response.status})`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "image/jpeg";
  return { buffer: Buffer.from(arrayBuffer), mimeType: contentType };
};

const normalizeImageBuffer = async (
  buffer: Buffer,
  mimeType: string,
  maxDimension: number
): Promise<{ buffer: Buffer; mimeType: string }> => {
  const normalizedMimeType = mimeType.toLowerCase();
  const metadata = await sharp(buffer).metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const exceedsDimension = Math.max(width, height) > maxDimension;
  const needsConversion = !SUPPORTED_INPUT_TYPES.has(normalizedMimeType);
  const needsCompression = buffer.length > MAX_IMAGE_BYTES;

  if (needsConversion || needsCompression || exceedsDimension) {
    let pipeline = sharp(buffer).rotate().resize({
      width: maxDimension,
      height: maxDimension,
      fit: "inside",
      withoutEnlargement: true,
    });

    let output = await pipeline.jpeg({ quality: needsCompression ? 80 : 90 }).toBuffer();

    if (output.length > MAX_IMAGE_BYTES) {
      output = await sharp(output).jpeg({ quality: 72 }).toBuffer();
    }

    if (output.length > MAX_IMAGE_BYTES) {
      throw new Error("Source image is too large after compression.");
    }

    return { buffer: output, mimeType: "image/jpeg" };
  }

  return { buffer, mimeType: normalizedMimeType === "image/jpg" ? "image/jpeg" : normalizedMimeType };
};

const prepareFalImageUrl = async (sourceUrl: string, resolution: Resolution): Promise<string> => {
  const { buffer, mimeType } = await fetchImageBuffer(sourceUrl);
  const maxDimension = MAX_DIMENSION_BY_RESOLUTION[resolution] ?? MAX_DIMENSION_BY_RESOLUTION["2K"];
  const normalized = await normalizeImageBuffer(buffer, mimeType, maxDimension);
  return `data:${normalized.mimeType};base64,${normalized.buffer.toString("base64")}`;
};

const collectImageUrls = (payload: unknown): string[] => {
  const urls: string[] = [];

  const addCandidate = (candidate: unknown) => {
    if (!candidate) return;
    if (typeof candidate === "string") {
      urls.push(candidate);
      return;
    }
    if (typeof candidate === "object") {
      const maybeUrl = (candidate as { url?: string }).url;
      if (typeof maybeUrl === "string") {
        urls.push(maybeUrl);
      }
    }
  };

  if (typeof payload === "string") {
    addCandidate(payload);
    return urls;
  }

  if (!payload || typeof payload !== "object") return urls;

  const obj = payload as Record<string, unknown>;

  addCandidate(obj.image);
  addCandidate(obj.image_url);

  if (Array.isArray(obj.images)) {
    obj.images.forEach(addCandidate);
  } else if (obj.images && typeof obj.images === "object") {
    Object.values(obj.images as Record<string, unknown>).forEach(addCandidate);
  }

  if (Array.isArray(obj.outputs)) {
    obj.outputs.forEach(addCandidate);
  } else if (obj.outputs && typeof obj.outputs === "object") {
    Object.values(obj.outputs as Record<string, unknown>).forEach(addCandidate);
  }

  if (obj.output) {
    urls.push(...collectImageUrls(obj.output));
  }
  if (obj.response) {
    urls.push(...collectImageUrls(obj.response));
  }
  if (obj.data) {
    urls.push(...collectImageUrls(obj.data));
  }

  return urls;
};

export async function generateInpaintedImage(
  sourceUrl: string,
  prompt: string,
  options: InpaintOptions = {}
): Promise<{ url: string; width: number; height: number }[]> {
  const { aspectRatio, resolution = "2K", numImages } = options;
  const count = Math.max(1, Math.floor(numImages ?? 1));
  const results: { url: string; width: number; height: number }[] = [];
  ensureFalConfigured();

  const preparedImageUrl = await prepareFalImageUrl(sourceUrl, resolution);

  for (let index = 0; index < count; index += 1) {
    let falResult: unknown;
    try {
      falResult = await fal.subscribe(MODEL_ID, {
        input: {
          prompt,
          image_urls: [preparedImageUrl],
          num_images: 1,
          output_format: "jpeg",
          ...(aspectRatio && { aspect_ratio: aspectRatio }),
          resolution,
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[image-service] fal.ai call failed:", msg, err);
      throw new Error(`fal.ai API error: ${msg}`);
    }

    const urls = collectImageUrls(falResult);
    const outputUrl = urls[0];
    if (!outputUrl) {
      throw new Error("No image data returned from fal.ai");
    }

    const { buffer, mimeType } = await fetchImageBuffer(outputUrl);
    const metadata = await sharp(buffer).metadata();
    const url = `data:${mimeType};base64,${buffer.toString("base64")}`;
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    results.push({ url, width, height });
  }

  return results;
}

export function detectAspectRatio(width: number, height: number): AspectRatio {
  const ratio = width / height;

  const ratios: { value: number; label: AspectRatio }[] = [
    { value: 21 / 9, label: "21:9" },
    { value: 16 / 9, label: "16:9" },
    { value: 3 / 2, label: "3:2" },
    { value: 4 / 3, label: "4:3" },
    { value: 5 / 4, label: "5:4" },
    { value: 1, label: "1:1" },
    { value: 4 / 5, label: "4:5" },
    { value: 3 / 4, label: "3:4" },
    { value: 2 / 3, label: "2:3" },
    { value: 9 / 16, label: "9:16" },
  ];

  let closest = ratios[0];
  let minDiff = Math.abs(ratio - closest.value);

  for (const r of ratios) {
    const diff = Math.abs(ratio - r.value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = r;
    }
  }

  return closest.label;
}

/**
 * Draws the original image and overlays the new text blocks.
 * This simulates the "Round-trip" functionality (client-side preview).
 */
export const generatePreviewImage = async (
  originalImageUrl: string,
  blocks: TextBlock[],
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject("Could not get canvas context");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = originalImageUrl;

    img.onload = () => {
      // 1. Draw Original Image
      ctx.drawImage(img, 0, 0, width, height);

      // 2. Draw Text Blocks
      blocks.forEach((block) => {
        const { ymin, xmin, ymax, xmax } = block.box_2d;

        // Convert 1000-scale coordinates to pixel coordinates
        const x = (xmin / 1000) * width;
        const y = (ymin / 1000) * height;
        const w = ((xmax - xmin) / 1000) * width;
        const h = ((ymax - ymin) / 1000) * height;

        // A. "Erase" original text (Simulated using a semi-transparent 'patch')
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'; // Paper white patch
        // Draw rounded rect patch
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();

        // B. Draw Border (Proofing aesthetic)
        ctx.strokeStyle = '#d1d5db'; // light gray border
        ctx.lineWidth = 1;
        ctx.stroke();

        // C. Draw New Text
        ctx.fillStyle = '#111827';
        ctx.textBaseline = 'middle';
        
        // Improve padding logic
        const padding = Math.min(w * 0.05, h * 0.05); // 5% padding
        const maxWidth = w - (padding * 2);
        
        // Simple auto-fit font size logic
        let fontSize = (h - (padding * 2)) * 0.7; // Start at 70% of available height
        ctx.font = `600 ${fontSize}px Inter, sans-serif`;
        
        // Measure and shrink if too wide
        let textWidth = ctx.measureText(block.currentText).width;
        while ((textWidth > maxWidth || fontSize > h) && fontSize > 8) {
             fontSize -= 1;
             ctx.font = `600 ${fontSize}px Inter, sans-serif`;
             textWidth = ctx.measureText(block.currentText).width;
        }

        // Center text in box
        const textX = x + (w - textWidth) / 2;
        const textY = y + h / 2 + (fontSize * 0.1); // Slight optical adjustment

        ctx.fillText(block.currentText, textX, textY);
      });

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    img.onerror = (err) => reject(err);
  });
};
