import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { CustomerMetric } from '../types';

interface ProfitHeatmapProps {
  customers: CustomerMetric[];
  targetMargin: number;
  onCustomerSelect?: (customer: CustomerMetric) => void;
}

interface TreemapData {
  name: string;
  size: number;
  marginPercent: number;
  plan: string;
  revenue: number;
  cost: number;
  margin: number;
  status: string;
  original: CustomerMetric;
  [key: string]: any;
}

const getMarginColor = (marginPercent: number, target: number) => {
  if (marginPercent < 0) return '#DC2626';
  if (marginPercent < target) return '#D97706';
  return '#059669';
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as TreemapData;
    
    return (
      <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xl text-sm z-50">
        <p className="font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">{data.name}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span className="text-slate-500">Plan:</span>
          <span className="font-medium text-slate-900">{data.plan}</span>
          
          <span className="text-slate-500">Revenue:</span>
          <span className="font-mono text-slate-700">${data.revenue?.toLocaleString()}</span>
          
          <span className="text-slate-500">Cost:</span>
          <span className="font-mono text-slate-700">${data.cost?.toLocaleString()}</span>
          
          <span className="text-slate-500">Margin:</span>
          <span className={`font-mono font-bold ${data.margin >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${data.margin?.toLocaleString()}
          </span>
          
          <span className="text-slate-500">Margin %:</span>
          <span className={`font-mono font-bold ${
            data.marginPercent < 0 ? 'text-red-600' : 
            data.marginPercent < 20 ? 'text-amber-600' : 'text-emerald-600'
          }`}>
            {data.marginPercent?.toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomizedContent = (props: any) => {
  const { x, y, width, height, name, marginPercent, targetMargin, status } = props;

  if (width < 4 || height < 4) return null;

  const color = getMarginColor(marginPercent || 0, targetMargin || 20);
  const isDanger = (marginPercent || 0) < 0;
  
  const showName = width > 60 && height > 35;
  const showPercent = width > 60 && height > 55;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#fff',
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${isDanger ? 'animate-pulse' : ''}`}
        rx={3}
        ry={3}
      />
      {showName && (
        <text
          x={x + width / 2}
          y={y + height / 2 - (showPercent ? 8 : 0)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={Math.min(12, width / 8)}
          fontWeight="600"
          className="pointer-events-none select-none"
        >
          {name?.length > 12 ? name.substring(0, 10) + '...' : name}
        </text>
      )}
      {showPercent && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize={Math.min(11, width / 9)}
          fontWeight="500"
          className="pointer-events-none select-none"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {marginPercent?.toFixed(1)}%
        </text>
      )}
    </g>
  );
};

export const ProfitHeatmap: React.FC<ProfitHeatmapProps> = ({ customers, targetMargin, onCustomerSelect }) => {
  const data: TreemapData[] = customers
    .filter(c => c.revenue > 0)
    .map(c => ({
      name: c.name,
      size: c.revenue,
      marginPercent: c.marginPercent,
      plan: c.plan,
      revenue: c.revenue,
      cost: c.cost,
      margin: c.margin,
      status: c.status,
      original: c,
      targetMargin: targetMargin,
    }));

  return (
    <div className="w-full h-[420px] bg-slate-50 rounded-lg border border-slate-200 overflow-hidden relative">
      <div className="absolute top-3 right-3 z-10 flex gap-3 text-xs font-medium bg-white/95 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span className="text-slate-600">Profit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-600">Warning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span className="text-slate-600">Danger</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          animationDuration={800}
          animationEasing="ease-out"
          content={<CustomizedContent targetMargin={targetMargin} />}
        >
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 100 }} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};
