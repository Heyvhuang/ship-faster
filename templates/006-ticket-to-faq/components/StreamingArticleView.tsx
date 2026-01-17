import React, { useState, useEffect, useRef } from 'react';
import { GeneratedArticle } from '../types';
import { Shield, Tag, Zap, Cpu } from 'lucide-react';

interface StreamingArticleViewProps {
  article: GeneratedArticle;
  onComplete: () => void;
}

const StreamingArticleView: React.FC<StreamingArticleViewProps> = ({ article, onComplete }) => {
  const [phase, setPhase] = useState<'scanning' | 'detecting' | 'redacting' | 'formatting' | 'complete'>('scanning');
  const [visibleChars, setVisibleChars] = useState(0);
  const [redactedIndices, setRedactedIndices] = useState<Set<number>>(new Set());
  const [showRedactionFlash, setShowRedactionFlash] = useState<number | null>(null);
  const [scanLinePosition, setScanLinePosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const fullText = `${article.title}\n\n${article.summary}\n\n${article.steps.map((s, i) => `${i + 1}. ${s.action}\n${s.details}`).join('\n\n')}`;
  
  useEffect(() => {
    const phases = [
      { name: 'scanning', duration: 1500 },
      { name: 'detecting', duration: 1200 },
      { name: 'redacting', duration: 1800 },
      { name: 'formatting', duration: 1000 },
      { name: 'complete', duration: 0 },
    ] as const;

    let currentPhaseIndex = 0;
    
    const advancePhase = () => {
      if (currentPhaseIndex < phases.length - 1) {
        currentPhaseIndex++;
        setPhase(phases[currentPhaseIndex].name);
        if (phases[currentPhaseIndex].duration > 0) {
          setTimeout(advancePhase, phases[currentPhaseIndex].duration);
        } else {
          onComplete();
        }
      }
    };

    setTimeout(advancePhase, phases[0].duration);
  }, [onComplete]);

  useEffect(() => {
    if (phase === 'scanning') {
      const interval = setInterval(() => {
        setScanLinePosition(prev => (prev + 2) % 100);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'formatting' || phase === 'complete') {
      const interval = setInterval(() => {
        setVisibleChars(prev => {
          const next = prev + Math.floor(Math.random() * 8) + 4;
          if (next >= fullText.length) {
            clearInterval(interval);
            return fullText.length;
          }
          return next;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [phase, fullText.length]);

  useEffect(() => {
    if (phase === 'redacting' && article.redactedItems.length > 0) {
      let idx = 0;
      const flashInterval = setInterval(() => {
        if (idx < article.redactedItems.length) {
          setShowRedactionFlash(idx);
          setTimeout(() => {
            setRedactedIndices(prev => new Set([...prev, idx]));
            setShowRedactionFlash(null);
          }, 400);
          idx++;
        } else {
          clearInterval(flashInterval);
        }
      }, 500);
      return () => clearInterval(flashInterval);
    }
  }, [phase, article.redactedItems.length]);

  if (phase === 'complete' && visibleChars >= fullText.length) {
    return null;
  }

  return (
    <div ref={containerRef} className="h-full relative overflow-hidden bg-card border border-border cyber-chamfer">
      {phase === 'scanning' && (
        <div 
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 z-20 shadow-neon"
          style={{ top: `${scanLinePosition}%` }}
        />
      )}

      <div className={`absolute inset-0 bg-background/95 z-30 flex flex-col items-center justify-center transition-opacity duration-500 ${phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative mb-8">
          <div className={`w-24 h-24 border-2 border-accent cyber-chamfer flex items-center justify-center ${phase === 'redacting' ? 'border-destructive shadow-[0_0_20px_rgba(255,51,102,0.5)]' : 'shadow-neon'}`}>
            {phase === 'scanning' && <Cpu className="w-12 h-12 text-accent animate-pulse" />}
            {phase === 'detecting' && <Zap className="w-12 h-12 text-accent animate-bounce" />}
            {phase === 'redacting' && <Shield className="w-12 h-12 text-destructive animate-pulse" />}
            {phase === 'formatting' && <Tag className="w-12 h-12 text-accent animate-spin" />}
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute -top-2 left-1/2 w-2 h-2 bg-accent rounded-full shadow-neon" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
            <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-accentTertiary rounded-full" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-2xl font-display font-bold uppercase tracking-widest text-glow">
            {phase === 'scanning' && 'SCANNING INPUT'}
            {phase === 'detecting' && 'DETECTING PATTERNS'}
            {phase === 'redacting' && 'SANITIZING DATA'}
            {phase === 'formatting' && 'RENDERING OUTPUT'}
          </h3>
          
          <div className="w-64 h-1 bg-muted overflow-hidden cyber-chamfer-sm">
            <div 
              className={`h-full transition-all duration-300 ${phase === 'redacting' ? 'bg-destructive' : 'bg-accent'}`}
              style={{ 
                width: phase === 'scanning' ? '25%' : 
                       phase === 'detecting' ? '50%' : 
                       phase === 'redacting' ? '75%' : '100%' 
              }}
            />
          </div>

          {phase === 'redacting' && article.redactedItems.length > 0 && (
            <div className="mt-6 space-y-2">
              {article.redactedItems.map((item, idx) => (
                <div 
                  key={idx}
                  className={`text-xs font-mono px-3 py-1 transition-all duration-300 ${
                    showRedactionFlash === idx 
                      ? 'bg-destructive text-white scale-110 shadow-[0_0_20px_rgba(255,51,102,0.8)]' 
                      : redactedIndices.has(idx)
                        ? 'bg-muted text-accent line-through opacity-50'
                        : 'bg-muted/50 text-mutedForeground'
                  }`}
                >
                  {showRedactionFlash === idx ? `⚠ PII DETECTED: ${item}` : redactedIndices.has(idx) ? `✓ REDACTED: ${item}` : `PENDING: ${item}`}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-6 justify-center mt-6 text-xs font-mono text-mutedForeground">
            <span>TOKENS: {Math.floor(fullText.length / 4)}</span>
            <span className="text-accent">|</span>
            <span>PII: {article.redactedItems.length}</span>
            <span className="text-accent">|</span>
            <span>STEPS: {article.steps.length}</span>
          </div>
        </div>
      </div>

      <div className="p-8 opacity-20 font-mono text-sm text-accent whitespace-pre-wrap">
        {fullText.slice(0, Math.min(visibleChars, fullText.length))}
        <span className="animate-pulse">▌</span>
      </div>
    </div>
  );
};

export default StreamingArticleView;
