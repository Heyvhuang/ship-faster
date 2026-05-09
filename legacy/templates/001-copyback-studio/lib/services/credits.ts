export const DEFAULT_CREDITS_PER_IMAGE = 6;
export const MAX_IMAGES_PER_LANGUAGE = 4;
export const DEV_CREDITS_FLOOR = 1_000_000;

const clampInt = (value: number, min: number, max: number) =>
  Math.min(Math.max(Math.floor(value), min), max);

export function isPrivilegedRole(role: string | null | undefined): boolean {
  return role === "developer" || role === "admin";
}

export function getEffectiveCreditsBalance(params: {
  creditsBalance: number;
  role: string | null | undefined;
}): number {
  if (isPrivilegedRole(params.role)) {
    return Math.max(params.creditsBalance, DEV_CREDITS_FLOOR);
  }
  return params.creditsBalance;
}

export function getCreditsPerImage(): number {
  const raw = process.env.NEXT_PUBLIC_CREDITS_PER_IMAGE;
  if (!raw) return DEFAULT_CREDITS_PER_IMAGE;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_CREDITS_PER_IMAGE;

  return clampInt(parsed, 1, 100);
}

export function normalizeImagesPerLanguage(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return 1;
  return clampInt(parsed, 1, MAX_IMAGES_PER_LANGUAGE);
}

export function estimateRunCredits(params: {
  languageCount: number;
  imagesPerLanguage: number;
}): { totalImages: number; creditsPerImage: number; creditsEstimated: number } {
  const creditsPerImage = getCreditsPerImage();
  const languageCount = clampInt(params.languageCount, 0, 200);
  const imagesPerLanguage = normalizeImagesPerLanguage(params.imagesPerLanguage);
  const totalImages = languageCount * imagesPerLanguage;
  return {
    totalImages,
    creditsPerImage,
    creditsEstimated: totalImages * creditsPerImage,
  };
}
