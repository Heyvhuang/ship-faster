import { createServerClient } from "@supabase/ssr";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import type { Database } from "../../../../../lib/supabase/types";

const isValidUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

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
      resolvedUrl = await getSignedUrl(
        client,
        new GetObjectCommand({ Bucket: bucket, Key: asset.storage_path }),
        { expiresIn: 60 * 60 * 24 }
      );
    }
  }
  return resolvedUrl ?? null;
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: runId } = await params;

  if (!isValidUuid(runId)) {
    return NextResponse.json({ error: "Invalid run id" }, { status: 400 });
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
    .select("id, project_id, source_asset_id")
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

  const { data: sourceAsset } = await supabase
    .from("assets")
    .select("public_url, storage_path, mime_type")
    .eq("id", run.source_asset_id)
    .single();

  if (!sourceAsset) {
    return NextResponse.json({ error: "Source asset not found" }, { status: 404 });
  }

  const r2Config = createR2Config();
  if (!r2Config) {
    return NextResponse.json({ error: "Storage misconfigured" }, { status: 500 });
  }

  let resolvedUrl: string | null = null;
  try {
    resolvedUrl = await resolveAssetUrl(sourceAsset, r2Config);
  } catch {
    return NextResponse.json({ error: "Storage misconfigured" }, { status: 500 });
  }

  if (!resolvedUrl) {
    return NextResponse.json({ error: "Source url not available" }, { status: 404 });
  }

  const upstream = await fetch(resolvedUrl, { cache: "no-store" });
  if (!upstream.ok) {
    return NextResponse.json(
      { error: `Failed to fetch source image (${upstream.status})` },
      { status: 502 }
    );
  }

  const buffer = await upstream.arrayBuffer();
  const contentType =
    sourceAsset.mime_type || upstream.headers.get("content-type") || "application/octet-stream";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, max-age=300",
    },
  });
}

