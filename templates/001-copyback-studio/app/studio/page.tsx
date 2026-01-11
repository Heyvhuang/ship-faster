"use client";

import React, { startTransition, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "../../components/AppShell";
import { Button } from "../../components/Button";
import { Checkpoint } from "../../components/CheckpointBar";
import { RunHistorySidebar, type RunPreviewPayload } from "../../components/RunHistorySidebar";
import { RunGallery } from "../../components/RunGallery";
import { useAuth } from "../../components/AuthProvider";
import { notify, createProgressToast } from "../../lib/ui/toast";
import {
  Upload,
  RefreshCcw,
  Layers,
  ChevronRight,
  Image as ImageIcon,
  AlertCircle,
  Globe,
  Sparkles,
  Maximize2,
  X,
  Download,
  Grid
} from "lucide-react";
import { ProjectState, type RunOutput, LANGUAGES } from "../../lib/types";
import { downloadSingleAsset } from "../../lib/services/export-service";
import {
  estimateRunCredits,
  getEffectiveCreditsBalance,
  isPrivilegedRole,
  normalizeImagesPerLanguage,
} from "../../lib/services/credits";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  minRows?: number;
  maxRows?: number;
}

function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
  className = "",
  minRows = 2,
  maxRows = 12
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const lineHeight = 24;
    const padding = 24;
    const minHeight = lineHeight * minRows + padding;
    const maxHeight = lineHeight * maxRows + padding;
    const scrollHeight = textarea.scrollHeight;

    const finalHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${finalHeight}px`;
    setIsOverflow(scrollHeight > maxHeight);
  }, [minRows, maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        className={`resize-none overflow-y-auto ${className}`}
        value={value}
        onChange={(e) => {
          onChange(e);
          adjustHeight();
        }}
        placeholder={placeholder}
        style={{ lineHeight: '24px' }}
      />
      {isOverflow && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none rounded-b-lg" />
      )}
    </div>
  );
}

const getLatestRunOutputUrl = (
  outputs: RunOutput[],
  params: { languageCode: string; variantIndex: number }
): string | null => {
  let bestUrl: string | null = null;
  let bestTs = -1;

  for (const output of outputs) {
    if (!output) continue;
    if (output.language_code !== params.languageCode) continue;
    if (output.variant_index !== params.variantIndex) continue;
    const url = output.asset?.public_url ?? null;
    if (!url) continue;

    const ts = output.created_at ? Date.parse(output.created_at) : -1;
    const normalizedTs = Number.isFinite(ts) ? ts : -1;
    if (normalizedTs >= bestTs) {
      bestTs = normalizedTs;
      bestUrl = url;
    }
  }

  return bestUrl;
};

const readBlobAsDataUrl = async (blob: Blob): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image data"));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Invalid image data"));
        return;
      }
      resolve(result);
    };
    reader.readAsDataURL(blob);
  });
};

const extFromMimeType = (mimeType: string) => {
  const normalized = mimeType.toLowerCase();
  if (normalized.includes("png")) return "png";
  if (normalized.includes("webp")) return "webp";
  if (normalized.includes("gif")) return "gif";
  return "jpg";
};

export default function StudioPage() {
  const router = useRouter();
  const { user, supabase, loading } = useAuth();
  const [isExtracting, setIsExtracting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isLoadingRun, setIsLoadingRun] = useState(false);
  const [loadedRunId, setLoadedRunId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"compare" | "gallery">("compare");
  const [billingRole, setBillingRole] = useState<string | null>(null);
  const [creditsBalance, setCreditsBalance] = useState<number | null>(null);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [imageCount, setImageCount] = useState(1);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [expandedEditor, setExpandedEditor] = useState(false);
  const [expandedLanguage, setExpandedLanguage] = useState<string | null>(null);
  const [expandedViewMode, setExpandedViewMode] = useState<"combined" | "blocks">("combined");

  const [customLanguages, setCustomLanguages] = useState<string[]>([]);
  const [customLanguageInput, setCustomLanguageInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<{ langCode: string; langName: string; url: string }[]>([]);
  const [compareIndex, setCompareIndex] = useState(0);
  const [comparePosition, setComparePosition] = useState(50);
  const compareContainerRef = useRef<HTMLDivElement>(null);
  const [isCompareDragging, setIsCompareDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const [languageQuery, setLanguageQuery] = useState("");

  const [runId, setRunId] = useState<string | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);
  const [runOutputs, setRunOutputs] = useState<RunOutput[]>([]);
  const runLoadAbortRef = useRef<AbortController | null>(null);
  const runLoadSeqRef = useRef(0);
  const pendingGenerateAfterLoadRef = useRef<string | null>(null);

  const [project, setProject] = useState<ProjectState>({
    originalImageUrl: null,
    originalImageDimensions: { width: 0, height: 0 },
    extractedBlocks: [],
    targetLanguages: [],
    recipe: "translation",
    results: [],
  });

  useEffect(() => {
    let cancelled = false;

    const loadCredits = async () => {
      if (!user) {
        setCreditsBalance(null);
        setBillingRole(null);
        return;
      }

      setIsLoadingCredits(true);
      const { data, error } = await supabase
        .from("user_profiles")
        .select("credits_balance, role")
        .eq("id", user.id)
        .single();

      if (cancelled) return;

      if (error) {
        console.error("Failed to load credits balance", error);
        setCreditsBalance(null);
        setBillingRole(null);
      } else {
        setCreditsBalance(data?.credits_balance ?? 0);
        setBillingRole(data?.role ?? "user");
      }
      setIsLoadingCredits(false);
    };

    loadCredits();

    return () => {
      cancelled = true;
    };
  }, [supabase, user]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent("/studio")}`);
    }
  }, [loading, router, user]);

  useEffect(() => {
    if (!isProcessing && !isTranslating && !isExtracting) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isExtracting, isProcessing, isTranslating]);


  const fetchRunDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/runs/${id}`);
      if (!response.ok) return;
      const data = await response.json();
      setCheckpoints(data.checkpoints || []);
      setRunOutputs(data.outputs || []);
    } catch (err) {
      console.error("Failed to fetch run details", err);
    }
  };

  const handleSelectRunPreview = (payload: RunPreviewPayload) => {
    setIsLoadingRun(false);
    setError(null);
    pendingGenerateAfterLoadRef.current = null;
    runLoadAbortRef.current?.abort();
    runLoadAbortRef.current = null;
    runLoadSeqRef.current += 1;
    setRunId(payload.runId);
    setLoadedRunId(null);
    setCheckpoints(payload.checkpoints);
    setRunOutputs(payload.outputs);
    setSelectedCheckpoint(payload.selectedCheckpoint);
    setActiveLanguage(payload.selectedCheckpoint?.language_code ?? null);
    setGeneratedImages([]);
    setCompareIndex(0);
    setComparePosition(50);

    const hasAnyPreviewImage = payload.outputs.some((output) => Boolean(output.asset?.public_url));
    setPreviewMode(payload.selectedCheckpoint ? "compare" : hasAnyPreviewImage ? "gallery" : "compare");

    if (payload.selectedCheckpoint) {
      const outputUrl = getLatestRunOutputUrl(payload.outputs, {
        languageCode: payload.selectedCheckpoint.language_code,
        variantIndex: payload.selectedCheckpoint.variant_index,
      });

      if (outputUrl) {
        const langName =
          LANGUAGES.find((lang) => lang.code === payload.selectedCheckpoint!.language_code)?.name ||
          payload.selectedCheckpoint.language_code;
        setGeneratedImages([{ langCode: payload.selectedCheckpoint.language_code, langName, url: outputUrl }]);
        setCompareIndex(0);
      }
    }

    startTransition(() => {
      setProject((prev) => ({
        ...prev,
        originalImageUrl: null,
        originalImageDimensions: { width: 0, height: 0 },
        extractedBlocks: [],
        targetLanguages: payload.languages,
        results: [],
      }));
    });
  };

  const loadRunIntoStudio = useCallback(
    async (id: string, checkpointId?: string) => {
      runLoadAbortRef.current?.abort();
      const controller = new AbortController();
      runLoadAbortRef.current = controller;
      runLoadSeqRef.current += 1;
      const requestSeq = runLoadSeqRef.current;
      setIsLoadingRun(true);
      setError(null);
      setRunId(id);

      try {
        const response = await fetch(`/api/runs/${id}`, { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        if (controller.signal.aborted || requestSeq !== runLoadSeqRef.current) return;

        const run = data?.run;
        const regions = Array.isArray(data?.regions) ? data.regions : [];
        const fetchedOutputs = (Array.isArray(data?.outputs) ? data.outputs : []) as RunOutput[];
        const fetchedCheckpoints = (Array.isArray(data?.checkpoints) ? data.checkpoints : []) as Checkpoint[];
        const targetLanguages = Array.isArray(run?.languages) ? run.languages : [];

        const extractedBlocks = regions.map((region: any) => ({
          id: region.key || region.id || "",
          originalText: region.source_text || "",
          currentText: region.source_text || "",
          box_2d: region.bbox,
          status: "clean" as const,
        }));

        const results = targetLanguages.map((code: string) => {
          const latestByVariant = new Map<number, { ts: number; url: string }>();
          for (const output of fetchedOutputs) {
            if (output.language_code !== code) continue;
            const url = output.asset?.public_url ?? null;
            if (!url) continue;
            const ts = output.created_at ? Date.parse(output.created_at) : -1;
            const normalizedTs = Number.isFinite(ts) ? ts : -1;
            const existing = latestByVariant.get(output.variant_index);
            if (!existing || normalizedTs >= existing.ts) {
              latestByVariant.set(output.variant_index, { ts: normalizedTs, url });
            }
          }

          const previewUrls = Array.from(latestByVariant.entries())
            .sort((a, b) => a[0] - b[0])
            .map(([, value]) => value.url);

          const blocks = regions.map((region: any) => {
            const blockId = region.key || region.id || "";
            const originalText = region.source_text || "";
            const processed = region.processed_texts?.[code] || originalText;
            return {
              id: blockId,
              originalText,
              currentText: processed,
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

        let generated = results
          .map((result) =>
            result.previewUrl
              ? { langCode: result.languageCode, langName: result.languageName, url: result.previewUrl }
              : null
          )
          .filter(Boolean) as { langCode: string; langName: string; url: string }[];

        const requestedCheckpoint = checkpointId
          ? fetchedCheckpoints.find((checkpoint) => checkpoint.id === checkpointId) ?? null
          : null;

        if (requestedCheckpoint) {
          const outputUrl = getLatestRunOutputUrl(fetchedOutputs, {
            languageCode: requestedCheckpoint.language_code,
            variantIndex: requestedCheckpoint.variant_index,
          });
          if (outputUrl) {
            const langName =
              LANGUAGES.find((lang) => lang.code === requestedCheckpoint.language_code)?.name ||
              requestedCheckpoint.language_code;
            const idx = generated.findIndex((img) => img.langCode === requestedCheckpoint.language_code);
            const updated = { langCode: requestedCheckpoint.language_code, langName, url: outputUrl };
            if (idx >= 0) {
              generated = generated.map((img, index) => (index === idx ? updated : img));
            } else {
              generated = [...generated, updated];
            }
          }
        }

        const nextImageCountRaw = run?.recipe?.imageOptions?.numImages as unknown;
        if (nextImageCountRaw !== undefined) {
          setImageCount(normalizeImagesPerLanguage(nextImageCountRaw));
        }

        startTransition(() => {
          setCheckpoints(fetchedCheckpoints);
          setRunOutputs(fetchedOutputs);
          setLoadedRunId(id);
          setProject((prev) => ({
            ...prev,
            originalImageUrl: data?.sourceAsset?.public_url || null,
            originalImageDimensions: {
              width: data?.sourceAsset?.width || 0,
              height: data?.sourceAsset?.height || 0,
            },
            extractedBlocks,
            targetLanguages,
            recipe: run?.recipe?.type || prev.recipe,
            imageOptions: run?.recipe?.imageOptions || prev.imageOptions,
            results,
          }));
          setGeneratedImages(generated);
          setComparePosition(50);

          const hasAnyOutputImage = fetchedOutputs.some((output) => Boolean(output.asset?.public_url));

          if (requestedCheckpoint) {
            setSelectedCheckpoint(requestedCheckpoint);
            setActiveLanguage(requestedCheckpoint.language_code);
            const index = generated.findIndex((img) => img.langCode === requestedCheckpoint.language_code);
            setCompareIndex(index >= 0 ? index : 0);
            setPreviewMode("compare");
            return;
          }

          setSelectedCheckpoint(null);
          setActiveLanguage(null);
          setCompareIndex(0);
          setPreviewMode(hasAnyOutputImage ? "gallery" : "compare");
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Failed to load run", err);
        notify.error("Failed to load run", "Please try again.");
      } finally {
        if (requestSeq === runLoadSeqRef.current) {
          setIsLoadingRun(false);
        }
      }
    },
    []
  );

  const handleSelectCheckpoint = (checkpoint: Checkpoint) => {
    setPreviewMode("compare");
    setSelectedCheckpoint(checkpoint);
    setActiveLanguage(checkpoint.language_code);

    const outputUrl = getLatestRunOutputUrl(runOutputs, {
      languageCode: checkpoint.language_code,
      variantIndex: checkpoint.variant_index,
    });

    if (outputUrl) {
      const langName = LANGUAGES.find((l) => l.code === checkpoint.language_code)?.name || checkpoint.language_code;
      const newImage = {
        langCode: checkpoint.language_code,
        langName,
        url: outputUrl
      };
      const existingIndex = generatedImages.findIndex(
        (img) => img.langCode === checkpoint.language_code
      );
      const nextIndex = existingIndex >= 0 ? existingIndex : generatedImages.length;

      setGeneratedImages((prev) => {
        const idx = prev.findIndex((img) => img.langCode === checkpoint.language_code);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = newImage;
          return next;
        }
        return [...prev, newImage];
      });
      setCompareIndex(nextIndex);
    }

    if (runId && loadedRunId !== runId) {
      void loadRunIntoStudio(runId, checkpoint.id);
    }
  };

  const handleSelectGalleryImage = (params: { languageCode: string; variantIndex: number }) => {
    const checkpoint =
      checkpoints.find(
        (cp) => cp.language_code === params.languageCode && cp.variant_index === params.variantIndex
      ) ?? null;

    if (checkpoint) {
      handleSelectCheckpoint(checkpoint);
      return;
    }

    const outputUrl = getLatestRunOutputUrl(runOutputs, params);
    if (!outputUrl) {
      notify.error("Preview unavailable", "This output isn't ready yet.");
      return;
    }

    setPreviewMode("compare");
    setSelectedCheckpoint(null);
    setActiveLanguage(params.languageCode);

    const langName = LANGUAGES.find((l) => l.code === params.languageCode)?.name || params.languageCode;
    const newImage = { langCode: params.languageCode, langName, url: outputUrl };
    const existingIndex = generatedImages.findIndex((img) => img.langCode === params.languageCode);
    const nextIndex = existingIndex >= 0 ? existingIndex : generatedImages.length;

    setGeneratedImages((prev) => {
      const idx = prev.findIndex((img) => img.langCode === params.languageCode);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = newImage;
        return next;
      }
      return [...prev, newImage];
    });
    setCompareIndex(nextIndex);
  };

  const effectiveLanguage = useMemo(() => {
    if (!activeLanguage) return null;
    return project.results.some((result) => result.languageCode === activeLanguage) ? activeLanguage : null;
  }, [activeLanguage, project.results]);

  const visibleResults = useMemo(() => {
    if (!effectiveLanguage) return project.results;
    return project.results.filter((result) => result.languageCode === effectiveLanguage);
  }, [project.results, effectiveLanguage]);

  const resultsReady = useMemo(() => {
    return visibleResults.filter((result) => result.blocks.length > 0);
  }, [visibleResults]);

  const creditEstimate = useMemo(() => {
    return estimateRunCredits({
      languageCount: resultsReady.length,
      imagesPerLanguage: imageCount,
    });
  }, [imageCount, resultsReady.length]);

  const isDeveloper = isPrivilegedRole(billingRole);
  const effectiveCreditsBalance = useMemo(() => {
    if (creditsBalance === null) return null;
    return getEffectiveCreditsBalance({ creditsBalance, role: billingRole });
  }, [billingRole, creditsBalance]);

  const hasEnoughCredits =
    effectiveCreditsBalance === null
      ? true
      : effectiveCreditsBalance >= creditEstimate.creditsEstimated;
  const creditsAfter =
    effectiveCreditsBalance === null
      ? null
      : effectiveCreditsBalance - creditEstimate.creditsEstimated;
  const creditUsageRatio =
    effectiveCreditsBalance === null
      ? null
      : effectiveCreditsBalance <= 0
        ? 1
        : Math.min(creditEstimate.creditsEstimated / effectiveCreditsBalance, 1);

  const variantsPerLanguage = useMemo(() => {
    const requested = project.imageOptions?.numImages ?? imageCount;
    return normalizeImagesPerLanguage(requested);
  }, [imageCount, project.imageOptions?.numImages]);

  const hasRunGallery = useMemo(() => {
    return runOutputs.some((output) => Boolean(output.asset?.public_url));
  }, [runOutputs]);

  const languageToggleItems = useMemo(() => {
    const map = new Map<string, { index: number; item: { langCode: string; langName: string; url: string } }>();
    generatedImages.forEach((item, index) => {
      map.set(item.langCode, { index, item });
    });
    const entries = Array.from(map.values());
    if (!effectiveLanguage) return entries;
    return entries.filter(({ item }) => item.langCode === effectiveLanguage);
  }, [generatedImages, effectiveLanguage]);

  const filteredLanguages = useMemo(() => {
    const query = languageQuery.trim().toLowerCase();
    if (!query) return LANGUAGES;
    return LANGUAGES.filter((lang) => {
      return (
        lang.name.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query)
      );
    });
  }, [languageQuery]);

  const selectAllVisibleLanguages = () => {
    const visibleCodes = filteredLanguages.map((lang) => lang.code);
    setProject((prev) => ({
      ...prev,
      targetLanguages: Array.from(new Set([...prev.targetLanguages, ...visibleCodes])),
    }));
  };

  const clearAllLanguages = () => {
    setProject((prev) => ({
      ...prev,
      targetLanguages: [],
    }));
    setCustomLanguages([]);
  };

  const updateComparePosition = useCallback((clientX: number) => {
    const container = compareContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setComparePosition((x / rect.width) * 100);
  }, []);

  const handleComparePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsCompareDragging(true);
    updateComparePosition(event.clientX);
  };

  const handleComparePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isCompareDragging) return;
    updateComparePosition(event.clientX);
  };

  const handleComparePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsCompareDragging(false);
  };

  const handleCompareKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setComparePosition((prev) => Math.max(0, prev - 2));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setComparePosition((prev) => Math.min(100, prev + 2));
    }
  };

  const processFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large. Please upload an image under 5MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();
    img.src = objectUrl;

    setIsExtracting(true);
    setError(null);

    img.onload = async () => {
      setProject((prev) => ({
        ...prev,
        originalImageUrl: objectUrl,
        originalImageDimensions: { width: img.width, height: img.height },
        extractedBlocks: [],
        results: [],
      }));

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUrl = reader.result as string;
        setSourceFile(file);
        setSourceDataUrl(imageDataUrl);
        try {
          const response = await fetch("/api/ai/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageDataUrl, mimeType: file.type }),
          });
          const data = await response.json() as any;
          if (!response.ok) {
            throw new Error(data?.error || "Extraction failed");
          }
          const blocks = Array.isArray(data?.blocks) ? data.blocks : [];
          setProject((prev) => ({ ...prev, extractedBlocks: blocks }));
          setError(null);
        } catch {
          setError("Failed to extract text. Please try a clearer image.");
          setProject((prev) => ({ ...prev, originalImageUrl: null }));
          setSourceFile(null);
          setSourceDataUrl(null);
        } finally {
          setIsExtracting(false);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleCombinedTextChange = (newText: string) => {
    const lines = newText.split('\n');
    setProject((prev) => ({
      ...prev,
      extractedBlocks: prev.extractedBlocks.map((b, index) => ({
        ...b,
        currentText: lines[index] ?? '',
        status: "edited" as const,
      })),
    }));
  };

  const countLines = (text: string) => text.split("\n").length;
  const getLengthRatio = (originalText: string, translatedText: string) => {
    const originalLength = Math.max(1, originalText.length);
    return translatedText.length / originalLength;
  };

  const getCombinedText = () => {
    return project.extractedBlocks.map((b) => b.currentText).join('\n');
  };

  const handleCombinedTranslationChange = (languageCode: string, newText: string) => {
    const lines = newText.split('\n');
    setProject((prev) => ({
      ...prev,
      results: prev.results.map((result) =>
        result.languageCode === languageCode
          ? {
            ...result,
            blocks: result.blocks.map((block, index) => ({
              ...block,
              currentText: lines[index] ?? '',
              status: "edited" as const,
            })),
          }
          : result
      ),
    }));
  };

  const handleBlockTranslationChange = (languageCode: string, blockId: string, value: string) => {
    setProject((prev) => ({
      ...prev,
      results: prev.results.map((result) =>
        result.languageCode === languageCode
          ? {
            ...result,
            blocks: result.blocks.map((block) =>
              block.id === blockId
                ? { ...block, currentText: value, status: "edited" as const }
                : block
            ),
          }
          : result
      ),
    }));
  };

  const getCombinedTranslation = (languageCode: string) => {
    const result = project.results.find((r) => r.languageCode === languageCode);
    return result?.blocks.map((b) => b.currentText).join('\n') ?? '';
  };

  const toggleLanguage = (code: string) => {
    setProject((prev) => {
      const exists = prev.targetLanguages.includes(code);
      return {
        ...prev,
        targetLanguages: exists ? prev.targetLanguages.filter((l) => l !== code) : [...prev.targetLanguages, code],
      };
    });
  };

  const handleTranslate = async () => {
    if (!project.extractedBlocks.length) {
      setError("Extract text before translating.");
      return;
    }

    if (project.targetLanguages.length === 0) {
      setError("Select at least one target language.");
      return;
    }

    setProject((prev) => ({ ...prev, results: [] }));
    setError(null);
    setIsTranslating(true);
    const totalLanguages = project.targetLanguages.length;
    const progressToast = createProgressToast({
      title: "Translating",
      description: `${totalLanguages} languages`,
      progress: 0,
    });
    let completed = 0;

    try {
      const tasks = project.targetLanguages.map(async (langCode) => {
        const isCustom = langCode.startsWith("custom:");
        const languageName = isCustom
          ? langCode.replace("custom:", "")
          : LANGUAGES.find((l) => l.code === langCode)?.name || langCode;
        try {
          const response = await fetch("/api/ai/translate-blocks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blocks: project.extractedBlocks,
              targetLanguage: languageName,
              recipe: project.recipe,
            }),
          });

          const data = (await response.json()) as any;
          if (!response.ok) {
            throw new Error(data?.error || "Translation failed");
          }

          const translatedBlocks = Array.isArray(data?.blocks) ? data.blocks : [];

          return {
            languageCode: langCode,
            languageName: LANGUAGES.find((l) => l.code === langCode)?.name || langCode,
            blocks: translatedBlocks,
            previewUrl: null,
            previewUrls: [],
            status: "completed" as const,
          };
        } catch {
          const fallbackBlocks = project.extractedBlocks.map((block) => ({
            ...block,
            currentText: block.currentText || block.originalText,
            status: "edited" as const,
          }));
          return {
            languageCode: langCode,
            languageName: LANGUAGES.find((l) => l.code === langCode)?.name || langCode,
            blocks: fallbackBlocks,
            previewUrl: null,
            previewUrls: [],
            status: "error" as const,
          };
        } finally {
          completed += 1;
          const progress = Math.round((completed / totalLanguages) * 100);
          progressToast.update(progress, `${completed}/${totalLanguages} languages`);
        }
      });

      const results = await Promise.all(tasks);
      setProject((prev) => ({ ...prev, results, imageOptions: { numImages: imageCount } }));
      if (results.length > 0) {
        if (!activeLanguage || !results.find((r) => r.languageCode === activeLanguage)) {
          setActiveLanguage(results[0].languageCode);
        }
      }
      setError(null);
      const failedCount = results.filter((result) => result.status === "error").length;
      if (failedCount > 0) {
        progressToast.error("Translation completed with issues", `${failedCount} language(s) failed`);
      } else {
        progressToast.success("Translation complete", `${results.length} languages`);
      }
    } catch {
      setError("Failed to translate text. Please try again.");
      progressToast.error("Translation failed", "Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleProcess = async () => {
    const needsRunLoad =
      runId &&
      loadedRunId !== runId &&
      (!sourceDataUrl ||
        !sourceFile ||
        !project.originalImageUrl ||
        project.extractedBlocks.length === 0 ||
        project.results.length === 0);

    if (needsRunLoad) {
      if (pendingGenerateAfterLoadRef.current !== runId) {
        notify.info("Loading run details", "Preparing source image and translations...");
      }
      pendingGenerateAfterLoadRef.current = runId;
      void loadRunIntoStudio(runId, selectedCheckpoint?.id);
      return;
    }

    let sourceFileToUse = sourceFile;
    let sourceDataUrlToUse = sourceDataUrl;

    if (!sourceDataUrlToUse || !sourceFileToUse) {
      const candidates: { label: string; url: string }[] = [];
      if (runId) {
        candidates.push({ label: "runSource", url: `/api/runs/${runId}/source` });
      }
      if (project.originalImageUrl) {
        candidates.push({ label: "projectUrl", url: project.originalImageUrl });
      }

      if (candidates.length === 0) {
        setError("Missing source image. Please upload again.");
        return;
      }

      let restored: { file: File; dataUrl: string } | null = null;
      for (const candidate of candidates) {
        try {
          const response = await fetch(candidate.url, { cache: "no-store" });
          if (!response.ok) {
            throw new Error(`Failed to load source image (${candidate.label}, ${response.status})`);
          }
          const blob = await response.blob();
          const mimeType = blob.type || "image/jpeg";
          const ext = extFromMimeType(mimeType);
          const restoredFile = new File([blob], `source.${ext}`, { type: mimeType });
          const restoredDataUrl = await readBlobAsDataUrl(blob);
          restored = { file: restoredFile, dataUrl: restoredDataUrl };
          break;
        } catch (err) {
          console.warn(`Failed to restore source image via ${candidate.label}`, err);
        }
      }

      if (!restored) {
        setError("Could not load the source image from history. Please upload again.");
        return;
      }

      setSourceFile(restored.file);
      setSourceDataUrl(restored.dataUrl);
      sourceFileToUse = restored.file;
      sourceDataUrlToUse = restored.dataUrl;
    }

    if (project.targetLanguages.length === 0) {
      setError("Select at least one target language.");
      return;
    }

    if (resultsReady.length === 0) {
      setError("Translate the content before generating images.");
      return;
    }

    const resultsToProcess = visibleResults.filter((result) => result.blocks.length > 0);
    const targetLanguagesToProcess = resultsToProcess.map((result) => result.languageCode);

    if (targetLanguagesToProcess.length === 0) {
      setError("Translate the content before generating images.");
      return;
    }

    const failedResults = visibleResults.filter((result) => result.status === "error");
    if (failedResults.length > 0) {
      notify.warning("Some translations failed", "You can edit them manually before generating.");
    }

    setIsProcessing(true);
    setError(null);
    setGeneratedImages([]);
    const totalLanguages = targetLanguagesToProcess.length;
    const progressToast = createProgressToast({
      title: "Generating images",
      description: `${totalLanguages} languages`,
      progress: 0,
    });

    try {
      const processedTexts: Record<string, Record<string, string>> = {};
      resultsToProcess.forEach((result) => {
        result.blocks.forEach((block) => {
          if (!processedTexts[block.id]) {
            processedTexts[block.id] = {};
          }
          processedTexts[block.id][result.languageCode] = block.currentText || block.originalText;
        });
      });

      const runResponse = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipe: project.recipe,
          targetLanguages: targetLanguagesToProcess,
          blocks: project.extractedBlocks,
          imageDataUrl: sourceDataUrlToUse,
          imageMeta: {
            width: project.originalImageDimensions.width,
            height: project.originalImageDimensions.height,
            fileSize: sourceFileToUse.size,
            fileName: sourceFileToUse.name,
            mimeType: sourceFileToUse.type,
          },
          imageOptions: { numImages: imageCount },
          processedTexts,
        }),
      });

      const runData = await runResponse.json();
      if (!runResponse.ok) {
        if (runResponse.status === 402) {
          const required = runData?.creditsRequired;
          const available = runData?.creditsAvailable;
          throw new Error(
            typeof required === "number" && typeof available === "number"
              ? `Insufficient credits: need ${required}, have ${available}.`
              : runData?.error || "Insufficient credits"
          );
        }
        throw new Error(runData?.error || "Failed to create run");
      }

      const newRunId = runData?.run?.id;
      let sourceImageUrl = runData?.sourceAsset?.public_url as string | undefined;

      if (!newRunId) {
        throw new Error("Failed to create run");
      }

      setRunId(newRunId);
      if (typeof runData?.billing?.credits_balance_after === "number") {
        setCreditsBalance(runData.billing.credits_balance_after);
      }

      if (!sourceImageUrl) {
        const detailResponse = await fetch(`/api/runs/${newRunId}`);
        if (detailResponse.ok) {
          const detailData = await detailResponse.json();
          sourceImageUrl = detailData?.sourceAsset?.public_url as string | undefined;
        }
      }

      if (!sourceImageUrl) {
        throw new Error("Missing source image URL");
      }

      const results: { langCode: string; langName: string; url: string }[] = [];
      let completedLanguages = 0;

      for (const result of resultsToProcess) {
        const isCustom = result.languageCode.startsWith("custom:");
        const langName = isCustom
          ? result.languageCode.replace("custom:", "")
          : LANGUAGES.find((l) => l.code === result.languageCode)?.name || result.languageName;

        const response = await fetch("/api/ai/generate-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            runId: newRunId,
            sourceImageUrl,
            blocks: result.blocks,
            languageCode: result.languageCode,
            languageName: langName,
            imageOptions: { numImages: imageCount },
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Image generation failed");
        }

        const images = Array.isArray(data?.images) ? data.images : [];
        const imageUrls = images
          .map((image: { url?: string }) => image.url)
          .filter(Boolean) as string[];

        if (imageUrls.length > 0) {
          const text = result.blocks.map((block) => block.currentText || block.originalText).join("\n");
          const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
          const translationHash = Array.from(new Uint8Array(hashBuffer))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");

          await Promise.all(
            imageUrls.map(async (imageDataUrl, variantIndex) => {
              const outputResponse = await fetch(`/api/runs/${newRunId}/outputs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  imageDataUrl,
                  languageCode: result.languageCode,
                  variantIndex,
                  translationHash,
                }),
              });
              if (!outputResponse.ok) {
                const outputData = await outputResponse.json().catch(() => ({}));
                throw new Error(outputData?.error || "Failed to persist output");
              }
            })
          );

          results.push({ langCode: result.languageCode, langName, url: imageUrls[0] });
          setGeneratedImages([...results]);
        }

        completedLanguages += 1;
        const progress = Math.round((completedLanguages / totalLanguages) * 100);
        progressToast.update(progress, `${completedLanguages}/${totalLanguages} languages`);
      }

      await fetch(`/api/runs/${newRunId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "done",
          stage: "complete",
          progress: {
            total_languages: targetLanguagesToProcess.length,
            completed_languages: completedLanguages,
            current_language: null,
            stage: "complete",
          },
        }),
      });

      await fetchRunDetails(newRunId);

      setPreviewMode("gallery");
      setCompareIndex(0);
      progressToast.success("Generation complete", `${completedLanguages} languages`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to generate images. Please try again.";
      setError(message);
      progressToast.error("Generation failed", message);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!runId) return;
    if (loadedRunId !== runId) return;
    if (pendingGenerateAfterLoadRef.current !== runId) return;

    pendingGenerateAfterLoadRef.current = null;
    void handleProcess();
  }, [loadedRunId, runId]);

  const resetProject = () => {
    pendingGenerateAfterLoadRef.current = null;
    runLoadAbortRef.current?.abort();
    runLoadAbortRef.current = null;
    runLoadSeqRef.current += 1;
    setProject({
      originalImageUrl: null,
      originalImageDimensions: { width: 0, height: 0 },
      extractedBlocks: [],
      targetLanguages: [],
      recipe: "translation",
      results: [],
    });
    setSourceFile(null);
    setSourceDataUrl(null);
    setActiveLanguage(null);
    setError(null);
    setPreviewMode("compare");

    setGeneratedImages([]);
    setCompareIndex(0);
    setComparePosition(50);
    setCustomLanguages([]);
    setRunId(null);
    setLoadedRunId(null);
    setCheckpoints([]);
    setSelectedCheckpoint(null);
    setRunOutputs([]);
  };

  const confirmReset = () => {
    notify.confirm({
      title: "Reset current project?",
      description: "This clears uploads, translations, and generated previews.",
      action: {
        label: "Reset",
        onClick: resetProject,
      },
      secondaryAction: {
        label: "Cancel",
        onClick: () => { },
      },
    });
  };

  const showTranslationEditor = project.results.length > 0;
  const stepHint = useMemo(() => {
    if (!project.originalImageUrl) {
      return {
        title: "Upload a banner to begin",
        description: "We'll extract editable text blocks from your image.",
      };
    }
    if (currentStep === 1) {
      if (isExtracting) {
        return { title: "Extracting text", description: "Detecting text blocks from the image." };
      }
      if (!showTranslationEditor) {
        return {
          title: "Select languages and translate",
          description: "Choose targets below and generate the first draft.",
        };
      }
      return {
        title: "Review and refine",
        description: "Adjust copy and line breaks before generating images.",
      };
    }
    if (currentStep === 2 && project.results.length === 0) {
      return { title: "Translate first", description: "Complete Step 1 before generating images." };
    }
    return {
      title: "Generate proof images",
      description: "Pick variants and render ready-to-share previews.",
    };
  }, [currentStep, isExtracting, project.originalImageUrl, project.results.length, showTranslationEditor]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-ink-200 border-t-ink-900 rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh] text-ink-500 text-sm">
          Redirecting to sign in...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-6rem)]">
        <RunHistorySidebar
          limit={8}
          activeRunId={runId}
          selectedCheckpointId={selectedCheckpoint?.id ?? null}
          onSelectCheckpoint={handleSelectCheckpoint}
          onSelectRunPreview={handleSelectRunPreview}
          onSelectRun={(runId, checkpointId) => {
            if (!checkpointId) return;
            void loadRunIntoStudio(runId, checkpointId);
          }}
          onRunDeleted={(deletedRunId) => {
            if (deletedRunId === runId) {
              resetProject();
            }
          }}
        />
        <div className="flex-1 flex flex-col md:flex-row gap-6 px-4 md:px-6 pt-6 pb-6 overflow-hidden">
          <div className="flex-1 bg-ink-100/50 border border-ink-200 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300">
            {!project.originalImageUrl && !hasRunGallery && !runId ? (
              <div
                className={`text-center p-12 transition-all duration-300 hover:scale-[1.01] w-full h-full flex flex-col items-center justify-center ${isDragging ? "bg-accent/10 border-2 border-dashed border-accent rounded-xl" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-dashed border-ink-300 flex items-center justify-center mx-auto mb-6 group-hover:border-accent group-hover:text-accent transition-colors">
                  <Upload className="text-ink-400 w-10 h-10 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-bold text-xl text-ink-900 mb-2">Upload your banner</h3>
                <p className="text-sm text-ink-500 mb-8 max-w-xs mx-auto leading-relaxed">
                  Drag and drop or click to select. <br />Optimized for JPG & PNG (Max 5MB).
                </p>
                <label className="cursor-pointer inline-block">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  <div className="bg-ink-900 text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-ink-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                    <ImageIcon size={16} />
                    Select Source File
                  </div>
                </label>
                {error && (
                  <div className="mt-4 text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full flex flex-col bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
                {/* Studio Header Bar */}
                <div className="h-16 shrink-0 border-b border-ink-200/50 bg-white/50 backdrop-blur px-6 flex items-center justify-between z-20">
                  <div className="flex items-center gap-3">
                    {hasRunGallery && (
                      <div className="flex items-center bg-white border border-ink-200 rounded-full p-1 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setPreviewMode("gallery")}
                          className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${previewMode === "gallery" ? "bg-ink-900 text-white shadow-sm" : "text-ink-500 hover:text-ink-900 hover:bg-ink-50"
                            }`}
                        >
                          Gallery
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewMode("compare")}
                          className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${previewMode === "compare" ? "bg-ink-900 text-white shadow-sm" : "text-ink-500 hover:text-ink-900 hover:bg-ink-50"
                            }`}
                        >
                          Compare
                        </button>
                      </div>
                    )}


                  </div>

                  <div className="flex items-center gap-2">
                    {isLoadingRun && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-ink-200 text-[11px] font-medium text-ink-500 shadow-sm">
                        <div className="w-3 h-3 rounded-full border-2 border-ink-200 border-t-ink-600 animate-spin" />
                        Loading
                      </div>
                    )}
                    <button
                      onClick={confirmReset}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium text-ink-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Reset Project"
                    >
                      <RefreshCcw size={14} />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Main Preview Area */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center p-6">
                  {previewMode === "gallery" && hasRunGallery ? (
                    <RunGallery
                      outputs={runOutputs}
                      languages={project.targetLanguages}
                      variantsPerLanguage={variantsPerLanguage}
                      selected={
                        selectedCheckpoint
                          ? { language_code: selectedCheckpoint.language_code, variant_index: selectedCheckpoint.variant_index }
                          : null
                      }
                      onSelect={handleSelectGalleryImage}
                    />
                  ) : generatedImages.length > 0 ? (
                    <div className="flex flex-col items-center gap-3 w-full h-full justify-center">
                      <div className="bg-white/90 backdrop-blur border border-ink-200 shadow-sm px-4 py-1.5 rounded-full text-xs font-bold text-ink-600 flex items-center gap-2 z-10 shrink-0">
                        <span className="text-ink-400 uppercase tracking-wider text-[10px]">
                          {project.originalImageUrl ? "Original" : "Preview"}
                        </span>
                        <span className="text-ink-300">|</span>
                        <span className="text-accent uppercase tracking-wider text-[10px]">{generatedImages[compareIndex]?.langName}</span>
                      </div>

                      <div className="relative flex-1 min-h-0 w-full flex items-center justify-center">
                        <div className="relative inline-block max-w-full max-h-full shadow-2xl border-[6px] border-white rounded-lg ring-1 ring-ink-200/50 bg-white transition-all duration-500 animate-fade-in overflow-hidden">
                          {project.originalImageUrl ? (
                            <div
                              ref={compareContainerRef}
                              className="relative select-none"
                              style={{ cursor: "ew-resize", touchAction: "none" }}
                              onPointerDown={handleComparePointerDown}
                              onPointerMove={handleComparePointerMove}
                              onPointerUp={handleComparePointerUp}
                              onPointerCancel={handleComparePointerUp}
                              onKeyDown={handleCompareKeyDown}
                              tabIndex={0}
                              role="slider"
                              aria-label="Compare original and generated images"
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={Math.round(comparePosition)}
                            >
                              <img
                                src={generatedImages[compareIndex]?.url}
                                className="block max-w-full max-h-[calc(100vh-16rem)] object-contain"
                                alt="Generated"
                                draggable={false}
                              />
                              <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                              >
                                <img
                                  src={project.originalImageUrl}
                                  className="block max-w-full max-h-[calc(100vh-16rem)] object-contain"
                                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                  alt="Original"
                                  draggable={false}
                                />
                              </div>

                              {/* Overlay Grid */}
                              <div
                                className={`absolute inset-0 pointer-events-none overlay-grid transition-opacity duration-300 ${showGrid ? "opacity-40" : "opacity-0"
                                  }`}
                              />

                              {/* Slider Handle */}
                              <div
                                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] z-10"
                                style={{ left: `${comparePosition}%`, transform: "translateX(-50%)" }}
                              >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-ink-100 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                                  <div className="flex gap-0.5">
                                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[4px] border-r-ink-400" />
                                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-ink-400" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <img
                                src={generatedImages[compareIndex]?.url}
                                className="block max-w-full max-h-[calc(100vh-16rem)] object-contain"
                                alt="Generated"
                                draggable={false}
                              />
                              <div
                                className={`absolute inset-0 pointer-events-none overlay-grid transition-opacity duration-300 ${showGrid ? "opacity-40" : "opacity-0"
                                  }`}
                              />
                            </>
                          )}
                        </div>

                        {generatedImages[compareIndex]?.url && (
                          <button
                            onClick={() => {
                              const lang = generatedImages[compareIndex]?.langCode || "result";
                              downloadSingleAsset(
                                generatedImages[compareIndex].url,
                                `copyback_${lang}_${Date.now()}.jpg`
                              );
                            }}
                            className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-ink-700 shadow-lg hover:bg-white transition-all flex items-center gap-1.5 border border-ink-100"
                            title="Download result"
                          >
                            <Download size={14} />
                            Download
                          </button>
                        )}

                        {languageToggleItems.length > 1 && (
                          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-1 bg-white/90 backdrop-blur p-1 rounded-full shadow-lg border border-ink-100 z-10">
                            {languageToggleItems.map(({ item, index }) => {
                              const isActive = item.langCode === generatedImages[compareIndex]?.langCode;
                              return (
                                <button
                                  key={item.langCode}
                                  onClick={() => setCompareIndex(index)}
                                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full transition-all ${isActive
                                    ? "bg-ink-900 text-white shadow-sm"
                                    : "bg-transparent text-ink-500 hover:text-ink-900 hover:bg-ink-50"
                                    }`}
                                >
                                  {item.langName}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    project.originalImageUrl ? (
                      <div className="relative inline-block shadow-2xl border-[6px] border-white rounded-lg ring-1 ring-ink-200/50 bg-white transition-all duration-500 animate-fade-in max-w-full max-h-full">
                        <img
                          src={project.originalImageUrl}
                          className="block max-w-full max-h-[calc(100vh-14rem)]"
                          alt="Original"
                        />
                        <div
                          className={`absolute inset-0 pointer-events-none overlay-grid transition-opacity duration-300 ${showGrid ? "opacity-40" : "opacity-0"
                            }`}
                        />
                      </div>
                    ) : (
                      <div className="text-center px-10 py-12 bg-white/80 backdrop-blur border border-ink-200 rounded-2xl shadow-sm max-w-md">
                        <div className="w-14 h-14 rounded-2xl bg-ink-50 border border-ink-200 flex items-center justify-center mx-auto mb-4 text-ink-400">
                          <ImageIcon size={22} />
                        </div>
                        <div className="text-sm font-bold text-ink-900">No previews yet</div>
                        <div className="text-xs text-ink-500 mt-1">
                          This run has no generated images yet. Pick a run with outputs, or wait for processing to finish.
                        </div>
                        {runId && loadedRunId !== runId && (
                          <button
                            type="button"
                            onClick={() => void loadRunIntoStudio(runId)}
                            className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-full bg-ink-900 text-white text-xs font-bold hover:bg-ink-800 transition-colors"
                          >
                            Load run details
                          </button>
                        )}
                      </div>
                    )
                  )}

                  {/* Loading States */}
                  {isExtracting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
                      <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-6 h-6 border-[3px] border-ink-100 border-t-accent rounded-full animate-spin" />
                        <div>
                          <div className="text-sm font-bold text-ink-900">Extracting text</div>
                          <div className="text-xs text-ink-500">Analyzing layout...</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isTranslating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
                      <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-8 h-8 border-[3px] border-ink-100 border-t-accent rounded-full animate-spin" />
                        <div className="text-center">
                          <div className="text-sm font-bold text-ink-900">Translating</div>
                          <div className="flex flex-wrap gap-1 justify-center max-w-[200px] mt-2">
                            {project.targetLanguages.map((langCode) => (
                              <span key={langCode} className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
                      <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-8 h-8 border-[3px] border-ink-100 border-t-accent rounded-full animate-spin" />
                        <div className="text-center">
                          <div className="text-sm font-bold text-ink-900">Generating variants</div>
                          <div className="text-xs text-ink-500 mt-1">{resultsReady.length * imageCount} images remaining</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-[420px] flex flex-col bg-white border border-ink-200 rounded-xl shadow-xl overflow-hidden">
            <div className="flex border-b border-ink-200 shrink-0">
              <button
                onClick={() => setCurrentStep(1)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all ${currentStep === 1
                  ? "bg-white text-ink-900 border-b-2 border-accent"
                  : "bg-ink-50 text-ink-400 hover:text-ink-600"
                  }`}
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ink-900 text-white text-[10px] mr-2">1</span>
                Text
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all ${currentStep === 2
                  ? "bg-white text-ink-900 border-b-2 border-accent"
                  : "bg-ink-50 text-ink-400 hover:text-ink-600"
                  }`}
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ink-900 text-white text-[10px] mr-2">2</span>
                Generate
              </button>
            </div>
            <div className="px-4 py-3 border-b border-ink-100 bg-ink-50/60">
              <p className="text-[10px] uppercase tracking-wide text-ink-500 font-semibold">{stepHint.title}</p>
              <p className="text-xs text-ink-500 mt-1">{stepHint.description}</p>
            </div>

            {currentStep === 1 ? (
              <div className="flex-1 flex flex-col min-h-0">
                {project.extractedBlocks.length === 0 && !isExtracting ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-ink-400 p-6 text-center">
                    <Layers size={32} className="text-ink-300 mb-3" />
                    <p className="text-sm font-medium text-ink-500">No text detected</p>
                    <p className="text-xs text-ink-400 mt-1">Upload an image to extract text</p>
                    <div className="mt-6 text-left bg-ink-50 rounded-lg p-4 text-xs text-ink-500 space-y-2 max-w-xs">
                      <p className="font-medium text-ink-600">How it works:</p>
                      <p>1. Upload a banner image on the left</p>
                      <p>2. AI will extract all text automatically</p>
                      <p>3. Select languages and translate</p>
                    </div>
                  </div>
                ) : isExtracting ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-ink-500">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-sm font-medium">Extracting text...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto min-h-0">
                      <div className="p-3 space-y-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-[10px] font-bold text-ink-400 uppercase tracking-wide">Original Text</div>
                          {showTranslationEditor && (
                            <button
                              onClick={() => {
                                setExpandedEditor(true);
                                setExpandedLanguage(null);
                              }}
                              className="text-[10px] text-accent hover:text-accent/80 font-medium flex items-center gap-1"
                            >
                              <Maximize2 size={10} />
                              Expand
                            </button>
                          )}
                        </div>
                        {(() => {
                          const translationCount = visibleResults.length;
                          const totalSections = translationCount + 1;
                          const baseMaxRows = Math.max(3, Math.floor(14 / totalSections));
                          const originalMaxRows = translationCount === 0 ? 12 : Math.min(baseMaxRows + 2, 8);
                          const translationMaxRows = Math.min(baseMaxRows, 6);
                          const blockCount = project.extractedBlocks.length;
                          const originalLines = countLines(getCombinedText());

                          return (
                            <>
                              <div>
                                <div className="flex items-center justify-between text-[10px] text-ink-400 mb-1">
                                  <span>{blockCount} blocks</span>
                                  <span className={originalLines !== blockCount ? "text-amber-600 font-semibold" : ""}>
                                    {originalLines} lines
                                  </span>
                                </div>
                                <AutoResizeTextarea
                                  className="w-full bg-ink-50 border border-ink-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white text-sm text-ink-900 p-3"
                                  value={getCombinedText()}
                                  onChange={(e) => handleCombinedTextChange(e.target.value)}
                                  placeholder="Extracted text..."
                                  minRows={2}
                                  maxRows={originalMaxRows}
                                />
                                {originalLines !== blockCount && (
                                  <p className="mt-1 text-[10px] text-amber-600">
                                    Line count should match block count for accurate mapping.
                                  </p>
                                )}
                              </div>
                              {showTranslationEditor && visibleResults.map((result) => (
                                <div key={result.languageCode}>
                                  <div className="text-[10px] font-bold text-ink-400 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                      <Globe size={10} />
                                      {LANGUAGES.find(l => l.code === result.languageCode)?.name || result.languageCode}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setExpandedEditor(true);
                                        setExpandedLanguage(result.languageCode);
                                      }}
                                      className="text-[10px] text-accent hover:text-accent/80 font-medium flex items-center gap-1"
                                    >
                                      <Maximize2 size={10} />
                                    </button>
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] text-ink-400 mb-1">
                                    <span>{blockCount} blocks</span>
                                    <span
                                      className={
                                        countLines(getCombinedTranslation(result.languageCode)) !== blockCount
                                          ? "text-amber-600 font-semibold"
                                          : ""
                                      }
                                    >
                                      {countLines(getCombinedTranslation(result.languageCode))} lines
                                    </span>
                                  </div>
                                  <AutoResizeTextarea
                                    className={`w-full bg-accent/5 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white text-sm text-ink-900 p-3 ${result.status === "error"
                                      ? "border-red-200"
                                      : "border-accent/20"
                                      }`}
                                    value={getCombinedTranslation(result.languageCode)}
                                    onChange={(e) => handleCombinedTranslationChange(result.languageCode, e.target.value)}
                                    placeholder={result.status === "error" ? "Translation failed. Edit manually or re-translate." : "Translation..."}
                                    minRows={2}
                                    maxRows={translationMaxRows}
                                  />
                                  {result.status === "error" && (
                                    <p className="mt-1 text-[10px] text-red-600">
                                      Translation failed for this language. Edit manually or re-run translate.
                                    </p>
                                  )}
                                </div>
                              ))}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="p-3 border-t border-ink-100 shrink-0 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[10px] font-bold text-ink-400 uppercase tracking-wide">
                          Target Languages
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <button
                            type="button"
                            onClick={selectAllVisibleLanguages}
                            className="text-ink-500 hover:text-ink-900 transition-colors"
                          >
                            Select all
                          </button>
                          <span className="text-ink-300">|</span>
                          <button
                            type="button"
                            onClick={clearAllLanguages}
                            className="text-ink-500 hover:text-ink-900 transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={languageQuery}
                          onChange={(e) => setLanguageQuery(e.target.value)}
                          placeholder="Search languages"
                          className="w-full px-3 py-1.5 text-[11px] border border-ink-200 rounded-full focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                        {!showCustomInput && (
                          <button
                            onClick={() => setShowCustomInput(true)}
                            className="px-2.5 py-1.5 text-[10px] font-medium rounded-full border border-dashed border-ink-300 text-ink-400 hover:border-accent hover:text-accent transition-all whitespace-nowrap"
                          >
                            + Custom
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {filteredLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => toggleLanguage(lang.code)}
                            className={`px-2 py-1 text-[10px] font-medium rounded-full border transition-all ${project.targetLanguages.includes(lang.code)
                              ? "bg-ink-900 text-white border-ink-900"
                              : "bg-white text-ink-500 border-ink-200 hover:bg-ink-50"
                              }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                        {customLanguages.map((lang) => (
                          <button
                            key={`custom-${lang}`}
                            onClick={() => {
                              setCustomLanguages((prev) => prev.filter((l) => l !== lang));
                              setProject((prev) => ({
                                ...prev,
                                targetLanguages: prev.targetLanguages.filter((l) => l !== `custom:${lang}`),
                              }));
                            }}
                            className={`px-2 py-1 text-[10px] font-medium rounded-full border transition-all ${project.targetLanguages.includes(`custom:${lang}`)
                              ? "bg-accent text-white border-accent"
                              : "bg-accent/10 text-accent border-accent/30 hover:bg-accent/20"
                              }`}
                          >
                            {lang} x
                          </button>
                        ))}
                        {showCustomInput && (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={customLanguageInput}
                              onChange={(e) => setCustomLanguageInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && customLanguageInput.trim()) {
                                  const lang = customLanguageInput.trim();
                                  if (!customLanguages.includes(lang)) {
                                    setCustomLanguages((prev) => [...prev, lang]);
                                    setProject((prev) => ({
                                      ...prev,
                                      targetLanguages: [...prev.targetLanguages, `custom:${lang}`],
                                    }));
                                  }
                                  setCustomLanguageInput("");
                                  setShowCustomInput(false);
                                } else if (e.key === "Escape") {
                                  setCustomLanguageInput("");
                                  setShowCustomInput(false);
                                }
                              }}
                              placeholder="e.g. Thai"
                              className="w-24 px-2 py-1 text-[10px] border border-accent rounded-full focus:outline-none focus:ring-1 focus:ring-accent"
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                setCustomLanguageInput("");
                                setShowCustomInput(false);
                              }}
                              className="text-ink-400 hover:text-ink-600"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                      <Button
                        className="w-full h-10 text-sm font-bold"
                        variant={showTranslationEditor ? "secondary" : "primary"}
                        disabled={project.extractedBlocks.length === 0 || project.targetLanguages.length === 0 || isTranslating}
                        onClick={handleTranslate}
                        isLoading={isTranslating}
                      >
                        {!isTranslating && <Globe className="w-4 h-4 mr-2" />}
                        {project.results.length > 0 ? "Re-Translate" : "Translate"}
                      </Button>
                      {showTranslationEditor && (
                        <div className="pt-2 border-t border-ink-100">
                          <p className="text-[10px] text-ink-400 text-center mb-2">Text looks good?</p>
                          <Button
                            className="w-full h-10 text-sm font-bold"
                            onClick={() => setCurrentStep(2)}
                          >
                            <ChevronRight className="w-4 h-4 mr-1" />
                            Continue to Generate
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col min-h-0">
                {project.results.length === 0 && !isTranslating ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-ink-400 p-6 text-center">
                    <Globe size={32} className="text-ink-300 mb-3" />
                    <p className="text-sm font-medium text-ink-500">No translations yet</p>
                    <p className="text-xs text-ink-400 mt-1">Complete Step 1 first</p>
                    <Button
                      className="mt-4 h-9 text-xs"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Go to Step 1
                    </Button>
                  </div>
                ) : isTranslating ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-ink-500">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-sm font-medium">Translating...</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Content Preview - Scrollable */}
                    <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-2">
                      <div className="text-[10px] font-bold text-ink-400 uppercase tracking-wide mb-2">Content to Generate</div>
                      {visibleResults.some((result) => result.status === "error") && (
                        <div className="text-[10px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                          Some translations failed. You can edit them manually or re-run translation before generating.
                        </div>
                      )}

                      {/* Compact content cards */}
                      {visibleResults.map((result) => {
                        const originalText = getCombinedText();
                        const translationText = getCombinedTranslation(result.languageCode);
                        const originalPreview = originalText.slice(0, Math.ceil(originalText.length * 0.75));
                        const translationPreview = translationText.slice(0, Math.ceil(translationText.length * 0.75));
                        const lengthRatio = getLengthRatio(originalText, translationText);
                        const ratioPercent = Math.round(lengthRatio * 100);
                        const ratioColor =
                          lengthRatio > 1.5
                            ? "bg-red-500"
                            : lengthRatio > 1.2
                              ? "bg-amber-500"
                              : "bg-safe";
                        const isCustomLang = result.languageCode.startsWith("custom:");
                        const displayLangName = isCustomLang
                          ? result.languageCode.replace("custom:", "")
                          : LANGUAGES.find(l => l.code === result.languageCode)?.name || result.languageName;

                        return (
                          <div
                            key={result.languageCode}
                            className={`bg-gradient-to-r from-ink-50 to-accent/5 rounded-xl p-3 border transition-all group h-[180px] flex flex-col ${result.status === "error"
                              ? "border-red-200 bg-red-50/50"
                              : "border-ink-200/80 hover:border-accent/30"
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                                <Globe size={12} className="text-accent" />
                              </div>
                              <span className="text-xs font-bold text-ink-800">{displayLangName}</span>
                              {result.status === "error" && (
                                <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                  Failed
                                </span>
                              )}
                              <span className="text-[10px] text-ink-400 ml-auto bg-ink-100 px-1.5 py-0.5 rounded">{imageCount} image{imageCount > 1 ? 's' : ''}</span>
                            </div>

                            <div className="text-[11px] text-ink-700 leading-relaxed bg-white/70 rounded-lg p-2.5 mb-2 border border-ink-100/50 line-clamp-4 flex-1">
                              {translationPreview}{translationPreview.length < translationText.length ? '...' : ''}
                            </div>

                            <div className="mb-2">
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

                            <div className="text-[10px] text-ink-400 leading-relaxed bg-ink-50/50 rounded px-2 py-1.5 line-clamp-2">
                              <span className="text-ink-300 font-medium">Original: </span>{originalPreview}{originalPreview.length < originalText.length ? '...' : ''}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Fixed Bottom Controls */}
                    <div className="shrink-0 border-t border-ink-100 p-3 space-y-3 bg-white">
                      {/* Image Count - Compact */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-ink-400 uppercase tracking-wide">Images per language</span>
                        <div className="flex bg-ink-100 rounded-lg p-0.5">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              onClick={() => setImageCount(num)}
                              className={`w-7 h-7 text-[11px] font-bold rounded-md transition-all ${imageCount === num
                                ? "bg-white text-ink-900 shadow-sm"
                                : "text-ink-400 hover:text-ink-600"
                                }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-ink-100">
                        <div className="flex items-center justify-between text-[10px] text-ink-500 mb-2">
                          <span>{resultsReady.length} languages x {imageCount} images</span>
                          <span className="font-bold text-accent">{resultsReady.length * imageCount} total</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-ink-500">
                          <span>{creditEstimate.creditsPerImage} credits / image</span>
                          <span className={`font-bold ${hasEnoughCredits ? "text-ink-700" : "text-red-600"}`}>
                            {creditEstimate.creditsEstimated} credits
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-ink-500 mt-1">
                          <span>Balance</span>
                          <span className={`font-mono ${hasEnoughCredits ? "text-ink-700" : "text-red-600"}`}>
                            {isLoadingCredits
                              ? "..."
                              : effectiveCreditsBalance === null
                                ? "N/A"
                                : isDeveloper
                                  ? "Unlimited"
                                  : `${effectiveCreditsBalance} -> ${creditsAfter}`}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${hasEnoughCredits ? "bg-accent" : "bg-red-500"}`}
                            style={{ width: `${creditUsageRatio !== null ? creditUsageRatio * 100 : 0}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-ink-400 text-center mt-2">
                          Keep this tab open while generating.
                        </p>
                        <Button
                          className="w-full h-11 text-sm font-bold bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent shadow-lg shadow-accent/20"
                          disabled={resultsReady.length === 0 || isProcessing || !hasEnoughCredits}
                          onClick={handleProcess}
                          isLoading={isProcessing}
                        >
                          {!isProcessing && <Sparkles className="w-4 h-4 mr-2 fill-current" />}
                          Generate {resultsReady.length * imageCount} Images
                        </Button>
                        {!hasEnoughCredits && (
                          <div className="text-[10px] text-red-600 text-center mt-2">
                            Not enough credits for this run.{" "}
                            <button
                              className="underline underline-offset-2 font-medium"
                              onClick={() => router.push("/billing")}
                              type="button"
                            >
                              Upgrade
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="px-4 pb-3">
                <div className="text-red-600 text-[10px] text-center font-medium bg-red-50 py-2 rounded flex items-center justify-center gap-1.5">
                  <AlertCircle size={12} />
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {
        expandedEditor && (
          <div className="fixed inset-0 z-50 bg-ink-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-ink-200">
                <h3 className="font-bold text-ink-900">
                  {expandedLanguage
                    ? `Compare: Original -> ${LANGUAGES.find(l => l.code === expandedLanguage)?.name}`
                    : "Text Editor"
                  }
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-ink-100/70 rounded-full p-1">
                    <button
                      type="button"
                      onClick={() => setExpandedViewMode("combined")}
                      className={`px-3 py-1 text-[10px] font-semibold rounded-full transition-all ${expandedViewMode === "combined"
                        ? "bg-ink-900 text-white"
                        : "text-ink-500 hover:text-ink-900"
                        }`}
                    >
                      Combined
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedViewMode("blocks")}
                      className={`px-3 py-1 text-[10px] font-semibold rounded-full transition-all ${expandedViewMode === "blocks"
                        ? "bg-ink-900 text-white"
                        : "text-ink-500 hover:text-ink-900"
                        }`}
                    >
                      Blocks
                    </button>
                  </div>
                  {showTranslationEditor && (
                    <div className="flex items-center gap-1 mr-4">
                      <button
                        onClick={() => setExpandedLanguage(null)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${!expandedLanguage
                          ? "bg-ink-900 text-white border-ink-900"
                          : "bg-white text-ink-500 border-ink-200 hover:bg-ink-50"
                          }`}
                      >
                        All
                      </button>
                      {project.results.map((result) => (
                        <button
                          key={result.languageCode}
                          onClick={() => setExpandedLanguage(result.languageCode)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${expandedLanguage === result.languageCode
                            ? "bg-ink-900 text-white border-ink-900"
                            : "bg-white text-ink-500 border-ink-200 hover:bg-ink-50"
                            }`}
                        >
                          {LANGUAGES.find(l => l.code === result.languageCode)?.name || result.languageCode}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setExpandedEditor(false)}
                    className="p-2 hover:bg-ink-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-ink-500" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden p-4">
                {expandedViewMode === "blocks" ? (
                  expandedLanguage ? (
                    <div className="h-full overflow-y-auto space-y-4">
                      {project.extractedBlocks.map((block, index) => {
                        const translationBlock = project.results
                          .find((result) => result.languageCode === expandedLanguage)
                          ?.blocks.find((item) => item.id === block.id);
                        const translatedText = translationBlock?.currentText ?? "";
                        const sourceText = block.currentText || block.originalText;
                        const isOverflow = translatedText.length > sourceText.length * 1.5;
                        return (
                          <div
                            key={block.id}
                            className={`rounded-xl border p-4 ${isOverflow ? "border-amber-200 bg-amber-50/40" : "border-ink-200 bg-white"}`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-bold uppercase tracking-wide text-ink-400">
                                Block {index + 1}
                              </span>
                              <span className={`text-[10px] font-semibold ${isOverflow ? "text-amber-600" : "text-ink-400"}`}>
                                {Math.round((translatedText.length / Math.max(1, sourceText.length)) * 100)}% length
                              </span>
                            </div>
                            <div className="text-[10px] font-bold text-ink-400 uppercase tracking-wide mb-1">Original</div>
                            <div className="text-xs text-ink-600 bg-ink-50 border border-ink-100 rounded-lg p-3 mb-3">
                              {sourceText}
                            </div>
                            <div className="text-[10px] font-bold text-accent uppercase tracking-wide mb-1">Translated</div>
                            <textarea
                              className={`w-full text-xs p-3 rounded-lg border focus:ring-2 focus:ring-accent focus:border-accent resize-none ${isOverflow ? "border-amber-200 text-amber-900 bg-white" : "border-ink-200 text-ink-800 bg-white"
                                }`}
                              rows={3}
                              value={translatedText}
                              onChange={(e) =>
                                handleBlockTranslationChange(expandedLanguage, block.id, e.target.value)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-ink-500">
                      Select a language to edit by block.
                    </div>
                  )
                ) : expandedLanguage ? (
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="flex flex-col min-h-0">
                      <div className="text-xs font-bold text-ink-500 uppercase tracking-wide mb-2">Original</div>
                      <div className="flex-1 overflow-y-auto">
                        <AutoResizeTextarea
                          className="w-full h-full bg-ink-50 border border-ink-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white text-sm text-ink-900 p-4"
                          value={getCombinedText()}
                          onChange={(e) => handleCombinedTextChange(e.target.value)}
                          minRows={10}
                          maxRows={30}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col min-h-0">
                      <div className="text-xs font-bold text-accent uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Globe size={12} />
                        {LANGUAGES.find(l => l.code === expandedLanguage)?.name}
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        <AutoResizeTextarea
                          className="w-full h-full bg-accent/5 border border-accent/20 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white text-sm text-ink-900 p-4"
                          value={getCombinedTranslation(expandedLanguage)}
                          onChange={(e) => handleCombinedTranslationChange(expandedLanguage, e.target.value)}
                          minRows={10}
                          maxRows={30}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto space-y-4">
                    <div>
                      <div className="text-xs font-bold text-ink-500 uppercase tracking-wide mb-2">Original Text</div>
                      <AutoResizeTextarea
                        className="w-full bg-ink-50 border border-ink-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white text-sm text-ink-900 p-4"
                        value={getCombinedText()}
                        onChange={(e) => handleCombinedTextChange(e.target.value)}
                        minRows={4}
                        maxRows={15}
                      />
                    </div>
                    {project.results.map((result) => (
                      <div key={result.languageCode}>
                        <div className="text-xs font-bold text-accent uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <Globe size={12} />
                          {LANGUAGES.find(l => l.code === result.languageCode)?.name || result.languageCode}
                        </div>
                        <AutoResizeTextarea
                          className="w-full bg-accent/5 border border-accent/20 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white text-sm text-ink-900 p-4"
                          value={getCombinedTranslation(result.languageCode)}
                          onChange={(e) => handleCombinedTranslationChange(result.languageCode, e.target.value)}
                          minRows={4}
                          maxRows={15}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-ink-200 flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setExpandedEditor(false)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </AppShell >
  );
}
