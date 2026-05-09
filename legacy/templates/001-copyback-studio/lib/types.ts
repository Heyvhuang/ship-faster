export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface TextBlock {
  id: string;
  originalText: string;
  box_2d: BoundingBox; // 0-1000 scale
  currentText: string;
  status: 'clean' | 'edited' | 'overflow';
}

export interface ProcessedImage {
  languageCode: string;
  languageName: string;
  blocks: TextBlock[];
  previewUrl: string | null;
  previewUrls?: string[];
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export interface RunOutput {
  id: string;
  language_code: string;
  variant_index: number;
  created_at: string | null;
  asset: { public_url: string | null } | null;
}

export type RecipeType = 'translation' | 'rewrite' | 'compress' | 'compliance';

export type RunStatus = 'draft' | 'queued' | 'running' | 'needs_review' | 'done' | 'failed' | 'canceled';

export const VALID_TRANSITIONS: Record<RunStatus, RunStatus[]> = {
  draft: ['queued'],
  queued: ['running', 'canceled'],
  running: ['needs_review', 'done', 'failed', 'canceled'],
  needs_review: ['running', 'done'],
  done: [],
  failed: ['queued'],
  canceled: ['queued'],
};

export interface ProjectState {
  originalImageUrl: string | null;
  originalImageDimensions: { width: number; height: number };
  extractedBlocks: TextBlock[];
  targetLanguages: string[];
  recipe: RecipeType;
  imageOptions?: { numImages?: number };
  reviewRequired?: boolean;
  results: ProcessedImage[];
}

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ar', name: 'Arabic' },
];

export const RECIPES: { id: RecipeType; label: string; description: string }[] = [
  { id: 'translation', label: 'Direct Translation', description: 'Accurate, tone-matched translation.' },
  { id: 'rewrite', label: 'Rewrite', description: 'Rewrite for clarity and impact while preserving intent.' },
  { id: 'compress', label: 'Compress', description: 'Shorten copy to fit tight layouts.' },
  { id: 'compliance', label: 'Compliance', description: 'Soften claims to meet compliance needs.' },
];
