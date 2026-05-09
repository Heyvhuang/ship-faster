import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../../lib/supabase/types";

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are missing." },
      { status: 500 }
    );
  }

  const supabase = createClient<Database>(supabaseUrl, serviceRoleKey);
  const { data: runs, error } = await supabase
    .from("runs")
    .select("id, status, languages, progress, recipe")
    .in("status", ["queued", "running"])
    .limit(10);

  if (error) {
    return NextResponse.json({ error: "Failed to load runs" }, { status: 500 });
  }

  const updates = await Promise.all(
    (runs || []).map(async (run) => {
      const languages = Array.isArray(run.languages) ? run.languages : [];
      const total = languages.length;
      const progress = (run.progress || {}) as Record<string, any>;
      const completed = Math.min(progress.completed_languages || 0, total);
      const nextCompleted = Math.min(completed + 1, total);
      const stage = nextCompleted >= total ? "complete" : "translating";

      let nextStatus: "running" | "needs_review" | "done" = nextCompleted >= total ? "done" : "running";

      const updatePayload: Record<string, unknown> = {
        status: nextStatus,
        stage,
        progress: {
          total_languages: total,
          completed_languages: nextCompleted,
          current_language: languages[Math.max(nextCompleted - 1, 0)] || null,
          stage,
        },
      };

      if (run.status === "queued") {
        updatePayload.started_at = new Date().toISOString();
      }

      if (nextCompleted >= total) {
        const { data: regions } = await supabase
          .from("regions")
          .select("id, overflow_detected")
          .eq("run_id", run.id);

        const hasOverflow = regions?.some((r) => r.overflow_detected === true);
        const recipe = (run.recipe || {}) as Record<string, any>;
        const requiresReview = recipe.requiresReview === true;

        if (hasOverflow || requiresReview) {
          nextStatus = "needs_review";
          updatePayload.status = nextStatus;
        } else {
          nextStatus = "done";
          updatePayload.status = nextStatus;
          updatePayload.completed_at = new Date().toISOString();
        }
      }

      const { error: updateError } = await supabase
        .from("runs")
        .update(updatePayload)
        .eq("id", run.id);

      return { id: run.id, ok: !updateError };
    })
  );

  return NextResponse.json({ processed: updates.length, updates });
}
