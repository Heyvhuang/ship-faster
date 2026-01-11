import { createServerClient } from "@supabase/ssr";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { detectAspectRatio } from "../../../lib/services/image-service";
import {
  estimateRunCredits,
  getEffectiveCreditsBalance,
  isPrivilegedRole,
  normalizeImagesPerLanguage,
} from "../../../lib/services/credits";
import type { Database } from "../../../lib/supabase/types";
import type { RecipeType, TextBlock } from "../../../lib/types";

const MAX_IMAGE_DIMENSION = 4096;
const JPEG_QUALITY = 82;

const parseDataUrl = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(.+?);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid image data");
  }
  return { mimeType: match[1], base64: match[2] };
};

const sanitizeFileBase = (fileName: string) => {
  const trimmed = fileName.trim();
  if (!trimmed) return "source";
  return trimmed.replace(/\.[^/.]+$/, "");
};

const createR2Config = () => {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.R2_ENDPOINT;
  const bucket = process.env.R2_BUCKET;
  const publicBase = process.env.R2_PUBLIC_BASE;

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    return null;
  }

  return {
    bucket,
    publicBase,
    client: new S3Client({
      region: "auto",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    }),
  };
};

const createAdminSupabase = (supabaseUrl: string) => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) return null;

  return createAdminClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

