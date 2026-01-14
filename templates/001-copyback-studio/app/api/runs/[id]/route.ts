import { createServerClient } from "@supabase/ssr";
import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import type { Database } from "../../../../lib/supabase/types";
import type { RunStatus } from "../../../../lib/types";
import { transitionRunStatus } from "../../../../lib/services/run-service";

type OutputAsset = {
  id: string;
  public_url: string | null;
  storage_path: string | null;
  width: number | null;
  height: number | null;
  aspect_ratio: string | null;
  file_size: number | null;
  mime_type: string | null;
  original_filename: string | null;
};

type OutputRow = {
  id: string;
  language_code: string;
  variant_index: number;
  asset_id: string;
  created_at: string | null;
  assets?: OutputAsset | null;
};

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
    .select("id, status, project_id, source_asset_id, recipe, languages, progress, stage, retries, error")
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
    .select("id, public_url, storage_path, width, height, aspect_ratio, file_size, mime_type, original_filename")
    .eq("id", run.source_asset_id)
    .single();

  const r2Config = createR2Config();
  let sourceAssetPayload = sourceAsset;

  if (sourceAsset) {
    try {
      const resolvedUrl = await resolveAssetUrl(sourceAsset, r2Config);
      sourceAssetPayload = { ...sourceAsset, public_url: resolvedUrl };
    } catch {
      return NextResponse.json({ error: "Storage misconfigured" }, { status: 500 });
    }
  }

  const { data: regions } = await supabase
    .from("regions")
    .select("id, key, bbox, source_text, processed_texts, overflow_detected")
    .eq("run_id", runId);

  const { data: outputs } = await supabase
    .from("run_outputs")
    .select(
      "id, language_code, variant_index, asset_id, created_at, assets(id, public_url, storage_path, width, height, aspect_ratio, file_size, mime_type, original_filename)"
    )
    .eq("run_id", runId)
    .order("created_at", { ascending: true });

  const outputRows = (outputs ?? []) as OutputRow[];
  const requiresR2 = outputRows.some(
    (output) => output.assets && !output.assets.public_url && output.assets.storage_path
  );

  if (requiresR2 && !r2Config) {
    return NextResponse.json({ error: "Storage misconfigured" }, { status: 500 });
  }

  const resolvedOutputs = await Promise.all(
    outputRows.map(async (output) => {
      const { assets, ...rest } = output;
      if (!assets) {
        return { ...rest, asset: null };
      }
      const resolvedUrl = await resolveAssetUrl(assets, r2Config);
      return { ...rest, asset: { ...assets, public_url: resolvedUrl } };
    })
  );

  const { data: checkpoints } = await supabase
    .from("run_checkpoints")
    .select("id, language_code, variant_index, translation_hash, output_asset_id, created_at")
    .eq("run_id", runId)
    .order("created_at", { ascending: false });

  return NextResponse.json({ run, sourceAsset: sourceAssetPayload, regions, outputs: resolvedOutputs, checkpoints });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    .select("id, status, project_id, progress")
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

  const body = await request.json();
  const nextStatus = body?.status as RunStatus | undefined;
  const progress = body?.progress as Record<string, unknown> | undefined;
  const stage = body?.stage as string | undefined;
  const error = body?.error as string | undefined;

  const updatePayload: Record<string, unknown> = {};

  if (nextStatus && nextStatus !== run.status) {
    try {
      updatePayload.status = transitionRunStatus(run.status as RunStatus, nextStatus);
    } catch {
      return NextResponse.json({ error: "Invalid status transition" }, { status: 400 });
    }
  }

  if (progress) {
    updatePayload.progress = { ...(run.progress as Record<string, unknown> | null), ...progress };
  }

  if (stage) {
    updatePayload.stage = stage;
  }

  if (error) {
    updatePayload.error = error;
  }

  if (nextStatus === "running") {
    updatePayload.started_at = new Date().toISOString();
  }

  if (nextStatus === "done") {
    updatePayload.completed_at = new Date().toISOString();
  }

  if (run.status === "needs_review" && nextStatus === "done") {
    updatePayload.completed_at = new Date().toISOString();
  }

  const { data: updated, error: updateError } = await supabase
    .from("runs")
    .update(updatePayload)
    .eq("id", runId)
    .select("id, status, progress, stage")
    .single();

  if (updateError || !updated) {
    return NextResponse.json({ error: "Failed to update run" }, { status: 500 });
  }

  return NextResponse.json({ run: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    .select("id, project_id, batch_id, source_asset_id")
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

  const { data: outputRows } = await supabase
    .from("run_outputs")
    .select("asset_id")
    .eq("run_id", runId);

  const { data: checkpointRows } = await supabase
    .from("run_checkpoints")
    .select("output_asset_id")
    .eq("run_id", runId);

  const assetIds = new Set<string>();
  if (run.source_asset_id) {
    assetIds.add(run.source_asset_id);
  }
  (outputRows || []).forEach((row) => {
    if (row.asset_id) assetIds.add(row.asset_id);
  });
  (checkpointRows || []).forEach((row) => {
    if (row.output_asset_id) assetIds.add(row.output_asset_id);
  });

  const assetIdList = Array.from(assetIds);
  let assetsToDelete: Array<{ id: string; storage_path: string }> = [];

  if (assetIdList.length > 0) {
    const { data: assets, error: assetsError } = await supabase
      .from("assets")
      .select("id, storage_path")
      .in("id", assetIdList);

    if (assetsError) {
      return NextResponse.json({ error: "Failed to load assets" }, { status: 500 });
    }

    assetsToDelete = (assets || []).filter((asset) => !!asset.storage_path) as Array<{
      id: string;
      storage_path: string;
    }>;
  }

  if (assetsToDelete.length > 0) {
    const r2Config = createR2Config();
    if (!r2Config) {
      return NextResponse.json({ error: "Storage misconfigured" }, { status: 500 });
    }
    const { client, bucket } = r2Config;

    try {
      await Promise.all(
        assetsToDelete.map((asset) =>
          client.send(new DeleteObjectCommand({ Bucket: bucket, Key: asset.storage_path }))
        )
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete storage objects";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  const { error: shareLinkError } = await supabase
    .from("share_links")
    .delete()
    .eq("run_id", runId);

  if (shareLinkError) {
    return NextResponse.json({ error: "Failed to delete share links" }, { status: 500 });
  }

  const { error: checkpointError } = await supabase
    .from("run_checkpoints")
    .delete()
    .eq("run_id", runId);

  if (checkpointError) {
    return NextResponse.json({ error: "Failed to delete checkpoints" }, { status: 500 });
  }

  const { error: outputError } = await supabase
    .from("run_outputs")
    .delete()
    .eq("run_id", runId);

  if (outputError) {
    return NextResponse.json({ error: "Failed to delete outputs" }, { status: 500 });
  }

  const { error: regionError } = await supabase
    .from("regions")
    .delete()
    .eq("run_id", runId);

  if (regionError) {
    return NextResponse.json({ error: "Failed to delete regions" }, { status: 500 });
  }

  if (assetIdList.length > 0) {
    const { error: assetDeleteError } = await supabase
      .from("assets")
      .delete()
      .in("id", assetIdList);

    if (assetDeleteError) {
      return NextResponse.json({ error: "Failed to delete assets" }, { status: 500 });
    }
  }

  const { error: runDeleteError } = await supabase
    .from("runs")
    .delete()
    .eq("id", runId);

  if (runDeleteError) {
    return NextResponse.json({ error: "Failed to delete run" }, { status: 500 });
  }

  const { error: batchDeleteError } = await supabase
    .from("batches")
    .delete()
    .eq("id", run.batch_id);

  if (batchDeleteError) {
    return NextResponse.json({ error: "Failed to delete batch" }, { status: 500 });
  }

  return NextResponse.json({ deleted: true });
}
