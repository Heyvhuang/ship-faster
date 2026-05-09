"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    q: "How would you describe your idea stage?",
    options: [
      "Just a concept — haven't talked to anyone yet",
      "I've talked to a few people informally",
      "I've done some customer interviews",
      "I have early traction or a prototype",
    ],
  },
  {
    q: "Do you know who your direct competitors are?",
    options: [
      "No, I haven't researched competitors",
      "I know a couple but haven't studied them",
      "I have a decent competitive landscape",
      "I've done deep competitor analysis",
    ],
  },
  {
    q: "What's your biggest uncertainty right now?",
    options: [
      "Is there real demand for this?",
      "Can I differentiate from competitors?",
      "Is the market big enough?",
      "Am I targeting the right users?",
    ],
  },
  {
    q: "What's your timeline for launching?",
    options: [
      "Still exploring — no rush",
      "Want to launch within 3 months",
      "Planning to launch within 1 month",
      "Already launched, need to validate pivot",
    ],
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (idx: number) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const score = answers.reduce((a, b) => a + b, 0);
  const recommended = score <= 4 ? "Full" : score <= 6 ? "Full" : "Basic";
  const recommendedPrice = recommended === "Full" ? "$197" : "$97";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg text-slate-900">Radar</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {!done ? (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-slate-500">
                  Question {current + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              {questions[current].q}
            </h1>
            <div className="space-y-3">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-slate-700 font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Assessment Complete</h1>
            <p className="text-lg text-slate-600 mb-8">
              Based on your answers, we recommend the <strong className="text-blue-600">{recommended} Validation</strong> ({recommendedPrice}) to address your biggest gaps.
            </p>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8 text-left">
              <h3 className="font-semibold text-slate-900 mb-4">Your validation will include:</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Market size analysis with sourced data
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Deep competitor landscape mapping
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Red flags and risk analysis
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Go/No-Go recommendation
                </li>
                {recommended === "Full" && (
                  <>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      Revenue model assessment
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      Detailed next-steps roadmap
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition"
              >
                Get {recommended} Validation — {recommendedPrice}
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                See All Plans
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
