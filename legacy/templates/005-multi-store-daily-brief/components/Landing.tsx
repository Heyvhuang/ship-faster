import React from 'react';
import { ArrowRight, BarChart3, Mail, Layers } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf7] text-[#1a1a1a] p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200 opacity-20" />
      
      <div className="max-w-4xl w-full space-y-12 text-center relative z-10 animate-fade-in-up">
        
        <div className="space-y-6">
          <div className="flex justify-center">
             <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#1a1a1a] rounded-xl flex items-center justify-center shadow-2xl shadow-stone-300">
                <Layers className="text-[#fdfbf7] w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />
             </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#1a1a1a] leading-[1.1]">
            Stop switching accounts.
          </h1>
          <p className="text-xl lg:text-2xl text-stone-500 leading-relaxed font-sans max-w-xl mx-auto">
            The morning brief for multi-store owners. Sales, orders, and anomalies—aggregated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 text-left">
          <div className="group bg-white border border-stone-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Mail className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a]">Daily Email Brief</h3>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              No dashboard login required. Wake up to a single concise email covering all your brands.
            </p>
          </div>
          
          <div className="group bg-white border border-stone-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
             <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                <BarChart3 className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a]">Anomaly Detection</h3>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              We spot drops instantly. "North Shore is down 30%" shouldn't be a surprise next week.
            </p>
          </div>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          <button 
            onClick={onStart}
            className="w-full group relative flex items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-stone-800 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <span className="font-semibold tracking-wide">See a Sample Brief</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-stone-400 font-medium tracking-wide uppercase">No credit card required • Works with Shopify</p>
        </div>

        <div className="pt-8 border-t border-stone-200/60">
            <p className="text-stone-400 font-serif italic text-lg lg:text-xl">"Finally, I don't have to check 5 tabs before coffee."</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
