import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onGoHome?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onGoHome }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-200">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div 
            className={`flex items-center gap-2 ${onGoHome ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={onGoHome}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (onGoHome && (e.key === 'Enter' || e.key === ' ')) {
                onGoHome();
              }
            }}
          >
            <div className="bg-slate-900 text-white p-1 rounded-sm">
              <Layers size={16} />
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">MarginLedger</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
             <span className="hidden sm:inline-flex items-center gap-1"><ShieldCheck size={12}/> Auditable Calculation</span>
             <span>v1.0.5</span>
          </div>
        </div>
      </nav>
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
};
