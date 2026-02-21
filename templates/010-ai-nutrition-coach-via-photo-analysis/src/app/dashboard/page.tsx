"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const todayMeals = [
  { time: "8:15 AM", name: "Avocado Toast & Eggs", emoji: "🥑", carbs: 28, insulin: 2.3, glucose: 112 },
  { time: "12:30 PM", name: "Chicken Burrito Bowl", emoji: "🥗", carbs: 78, insulin: 6.5, glucose: 145 },
  { time: "3:00 PM", name: "Apple & Peanut Butter", emoji: "🍎", carbs: 22, insulin: 1.8, glucose: 128 },
  { time: "7:00 PM", name: "Spaghetti Bolognese", emoji: "🍝", carbs: 62, insulin: 5.2, glucose: null },
];

const weekData = [
  { day: "Mon", carbs: 185, avg: 132 },
  { day: "Tue", carbs: 210, avg: 141 },
  { day: "Wed", carbs: 165, avg: 118 },
  { day: "Thu", carbs: 195, avg: 127 },
  { day: "Fri", carbs: 220, avg: 148 },
  { day: "Sat", carbs: 178, avg: 122 },
  { day: "Sun", carbs: 190, avg: 130 },
];

export default function DashboardPage() {
  const totalCarbs = todayMeals.reduce((s, m) => s + m.carbs, 0);
  const totalInsulin = todayMeals.reduce((s, m) => s + m.insulin, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="pt-24 pb-16 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-black">Dashboard</h1>
              <p className="text-gray-500 text-sm">Today, February 21, 2026</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">M</div>
              <div>
                <p className="text-sm font-semibold text-black">Marcus J.</p>
                <p className="text-xs text-gray-400">Type 1 &middot; Ratio 1:12</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Carbs", value: `${totalCarbs}g`, sub: "4 meals logged", color: "bg-white" },
              { label: "Total Insulin", value: `${totalInsulin.toFixed(1)}u`, sub: "Suggested doses", color: "bg-white" },
              { label: "Avg Glucose", value: "128 mg/dL", sub: "In range", color: "bg-green-50" },
              { label: "Time in Range", value: "82%", sub: "Target 70-180", color: "bg-green-50" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-2xl p-5 border border-gray-100`}>
                <p className="text-xs text-gray-400 font-medium mb-1">{s.label}</p>
                <p className="text-2xl font-extrabold text-black">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Meal log */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-black mb-4">Today&apos;s Meals</h2>
                <div className="space-y-4">
                  {todayMeals.map((m) => (
                    <div key={m.time} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="text-3xl">{m.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-black text-sm">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black text-sm">{m.carbs}g carbs</p>
                        <p className="text-xs text-gray-400">{m.insulin}u insulin</p>
                      </div>
                      {m.glucose && (
                        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${m.glucose <= 140 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {m.glucose} mg/dL
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-6">
                <h2 className="font-bold text-black mb-4">Weekly Overview</h2>
                <div className="flex items-end justify-between gap-2 h-40">
                  {weekData.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center gap-1" style={{ height: 120 }}>
                        <div
                          className="w-full max-w-[32px] bg-black rounded-t-lg"
                          style={{ height: `${(d.carbs / 250) * 100}%` }}
                          title={`${d.carbs}g carbs`}
                        />
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{d.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-black rounded-sm" /> Daily Carbs</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-black mb-4">CGM Status</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-700">Connected — Dexcom G7</span>
                </div>
                <div className="text-center py-4">
                  <p className="text-4xl font-extrabold text-black">128</p>
                  <p className="text-sm text-gray-400">mg/dL current</p>
                  <p className="text-xs text-green-600 font-medium mt-1">→ Stable</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-black mb-4">Insulin on Board</h2>
                <div className="text-center py-2">
                  <p className="text-3xl font-extrabold text-black">2.4u</p>
                  <p className="text-xs text-gray-400 mt-1">Active from last dose</p>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Estimated 1h 45m remaining</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-black mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <button className="w-full bg-black text-white font-semibold py-3 rounded-xl text-sm hover:bg-gray-800 transition-colors">
                    📸 Scan New Meal
                  </button>
                  <button className="w-full bg-gray-100 text-black font-semibold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors">
                    📊 Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
