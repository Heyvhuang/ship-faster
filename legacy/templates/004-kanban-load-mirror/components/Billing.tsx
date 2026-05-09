import React from 'react';
import { Zap, Check, X, Sparkles, Share2, Clock, TrendingUp } from 'lucide-react';

interface BillingProps {
  onClose: () => void;
}

export const Billing: React.FC<BillingProps> = ({ onClose }) => {
  const features = [
    { icon: Share2, text: 'Shareable read-only links', highlight: true },
    { icon: Clock, text: 'Save column mappings & configs', highlight: false },
    { icon: TrendingUp, text: 'Historical trend analysis', highlight: false },
    { icon: Sparkles, text: 'AI-powered weekly summaries', highlight: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#12121a] rounded-2xl max-w-md w-full overflow-hidden relative animate-slide-up"
        style={{
          boxShadow: '0 0 0 1px rgba(0, 240, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00f0ff]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#ff00aa]/20 rounded-full blur-3xl"></div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#1a1a24] flex items-center justify-center text-[#5a5a70] hover:text-[#f0f0f5] hover:bg-[#22222e] transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-[#ff00aa]/20 flex items-center justify-center mx-auto glow-cyan">
            <Zap className="w-8 h-8 text-[#00f0ff]" />
          </div>
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-[#f0f0f5]">
              Unlock <span className="text-[#00f0ff] text-glow-cyan">Pro Mirror</span>
            </h2>
            <p className="text-[#8888a0] text-sm leading-relaxed">
              Take your workload analysis to the next level with advanced features and team collaboration.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {features.map((feature, i) => (
              <div 
                key={i}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                  feature.highlight 
                    ? 'bg-[#00f0ff]/5 border border-[#00f0ff]/20' 
                    : 'bg-[#1a1a24]/50'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  feature.highlight ? 'bg-[#00f0ff]/20' : 'bg-[#1a1a24]'
                }`}>
                  <feature.icon className={`w-3.5 h-3.5 ${
                    feature.highlight ? 'text-[#00f0ff]' : 'text-[#a0ff00]'
                  }`} />
                </div>
                <span className={`text-sm ${
                  feature.highlight ? 'text-[#f0f0f5] font-medium' : 'text-[#8888a0]'
                }`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <button className="w-full py-4 bg-[#00f0ff] text-[#0a0a0f] font-bold rounded-xl hover:bg-[#00f0ff]/90 transition-all glow-cyan pulse-glow flex items-center justify-center space-x-2">
              <span>Upgrade for</span>
              <span className="text-xl">$12</span>
              <span>/month</span>
            </button>
            
            <button 
              onClick={onClose} 
              className="w-full py-3 text-[#5a5a70] text-sm hover:text-[#8888a0] transition-colors"
            >
              Continue with free preview
            </button>
          </div>
        </div>

        <div className="bg-[#0a0a0f] px-8 py-4 border-t border-white/5">
          <p className="text-[10px] text-[#5a5a70] text-center">
            Cancel anytime · No credit card required for trial
          </p>
        </div>
      </div>
    </div>
  );
};
