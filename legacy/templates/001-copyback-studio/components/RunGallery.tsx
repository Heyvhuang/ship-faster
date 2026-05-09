"use client";

import React, { useMemo } from "react";
import { Image as ImageIcon } from "lucide-react";
import { LANGUAGES, type RunOutput } from "../lib/types";

type SelectedImage = { language_code: string; variant_index: number } | null;

export type RunGalleryProps = {
  outputs: RunOutput[];
  languages: string[];
  variantsPerLanguage: number;
  selected?: SelectedImage;
  onSelect: (params: { languageCode: string; variantIndex: number }) => void;
};

const clampInt = (value: number, min: number, max: number) =>
  Math.min(Math.max(Math.floor(value), min), max);

const getLanguageLabel = (code: string) => {
  if (code.startsWith("custom:")) return code.replace("custom:", "");
  return LANGUAGES.find((lang) => lang.code === code)?.name || code;
};

export function RunGallery({
  outputs,
  languages,
  variantsPerLanguage,
  selected = null,
  onSelect,
}: RunGalleryProps) {
  const normalizedVariants = clampInt(variantsPerLanguage, 1, 4);

  const { languageOrder, urlMap } = useMemo(() => {
    const derivedLanguages = new Set<string>();
    const urlMap = new Map<string, { ts: number; url: string }>();

    for (const output of outputs) {
      if (!output?.language_code) continue;
      derivedLanguages.add(output.language_code);

      const url = output.asset?.public_url ?? null;
      if (!url) continue;

      const key = `${output.language_code}:${output.variant_index}`;
      const ts = output.created_at ? Date.parse(output.created_at) : -1;
      const normalizedTs = Number.isFinite(ts) ? ts : -1;
      const existing = urlMap.get(key);
      if (!existing || normalizedTs >= existing.ts) {
        urlMap.set(key, { ts: normalizedTs, url });
      }
    }

    const languageOrder = languages.length > 0 ? languages : Array.from(derivedLanguages);

    return { languageOrder, urlMap };
  }, [languages, outputs]);

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {languageOrder.map((languageCode) => {
            const languageLabel = getLanguageLabel(languageCode);
            const availableCount = Array.from({ length: normalizedVariants }).reduce<number>((acc, _, idx) => {
              const key = `${languageCode}:${idx}`;
              const url = urlMap.get(key)?.url;
              return acc + (url ? 1 : 0);
            }, 0);

            return (
              <div
                key={languageCode}
                className="bg-white/90 backdrop-blur border border-ink-200/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-ink-100 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-ink-900 truncate">{languageLabel}</div>
                    <div className="text-[10px] font-mono text-ink-400 mt-0.5">{languageCode}</div>
                  </div>
                  <div className="text-[10px] font-bold bg-ink-50 text-ink-500 px-2 py-1 rounded-md shrink-0">
                    {availableCount} / {normalizedVariants}
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 gap-4">
                  {Array.from({ length: normalizedVariants }).map((_, variantIndex) => {
                    const key = `${languageCode}:${variantIndex}`;
                    const url = urlMap.get(key)?.url ?? null;
                    const isSelected =
                      selected?.language_code === languageCode && selected?.variant_index === variantIndex;

                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={!url}
                        onClick={() => {
                          if (!url) return;
                          onSelect({ languageCode, variantIndex });
                        }}
                        className={`group relative aspect-[4/3] rounded-xl overflow-hidden border transition-all text-left w-full ${isSelected
                          ? "border-ink-900 ring-4 ring-ink-900/10 shadow-lg scale-[1.02]"
                          : url
                            ? "border-ink-200 hover:border-ink-300 hover:shadow-lg hover:scale-[1.01]"
                            : "border-ink-100 bg-ink-50/50"
                          } ${url ? "bg-white" : ""}`}
                        title={url ? `Open ${languageLabel} v${variantIndex + 1}` : "Not generated yet"}
                      >
                        {url ? (
                          <>
                            <img
                              src={url}
                              alt={`${languageLabel} v${variantIndex + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-ink-300">
                            <div className="w-8 h-8 rounded-full bg-ink-100/50 flex items-center justify-center">
                              <ImageIcon size={16} />
                            </div>
                            <span className="text-[10px] font-medium">Pending</span>
                          </div>
                        )}

                        <div className="absolute top-2 left-2 flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${url
                              ? "bg-white/95 backdrop-blur border-white/60 text-ink-800"
                              : "bg-white border-ink-100 text-ink-400 opacity-60"
                              }`}
                          >
                            V{variantIndex + 1}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
