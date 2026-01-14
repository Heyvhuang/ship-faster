import { ProcessedImage } from "../types";

export async function downloadSingleAsset(
  url: string,
  filename: string
): Promise<void> {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function applyWatermark(
  imageUrl: string,
  watermarkText: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas unavailable");
        return;
      }
      ctx.drawImage(img, 0, 0);
      const size = Math.max(16, Math.floor(Math.min(img.width, img.height) * 0.06));
      ctx.font = `700 ${size}px Inter, sans-serif`;
      ctx.fillStyle = "rgba(17, 24, 39, 0.35)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 8);
      ctx.fillText(watermarkText, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject("Failed to load image");
    img.src = imageUrl;
  });
}

export async function downloadAsZip(
  results: ProcessedImage[],
  projectName: string = "copyback-export",
  watermarkText?: string
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  const folder = zip.folder(projectName);
  if (!folder) {
    throw new Error("Failed to create zip folder");
  }

  for (const result of results) {
    const urls = result.previewUrls && result.previewUrls.length > 0
      ? result.previewUrls
      : result.previewUrl
      ? [result.previewUrl]
      : [];

    if (urls.length === 0) continue;

    for (const [index, url] of urls.entries()) {
      try {
        const sourceUrl = watermarkText
          ? await applyWatermark(url, watermarkText).catch(() => url)
          : url;
        const response = await fetch(sourceUrl);
        const blob = await response.blob();
        const extension = sourceUrl.includes("image/png")
          ? "png"
          : sourceUrl.includes("image/webp")
          ? "webp"
          : "jpg";
        const suffix = urls.length > 1 ? `_v${index + 1}` : "";
        const filename = `${result.languageCode}_${result.languageName.replace(/\s+/g, "_")}${suffix}.${extension}`;
        folder.file(filename, blob);
      } catch (error) {
        console.error(`Failed to add ${result.languageName} to zip:`, error);
      }
    }
  }

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const timestamp = new Date().toISOString().slice(0, 10);

  await downloadSingleAsset(url, `${projectName}_${timestamp}.zip`);
  URL.revokeObjectURL(url);
}

export async function generateShareableLink(
  runId: string,
  expiresInDays: number = 7
): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  return `${window.location.origin}/share/${token}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function generateExportManifest(
  results: ProcessedImage[],
  projectName: string
): Record<string, unknown> {
  return {
    project: projectName,
    exportedAt: new Date().toISOString(),
    totalAssets: results.length,
    assets: results.map((r) => ({
      language: r.languageCode,
      languageName: r.languageName,
      status: r.status,
      blockCount: r.blocks.length,
      hasOverflow: r.blocks.some(
        (b) => b.currentText.length > b.originalText.length * 1.5
      ),
    })),
  };
}
