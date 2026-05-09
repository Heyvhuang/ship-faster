"use client";

import { useState } from "react";
import Link from "next/link";

const modules = [
  {
    num: "01",
    title: "Foundations of Agentic AI Development",
    lessons: [
      { title: "What is the Superpowers Methodology?", duration: "12:30", free: true },
      { title: "Core Principles & Mental Models", duration: "10:15", free: false },
      { title: "When to Use Agentic vs Traditional Dev", duration: "8:45", free: false },
      { title: "Setting Expectations for Your Team", duration: "13:20", free: false },
    ],
  },
  {
    num: "02",
    title: "Setting Up Your Agentic Environment",
    lessons: [
      { title: "Tool Installation & Configuration", duration: "9:40", free: false },
      { title: "Project Scaffolding for Agentic Workflows", duration: "11:20", free: false },
      { title: "IDE Integration & Shortcuts", duration: "7:55", free: false },
      { title: "Your First Agentic Task (Hands-on)", duration: "14:30", free: false },
    ],
  },
  {
    num: "03",
    title: "Prompt Architecture & Context Design",
    lessons: [
      { title: "Prompts as Composable Building Blocks", duration: "13:10", free: false },
      { title: "Context Window Management", duration: "10:50", free: false },
      { title: "System Prompts vs Task Prompts", duration: "9:25", free: false },
      { title: "Building a Prompt Library", duration: "11:45", free: false },
    ],
  },
  {
    num: "04",
    title: "Multi-Agent Orchestration Patterns",
    lessons: [
      { title: "Agent Delegation Fundamentals", duration: "12:00", free: false },
      { title: "Review & Feedback Loops", duration: "14:20", free: false },
      { title: "Parallel vs Sequential Agents", duration: "10:35", free: false },
      { title: "Error Recovery Patterns", duration: "11:10", free: false },
    ],
  },
  {
    num: "05",
    title: "Testing & Validation for AI Workflows",
    lessons: [
      { title: "Validation Strategies Overview", duration: "8:50", free: false },
      { title: "Regression Testing for Agentic Output", duration: "12:40", free: false },
      { title: "Human-in-the-Loop Patterns", duration: "10:15", free: false },
      { title: "Building Confidence in AI Output", duration: "9:30", free: false },
    ],
  },
  {
    num: "06",
    title: "Team Adoption Playbook",
    lessons: [
      { title: "Change Management for Engineering Teams", duration: "11:20", free: false },
      { title: "Measuring Productivity Gains", duration: "9:45", free: false },
      { title: "Handling Resistance & Skepticism", duration: "10:30", free: false },
      { title: "Building Internal Champions", duration: "8:55", free: false },
    ],
  },
  {
    num: "07",
    title: "Advanced Patterns & Real-World Case Studies",
    lessons: [
      { title: "Case Study: Scaling at a Series B Startup", duration: "15:20", free: false },
      { title: "Case Study: Enterprise Migration", duration: "13:45", free: false },
      { title: "Emerging Patterns & Future Direction", duration: "11:30", free: false },
      { title: "Building Your Team's Playbook", duration: "10:10", free: false },
    ],
  },
];

export default function CoursePage() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);

  const currentModule = modules[activeModule];
  const currentLesson = currentModule.lessons[activeLesson];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-mono text-sm font-bold tracking-wider text-violet-400">
            superpowers<span className="text-zinc-500">.dev</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-zinc-500 sm:block">4 of 28 lessons completed</span>
            <div className="h-2 w-24 rounded-full bg-zinc-800">
              <div className="h-2 w-[14%] rounded-full bg-violet-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl lg:flex">
        {/* Sidebar */}
        <aside className="w-full border-b border-zinc-800 lg:w-80 lg:border-b-0 lg:border-r lg:min-h-[calc(100vh-53px)]">
          <div className="max-h-[40vh] overflow-y-auto lg:max-h-[calc(100vh-53px)] lg:sticky lg:top-[53px]">
            {modules.map((mod, mi) => (
              <div key={mod.num}>
                <button
                  onClick={() => { setActiveModule(mi); setActiveLesson(0); }}
                  className={`flex w-full items-center gap-3 border-b border-zinc-800/50 px-4 py-3 text-left text-sm transition ${
                    activeModule === mi ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                  }`}
                >
                  <span className="font-mono text-xs text-violet-400">{mod.num}</span>
                  <span className="flex-1 truncate font-medium">{mod.title}</span>
                </button>
                {activeModule === mi && (
                  <div className="bg-zinc-900/30">
                    {mod.lessons.map((lesson, li) => (
                      <button
                        key={li}
                        onClick={() => setActiveLesson(li)}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 pl-12 text-left text-xs transition ${
                          activeLesson === li
                            ? "bg-violet-500/10 text-violet-300"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <span className="flex-1 truncate">{lesson.title}</span>
                        <span className="shrink-0 text-zinc-600">{lesson.duration}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 lg:px-12 lg:py-12">
          {/* Video Player Placeholder */}
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/20 text-violet-400">
                <svg className="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-300">{currentLesson.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{currentLesson.duration}</p>
              </div>
              {!currentLesson.free && (
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                  Enrolled access only
                </span>
              )}
            </div>
          </div>

          {/* Lesson Info */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-xs text-violet-400">
                Module {currentModule.num}
              </span>
              <span className="text-zinc-700">·</span>
              <span className="text-xs text-zinc-500">
                Lesson {activeLesson + 1} of {currentModule.lessons.length}
              </span>
            </div>
            <h1 className="mb-2 text-2xl font-bold">{currentLesson.title}</h1>
            <p className="text-sm text-zinc-400">
              Part of the &ldquo;{currentModule.title}&rdquo; module. Watch the video above,
              then download the companion materials below.
            </p>
          </div>

          {/* Downloads */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {[
              { name: "Lesson Slides (PDF)", size: "2.4 MB" },
              { name: "Workflow Diagram", size: "340 KB" },
            ].map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-zinc-500">{file.size}</p>
                  </div>
                </div>
                <button className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition">
                  Download
                </button>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
            <button
              onClick={() => {
                if (activeLesson > 0) setActiveLesson(activeLesson - 1);
                else if (activeModule > 0) {
                  setActiveModule(activeModule - 1);
                  setActiveLesson(modules[activeModule - 1].lessons.length - 1);
                }
              }}
              disabled={activeModule === 0 && activeLesson === 0}
              className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-700 hover:text-white transition disabled:opacity-30"
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                if (activeLesson < currentModule.lessons.length - 1) setActiveLesson(activeLesson + 1);
                else if (activeModule < modules.length - 1) {
                  setActiveModule(activeModule + 1);
                  setActiveLesson(0);
                }
              }}
              disabled={activeModule === modules.length - 1 && activeLesson === currentModule.lessons.length - 1}
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition disabled:opacity-30"
            >
              Next Lesson →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
