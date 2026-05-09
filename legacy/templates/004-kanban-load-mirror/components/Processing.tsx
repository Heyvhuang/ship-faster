import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Loader2, Brain } from 'lucide-react';

interface ProcessingProps {
  onComplete: () => void;
}

const ConvergingParticles: React.FC<{ stage: number }> = ({ stage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 280;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    let animationId: number;

    const colors = ['#00f0ff', '#ff00aa', '#a0ff00', '#ffaa00'];
    
    interface Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
      orbitRadius: number;
      orbitSpeed: number;
      converged: boolean;
    }

    const particles: Particle[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const radius = 100 + Math.random() * 40;
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        targetX: centerX,
        targetY: centerY,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.02 + Math.random() * 0.02,
        angle: angle,
        orbitRadius: 30 + Math.random() * 20,
        orbitSpeed: 0.02 + Math.random() * 0.01,
        converged: false,
      });
    }

    let time = 0;
    const convergenceProgress = () => Math.min(1, stage / 3);

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
      ctx.fillRect(0, 0, size, size);

      time += 0.016;
      const progress = convergenceProgress();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 40 + Math.sin(time * 2) * 5, 0, Math.PI * 2);
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
      coreGradient.addColorStop(0, `rgba(0, 240, 255, ${0.3 + progress * 0.4})`);
      coreGradient.addColorStop(0.5, `rgba(0, 240, 255, ${0.1 + progress * 0.2})`);
      coreGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGradient;
      ctx.fill();

      particles.forEach((p, i) => {
        p.angle += p.orbitSpeed;
        
        const currentOrbitRadius = p.orbitRadius * (1 - progress * 0.7);
        const targetX = centerX + Math.cos(p.angle) * currentOrbitRadius;
        const targetY = centerY + Math.sin(p.angle) * currentOrbitRadius;

        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        const distToCenter = Math.sqrt(
          Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)
        );

        const alpha = 0.4 + (1 - distToCenter / 150) * 0.6;
        const glowSize = p.size * (2 + progress * 2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = alpha * 0.4;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        if (i < particles.length - 1) {
          const next = particles[i + 1];
          const dist = Math.sqrt(Math.pow(p.x - next.x, 2) + Math.pow(p.y - next.y, 2));
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 60) * 0.2;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [stage]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: 280, height: 280 }}
    />
  );
};

export const Processing: React.FC<ProcessingProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const stages = [
    { text: "Parsing board structure", icon: "parse" },
    { text: "Detecting bottlenecks", icon: "detect" },
    { text: "Calculating workload aging", icon: "calc" },
    { text: "Generating meeting agenda", icon: "gen" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [onComplete, stages.length]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="relative">
        <div className="w-[400px] h-[400px] relative">
          <ConvergingParticles stage={stage} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 rounded-full bg-[#12121a] border border-[#00f0ff]/30 flex items-center justify-center glow-cyan">
              <Brain className="w-8 h-8 text-[#00f0ff]" />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs">
          <div className="bg-[#12121a] rounded-2xl border border-white/5 p-6 space-y-4">
            {stages.map((s, idx) => (
              <div 
                key={idx} 
                className={`flex items-center space-x-3 transition-all duration-500 ${
                  idx <= stage ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {idx < stage ? (
                    <CheckCircle2 className="w-5 h-5 text-[#a0ff00]" />
                  ) : idx === stage ? (
                    <Loader2 className="w-5 h-5 text-[#00f0ff] animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#5a5a70]" />
                  )}
                </div>
                <span className={`text-sm ${
                  idx === stage 
                    ? 'text-[#f0f0f5] font-medium' 
                    : idx < stage 
                      ? 'text-[#8888a0]' 
                      : 'text-[#5a5a70]'
                }`}>
                  {s.text}
                  {idx === stage && <span className="typing-cursor"></span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
