"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "../../../../components/AppShell";
import { Button } from "../../../../components/Button";
import { useAuth } from "../../../../components/AuthProvider";
import { ProjectState, LANGUAGES, ProcessedImage, RecipeType, TextBlock } from "../../../../lib/types";
import { Loader2, CheckCircle, XCircle, ArrowRight, Globe, Clock, Sparkles, Image as ImageIcon } from "lucide-react";

type ProcessingStatus = "pending" | "processing" | "completed" | "error";
type ProcessingStage = "translating" | "generating" | "complete";

interface LanguageProgress {
  code: string;
  name: string;
  status: ProcessingStatus;
  progress: number;
  stage: ProcessingStage;
  translationPreview?: string;
}

const isValidUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

// Circular progress component
function CircularProgress({ progress, size = 120 }: { progress: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-ink-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-accent transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-ink-900">{progress}%</span>
        <span className="text-xs text-ink-400 uppercase tracking-wide">Complete</span>
      </div>
    </div>
  );
}

export default function QueuePage() {
  const params = useParams();
  const router = useRouter();
  const runId = params.runId as string;
  const processingRef = useRef(false);
  const startTimeRef = useRef<number>(Date.now());
  const regionsRef = useRef<Map<string, { id: string; processed_texts: Record<string, string> }>>(new Map());
  const { supabase, user, loading } = useAuth();

  const [project, setProject] = useState<ProjectState | null>(null);
  const [languageProgress, setLanguageProgress] = useState<LanguageProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStage, setCurrentStage] = useState<ProcessingStage>("translating");
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(`/studio/${runId}/queue`)}`);
    }
  }, [loading, router, runId, user]);

  useEffect(() => {
    if (isComplete) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isComplete]);

  // Update elapsed time
  useEffect(() => {
    if (isComplete) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const estimatedTotal = (project?.targetLanguages.length || 1) * 25; // ~25s per language
  const estimatedRemaining = Math.max(0, estimatedTotal - elapsedTime);

  useEffect(() => {
    if (!runId || !isValidUuid(runId)) {
      router.replace("/studio");
      return;
    }

    const loadRun = async () => {
      const response = await fetch(`/api/runs/${runId}`);
      if (!response.ok) {
        router.replace("/studio");
        return;
      }

      const data = await response.json();
      const run = data?.run;
      const regions = Array.isArray(data?.regions) ? data.regions : [];
      const sourceAsset = data?.sourceAsset;
      const languages = Array.isArray(run?.languages) ? run.languages : [];
      const regionMap = new Map<string, { id: string; processed_texts: Record<string, string> }>();
      regions.forEach((region: { id?: string; key?: string; processed_texts?: unknown }) => {
        if (!region?.id || !region?.key) return;
        const processedTexts = (region.processed_texts && typeof region.processed_texts === "object"
          ? region.processed_texts
          : {}) as Record<string, string>;
        regionMap.set(region.key, { id: region.id, processed_texts: { ...processedTexts } });
      });
      regionsRef.current = regionMap;

      let storedProject: ProjectState | null = null;
      const stored = sessionStorage.getItem(`project-${runId}`);
      if (stored) {
        try {
          storedProject = JSON.parse(stored) as ProjectState;
        } catch {
          storedProject = null;
        }
      }


      const extractedBlocks: TextBlock[] = regions.map((region: any) => ({
        id: region.key,
        originalText: region.source_text,
        currentText: region.source_text,
        box_2d: region.bbox,
        status: "clean",
      }));

      const nextProject: ProjectState = {
        originalImageUrl: sourceAsset?.public_url || null,
        originalImageDimensions: {
          width: sourceAsset?.width || 0,
          height: sourceAsset?.height || 0,
        },
        extractedBlocks,
        targetLanguages: languages,
        recipe: (run?.recipe?.type || "translation") as RecipeType,
        imageOptions: run?.recipe?.imageOptions || undefined,
        reviewRequired: false,
        results: [],
      };

      const mergedProject: ProjectState = {
        ...nextProject,
        ...storedProject,
        originalImageUrl: storedProject?.originalImageUrl || nextProject.originalImageUrl,
        originalImageDimensions:
          storedProject?.originalImageDimensions?.width && storedProject?.originalImageDimensions?.height
            ? storedProject.originalImageDimensions
            : nextProject.originalImageDimensions,
        extractedBlocks:
          storedProject?.extractedBlocks && storedProject.extractedBlocks.length > 0
            ? storedProject.extractedBlocks
            : nextProject.extractedBlocks,
        targetLanguages:
          languages.length > 0 ? languages : storedProject?.targetLanguages || nextProject.targetLanguages,
        recipe: (run?.recipe?.type || storedProject?.recipe || "translation") as RecipeType,
        imageOptions: {
          ...(storedProject?.imageOptions || {}),
          ...(run?.recipe?.imageOptions || {}),
        },
        results: storedProject?.results || [],
      };

      setProject(mergedProject);
      setLanguageProgress(
        mergedProject.targetLanguages.map((code: string) => ({
          code,
          name: LANGUAGES.find((l) => l.code === code)?.name || code,
          status: "pending",
          progress: 0,
          stage: "translating" as ProcessingStage,
        }))
      );
    };

    loadRun();
  }, [runId, router]);

  useEffect(() => {
    if (!supabase || !runId || !isValidUuid(runId)) return;

    const channel = supabase
      .channel(`run-${runId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "runs",
          filter: `id=eq.${runId}`,
        },
        (payload) => {
          const progress = payload.new.progress as Record<string, any> | null;
          if (progress?.total_languages && progress?.completed_languages !== undefined) {
            const next = Math.round(
              (Number(progress.completed_languages) / Number(progress.total_languages)) * 100
            );
            setOverallProgress(Number.isFinite(next) ? next : 0);
          }
          if (payload.new.status === "done" || payload.new.status === "needs_review") {
            setIsComplete(true);
            setCurrentStage("complete");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, runId]);

  useEffect(() => {
    if (!project || processingRef.current) return;
    if (project.targetLanguages.length === 0) return;

    processingRef.current = true;

    const updateRun = async (payload: Record<string, unknown>) => {
      await fetch(`/api/runs/${runId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    };

    const hashTranslation = async (blocks: TextBlock[]) => {
      const text = blocks.map((block) => block.currentText).join("\n");
      const data = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    };

    const persistTranslations = async (langCode: string, blocks: TextBlock[]) => {
      if (!supabase) return;
      const updates = blocks.flatMap((block) => {
        const region = regionsRef.current.get(block.id);
        if (!region) return [];
        const nextTexts = { ...region.processed_texts, [langCode]: block.currentText };
        region.processed_texts = nextTexts;
        const overflowDetected = block.currentText.length > block.originalText.length * 1.5;
        return [{ id: region.id, processed_texts: nextTexts, overflow_detected: overflowDetected }];
      });
      if (updates.length === 0) return;
      try {
        await Promise.all(
          updates.map((update) =>
            supabase
              .from("regions")
              .update({ processed_texts: update.processed_texts, overflow_detected: update.overflow_detected })
              .eq("id", update.id)
          )
        );
      } catch (error) {
        console.error("Failed to persist translations", error);
      }
    };

    const persistOutputs = async (langCode: string, previewUrls: string[], translationHash: string) => {
      if (previewUrls.length === 0) return;
      try {
        await Promise.all(
          previewUrls.map(async (imageDataUrl, variantIndex) => {
            const response = await fetch(`/api/runs/${runId}/outputs`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                imageDataUrl,
                languageCode: langCode,
                variantIndex,
                translationHash,
              }),
            });
            if (!response.ok) {
              const data = await response.json();
              throw new Error(data?.error || "Failed to persist output");
            }
          })
        );
      } catch (error) {
        console.error("Failed to persist outputs", error);
      }
    };

    const processLanguages = async (proj: ProjectState) => {
      const total = proj.targetLanguages.length;
      const results: ProcessedImage[] = new Array(total);
      let completed = 0;
      let requiresReview = Boolean(proj.reviewRequired);

      await updateRun({
        status: "running",
        stage: "generating",
        progress: {
          total_languages: total,
          completed_languages: 0,
          current_language: proj.targetLanguages[0] || null,
          stage: "generating",
        },
      });

      for (const [index, langCode] of proj.targetLanguages.entries()) {
        setLanguageProgress((prev) =>
          prev.map((lp) => (lp.code === langCode ? { ...lp, status: "processing", progress: 20, stage: "translating" } : lp))
        );
        setCurrentStage("translating");

        const languageName = LANGUAGES.find((l) => l.code === langCode)?.name || langCode;

        try {
          const existing = proj.results.find((result) => result.languageCode === langCode);
          let translatedBlocks = existing?.blocks?.length ? existing.blocks : null;

          if (!translatedBlocks) {
            const translationResponse = await fetch("/api/ai/translate-blocks", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                blocks: proj.extractedBlocks,
                targetLanguage: langCode,
                recipe: proj.recipe,
              }),
            });

            const translationData = await translationResponse.json();
            if (!translationResponse.ok) {
              throw new Error(translationData?.error || "Translation failed");
            }

            translatedBlocks = Array.isArray(translationData?.blocks) ? translationData.blocks : [];
          }

          if (!translatedBlocks || translatedBlocks.length === 0) {
            throw new Error("Translation failed");
          }

          const normalizedBlocks: TextBlock[] = translatedBlocks.map((block: TextBlock) => {
            const isOverflow = block.currentText.length > block.originalText.length * 1.5;
            return { ...block, status: isOverflow ? "overflow" : "clean" } as TextBlock;
          });

          let translationHash = "";
          try {
            translationHash = await hashTranslation(normalizedBlocks);
          } catch (error) {
            console.error("Failed to hash translation", error);
            translationHash = crypto.randomUUID?.() ?? `${Date.now()}`;
          }

          await persistTranslations(langCode, normalizedBlocks);

          const preview = normalizedBlocks.map((b: TextBlock) => b.currentText).join(" ").slice(0, 60);
          setLanguageProgress((prev) =>
            prev.map((lp) => (lp.code === langCode ? { ...lp, progress: 50, stage: "generating", translationPreview: preview } : lp))
          );
          setCurrentStage("generating");

          let previewUrls: string[] = [];

          if (proj.originalImageUrl) {
            const imageResponse = await fetch("/api/ai/generate-images", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                runId,
                sourceImageUrl: proj.originalImageUrl,
                blocks: normalizedBlocks,
                languageCode: langCode,
                languageName,
                imageOptions: proj.imageOptions,
              }),
            });

            const imageData = await imageResponse.json();
            if (!imageResponse.ok) {
              throw new Error(imageData?.error || "Image generation failed");
            }

            previewUrls = Array.isArray(imageData?.images)
              ? imageData.images.map((image: { url?: string }) => image.url).filter(Boolean)
              : [];
          }

          const previewUrl = previewUrls[0] || null;

          if (previewUrls.length > 0) {
            await persistOutputs(langCode, previewUrls, translationHash);
          }

          const hasOverflow = normalizedBlocks.some(
            (block) => block.currentText.length > block.originalText.length * 1.5
          );

          if (hasOverflow) {
            requiresReview = true;
          }

          setLanguageProgress((prev) =>
            prev.map((lp) => (lp.code === langCode ? { ...lp, status: "completed", progress: 100, stage: "complete" } : lp))
          );

          results[index] = {
            languageCode: langCode,
            languageName,
            blocks: normalizedBlocks,
            previewUrl,
            previewUrls,
            status: "completed",
          };
        } catch (error) {
          setLanguageProgress((prev) =>
            prev.map((lp) => (lp.code === langCode ? { ...lp, status: "error", progress: 0 } : lp))
          );

          results[index] = {
            languageCode: langCode,
            languageName,
            blocks: [],
            previewUrl: null,
            previewUrls: [],
            status: "error",
          };
        }

        completed += 1;
        const currentProgress = Math.round((completed / total) * 100);
        setOverallProgress(currentProgress);

        const isFinal = completed >= total;
        const nextStatus = isFinal ? (requiresReview ? "needs_review" : "done") : "running";
        const nextStage = isFinal ? "complete" : "generating";

        await updateRun({
          status: nextStatus,
          stage: nextStage,
          progress: {
            total_languages: total,
            completed_languages: completed,
            current_language: proj.targetLanguages[completed - 1] || null,
            stage: nextStage,
          },
        });
      }

      const updatedProject = { ...proj, results };
      sessionStorage.setItem(`project-${runId}`, JSON.stringify(updatedProject));
      setProject(updatedProject);
      setIsComplete(true);
      setCurrentStage("complete");
    };

    processLanguages(project);
  }, [project, runId, supabase]);

  const getStatusIcon = (status: ProcessingStatus) => {
    switch (status) {
      case "pending":
        return <div className="w-5 h-5 rounded-full border-2 border-ink-200" />;
      case "processing":
        return <Loader2 className="w-5 h-5 text-accent animate-spin" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-safe" />;
      case "error":
        return <XCircle className="w-5 h-5 text-alert" />;
    }
  };

  const getStageLabel = (stage: ProcessingStage) => {
    switch (stage) {
      case "translating":
        return { text: "Translating", color: "text-amber-600 bg-amber-50 border-amber-200" };
      case "generating":
        return { text: "Generating", color: "text-accent bg-accent/10 border-accent/20" };
      case "complete":
        return { text: "Complete", color: "text-safe bg-safe/10 border-safe/20" };
    }
  };

  if (!project) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-ink-400" />
        </div>
      </AppShell>
    );
  }

  const textPreview = project.extractedBlocks.map(b => b.currentText).join(' ').slice(0, 100);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header with content preview */}
        <div className="bg-white border border-ink-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="mb-4 text-[10px] uppercase tracking-wide text-ink-500 bg-ink-50 border border-ink-100 px-3 py-2 rounded-full inline-flex items-center gap-2">
            <Clock size={12} className="text-ink-400" />
            Keep this tab open while processing.
          </div>
          <div className="flex gap-6">
            {/* Image thumbnail */}
            {project.originalImageUrl && (
              <div className="w-32 h-24 rounded-lg overflow-hidden border border-ink-200 shrink-0 bg-ink-50">
                <img src={project.originalImageUrl} className="w-full h-full object-cover" alt="Source" />
              </div>
            )}
            {/* Content info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-ink-900 mb-2">Processing Your Assets</h1>
              <p className="text-sm text-ink-500 line-clamp-2 mb-3">{textPreview}...</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-ink-600 bg-ink-50 px-2.5 py-1 rounded-full">
                  <Globe size={12} />
                  {project.targetLanguages.length} languages
                </span>
                <span className="flex items-center gap-1.5 text-ink-600 bg-ink-50 px-2.5 py-1 rounded-full">
                  <ImageIcon size={12} />
                  {(project.imageOptions?.numImages || 1) * project.targetLanguages.length} images
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress section */}
        <div className="bg-white border border-ink-200 rounded-2xl p-8 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Circular progress */}
            <div className="flex items-center gap-8">
              <div className="relative">
                <CircularProgress progress={overallProgress} />
                {!isComplete && (
                  <div className="absolute inset-0 rounded-full animate-pulse bg-accent/5" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-ink-500 mb-1">Current Stage</div>
                <div className="flex items-center gap-2 mb-3">
                  {currentStage === "translating" && <Globe className="text-amber-600" size={18} />}
                  {currentStage === "generating" && <Sparkles className="text-accent" size={18} />}
                  {currentStage === "complete" && <CheckCircle className="text-safe" size={18} />}
                  <span className="text-lg font-bold text-ink-900 capitalize">{currentStage}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    Elapsed: {formatTime(elapsedTime)}
                  </span>
                  {!isComplete && (
                    <span className="text-ink-400">
                      ~{formatTime(estimatedRemaining)} remaining
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Complete button */}
            {isComplete && (
              <Button size="lg" className="shadow-lg animate-fade-in" onClick={() => router.push(`/studio/${runId}/results`)}>
                View Results <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Language queue */}
        <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-ink-100 bg-paper">
            <h2 className="font-bold text-sm uppercase tracking-wide text-ink-500">Language Queue</h2>
          </div>
          <div className="divide-y divide-ink-100">
            {languageProgress.map((lp) => {
              const stageInfo = getStageLabel(lp.stage);
              return (
                <div key={lp.code} className={`px-6 py-4 transition-colors ${lp.status === "processing" ? "bg-accent/5" : ""}`}>
                  <div className="flex items-center gap-4">
                    {getStatusIcon(lp.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-ink-900">{lp.name}</span>
                        <div className="flex items-center gap-2">
                          {lp.status === "processing" && (
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${stageInfo.color}`}>
                              {stageInfo.text}
                            </span>
                          )}
                          <span className="text-xs text-ink-400 font-mono">{lp.code.toUpperCase()}</span>
                        </div>
                      </div>
                      {lp.status === "processing" && (
                        <div className="w-full h-1.5 bg-ink-100 rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-500 rounded-full"
                            style={{ width: `${lp.progress}%` }}
                          />
                        </div>
                      )}
                      {lp.translationPreview && lp.status !== "pending" && (
                        <p className="text-xs text-ink-500 mt-2 line-clamp-1">
                          to {lp.translationPreview}...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
