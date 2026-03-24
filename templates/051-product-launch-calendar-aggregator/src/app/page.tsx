"use client";

import { useState, useMemo } from "react";
import {
  launches,
  categories,
  getCategoryColor,
  getLaunchesByMonth,
  getUpcomingLaunches,
  type Launch,
  type Category,
} from "@/data/launches";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay();
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Home() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const monthLaunches = useMemo(() => {
    let items = getLaunchesByMonth(year, month);
    if (selectedCategory) items = items.filter((l) => l.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.tagline.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [year, month, selectedCategory, search]);

  const upcoming = useMemo(() => getUpcomingLaunches("2026-03-20", 8), []);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
  }
  function nextMonth() {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
  }

  function launchesForDay(day: number): Launch[] {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return monthLaunches.filter((l) => l.date === dateStr);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-blue-600">📡 LaunchRadar</span>
          </div>
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search launches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSubmit(true)}
              className="hidden sm:inline-flex text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Launch
            </button>
          </div>
        </div>
        {/* Category filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              !selectedCategory ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Main calendar */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              ← Prev
            </button>
            <h2 className="text-lg font-semibold font-mono">
              {monthNames[month - 1]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              Next →
            </button>
          </div>

          {/* Calendar grid */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {dayLabels.map((d) => (
                <div key={d} className="py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>
            {/* Day cells */}
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="border-b border-r border-gray-100 bg-gray-50/50 min-h-[80px] sm:min-h-[100px]" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const dayLaunches = launchesForDay(day);
                const isToday = year === 2026 && month === 3 && day === 24;
                return (
                  <div
                    key={day}
                    className={`border-b border-r border-gray-100 min-h-[80px] sm:min-h-[100px] p-1 sm:p-1.5 ${
                      isToday ? "bg-blue-50/60" : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs sm:text-sm inline-flex items-center justify-center w-6 h-6 rounded-full ${
                        isToday ? "bg-blue-600 text-white" : "text-gray-700"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      {dayLaunches.slice(0, 3).map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setSelectedLaunch(l)}
                          className={`w-full text-left text-[10px] sm:text-xs px-1 py-0.5 rounded truncate ${getCategoryColor(l.category)} hover:opacity-80 transition-opacity`}
                        >
                          {l.logo} {l.name}
                        </button>
                      ))}
                      {dayLaunches.length > 3 && (
                        <span className="text-[10px] text-gray-400 pl-1">+{dayLaunches.length - 3} more</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
            <span>{monthLaunches.length} launches this month</span>
            <span>·</span>
            <span>{launches.length} total tracked</span>
            <span>·</span>
            <span>4 platforms</span>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Upcoming Launches</h3>
          <div className="space-y-3">
            {upcoming.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLaunch(l)}
                className="w-full text-left group"
              >
                <div className="flex items-start gap-2.5 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xl mt-0.5">{l.logo}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {l.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{l.tagline}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[10px] text-gray-400">{l.date}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getCategoryColor(l.category)}`}>
                        {l.category}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Subscribe section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Get launch alerts</h4>
            <p className="text-xs text-gray-600 mb-3">
              Get notified when launches match your interests.
            </p>
            {subscribed ? (
              <p className="text-xs text-green-700 font-medium">You&apos;re subscribed! Check your inbox.</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="flex-1 min-w-0 px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Export */}
          <div className="mt-4">
            <button className="w-full text-xs text-center py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Export to Google Calendar / iCal
            </button>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>LaunchRadar — Track every product launch in one place.</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSubmit(true)} className="hover:text-gray-900 transition-colors">
              Submit a Launch
            </button>
            <span>·</span>
            <span>Built with data from Product Hunt, BetaList, HN & more</span>
          </div>
        </div>
      </footer>

      {/* Launch detail modal */}
      {selectedLaunch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedLaunch(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLaunch(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedLaunch.logo}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedLaunch.name}</h3>
                <p className="text-sm text-gray-500">{selectedLaunch.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{selectedLaunch.description}</p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(selectedLaunch.category)}`}>
                {selectedLaunch.category}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {selectedLaunch.platform}
              </span>
              <span className="font-mono text-xs text-gray-400">{selectedLaunch.date}</span>
              {selectedLaunch.upvotes && (
                <span className="text-xs text-gray-500">▲ {selectedLaunch.upvotes}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View on {selectedLaunch.platform}
              </button>
              <button className="py-2 px-4 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit launch modal */}
      {showSubmit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => { setShowSubmit(false); setSubmitted(false); }}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowSubmit(false); setSubmitted(false); }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Submit a Launch</h3>
            <p className="text-sm text-gray-500 mb-4">Know about an upcoming product launch? Add it to the calendar.</p>
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">🎉</p>
                <p className="text-sm font-medium text-gray-900">Launch submitted!</p>
                <p className="text-xs text-gray-500 mt-1">We&apos;ll review and add it within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
                <input
                  required
                  placeholder="Product name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  required
                  placeholder="Tagline"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  required
                  placeholder="Description"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    required
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input
                    required
                    type="date"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="url"
                  placeholder="Website URL (optional)"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Launch
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
