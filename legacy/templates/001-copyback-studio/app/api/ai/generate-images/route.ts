import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "../../../../lib/supabase/server";
import { generateInpaintedImage, type AspectRatio, type Resolution } from "../../../../lib/services/image-service";
import { normalizeImagesPerLanguage } from "../../../../lib/services/credits";
import type { Database } from "../../../../lib/supabase/types";
import type { TextBlock } from "../../../../lib/types";

const isValidUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const createAdminSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;

  return createAdminClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export async function POST(request: NextRequest) {
  const supabase = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const runId = body?.runId as string | undefined;
  const sourceImageUrl = body?.sourceImageUrl as string | undefined;
  const blocks = body?.blocks as TextBlock[] | undefined;
  const languageCode = body?.languageCode as string | undefined;
  const languageName = body?.languageName as string | undefined;
  const imageOptions = body?.imageOptions as
    | { numImages?: number; aspectRatio?: AspectRatio; resolution?: Resolution }
    | undefined;

  if (!runId || !isValidUuid(runId)) {
    return NextResponse.json({ error: "Missing run id" }, { status: 400 });
  }

  if (!sourceImageUrl || !Array.isArray(blocks) || blocks.length === 0) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const adminSupabase = createAdminSupabase();
  if (!adminSupabase) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const { data: run, error: runError } = await adminSupabase
    .from("runs")
    .select("id, project_id, progress, recipe")
    .eq("id", runId)
    .single();

  if (runError || !run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }

  const { data: project } = await adminSupabase
    .from("projects")
    .select("user_id")
    .eq("id", run.project_id)
    .single();

  if (!project || project.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const recipe = (run.recipe || {}) as Record<string, unknown>;
  const billing = (recipe.billing || null) as Record<string, unknown> | null;

  if (!billing) {
    return NextResponse.json({ error: "Run not billed. Create a new run to generate images." }, { status: 402 });
  }

  const progress = (run.progress || {}) as Record<string, unknown>;
  const plannedImagesRaw = Number(progress.images_planned_total ?? billing.total_images ?? 0);
  const generatedImagesRaw = Number(progress.images_generated_total ?? 0);

  const plannedImages = Number.isFinite(plannedImagesRaw) ? Math.max(0, plannedImagesRaw) : 0;
  const generatedImages = Number.isFinite(generatedImagesRaw) ? Math.max(0, generatedImagesRaw) : 0;

  if (plannedImages <= 0) {
    return NextResponse.json({ error: "Run has no remaining image budget." }, { status: 400 });
  }

  const requestedImages = normalizeImagesPerLanguage(imageOptions?.numImages);
  const remaining = Math.max(0, plannedImages - generatedImages);
  if (requestedImages > remaining) {
    return NextResponse.json(
      {
        error: "Run has insufficient remaining image budget.",
        remainingImages: remaining,
        requestedImages,
      },
      { status: 402 }
    );
  }

  const label = languageName || languageCode || "target language";
  const lines = blocks.map((block, index) => `${index + 1}. ${block.currentText || block.originalText}`);
  const prompt = `Task: Replace only the visible text in the image with the provided ${label} copy.\nRules:\n- Keep all non-text elements unchanged (background, graphics, logos, photos, colors).\n- Preserve layout, alignment, font style, and text size as closely as possible.\n- Match the original font family, weight, casing, kerning, and visual treatment (outline, shadow, texture, gradient).\n- Keep the overall visual style and typography tone consistent with the original image.\n- Do not add or remove text beyond the provided lines.\n- Keep numbers, currencies, units, URLs, and brand names exactly as given.\nText lines to place (in order):\n${lines.join("\n")}`;

  try {
    const images = await generateInpaintedImage(sourceImageUrl, prompt, imageOptions);

    const nextGenerated = generatedImages + images.length;
    const creditsPerImageRaw = Number(progress.credits_per_image ?? billing.credits_per_image ?? 0);
    const creditsPerImage = Number.isFinite(creditsPerImageRaw) ? Math.max(0, creditsPerImageRaw) : 0;
    const nextCreditsSpent = creditsPerImage > 0 ? nextGenerated * creditsPerImage : Number(progress.credits_spent_total ?? 0) || 0;
    await adminSupabase
      .from("runs")
      .update({
        progress: { ...progress, images_generated_total: nextGenerated, credits_spent_total: nextCreditsSpent },
      })
      .eq("id", runId);

    return NextResponse.json({ images });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[generate-images] Failed:", message, error);
    return NextResponse.json({ error: `Image generation failed: ${message}` }, { status: 500 });
  }
}
