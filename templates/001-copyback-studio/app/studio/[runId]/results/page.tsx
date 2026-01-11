"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "../../../../components/AppShell";
import { Button } from "../../../../components/Button";
import { Checkpoint } from "../../../../components/CheckpointBar";
import { RunHistorySidebar } from "../../../../components/RunHistorySidebar";
import { useAuth } from "../../../../components/AuthProvider";
import { notify } from "../../../../lib/ui/toast";
import { ProjectState, ProcessedImage, LANGUAGES } from "../../../../lib/types";
import { downloadAsZip, downloadSingleAsset, applyWatermark } from "../../../../lib/services/export-service";
import { isPrivilegedRole } from "../../../../lib/services/credits";
import {
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  Maximize2,
  Download,
  X,
  Sparkles,
  Package,
  GitCompare,
  ArrowLeft,
  Globe,
  Type,
} from "lucide-react";

const isValidUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const runId = params.runId as string;
  const { supabase, user, loading } = useAuth();

  const [project, setProject] = useState<ProjectState | null>(null);
  const [selectedResult, setSelectedResult] = useState<ProcessedImage | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);
  const [runStatus, setRunStatus] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [filterMode, setFilterMode] = useState<"all" | "review">("all");
  const [regionTextMap, setRegionTextMap] = useState<Record<string, { processed_texts: Record<string, string> }>>({});
  const [savingBlocks, setSavingBlocks] = useState<Set<string>>(new Set());
  const [dirtyBlocks, setDirtyBlocks] = useState<Set<string>>(new Set());
  const checkpointIdParam = searchParams.get("checkpointId");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(`/studio/${runId}/results`)}`);
    }
  }, [loading, router, runId, user]);

  useEffect(() => {
    if (!runId || !isValidUuid(runId)) {
      router.replace("/studio");
      return;
    }

    const loadData = async () => {
      try {
        const response = await fetch(`/api/runs/${runId}`);
        if (response.ok) {
          const data = await response.json();

          if (data.run) {
            setRunStatus(data.run.status);
            setCheckpoints(data.checkpoints || []);

            const targetLanguages = Array.isArray(data.run.languages) ? data.run.languages : [];
            const outputs = Array.isArray(data.outputs) ? data.outputs : [];
            const regions = Array.isArray(data.regions) ? data.regions : [];
            const nextRegionMap: Record<string, { processed_texts: Record<string, string> }> = {};
            regions.forEach((region: { key?: string; id?: string; processed_texts?: Record<string, string> }) => {
              const key = region.key || region.id;
              if (!key) return;
              nextRegionMap[key] = {
                processed_texts: (region.processed_texts && typeof region.processed_texts === "object")
                  ? (region.processed_texts as Record<string, string>)
                  : {},
              };
            });
            setRegionTextMap(nextRegionMap);

            const results: ProcessedImage[] = targetLanguages.map((code: string) => {
              const langOutputs = outputs.filter((output: { language_code?: string }) => output.language_code === code);
              langOutputs.sort(
                (a: { variant_index?: number }, b: { variant_index?: number }) =>
                  (a.variant_index ?? 0) - (b.variant_index ?? 0)
              );
              const previewUrls = langOutputs
                .map((output: { asset?: { public_url?: string | null } }) => output.asset?.public_url)
                .filter(Boolean) as string[];

              const blocks = regions.map((region: { id?: string; key?: string; source_text?: string; processed_texts?: Record<string, string>; bbox?: any }) => {
                const blockId = region.key || region.id || "";
                return {
                  id: blockId,
                  originalText: region.source_text || "",
                  currentText: region.processed_texts?.[code] || region.source_text || "",
                  box_2d: region.bbox,
                  status: "clean" as const,
                };
              });

              return {
                languageCode: code,
                languageName: LANGUAGES.find((lang) => lang.code === code)?.name || code,
                blocks,
                previewUrl: previewUrls[0] || null,
                previewUrls,
                status: previewUrls.length > 0 ? "completed" : "pending",
              };
            });

            setProject({
              originalImageUrl: data.sourceAsset?.public_url || null,
              originalImageDimensions: {
                width: data.sourceAsset?.width || 0,
                height: data.sourceAsset?.height || 0,
              },
              extractedBlocks: regions.map((region: { id?: string; key?: string; source_text?: string; bbox?: any }) => ({
                id: region.key || region.id || "",
                originalText: region.source_text || "",
                currentText: region.source_text || "",
                box_2d: region.bbox,
                status: "clean" as const,
              })),
              targetLanguages,
              recipe: data.run.recipe?.type || "translation",
              imageOptions: data.run.recipe?.imageOptions,
              results,
            });
            return;
          }
        }
      } catch (error) {
        console.error("Failed to load run data", error);
      }

      const stored = sessionStorage.getItem(`project-${runId}`);
      if (stored) {
        setProject(JSON.parse(stored));
      }
    };

    loadData();
  }, [runId, router]);

  useEffect(() => {
    if (!user) {
      setHasAccess(false);
      return;
    }

    const loadProfile = async () => {
      const { data } = await supabase
        .from("user_profiles")
        .select("credits_balance, plan, role")
        .eq("id", user.id)
        .single();

      const credits = data?.credits_balance ?? 0;
      const plan = data?.plan ?? "free";
      const role = data?.role ?? "user";
      const isDeveloper = isPrivilegedRole(role);
      setHasAccess(
        isDeveloper || plan === "pro" || plan === "enterprise" || credits > 0
      );
    };

    loadProfile();
  }, [supabase, user]);

  const confirmReview = async () => {
    if (!runId) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/runs/${runId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }),
      });
      if (res.ok) {
        setRunStatus("done");
        notify.success("Review confirmed", "Status updated to done.");
      } else {
        notify.error("Unable to confirm review", "Please try again.");
      }
    } catch (e) {
      console.error(e);
      notify.error("Unable to confirm review", "Please try again.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSelectCheckpoint = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
    const result = project?.results.find(r => r.languageCode === checkpoint.language_code);
    if (result) {
      setSelectedResult(result);
      if (typeof checkpoint.variant_index === 'number') {
        setSelectedVariantIndex(checkpoint.variant_index);
      }
    }
  };


  const watermarkText = hasAccess === false ? "CopyBack Studio" : null;
  const showWatermark = watermarkText !== null;

  const resolvePreviewUrl = (result: ProcessedImage | null, index: number = 0) => {
    if (!result) return null;
    const urls = result.previewUrls && result.previewUrls.length > 0
      ? result.previewUrls
      : result.previewUrl
        ? [result.previewUrl]
        : [];
    return urls[index] || urls[0] || null;
  };

  useEffect(() => {
    if (selectedResult) {
      setSelectedVariantIndex(0);
    }
  }, [selectedResult]);

  useEffect(() => {
    if (!project || checkpoints.length === 0 || selectedCheckpoint) return;

    const preferred = checkpointIdParam
      ? checkpoints.find((checkpoint) => checkpoint.id === checkpointIdParam)
      : null;
    const nextCheckpoint = preferred || checkpoints[0];

    setSelectedCheckpoint(nextCheckpoint);
    const result = project.results.find((item) => item.languageCode === nextCheckpoint.language_code);
    if (result) {
      setSelectedResult(result);
      if (typeof nextCheckpoint.variant_index === "number") {
        setSelectedVariantIndex(nextCheckpoint.variant_index);
      }
    }
  }, [checkpoints, project, selectedCheckpoint, checkpointIdParam]);

  const downloadAsset = async (url: string | null, name: string) => {
    if (!url) return;
    const finalUrl = watermarkText ? await applyWatermark(url, watermarkText) : url;
    await downloadSingleAsset(finalUrl, `copyback_${name}_${Date.now()}.jpg`);
  };

  const downloadAll = async () => {
    if (!project) return;
    await downloadAsZip(project.results, "copyback-export", watermarkText || undefined);
  };

  const getTranslationPreview = (result: ProcessedImage) => {
    return result.blocks.map(b => b.currentText).join(' ').slice(0, 80);
  };

  const isOverflowResult = (result: ProcessedImage) =>
    result.blocks.some((block) => block.currentText.length > block.originalText.length * 1.5);

  const reviewCount = project?.results.filter(isOverflowResult).length ?? 0;

  const filteredResults = useMemo(() => {
    if (!project) return [];
    if (filterMode === "review") {
      return project.results.filter(isOverflowResult);
    }
    return project.results;
  }, [filterMode, project]);

  const updateBlockText = (languageCode: string, blockId: string, value: string) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        results: prev.results.map((result) =>
          result.languageCode === languageCode
            ? {
                ...result,
                blocks: result.blocks.map((block) =>
                  block.id === blockId ? { ...block, currentText: value } : block
                ),
              }
            : result
        ),
      };
    });

    setSelectedResult((prev) => {
      if (!prev || prev.languageCode !== languageCode) return prev;
      return {
        ...prev,
        blocks: prev.blocks.map((block) =>
          block.id === blockId ? { ...block, currentText: value } : block
        ),
      };
    });

    setDirtyBlocks((prev) => {
      const next = new Set(prev);
      next.add(`${languageCode}:${blockId}`);
      return next;
    });
  };

  const saveBlockTranslation = async (languageCode: string, blockId: string, currentText: string, originalText: string) => {
    if (!runId) return;
    const blockKey = `${languageCode}:${blockId}`;
    if (!dirtyBlocks.has(blockKey)) return;
    if (!regionTextMap[blockId]) {
      notify.error("Unable to save", "Please refresh to load region data.");
      return;
    }
    setSavingBlocks((prev) => {
      const next = new Set(prev);
      next.add(blockKey);
      return next;
    });

    try {
      const baseTexts = regionTextMap[blockId]?.processed_texts ?? {};
      const nextTexts = { ...baseTexts, [languageCode]: currentText };
      const overflowDetected = originalText.length > 0 && currentText.length > originalText.length * 1.5;

      const { error } = await supabase
        .from("regions")
        .update({ processed_texts: nextTexts, overflow_detected: overflowDetected })
        .eq("run_id", runId)
        .eq("key", blockId);

      if (error) {
        throw error;
      }

      setRegionTextMap((prev) => ({
        ...prev,
        [blockId]: { processed_texts: nextTexts },
      }));

      setDirtyBlocks((prev) => {
        const next = new Set(prev);
        next.delete(blockKey);
        return next;
      });
    } catch (error) {
      console.error("Failed to save translation block", error);
      notify.error("Failed to save", "Translation changes were not saved.");
    } finally {
      setSavingBlocks((prev) => {
        const next = new Set(prev);
        next.delete(blockKey);
        return next;
      });
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-ink-400" />
        </div>
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[60vh] text-ink-500 text-sm">
          Redirecting to sign in...
        </div>
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-ink-400" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="fixed inset-0 pointer-events-none bg-paper bg-noise bg-soft-gradient z-0" />
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden relative z-10">
        <RunHistorySidebar
          limit={8}
          activeRunId={runId}
          selectedCheckpointId={selectedCheckpoint?.id ?? null}
          onSelectCheckpoint={handleSelectCheckpoint}
        />
        <div className="flex-1 overflow-y-auto py-8 px-4 md:px-6">
          <div className="max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/studio')}
                  className="p-2 hover:bg-ink-100 rounded-lg transition-colors text-ink-500 hover:text-ink-700"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-ink-900 tracking-tight">Results</h2>
                  <p className="text-sm text-ink-500 mt-0.5">
                    {filterMode === "review"
                      ? `Showing ${filteredResults.length} of ${project.results.length} languages`
                      : `${project.results.length} language${project.results.length !== 1 ? "s" : ""}`}{" "}
                    x {project.imageOptions?.numImages || 1} variant{(project.imageOptions?.numImages || 1) !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1 bg-white border border-ink-200 rounded-full p-1 shadow-paper-sm">
                  <button
                    type="button"
                    onClick={() => setFilterMode("all")}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${
                      filterMode === "all" ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-50"
                    }`}
                  >
                    All ({project.results.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode("review")}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${
                      filterMode === "review" ? "bg-amber-500 text-white" : "text-ink-600 hover:bg-ink-50"
                    }`}
                  >
                    Needs Review ({reviewCount})
                  </button>
                </div>
                {runStatus === 'needs_review' && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-safe hover:bg-safe/90 text-white shadow-lg shadow-safe/20 transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={confirmReview}
                    isLoading={isUpdatingStatus}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Confirm Review
                  </Button>
                )}
                {project.results.length > 0 && (
                  <Button variant="primary" size="sm" onClick={downloadAll} className="shadow-paper-md hover:shadow-paper-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    <Package size={16} className="mr-2" />
                    Download All ({project.results.length * (project.imageOptions?.numImages || 1)})
                  </Button>
                )}
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={`flex-1 px-3 py-2 text-[11px] font-semibold rounded-full border transition-colors ${
                  filterMode === "all"
                    ? "bg-ink-900 text-white border-ink-900"
                    : "border-ink-200 text-ink-600"
                }`}
              >
                All ({project.results.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("review")}
                className={`flex-1 px-3 py-2 text-[11px] font-semibold rounded-full border transition-colors ${
                  filterMode === "review"
                    ? "bg-amber-500 text-white border-amber-500"
                    : "border-ink-200 text-ink-600"
                }`}
              >
                Needs Review ({reviewCount})
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
              {project.results.map((result) => {
                const hasOverflow = isOverflowResult(result);
                const statusColor = result.status === "error"
                  ? "bg-red-500"
                  : hasOverflow
                    ? "bg-amber-500"
                    : "bg-safe";
                return (
                  <button
                    key={result.languageCode}
                    type="button"
                    onClick={() => setSelectedResult(result)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink-200 text-[11px] font-semibold text-ink-700 hover:border-ink-300 hover:bg-ink-50 whitespace-nowrap"
                    title="Open language preview"
                  >
                    <span className={`w-2 h-2 rounded-full ${statusColor}`} />
                    {result.languageName}
                  </button>
                );
              })}
            </div>

            {project.results.length === 0 ? (
              /* Enhanced empty state */
              <div className="flex flex-col items-center justify-center py-24 border border-dashed border-ink-200/60 rounded-3xl bg-white/50 backdrop-blur-sm shadow-paper-sm animate-fade-in">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-paper-md border border-white ring-1 ring-black/5 rotate-3 transform transition-transform duration-500 hover:rotate-6">
                  <ImageIcon className="text-ink-300 w-10 h-10" />
                </div>
                <p className="text-ink-900 font-bold text-lg mb-2 tracking-tight">No results yet</p>
                <p className="text-ink-500 text-sm mb-6 text-center max-w-md font-medium">
                  Processing is still in progress. Results will appear here once generation is complete.
                </p>
                <Button variant="outline" className="bg-white hover:bg-ink-50 shadow-paper-sm" onClick={() => router.push(`/studio/${runId}/queue`)}>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  View Progress
                </Button>
              </div>
            ) : (
              <>
                {filteredResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 border border-dashed border-ink-200/60 rounded-3xl bg-white/50 backdrop-blur-sm shadow-paper-sm">
                    <p className="text-ink-900 font-bold text-lg mb-2">No items match this filter</p>
                    <p className="text-ink-500 text-sm">Try switching back to "All".</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {filteredResults.map((res, idx) => {
                  const translationPreview = getTranslationPreview(res);
                  const hasOverflow = res.blocks.some((b) => b.currentText.length > b.originalText.length * 1.5);
                  const originalLength = res.blocks.reduce((acc, block) => acc + block.originalText.length, 0);
                  const translatedLength = res.blocks.reduce((acc, block) => acc + block.currentText.length, 0);
                  const lengthRatio = translatedLength / Math.max(1, originalLength);
                  const ratioPercent = Math.round(lengthRatio * 100);
                  const ratioColor =
                    lengthRatio > 1.5 ? "bg-red-500" : lengthRatio > 1.2 ? "bg-amber-500" : "bg-safe";

                  return (
                    <div
                      key={`${res.languageCode}-${idx}`}
                      className="bg-white rounded-2xl overflow-hidden shadow-paper-sm hover:shadow-paper-floating transition-all duration-500 cursor-pointer flex flex-col h-full group border border-white ring-1 ring-black/5 hover:ring-black/10 transform hover:-translate-y-1"
                      style={{ animationDelay: `${idx * 100}ms` }}
                      onClick={() => setSelectedResult(res)}
                    >
                      {/* Image preview */}
                      <div className="aspect-[4/3] bg-ink-50 relative overflow-hidden">
                        {res.status === "processing" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 transition-opacity duration-300">
                            <div className="relative">
                              <div className="animate-spin h-10 w-10 border-3 border-ink-100 border-t-ink-900 rounded-full" />
                            </div>
                          </div>
                        )}
                        {resolvePreviewUrl(res) && (
                          <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700 ease-out">
                            <img
                              src={resolvePreviewUrl(res) || undefined}
                              className="w-full h-full object-cover transition-all duration-300"
                              alt={res.languageName}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {showWatermark && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30 text-white font-bold tracking-[0.2em] uppercase text-xs shadow-lg">
                                  {watermarkText}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Hover overlay with quick actions */}
                        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                          <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedResult(res); }}
                              className="bg-white text-ink-900 px-4 py-2 rounded-full shadow-paper-md text-xs font-bold flex items-center gap-1.5 hover:bg-ink-50 hover:scale-105 active:scale-95 transition-all"
                            >
                              <Maximize2 size={12} /> Inspect
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); downloadAsset(resolvePreviewUrl(res), res.languageCode); }}
                              className="bg-ink-900 text-white px-4 py-2 rounded-full shadow-paper-md text-xs font-bold flex items-center gap-1.5 hover:bg-ink-800 hover:scale-105 active:scale-95 transition-all"
                            >
                              <Download size={12} /> Download
                            </button>
                          </div>
                        </div>

                        {/* Status badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <div className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-white/20 transition-transform group-hover:scale-105 ${hasOverflow
                            ? "bg-amber-500/90 text-white"
                            : "bg-safe/90 text-white"
                            }`}>
                            {hasOverflow ? <AlertCircle size={10} /> : <CheckCircle size={10} />}
                            {hasOverflow ? "Review" : "Ready"}
                          </div>
                        </div>

                        {/* Variant count */}
                        {(res.previewUrls?.length || 1) > 1 && (
                          <div className="absolute top-4 right-4 z-20">
                            <div className="bg-black/40 text-white text-[10px] px-2.5 py-1 rounded-full font-bold backdrop-blur-md border border-white/10 shadow-sm group-hover:bg-black/60 transition-colors">
                              {res.previewUrls?.length} variants
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card content */}
                      <div className="p-5 flex-1 flex flex-col items-start bg-gradient-to-b from-white to-ink-50/30">
                        <div className="flex items-center justify-between w-full mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-ink-50 rounded-full border border-ink-100">
                              <Globe size={14} className="text-ink-600" />
                            </div>
                            <span className="font-bold text-ink-900 tracking-tight">{res.languageName}</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-ink-400 bg-ink-50 px-2 py-1 rounded-md border border-ink-100/50">
                            {res.blocks.length} blocks
                          </span>
                        </div>

                        {/* Translation preview */}
                        <div className="relative w-full">
                          <p className="text-xs text-ink-500 line-clamp-2 leading-relaxed font-medium">
                            {translationPreview}...
                          </p>
                          <div className="absolute bottom-0 right-0 w-12 h-4 bg-gradient-to-l from-white to-transparent" />
                        </div>

                        <div className="mt-4 w-full">
                          <div className="flex items-center justify-between text-[10px] text-ink-400 mb-1">
                            <span>Length fit</span>
                            <span className={lengthRatio > 1.5 ? "text-red-600 font-semibold" : lengthRatio > 1.2 ? "text-amber-600 font-semibold" : "text-ink-500"}>
                              {ratioPercent}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${ratioColor} transition-all`}
                              style={{ width: `${Math.min(lengthRatio, 2) * 50}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                  </div>
                )}
              </>
            )}

            {/* Enhanced Modal */}
            {selectedResult && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in">
                <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedResult(null)} />

                <div className="relative bg-paper w-full max-w-[1400px] h-full max-h-[85vh] rounded-3xl shadow-paper-floating flex flex-col overflow-hidden ring-1 ring-white/20 border border-white/40 transform transition-all duration-300 scale-100">
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-8 py-5 border-b border-ink-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/10 shadow-sm">
                        <Globe size={20} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-ink-900 tracking-tight">{selectedResult.languageName}</h3>
                        <p className="text-xs text-ink-500 font-medium">{selectedResult.blocks.length} text blocks - {project.recipe} mode</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="primary"
                        size="sm"
                        className="shadow-md hover:shadow-lg transition-all"
                        onClick={() =>
                          downloadAsset(resolvePreviewUrl(selectedResult, selectedVariantIndex), selectedResult.languageCode)
                        }
                      >
                        <Download size={16} className="mr-2" /> Download
                      </Button>
                      <button
                        onClick={() => setSelectedResult(null)}
                        className="p-2 hover:bg-ink-100 text-ink-400 hover:text-ink-900 rounded-full transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 overflow-hidden bg-ink-50/50">
                    {/* Main preview area */}
                    <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center bg-noise bg-opacity-50">
                      <div className="w-full max-w-5xl space-y-10">
                        {/* Main image */}
                        <div className="group relative rounded-2xl shadow-paper-lg hover:shadow-paper-floating transition-all duration-500 bg-white ring-4 ring-white border border-ink-100 overflow-hidden transform hover:-translate-y-1">
                          {resolvePreviewUrl(selectedResult, selectedVariantIndex) && (
                            <div className="relative w-full">
                              {/* Loading placeholder */}
                              {!resolvePreviewUrl(selectedResult, selectedVariantIndex) && (
                                <div className="w-full aspect-[4/3] bg-ink-50 flex items-center justify-center">
                                  <Loader2 className="animate-spin text-ink-300" />
                                </div>
                              )}

                              <img
                                src={resolvePreviewUrl(selectedResult, selectedVariantIndex) || undefined}
                                className="w-full h-auto"
                                alt="Preview"
                              />
                              {showWatermark && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <div className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-xl border border-white/40 text-white/90 text-2xl font-black tracking-[0.5em] uppercase shadow-2xl">
                                    {watermarkText}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {selectedResult.previewUrls && selectedResult.previewUrls.length > 1 && (
                          <div className="flex items-center justify-center">
                            <div className="flex gap-2 overflow-x-auto px-2 py-2 bg-white/80 backdrop-blur rounded-2xl border border-white shadow-paper-sm ring-1 ring-black/5">
                              {selectedResult.previewUrls.map((url, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedVariantIndex(idx)}
                                  className={`relative h-14 w-20 rounded-xl overflow-hidden border transition-all ${
                                    selectedVariantIndex === idx
                                      ? "border-ink-900 ring-2 ring-ink-900/20 scale-105"
                                      : "border-ink-200 hover:border-ink-300"
                                  }`}
                                  title={`Variant ${idx + 1}`}
                                >
                                  <img src={url} alt={`Variant ${idx + 1}`} className="h-full w-full object-cover" />
                                  <div className="absolute bottom-1 right-1 bg-white/80 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-ink-200 text-ink-700">
                                    {idx + 1}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Comparison section */}
                        <div className="pt-8 border-t border-ink-200/60">
                          <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 bg-white rounded-lg shadow-paper-sm border border-ink-100">
                              <GitCompare size={14} className="text-ink-500" />
                            </div>
                            <span className="text-sm font-bold text-ink-600 uppercase tracking-wide">Comparison View</span>
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <div className="text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 pl-1">
                                <Type size={12} /> Original Source
                              </div>
                              <div className="rounded-xl overflow-hidden border-[4px] border-white bg-white shadow-paper-md grayscale contrast-125 transition-all hover:grayscale-0">
                                {project.originalImageUrl && (
                                  <img src={project.originalImageUrl} className="w-full h-auto" alt="Original" />
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-3 flex items-center gap-1.5 pl-1">
                                <Sparkles size={12} /> Processed Result
                              </div>
                              <div className="rounded-xl overflow-hidden border-[4px] border-white bg-white shadow-paper-md ring-2 ring-accent/10">
                                {resolvePreviewUrl(selectedResult, selectedVariantIndex) && (
                                  <img
                                    src={resolvePreviewUrl(selectedResult, selectedVariantIndex) || undefined}
                                    className="w-full h-auto"
                                    alt="Processed"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Side panel - Block Inspector */}
                    <div className="w-[400px] flex flex-col bg-white border-l border-ink-200/60 shadow-xl z-20">
                      <div className="p-6 border-b border-ink-100 bg-white/80 backdrop-blur-md">
                        <h4 className="text-sm font-bold text-ink-900 uppercase tracking-wide flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-ink-900" />
                          Block Inspector
                        </h4>
                        <p className="text-xs text-ink-500 mt-1 pl-3.5">Verify translations & constraints</p>
                      </div>
                      <div className="flex-1 overflow-y-auto px-0 bg-ink-50/30">
                        {selectedResult.blocks.map((block, blockIdx) => {
                          const isOverflow = block.currentText.length > block.originalText.length * 1.5;
                          const lengthRatio = Math.round((block.currentText.length / block.originalText.length) * 100);
                          const blockKey = `${selectedResult.languageCode}:${block.id}`;
                          const isSaving = savingBlocks.has(blockKey);
                          const isDirty = dirtyBlocks.has(blockKey);

                          return (
                            <div
                              key={block.id}
                              className={`px-6 py-5 border-b border-ink-100/60 transition-colors ${isOverflow ? "bg-amber-50/60" : "hover:bg-white"
                                }`}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-mono font-bold text-ink-400 bg-white border border-ink-200 px-2 py-1 rounded shadow-sm">
                                  Block {blockIdx + 1}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${isOverflow
                                      ? "bg-amber-100 text-amber-700 border-amber-200"
                                      : lengthRatio > 120
                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                        : "bg-safe/10 text-safe border-safe/20"
                                    }`}>
                                    {lengthRatio}% length
                                  </span>
                                </div>
                              </div>

                              {/* Original text */}
                              <div className="group mb-3 focus-within:ring-2 ring-ink-100 rounded-lg transition-all">
                                <div className="text-[9px] font-bold text-ink-400 uppercase tracking-wider mb-1.5 pl-1">Original</div>
                                <div className="text-xs text-ink-600 bg-ink-50/80 p-3 rounded-lg border border-ink-100 leading-relaxed shadow-inner">
                                  {block.originalText}
                                </div>
                              </div>

                              {/* Translated text */}
                              <div className="group">
                                <div className="text-[9px] font-bold text-accent uppercase tracking-wider mb-1.5 flex items-center justify-between pl-1">
                                  <span className="flex items-center gap-1.5"><Globe size={10} /> Translated</span>
                                </div>
                                <textarea
                                  className={`w-full text-xs p-3 rounded-lg border shadow-paper-sm focus:ring-2 focus:ring-accent focus:border-accent resize-none transition-all leading-relaxed ${isOverflow
                                      ? "bg-white border-amber-200 text-amber-900 focus:ring-amber-500"
                                      : "bg-white border-ink-200 text-ink-800"
                                    }`}
                                  rows={3}
                                  value={block.currentText}
                                  onChange={(event) =>
                                    updateBlockText(selectedResult.languageCode, block.id, event.target.value)
                                  }
                                  onBlur={() =>
                                    saveBlockTranslation(
                                      selectedResult.languageCode,
                                      block.id,
                                      block.currentText,
                                      block.originalText
                                    )
                                  }
                                />
                                <div className="mt-1 text-[10px] text-ink-400 flex items-center justify-between">
                                  <span>
                                    {isSaving ? "Saving..." : isDirty ? "Unsaved changes" : "Saved"}
                                  </span>
                                  <span>{block.currentText.length} chars</span>
                                </div>
                                {isOverflow && (
                                  <p className="text-[10px] text-amber-600 mt-1.5 font-medium flex items-center gap-1">
                                    <AlertCircle size={10} /> Text may be too long for layout
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer actions */}
                      <div className="p-5 border-t border-ink-200 bg-white shadow-[0_-4px_6px_-6px_rgba(0,0,0,0.05)] z-10">
                        <Button variant="outline" className="w-full text-ink-400 border-dashed border-ink-300 hover:border-ink-400 hover:text-ink-600 hover:bg-ink-50" disabled>
                          <Sparkles size={14} className="mr-2" /> AI Rephrase (Coming Soon)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
