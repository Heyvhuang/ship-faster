"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/Button";
import { ArrowRight, Layers, RefreshCcw, Image as ImageIcon } from "lucide-react";

const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updatePosition(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 2));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 2));
    }
  };

  return (
    <div
      className="relative w-full max-w-4xl aspect-[2/1] rounded-xl overflow-hidden cursor-ew-resize shadow-2xl border border-ink-200 mb-12 select-none ring-4 ring-ink-50"
      ref={containerRef}
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Compare before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
    >
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium rounded-full border border-ink-200 text-ink-700 shadow-sm">
        Drag to compare
      </div>
      <div className="absolute inset-0 bg-ink-100 flex items-center justify-center overflow-hidden select-none">
        <img
          src="/image/Example-ES.jpg"
          alt="Spanish version"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 text-white">
          After: Spanish
        </div>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src="/image/Example-EN.png"
          alt="English version"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-4 left-4 bg-ink-900/10 backdrop-blur-md px-3 py-1.5 text-xs font-medium rounded-full border border-ink-900/10 text-ink-900">
          Before: English
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      />

      <div
        className="absolute top-0 bottom-0 w-8 -ml-4 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-ink-100 transform active:scale-95 transition-transform">
          <ArrowRight size={16} className="text-ink-900" />
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center min-h-[85vh] text-center pt-24 pb-12 bg-grid-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper to-paper pointer-events-none"></div>

        <div className="relative z-10 px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs font-mono font-medium text-ink-600 mb-8 border border-ink-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            CopyBack Studio - Beta
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink-900 mb-8 max-w-4xl leading-[1.1]">
            Localize banners <br className="hidden md:block" />
            without rebuilding designs.
          </h1>

          <p className="text-xl md:text-2xl text-ink-600 max-w-2xl mb-12 leading-relaxed">
            Upload a banner. We extract editable text blocks, translate them, and{" "}
            <span className="text-ink-900 font-semibold underline decoration-accent/30 decoration-2 underline-offset-4">
              generate downloadable proofs
            </span>{" "}
            you can QA in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-24 w-full justify-center">
            <Link href="/studio">
              <Button size="lg" className="h-14 px-8 text-lg shadow-lg shadow-ink-900/10">
                Start in Studio <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg bg-white/80 backdrop-blur"
              >
                Documentation
              </Button>
            </Link>
          </div>

          <ComparisonSlider />

          <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl border-t border-ink-200 pt-16">
            <div className="group">
              <div className="w-10 h-10 bg-white rounded-lg border border-ink-200 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Layers size={20} className="text-ink-900" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-ink-900">1. Extract Blocks</h3>
              <p className="text-base text-ink-600 leading-relaxed">
                Automatically detects text regions and builds an editable copy table from flat JPG/PNG assets.
              </p>
            </div>
            <div className="group">
              <div className="w-10 h-10 bg-white rounded-lg border border-ink-200 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <RefreshCcw size={20} className="text-ink-900" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-ink-900">2. Translate & Fit</h3>
              <p className="text-base text-ink-600 leading-relaxed">
                Translate per language, review length fit, and iterate quickly before generating final visuals.
              </p>
            </div>
            <div className="group">
              <div className="w-10 h-10 bg-white rounded-lg border border-ink-200 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ImageIcon size={20} className="text-ink-900" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-ink-900">3. Render & Export</h3>
              <p className="text-base text-ink-600 leading-relaxed">
                Generate proof images and download results, ready to share with design, QA, or localization teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
