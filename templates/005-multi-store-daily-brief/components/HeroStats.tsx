import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface HeroStatsProps {
  totalSales: number;
  salesGrowth: number;
  stores: Array<{
    id: string;
    name: string;
    color: string;
    todaySales: number;
  }>;
}

const COLOR_MAP: Record<string, string> = {
  'bg-blue-500': '#3b82f6',
  'bg-emerald-500': '#10b981',
  'bg-amber-500': '#f59e0b',
  'bg-purple-500': '#8b5cf6',
  'bg-orange-500': '#f97316',
};

const HeroStats: React.FC<HeroStatsProps> = ({ totalSales, salesGrowth, stores }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  // 1. Animated Counter
  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo approximation: 1 - Math.pow(2, -10 * progress) 
      // or the simpler cubic used in prompt: 1 - Math.pow(1 - progress, 3)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(Math.floor(totalSales * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(totalSales); // Ensure final value is exact
      }
    };

    requestAnimationFrame(animate);
    setAnimationStarted(true);
  }, [totalSales]);

  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0; // Start at top (rotated -90deg in CSS)
  
  // Calculate segments
  const segments = stores.map((store) => {
    const percentage = totalSales > 0 ? store.todaySales / totalSales : 0;
    const arcLength = percentage * circumference;
    const dashArray = `${arcLength} ${circumference}`;
    const dashOffset = -currentOffset; // Negative because we want to stack them clockwise
    
    const segment = {
      ...store,
      hexColor: COLOR_MAP[store.color] || '#cbd5e1', // fallback to slate-300
      dashArray,
      dashOffset,
      percentage
    };
    
    currentOffset += arcLength;
    return segment;
  });

  const isPositive = salesGrowth >= 0;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">
            Total Revenue Today
          </p>
          
          <h2 className="text-5xl lg:text-7xl font-serif font-medium text-stone-900 tracking-tight">
            ${displayValue.toLocaleString()}
          </h2>

          <div className={`
            inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
            ${isPositive ? 'bg-green-50 text-green-700 animate-pulse-subtle' : 'bg-red-50 text-red-700'}
          `}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{Math.abs(salesGrowth).toFixed(1)}% vs yesterday</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative w-[180px] h-[180px]">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#f5f5f4" // stone-100
              strokeWidth={strokeWidth}
            />
            
            {/* Segments */}
            {segments.map((segment, index) => (
              <circle
                key={segment.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.hexColor}
                strokeWidth={strokeWidth}
                strokeDasharray={segment.dashArray}
                strokeDashoffset={segment.dashOffset}
                strokeLinecap="butt"
                style={{
                  transition: 'stroke-dashoffset 1s ease-out',
                  transitionDelay: `${index * 100}ms`,
                  opacity: animationStarted ? 1 : 0
                }}
                className={animationStarted ? 'opacity-100' : 'opacity-0'}
              />
            ))}
          </svg>
          
          {/* Inner Circle / Center Text (Optional, keeping clean for now as per design) */}
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {stores.map(store => (
              <div key={store.id} className="flex items-center gap-2">
                 <div className={`w-3 h-3 rounded-full ${store.color}`} />
                 <div className="flex flex-col">
                    <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wide leading-none">{store.name}</span>
                    <span className="text-sm font-serif font-medium text-stone-900">${store.todaySales.toLocaleString()}</span>
                 </div>
              </div>
            ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroStats;
