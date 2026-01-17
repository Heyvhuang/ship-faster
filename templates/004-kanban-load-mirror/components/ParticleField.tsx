import React, { useEffect, useRef, useMemo } from 'react';
import { KanbanCard } from '../types';

interface ParticleFieldProps {
  data: KanbanCard[];
  config: {
    inProgressStatuses: string[];
    agingThreshold: number;
  };
  onCardHover?: (card: KanbanCard | null) => void;
  onCardClick?: (card: KanbanCard) => void;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  glowColor: string;
  assignee: string;
  isBlocked: boolean;
  daysInStatus: number;
  title: string;
}

interface AttractorNode {
  x: number;
  y: number;
  name: string;
  count: number;
  isOverloaded: boolean;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ 
  data, 
  config, 
  onCardHover,
  onCardClick 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const attractorsRef = useRef<AttractorNode[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  const activeCards = useMemo(() => 
    data.filter(c => config.inProgressStatuses.includes(c.status)),
    [data, config.inProgressStatuses]
  );

  const assigneeGroups = useMemo(() => {
    const groups: Record<string, KanbanCard[]> = {};
    activeCards.forEach(c => {
      if (!groups[c.assignee]) groups[c.assignee] = [];
      groups[c.assignee].push(c);
    });
    return groups;
  }, [activeCards]);

  const getCardColor = (card: KanbanCard): { main: string; glow: string } => {
    if (card.isBlocked) return { main: '#ff00aa', glow: 'rgba(255, 0, 170, 0.6)' };
    if (card.daysInStatus > config.agingThreshold) return { main: '#ffaa00', glow: 'rgba(255, 170, 0, 0.6)' };
    return { main: '#00f0ff', glow: 'rgba(0, 240, 255, 0.6)' };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializePositions();
    };

    const initializePositions = () => {
      const width = canvas.width;
      const height = canvas.height;
      const assignees = Object.keys(assigneeGroups);
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      attractorsRef.current = assignees.map((name, i) => {
        const angle = (Math.PI * 2 * i) / assignees.length - Math.PI / 2;
        return {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          name,
          count: assigneeGroups[name].length,
          isOverloaded: assigneeGroups[name].length > 3,
        };
      });

      particlesRef.current = activeCards.map((card, i) => {
        const attractor = attractorsRef.current.find(a => a.name === card.assignee);
        const colors = getCardColor(card);
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 40;
        
        return {
          id: card.id,
          x: centerX + (Math.random() - 0.5) * width * 0.8,
          y: centerY + (Math.random() - 0.5) * height * 0.8,
          vx: 0,
          vy: 0,
          targetX: attractor ? attractor.x + Math.cos(angle) * dist : centerX,
          targetY: attractor ? attractor.y + Math.sin(angle) * dist : centerY,
          size: card.isBlocked ? 6 : (card.daysInStatus > config.agingThreshold ? 5 : 4),
          color: colors.main,
          glowColor: colors.glow,
          assignee: card.assignee,
          isBlocked: card.isBlocked,
          daysInStatus: card.daysInStatus,
          title: card.title,
        };
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      let found = false;
      for (const p of particlesRef.current) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < p.size + 10) {
          hoveredRef.current = p.id;
          canvas.style.cursor = 'pointer';
          const card = activeCards.find(c => c.id === p.id);
          if (card && onCardHover) onCardHover(card);
          found = true;
          break;
        }
      }
      if (!found) {
        hoveredRef.current = null;
        canvas.style.cursor = 'default';
        if (onCardHover) onCardHover(null);
      }
    };

    const handleClick = () => {
      if (hoveredRef.current) {
        const card = activeCards.find(c => c.id === hoveredRef.current);
        if (card && onCardClick) onCardClick(card);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
      hoveredRef.current = null;
      canvas.style.cursor = 'default';
    };

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      attractorsRef.current.forEach(attractor => {
        const pulseSize = 45 + Math.sin(time * 2) * 5;
        
        ctx.beginPath();
        ctx.arc(attractor.x, attractor.y, pulseSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          attractor.x, attractor.y, 0,
          attractor.x, attractor.y, pulseSize
        );
        const color = attractor.isOverloaded ? '#ffaa00' : '#00f0ff';
        gradient.addColorStop(0, attractor.isOverloaded ? 'rgba(255, 170, 0, 0.15)' : 'rgba(0, 240, 255, 0.15)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(attractor.x, attractor.y, 25, 0, Math.PI * 2);
        ctx.fillStyle = attractor.isOverloaded ? 'rgba(255, 170, 0, 0.1)' : 'rgba(0, 240, 255, 0.1)';
        ctx.fill();
        ctx.strokeStyle = attractor.isOverloaded ? 'rgba(255, 170, 0, 0.4)' : 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#f0f0f5';
        ctx.font = 'bold 11px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(attractor.name.split(' ')[0], attractor.x, attractor.y);

        ctx.fillStyle = color;
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(`${attractor.count}`, attractor.x, attractor.y + 35);
      });

      particlesRef.current.forEach((p, i) => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
          p.vx += dx * 0.003;
          p.vy += dy * 0.003;
        }

        particlesRef.current.forEach((other, j) => {
          if (i === j) return;
          const odx = p.x - other.x;
          const ody = p.y - other.y;
          const odist = Math.sqrt(odx * odx + ody * ody);
          if (odist < 30 && odist > 0) {
            const force = (30 - odist) / odist * 0.05;
            p.vx += odx * force;
            p.vy += ody * force;
          }
        });

        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        const isHovered = hoveredRef.current === p.id;
        const currentSize = isHovered ? p.size * 1.8 : p.size;
        const glowSize = currentSize * (isHovered ? 4 : 2.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        glowGradient.addColorStop(0, p.glowColor);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.globalAlpha = isHovered ? 0.8 : 0.4;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1;
        ctx.fill();

        if (p.isBlocked) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize + 3, 0, Math.PI * 2);
          ctx.strokeStyle = '#ff00aa';
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.5 + Math.sin(time * 4) * 0.3;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 0.5;
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          if (p1.assignee === p2.assignee) {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              ctx.globalAlpha = (1 - dist / 80) * 0.15;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });

      ctx.globalAlpha = 1;

      if (hoveredRef.current) {
        const p = particlesRef.current.find(p => p.id === hoveredRef.current);
        if (p) {
          const tooltipX = p.x + 15;
          const tooltipY = p.y - 20;
          const tooltipWidth = Math.min(200, p.title.length * 7 + 30);
          
          ctx.fillStyle = 'rgba(18, 18, 26, 0.95)';
          ctx.beginPath();
          ctx.roundRect(tooltipX, tooltipY - 15, tooltipWidth, 50, 8);
          ctx.fill();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#f0f0f5';
          ctx.font = '12px Inter';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          
          const title = p.title.length > 25 ? p.title.slice(0, 25) + '...' : p.title;
          ctx.fillText(title, tooltipX + 10, tooltipY - 8);
          
          ctx.fillStyle = '#5a5a70';
          ctx.font = '10px JetBrains Mono';
          ctx.fillText(`${p.id} · ${p.daysInStatus}d`, tooltipX + 10, tooltipY + 12);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activeCards, assigneeGroups, config.agingThreshold, onCardHover, onCardClick]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#00f0ff]"></div>
          <span className="text-[#8888a0]">Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ffaa00]"></div>
          <span className="text-[#8888a0]">Aging</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff00aa]"></div>
          <span className="text-[#8888a0]">Blocked</span>
        </div>
      </div>
    </div>
  );
};
