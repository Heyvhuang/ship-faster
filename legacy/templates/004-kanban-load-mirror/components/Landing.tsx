import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Clock, Sparkles } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#00f0ff', '#ff00aa', '#a0ff00', '#ffaa00'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    });

    const init = () => {
      resize();
      particles = Array.from({ length: 80 }, createParticle);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.alpha * 0.3;
        ctx.fill();
      });

      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 0.5;
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="max-w-5xl w-full space-y-16 relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[#12121a] border border-white/10 text-xs font-medium text-[#8888a0] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>AI-Powered Analysis</span>
            <span className="w-1 h-1 rounded-full bg-[#00f0ff]"></span>
            <span className="text-[#00f0ff]">Beta</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-[#f0f0f5]">The 5-Minute</span>
            <br />
            <span className="text-[#00f0ff] text-glow-cyan">Workload Mirror</span>
          </h1>
          
          <p className="text-xl text-[#8888a0] max-w-2xl mx-auto leading-relaxed">
            Transform your messy Jira/Trello/Linear export into a 
            <span className="text-[#f0f0f5]"> composed, meeting-ready snapshot</span>. 
            Detect bottlenecks, aging cards, and risks in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <div className="bg-[#12121a]/60 p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff00aa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a24] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#ff00aa]" />
                </div>
                <div>
                  <span className="font-mono text-sm text-[#ff00aa]">BEFORE</span>
                  <p className="text-[#5a5a70] text-sm">50 min manual prep</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-[#1a1a24] rounded-full w-4/5"></div>
                <div className="h-3 bg-[#1a1a24] rounded-full w-3/5"></div>
                <div className="h-3 bg-[#1a1a24] rounded-full w-2/3"></div>
                <div className="mt-6 h-32 bg-[#0a0a0f] rounded-xl border border-white/5 flex items-center justify-center">
                  <span className="font-mono text-xs text-[#5a5a70]">[Manual spreadsheet updates...]</span>
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={onStart}
            className="bg-[#12121a] p-8 rounded-2xl border border-[#00f0ff]/20 relative overflow-hidden group cursor-pointer hover:border-[#00f0ff]/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 to-transparent" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00f0ff]/10 rounded-full blur-3xl group-hover:bg-[#00f0ff]/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/20 flex items-center justify-center glow-cyan">
                  <Zap className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <div>
                  <span className="font-mono text-sm text-[#00f0ff] font-bold">AFTER</span>
                  <p className="text-[#8888a0] text-sm">5 min AI-powered</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-lg font-semibold text-[#f0f0f5]">Weekly Load Mirror</span>
                  <span className="font-mono text-xs text-[#5a5a70]">today.pdf</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8888a0]">Bottlenecks detected</span>
                    <span className="font-mono text-[#ff00aa] font-semibold">2 Assignees</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8888a0]">Cards at risk</span>
                    <span className="font-mono text-[#ffaa00] font-semibold">3 Items</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8888a0]">Avg. Card Age</span>
                    <span className="font-mono text-[#f0f0f5] font-semibold">4.2 days</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="w-full py-3 bg-[#00f0ff] text-[#0a0a0f] text-sm font-bold rounded-xl hover:bg-[#00f0ff]/90 transition-all flex items-center justify-center space-x-2 glow-cyan pulse-glow">
                    <span>Generate Mirror</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-white/5">
          {[
            { step: '01', title: 'Export Data', desc: 'CSV or JSON from your board', color: '#00f0ff' },
            { step: '02', title: 'Map Status', desc: 'Define what counts as work', color: '#a0ff00' },
            { step: '03', title: 'Get Mirror', desc: 'Agenda + Report instantly', color: '#ff00aa' }
          ].map((s, i) => (
            <div key={s.step} className="space-y-3 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.step}</div>
              <div className="font-semibold text-[#f0f0f5] text-lg">{s.title}</div>
              <div className="text-sm text-[#5a5a70]">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
