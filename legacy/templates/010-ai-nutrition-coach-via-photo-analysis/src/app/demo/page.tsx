"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const meals = [
  {
    name: "Spaghetti Bolognese",
    emoji: "🍝",
    confidence: 97,
    totalCarbs: 62,
    level: "medium" as const,
    items: [
      { name: "Spaghetti (180g)", carbs: 48, conf: 98 },
      { name: "Bolognese sauce (120g)", carbs: 10, conf: 95 },
      { name: "Parmesan cheese (15g)", carbs: 4, conf: 93 },
    ],
    insulin: { units: 5.2, ratio: "1:12", iob: 0.8 },
  },
  {
    name: "Chicken Burrito Bowl",
    emoji: "🥗",
    confidence: 94,
    totalCarbs: 78,
    level: "high" as const,
    items: [
      { name: "Brown rice (200g)", carbs: 46, conf: 97 },
      { name: "Black beans (80g)", carbs: 15, conf: 94 },
      { name: "Grilled chicken (120g)", carbs: 0, conf: 98 },
      { name: "Corn salsa (60g)", carbs: 9, conf: 88 },
      { name: "Sour cream (30g)", carbs: 2, conf: 91 },
      { name: "Tortilla chips (20g)", carbs: 6, conf: 85 },
    ],
    insulin: { units: 6.5, ratio: "1:12", iob: 0.0 },
  },
  {
    name: "Avocado Toast & Eggs",
    emoji: "🥑",
    confidence: 96,
    totalCarbs: 28,
    level: "low" as const,
    items: [
      { name: "Sourdough bread (2 slices)", carbs: 24, conf: 97 },
      { name: "Avocado (half)", carbs: 2, conf: 95 },
      { name: "Poached eggs (2)", carbs: 1, conf: 98 },
      { name: "Cherry tomatoes (40g)", carbs: 1, conf: 93 },
    ],
    insulin: { units: 2.3, ratio: "1:12", iob: 0.0 },
  },
];

const levelColors = {
  low: { bar: "bg-green-500", text: "text-green-600", label: "Low" },
  medium: { bar: "bg-yellow-500", text: "text-yellow-600", label: "Medium" },
  high: { bar: "bg-red-500", text: "text-red-600", label: "High" },
};

export default function DemoPage() {
  const [selected, setSelected] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(true);

  const meal = meals[selected];
  const lc = levelColors[meal.level];

  function handleScan(idx: number) {
    setSelected(idx);
    setScanned(false);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-24 pb-16 md:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black text-center mb-2">
            Try CarbCoach
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Select a meal below to see how our AI breaks it down instantly.
          </p>

          {/* Meal selector */}
          <div className="flex justify-center gap-4 mb-10">
            {meals.map((m, i) => (
              <button
                key={m.name}
                onClick={() => handleScan(i)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[100px] ${
                  selected === i ? "border-black bg-gray-50" : "border-gray-100 hover:border-gray-300"
                }`}
              >
                <span className="text-4xl">{m.emoji}</span>
                <span className="text-xs font-medium text-gray-600 text-center leading-tight">{m.name}</span>
              </button>
            ))}
          </div>

          {/* Result card */}
          <div className="max-w-md mx-auto">
            <div className="bg-gray-950 rounded-[2.5rem] p-3 shadow-2xl">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-xs text-gray-500 font-medium">
                  <span>9:41</span>
                  <span>CarbCoach</span>
                  <span>100%</span>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center">
                  <div className="text-7xl mb-2">{meal.emoji}</div>
                  {scanning ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Analyzing meal...
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">{meal.name} detected</p>
                  )}
                </div>

                {scanned && !scanning && (
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-black">Total Carbs</span>
                      <span className="text-2xl font-extrabold text-black">{meal.totalCarbs}g</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${lc.bar} rounded-full transition-all duration-700`} style={{ width: `${Math.min(meal.totalCarbs, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span className={meal.level === "low" ? "font-bold text-green-600" : ""}>Low</span>
                      <span className={meal.level === "medium" ? "font-bold text-yellow-600" : ""}>Medium</span>
                      <span className={meal.level === "high" ? "font-bold text-red-600" : ""}>High</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                      {meal.items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{item.carbs}g</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${item.conf >= 90 ? "bg-green-500" : "bg-yellow-500"}`}>
                              {item.conf}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                      <p className="text-xs text-green-700 font-medium">Suggested Insulin</p>
                      <p className="text-xl font-extrabold text-green-700">{meal.insulin.units} units</p>
                      <p className="text-xs text-green-600">Based on {meal.insulin.ratio} ratio &middot; {meal.insulin.iob}u IOB</p>
                    </div>

                    <div className="text-center">
                      <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                        {meal.confidence}% confidence
                      </span>
                    </div>

                    <button className="w-full mt-2 bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors text-sm">
                      Confirm &amp; Log Meal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
