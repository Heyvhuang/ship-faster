import { createServerClient } from "@supabase/ssr";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import sharp from "sharp";
import type { Database } from "../../../../../lib/supabase/types";
import { detectAspectRatio } from "../../../../../lib/services/image-service";

const MAX_IMAGE_DIMENSION = 4096;
const JPEG_QUALITY = 82;

const isValidUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const parseDataUrl = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(.+?);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid image data");
  }
  return { mimeType: match[1], base64: match[2] };
};

const createClient = (request: NextRequest) => {
  const cookieStore = request.cookies;
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  }
  );
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

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: runId } = await params;

  if (!isValidUuid(runId)) {
    return NextResponse.json({ error: "Invalid run id" }, { status: 400 });
  }

  const body = await request.json();
  const imageDataUrl = body?.imageDataUrl as string | undefined;
  const languageCode = body?.languageCode as string | undefined;
  const translationHash = body?.translationHash as string | undefined;
  const variantIndex = Number.isFinite(Number(body?.variantIndex)) ? Number(body?.variantIndex) : 0;

  if (!imageDataUrl || !languageCode || !translationHash) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const supabase = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: run, error: runError } = await supabase
    .from("runs")
    .select("id, project_id, batch_id")
    .eq("id", runId)
    .single();

  if (runError || !run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }

  const { data: project } = await supabase
    .from("projects")
    .select("user_id")
    .eq("id", run.project_id)
    .single();

  if (!project || project.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const r2Config = createR2Config();
  if (!r2Config) {
    return NextResponse.json({ error: "Storage misconfigured" }, { status: 500 });
  }

  const { client: r2Client, bucket, publicBase } = r2Config;

  let outputBuffer: Buffer;
  let outputWidth: number | null = null;
  let outputHeight: number | null = null;

  try {
    const { base64 } = parseDataUrl(imageDataUrl);
    let pipeline = sharp(Buffer.from(base64, "base64")).rotate();
    const metadata = await pipeline.metadata();
    let targetWidth = metadata.width ?? null;
    let targetHeight = metadata.height ?? null;

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
  const assetId = randomUUID();
  const outputFileName = `output-${languageCode}-${variantIndex + 1}.jpg`;
  const storagePath = `${user.id}/outputs/${runId}/${assetId}.jpg`;
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
    batch_id: run.batch_id,
    checksum: randomUUID(),
    size: outputSize,
    filename: outputFileName,
    mime_type: outputMimeType,
    original_filename: outputFileName,
    storage_path: storagePath,
    project_id: run.project_id,
    kind: "output",
    public_url: publicUrl,
    width: outputWidth,
    height: outputHeight,
    aspect_ratio: aspectRatio,
    file_size: outputSize,
  });

  if (assetError) {
    return NextResponse.json({ error: "Failed to create asset" }, { status: 500 });
  }

  const { error: outputError } = await supabase.from("run_outputs").insert({
    run_id: run.id,
    language_code: languageCode,
    variant_index: variantIndex,
    asset_id: assetId,
  });

  if (outputError) {
    return NextResponse.json({ error: "Failed to create run output" }, { status: 500 });
  }

  const { error: checkpointError } = await supabase.from("run_checkpoints").insert({
    run_id: run.id,
    language_code: languageCode,
    variant_index: variantIndex,
    translation_hash: translationHash,
    output_asset_id: assetId,
  });

  if (checkpointError) {
    return NextResponse.json({ error: "Failed to create checkpoint" }, { status: 500 });
  }

  return NextResponse.json(
    {
      asset: { id: assetId, public_url: publicUrl },
      output: { run_id: run.id, language_code: languageCode, variant_index: variantIndex, asset_id: assetId },
    },
    { status: 201 }
  );
}
