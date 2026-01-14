"use client";

import React from "react";
import { Upload, Layers, Languages, Download, Check } from "lucide-react";

interface StepperProps {
    currentStep: number; // 0: Upload, 1: Extract, 2: Translate, 3: Export
}

const steps = [
    { label: "Upload", icon: Upload },
    { label: "Extract", icon: Layers },
    { label: "Translate", icon: Languages },
    { label: "Export", icon: Download },
];

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
    return (
        <div className="w-full max-w-3xl mx-auto mb-8">
            <div className="relative flex justify-between">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-ink-200 -z-10 transform -translate-y-1/2 rounded-full" />

                {/* Progress Line */}
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-accent -z-10 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center group">
                            <div
                                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10
                  ${isCompleted
                                        ? "bg-accent border-accent text-white scale-100"
                                        : isCurrent
                                            ? "bg-white border-accent text-accent shadow-[0_0_0_4px_rgba(37,99,235,0.2)] scale-110"
                                            : "bg-white border-ink-200 text-ink-300"
                                    }
                `}
                            >
                                {isCompleted ? (
                                    <Check size={18} strokeWidth={3} />
                                ) : (
                                    <Icon size={18} />
                                )}
                            </div>
                            <span
                                className={`
                  mt-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 absolute top-10
                  ${isCurrent ? "text-ink-900" : isCompleted ? "text-ink-600" : "text-ink-300"}
                `}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
