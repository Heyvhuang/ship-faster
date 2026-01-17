import React from 'react';
import { BriefContent } from '../types';
import { AlertTriangle, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';

interface DailyBriefProps {
  content: BriefContent;
  isLoading: boolean;
}

const DailyBrief: React.FC<DailyBriefProps> = ({ content, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-stone-100 rounded-xl p-8 shadow-sm animate-pulse space-y-6">
        <div className="flex justify-between border-b border-stone-100 pb-4">
           <div className="h-3 bg-stone-100 rounded w-24"></div>
           <div className="h-3 bg-stone-100 rounded w-32"></div>
        </div>
        <div className="space-y-3">
           <div className="h-8 bg-stone-200 rounded w-3/4"></div>
           <div className="space-y-2 pt-2">
             <div className="h-4 bg-stone-100 rounded w-full"></div>
             <div className="h-4 bg-stone-100 rounded w-full"></div>
             <div className="h-4 bg-stone-100 rounded w-5/6"></div>
           </div>
        </div>
        <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="h-24 w-full bg-stone-50 rounded-lg border border-stone-100"></div>
            <div className="h-24 w-full bg-stone-50 rounded-lg border border-stone-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden">
      {/* Newspaper Header */}
      <div className="bg-stone-50/50 px-6 py-3 border-b border-stone-100 flex justify-between items-center backdrop-blur-sm">
         <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-stone-400" />
            <span className="text-[10px] font-bold tracking-widest text-stone-500 uppercase">AI Daily Briefing</span>
         </div>
         <span className="text-[10px] text-stone-400 font-serif italic">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}
         </span>
      </div>

      <div className="p-6 space-y-8">
        {/* Headline */}
        <div className="space-y-3">
           <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight">
             {content.headline}
           </h2>
           <p className="text-stone-600 leading-relaxed font-serif text-base border-l-2 border-stone-200 pl-4">
             {content.executiveSummary}
           </p>
        </div>

        {/* Anomaly Section - Only show if relevant or explicitly detected */}
        {content.anomaly.detected && (
          <div className={`rounded-xl p-5 border ${
            content.anomaly.severity === 'high' ? 'bg-red-50/50 border-red-100 text-red-900' : 
            content.anomaly.severity === 'medium' ? 'bg-amber-50/50 border-amber-100 text-amber-900' : 
            'bg-blue-50/50 border-blue-100 text-blue-900'
          } transition-transform hover:scale-[1.01]`}>
             <div className="flex items-start gap-3">
               <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                 content.anomaly.severity === 'high' ? 'text-red-600' : 'text-amber-600'
               }`} />
               <div>
                 <h4 className="font-bold text-xs uppercase tracking-widest mb-1 opacity-90">Anomaly Detected</h4>
                 <p className="text-sm font-medium leading-snug">{content.anomaly.description}</p>
               </div>
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Top Performer */}
           <div className="bg-stone-50/50 p-5 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-stone-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Top Performer</span>
              </div>
              <p className="text-[#1a1a1a] font-serif font-medium text-lg">{content.topPerformer}</p>
           </div>
           
           {/* Action Item */}
           <div className="bg-stone-50/50 p-5 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-stone-500">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Action Item</span>
              </div>
              <p className="text-[#1a1a1a] font-medium text-sm leading-relaxed">{content.actionItem}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DailyBrief;