const resolveAssetUrl = async (
  asset: { public_url: string | null; storage_path: string | null },
  r2Config: ReturnType<typeof createR2Config>
) => {
  let resolvedUrl = asset.public_url;
  if (!resolvedUrl && asset.storage_path) {
    if (!r2Config) {
      throw new Error("Storage misconfigured");
    }
    const { client, bucket, publicBase } = r2Config;
    if (publicBase) {
      resolvedUrl = `${publicBase.replace(/\/$/, "")}/${asset.storage_path}`;
    } else {
      const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
      const { GetObjectCommand } = await import("@aws-sdk/client-s3");
      resolvedUrl = await getSignedUrl(
        client,
        new GetObjectCommand({ Bucket: bucket, Key: asset.storage_path }),
        { expiresIn: 60 * 60 * 24 }
      );
    }
  }
  return resolvedUrl ?? null;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitRaw = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.floor(limitRaw), 1), 20) : 8;

  const cookieStore = request.cookies;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, name")
    .eq("user_id", user.id);

  if (projectsError) {
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }

  const projectIds = (projects || []).map((project) => project.id);
  if (projectIds.length === 0) {
    return NextResponse.json({ runs: [] });
  }

  const { data: runs, error: runsError } = await supabase
    .from("runs")
    .select("id, status, stage, created_at, languages, source_asset_id, project_id")
    .in("project_id", projectIds)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (runsError) {
    return NextResponse.json({ error: "Failed to load runs" }, { status: 500 });
  }

  const runIds = (runs || []).map((run) => run.id);
  if (runIds.length === 0) {
    return NextResponse.json({ runs: [] });
  }

  const { data: checkpoints, error: checkpointError } = await supabase
    .from("run_checkpoints")
    .select("id, run_id, language_code, variant_index, created_at, output_asset_id")
    .in("run_id", runIds)
    .order("created_at", { ascending: false });

  if (checkpointError) {
    return NextResponse.json({ error: "Failed to load checkpoints" }, { status: 500 });
  }

  const outputAssetIds = Array.from(
    new Set((checkpoints || []).map((checkpoint) => checkpoint.output_asset_id).filter(Boolean))
  ) as string[];

  let assetUrlMap = new Map<string, string | null>();
  if (outputAssetIds.length > 0) {
    const { data: assets, error: assetError } = await supabase
      .from("assets")
      .select("id, public_url, storage_path")
      .in("id", outputAssetIds);

    if (assetError) {
      return NextResponse.json({ error: "Failed to load checkpoint assets" }, { status: 500 });
    }

    const r2Config = createR2Config();
    if (!r2Config) {
      assetUrlMap = new Map(
        (assets || []).map((asset) => [asset.id, asset.public_url ?? null])
      );
    } else {
      const resolvedAssets = await Promise.all(
        (assets || []).map(async (asset) => {
          try {
            const url = await resolveAssetUrl(asset, r2Config);
            return { id: asset.id, url };
          } catch {
            return { id: asset.id, url: null };
          }
        })
      );
      assetUrlMap = new Map(resolvedAssets.map((item) => [item.id, item.url]));
    }
  }

  const checkpointByRun = new Map<string, any[]>();
  (checkpoints || []).forEach((checkpoint) => {
    const previewUrl = checkpoint.output_asset_id ? assetUrlMap.get(checkpoint.output_asset_id) : null;
    const entry = {
      ...checkpoint,
      preview_url: previewUrl ?? null,
    };
    if (!checkpointByRun.has(checkpoint.run_id)) {
      checkpointByRun.set(checkpoint.run_id, []);
    }
    checkpointByRun.get(checkpoint.run_id)!.push(entry);
  });

  const runsPayload = (runs || []).map((run) => ({
    ...run,
    checkpoints: checkpointByRun.get(run.id) || [],
  }));

  return NextResponse.json({ runs: runsPayload });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const recipe = body?.recipe as RecipeType | undefined;
  const targetLanguages = body?.targetLanguages as string[] | undefined;
  const blocks = body?.blocks as TextBlock[] | undefined;
  const imageDataUrl = body?.imageDataUrl as string | undefined;
  const imageMeta = body?.imageMeta as
    | { width?: number; height?: number; fileSize?: number; fileName?: string; mimeType?: string }
    | undefined;
  const imageOptions = body?.imageOptions as { numImages?: number } | undefined;
  const processedTexts = body?.processedTexts as Record<string, Record<string, string>> | undefined;

  if (!recipe || !Array.isArray(targetLanguages) || !imageDataUrl) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  if (targetLanguages.length === 0) {
    return NextResponse.json({ error: "Select at least one target language" }, { status: 400 });
  }

  const cookieStore = request.cookies;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const adminSupabase = createAdminSupabase(supabaseUrl);
  if (!adminSupabase) {
    return NextResponse.json({ error: "Billing misconfigured" }, { status: 500 });
  }

  const r2Config = createR2Config();
  if (!r2Config) {
    return NextResponse.json({ error: "Storage misconfigured" }, { status: 500 });
  }

  const { client: r2Client, bucket, publicBase } = r2Config;

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const imagesPerLanguage = normalizeImagesPerLanguage(imageOptions?.numImages);
  const { totalImages, creditsPerImage, creditsEstimated } = estimateRunCredits({
    languageCount: targetLanguages.length,
    imagesPerLanguage,
  });

  const profileLookup = await adminSupabase
    .from("user_profiles")
    .select("credits_balance, email, role")
    .eq("id", user.id)
    .single();

  if (profileLookup.error) {
    const code = profileLookup.error.code;
    if (code === "PGRST116" || code === "406") {
      const { error: upsertError } = await adminSupabase
        .from("user_profiles")
        .upsert(
          {
            id: user.id,
            email: user.email ?? "",
            credits_balance: 0,
            plan: "free",
            role: "user",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (upsertError) {
        return NextResponse.json({ error: "Failed to initialize billing profile" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Failed to load billing profile" }, { status: 500 });
    }
  }

  const currentCredits = profileLookup.data?.credits_balance ?? 0;
  const role = profileLookup.data?.role ?? "user";
  const isDeveloper = isPrivilegedRole(role);
  const effectiveCredits = getEffectiveCreditsBalance({ creditsBalance: currentCredits, role });
  if (creditsEstimated > 0 && effectiveCredits < creditsEstimated) {
    return NextResponse.json(
      {
        error: "Insufficient credits",
        creditsRequired: creditsEstimated,
        creditsAvailable: effectiveCredits,
        creditsPerImage,
        totalImages,
      },
      { status: 402 }
    );
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      name: body?.projectName || "Untitled Project",
      user_id: user.id,
    })
    .select("id")
    .single();

  if (projectError || !project) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }

  const { data: batch, error: batchError } = await supabase
    .from("batches")
    .insert({
      name: `Run ${new Date().toISOString()}`,
      project_id: project.id,
    })
    .select("id")
    .single();

  if (batchError || !batch) {
    return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });
  }

  const assetId = randomUUID();
  const originalFileName = imageMeta?.fileName || "source";
  const outputFileName = `${sanitizeFileBase(originalFileName)}.jpg`;
  const storagePath = `${user.id}/${assetId}.jpg`;

  let outputBuffer: Buffer;
  let outputWidth: number | null = null;
  let outputHeight: number | null = null;

  try {
    const { base64 } = parseDataUrl(imageDataUrl);
    let pipeline = sharp(Buffer.from(base64, "base64")).rotate();
    const metadata = await pipeline.metadata();
    const fallbackWidth = Number(imageMeta?.width || 0) || null;
    const fallbackHeight = Number(imageMeta?.height || 0) || null;
    const metaWidth = metadata.width ?? fallbackWidth;
    const metaHeight = metadata.height ?? fallbackHeight;
    let targetWidth = metaWidth;
    let targetHeight = metaHeight;

    if (targetWidth && targetHeight) {
      const maxDimension = Math.max(targetWidth, targetHeight);
      if (maxDimension > MAX_IMAGE_DIMENSION) {
        const scale = MAX_IMAGE_DIMENSION / maxDimension;
        targetWidth = Math.round(targetWidth * scale);
        targetHeight = Math.round(targetHeight * scale);
        pipeline = pipeline.resize(targetWidth, targetHeight);
      }
    }

    outputBuffer = await pipeline.jpeg({ quality: JPEG_QUALITY }).toBuffer();
    const outputMeta = await sharp(outputBuffer).metadata();
    outputWidth = outputMeta.width ?? targetWidth;
    outputHeight = outputMeta.height ?? targetHeight;
  } catch {
    return NextResponse.json({ error: "Failed to process image" }, { status: 400 });
  }

  const outputSize = outputBuffer.byteLength;
  const outputMimeType = "image/jpeg";
  const aspectRatio = outputWidth && outputHeight ? detectAspectRatio(outputWidth, outputHeight) : null;
  const publicUrl = publicBase ? `${publicBase.replace(/\/$/, "")}/${storagePath}` : null;

  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: storagePath,
        Body: outputBuffer,
        ContentType: outputMimeType,
      })
    );
  } catch {
    return NextResponse.json({ error: "Failed to store image" }, { status: 500 });
  }

  const { error: assetError } = await supabase.from("assets").insert({
    id: assetId,
    batch_id: batch.id,
    checksum: randomUUID(),
    size: outputSize,
    filename: outputFileName,
    mime_type: outputMimeType,
    original_filename: originalFileName,
    storage_path: storagePath,
    project_id: project.id,
    kind: "source",
    public_url: publicUrl,
    width: outputWidth,
    height: outputHeight,
    aspect_ratio: aspectRatio,
    file_size: outputSize,
  });

  if (assetError) {
    return NextResponse.json({ error: "Failed to create asset" }, { status: 500 });
  }

  const chargeNow = new Date().toISOString();
  const shouldCharge = creditsEstimated > 0;
  const creditsAfter = shouldCharge ? effectiveCredits - creditsEstimated : effectiveCredits;
  const shouldPersistBalance = shouldCharge || (isDeveloper && effectiveCredits !== currentCredits);
  if (shouldPersistBalance) {
    const { error: chargeError } = await adminSupabase
      .from("user_profiles")
      .update({
        credits_balance: creditsAfter,
        updated_at: chargeNow,
      })
      .eq("id", user.id);

    if (chargeError) {
      return NextResponse.json({ error: "Failed to charge credits" }, { status: 500 });
    }
  }

  const billing = {
    credits_per_image: creditsPerImage,
    credits_estimated: creditsEstimated,
    credits_charged: shouldCharge ? creditsEstimated : 0,
    images_per_language: imagesPerLanguage,
    total_images: totalImages,
    credits_balance_before: effectiveCredits,
    credits_balance_after: creditsAfter,
    charged_at: shouldCharge ? chargeNow : null,
  };

  const progress = {
    total_languages: targetLanguages.length,
    completed_languages: 0,
    current_language: targetLanguages[0] || null,
    stage: "queued",
    images_planned_total: totalImages,
    images_generated_total: 0,
    credits_planned_total: creditsEstimated,
    credits_spent_total: 0,
    credits_per_image: creditsPerImage,
  };

  const { data: run, error: runError } = await supabase
    .from("runs")
    .insert({
      batch_id: batch.id,
      project_id: project.id,
      source_asset_id: assetId,
      status: "queued",
      stage: "queued",
      recipe: {
        type: recipe,
        billing,
        ...(imageOptions ? { imageOptions } : {}),
        ...(body?.reviewRequired ? { requiresReview: true } : {}),
      },
      languages: targetLanguages,
      progress,
      retries: 0,
      started_at: new Date().toISOString(),
    })
    .select("id, status, project_id, source_asset_id, recipe, languages, progress")
    .single();

  if (runError || !run) {
    if (shouldCharge) {
      await adminSupabase
        .from("user_profiles")
        .update({
          credits_balance: currentCredits,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
    }
    return NextResponse.json({ error: "Failed to create run" }, { status: 500 });
  }

  const sourceAssetPayload = {
    id: assetId,
    public_url: publicUrl,
    storage_path: storagePath,
    width: outputWidth,
    height: outputHeight,
    aspect_ratio: aspectRatio,
    mime_type: outputMimeType,
    original_filename: originalFileName,
  };

  if (Array.isArray(blocks) && blocks.length > 0) {
    const regionRows = blocks.map((block) => {
      const processed = processedTexts?.[block.id] ?? {};
      const sourceText = block.originalText || "";
      const overflowDetected = Object.values(processed).some(
        (value) => sourceText.length > 0 && value.length > sourceText.length * 1.5
      );

      return {
        run_id: run.id,
        asset_id: assetId,
        key: block.id,
        bbox: {
          ymin: block.box_2d.ymin,
          xmin: block.box_2d.xmin,
          ymax: block.box_2d.ymax,
          xmax: block.box_2d.xmax,
        },
        source_text: sourceText,
        processed_texts: processed,
        overflow_detected: overflowDetected,
      };
    });

    const { error: regionError } = await supabase.from("regions").insert(regionRows);
    if (regionError) {
      if (shouldCharge) {
        await adminSupabase
          .from("user_profiles")
          .update({
            credits_balance: currentCredits,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      }
      return NextResponse.json({ error: "Failed to create regions" }, { status: 500 });
    }
  }

  return NextResponse.json({ run, sourceAsset: sourceAssetPayload, billing }, { status: 201 });
}
