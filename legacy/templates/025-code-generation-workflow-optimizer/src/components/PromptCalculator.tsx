"use client";
import { useState } from "react";

const MINUTES_WASTED_PER_DEV = 31;
const HOURLY_RATE_DEFAULT = 75;
const OPTIMIZATION_FACTOR = 0.4;

export default function PromptCalculator() {
  const [devs, setDevs] = useState(5);
  const [rate, setRate] = useState(HOURLY_RATE_DEFAULT);

  const dailyMinutesSaved = devs * MINUTES_WASTED_PER_DEV * OPTIMIZATION_FACTOR;
  const weeklyHoursSaved = (dailyMinutesSaved * 5) / 60;
  const monthlyCost = (weeklyHoursSaved * rate * 4.33);

  return (
    <div className="bg-card border border-card-border rounded-xl p-6 sm:p-8">
      <h3 className="font-semibold text-lg mb-1">Prompt Waste Calculator</h3>
      <p className="text-sm text-muted mb-6">
        See how much time and money your team loses to inefficient AI prompts.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <label className="block">
          <span className="text-sm text-muted mb-1.5 block">Developers on your team</span>
          <input
            type="range"
            min={1}
            max={50}
            value={devs}
            onChange={(e) => setDevs(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <span className="text-2xl font-bold mt-1 block">{devs}</span>
        </label>
        <label className="block">
          <span className="text-sm text-muted mb-1.5 block">Avg hourly cost per dev ($)</span>
          <input
            type="range"
            min={30}
            max={200}
            step={5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <span className="text-2xl font-bold mt-1 block">${rate}</span>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-card-border">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-yellow">
            {Math.round(dailyMinutesSaved)} min
          </div>
          <div className="text-xs text-muted mt-1">Wasted daily</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-green">
            {weeklyHoursSaved.toFixed(1)} hrs
          </div>
          <div className="text-xs text-muted mt-1">Recoverable weekly</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-accent">
            ${Math.round(monthlyCost).toLocaleString()}
          </div>
          <div className="text-xs text-muted mt-1">Monthly savings</div>
        </div>
      </div>
    </div>
  );
}
