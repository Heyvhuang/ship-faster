import { generateText } from "ai";
import { TextBlock, RecipeType } from "../types";

const textModel = "openai/gpt-5.1-instant";

const extractionInstruction = `Analyze this marketing banner. Identify all distinct text blocks.
Return a JSON array where each object contains:
- "text": The exact text content.
- "box_2d": An array of 4 integers [ymin, xmin, ymax, xmax] representing the bounding box on a 1000x1000 scale.

Do not include background text that is part of the scenery, only the copy text overlays.`;

const buildTranslationInstruction = (targetLanguage: string, recipe: RecipeType) => {
  let instruction =
    `Translate the following marketing copy texts into ${targetLanguage}. Maintain the tone (punchy, marketing-oriented) and keep the meaning faithful.` +
    `\nRules:` +
    `\n- Preserve brand/product names, person names, legal terms, model numbers/SKUs, URLs, email addresses, @handles, hashtags, and emojis exactly as in the source.` +
    `\n- Preserve numbers, currency, units, dates, and measurements; only adapt separators if standard in ${targetLanguage}.` +
    `\n- Do not add new claims or information that is not in the source.` +
    `\n- Keep emphasis (ALL CAPS) and punctuation when meaningful.` +
    `\n- If the text is already in ${targetLanguage}, return it unchanged.`;

  if (recipe === "compress") {
    instruction +=
      " CRITICAL: Make it shorter to fit tight visual space while keeping key meaning, CTAs, and numbers. Target <= 75% of the original length when possible.";
  } else if (recipe === "rewrite") {
    instruction += ` You may rewrite for cultural fit, but keep the same intent, offers, prices, and calls-to-action; do not change brand terms.`;
  } else if (recipe === "compliance") {
    instruction += " Use conservative, compliant wording; avoid absolute or unverifiable claims unless present in the source.";
  }

  return instruction;
};

const parseExtractionArray = (rawText: string) => {
  const cleaned = rawText.trim();
  const tryParse = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const direct = tryParse(cleaned);
  if (direct) return direct;

  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start >= 0 && end > start) {
    const sliced = cleaned.slice(start, end + 1);
    return tryParse(sliced) ?? [];
  }

  return [];
};

const resolveImageInput = (imageUrl: string, mimeType?: string) => {
  if (imageUrl.startsWith("data:")) {
    const match = imageUrl.match(/^data:(.+?);base64,(.*)$/);
    if (match) {
      const [, dataMimeType, base64] = match;
      return {
        image: base64,
        mediaType: mimeType || dataMimeType,
      };
    }
  }

  return {
    image: imageUrl,
    mediaType: mimeType,
  };
};

export const extractTextBlocks = async (imageUrl: string, mimeType?: string): Promise<TextBlock[]> => {
  try {
    const imagePart = resolveImageInput(imageUrl, mimeType);
    const { text } = await generateText({
      model: textModel,
      messages: [
        {
          role: "system",
          content: extractionInstruction,
        },
        {
          role: "user",
          content: [
            {
              type: "image",
              image: imagePart.image,
              ...(imagePart.mediaType ? { mediaType: imagePart.mediaType } : {}),
            },
          ],
        },
      ],
    });

    const rawData = parseExtractionArray(text || "[]");
    if (!Array.isArray(rawData)) return [];

    const now = Date.now();

    return rawData.map((item, index) => ({
      id: `block-${index}-${now}`,
      originalText: String(item.text ?? ""),
      currentText: String(item.text ?? ""),
      box_2d: {
        ymin: Number(item.box_2d?.[0] ?? 0),
        xmin: Number(item.box_2d?.[1] ?? 0),
        ymax: Number(item.box_2d?.[2] ?? 0),
        xmax: Number(item.box_2d?.[3] ?? 0),
      },
      status: "clean",
    }));
  } catch (error) {
    console.error("Extraction error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to extract text from image.");
  }
};

export const translateText = async (
  text: string,
  targetLanguage: string,
  recipe: RecipeType
): Promise<string> => {
  if (!text) return "";

  const instruction = buildTranslationInstruction(targetLanguage, recipe);

  try {
    const { text: translated } = await generateText({
      model: textModel,
      messages: [
        {
          role: "system",
          content: "Return only the translated text without extra formatting.",
        },
        {
          role: "user",
          content: `${instruction}\n\nText: ${text}`,
        },
      ],
    });

    return translated.trim();
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};

export const translateBlocks = async (
  blocks: TextBlock[],
  targetLanguage: string,
  recipe: RecipeType
): Promise<TextBlock[]> => {
  if (blocks.length === 0) return [];

  const instruction = buildTranslationInstruction(targetLanguage, recipe);
  const payload = blocks.map((block) => ({ id: block.id, text: block.originalText }));

  try {
    const { text } = await generateText({
      model: textModel,
      messages: [
        {
          role: "system",
          content: "Return only valid JSON with id and translatedText fields.",
        },
        {
          role: "user",
          content: `${instruction}\n\nReturn a JSON array of objects with \"id\" and \"translatedText\" only. Keep the same number of items as input, preserve each id, and keep the output order. If a translation is unclear, copy the source text.\n\nInput: ${JSON.stringify(payload)}`,
        },
      ],
    });

    const translatedData = JSON.parse(text || "[]");

    if (!Array.isArray(translatedData)) return blocks;

    const translationMap = new Map<string, string>(
      translatedData.map((item) => [String(item.id), String(item.translatedText ?? "")])
    );

    return blocks.map((block) => ({
      ...block,
      currentText: translationMap.get(block.id) || block.originalText,
      status: "edited",
    }));
  } catch (error) {
    console.error("Translation error:", error);
    return blocks;
  }
};
