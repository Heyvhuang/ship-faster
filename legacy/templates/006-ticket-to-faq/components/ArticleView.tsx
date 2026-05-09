import React from 'react';
import { GeneratedArticle, Audience } from '../types';
import { AlertTriangle, Copy, Shield, Tag } from 'lucide-react';

interface ArticleViewProps {
  article: GeneratedArticle | null;
  isLoading: boolean;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-mutedForeground space-y-4 animate-pulse">
        <div className="w-16 h-16 border-4 border-muted border-t-accent rounded-full animate-spin shadow-neon"></div>
        <p className="font-bold font-mono tracking-widest text-accent">ANALYZING_RESOLUTION_DATA...</p>
        <div className="text-xs text-mutedForeground max-w-xs text-center font-mono">IDENTIFYING STEPS, SANITIZING PII, FORMATTING FOR {article?.audience || 'KNOWLEDGE BASE'}...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-mutedForeground">
        <div className="p-4 bg-muted/30 border border-border rounded-none cyber-chamfer mb-4">
            <svg className="w-8 h-8 text-mutedForeground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <p className="font-mono text-lg uppercase tracking-wider text-accent/50">NO DATA STREAM</p>
        <p className="text-sm mt-2 font-mono text-mutedForeground/70">Awaiting input via terminal...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-card p-8 md:p-12 shadow-neon-sm border border-border cyber-chamfer custom-scrollbar relative">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent pointer-events-none"></div>
      
      {/* Header */}
      <div className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-bold rounded-none uppercase tracking-widest border font-mono ${
            article.audience === Audience.INTERNAL 
              ? 'bg-amber-900/20 text-amber-500 border-amber-500/50' 
              : 'bg-accent/10 text-accent border-accent/50 shadow-neon-sm'
          }`}>
            {article.audience === Audience.INTERNAL ? 'INTERNAL_DOC' : 'PUBLIC_FAQ'}
          </span>
          {article.redactedItems.length > 0 && (
            <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-none bg-destructive/10 text-destructive border border-destructive/50 uppercase tracking-widest font-mono">
              <Shield size={10} />
              REDACTED
            </span>
          )}
        </div>
        <h1 className="text-3xl font-black text-foreground mb-4 leading-tight font-display tracking-wide uppercase text-glow">
          {article.title}
        </h1>
        <p className="text-lg text-mutedForeground leading-relaxed font-mono">
          {article.summary}
        </p>
      </div>

      {/* Cautions */}
      {article.cautions.length > 0 && (
        <div className="mb-8 p-4 bg-amber-950/20 border-l-4 border-amber-500 rounded-none">
          <h3 className="flex items-center gap-2 text-sm font-bold text-amber-500 uppercase tracking-widest mb-2 font-mono">
            <AlertTriangle size={16} />
            WARNING: CRITICAL_INFO
          </h3>
          <ul className="list-disc list-inside space-y-1 text-amber-400/80 text-sm font-mono">
            {article.cautions.map((caution, idx) => (
              <li key={idx}>{caution}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-8">
        {article.steps.map((step, idx) => (
          <div key={idx} className="group relative pl-8 border-l border-border hover:border-accent transition-colors duration-300">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-none bg-background border border-accent group-hover:bg-accent group-hover:shadow-neon transition-all duration-300"></div>
            <h3 className="text-lg font-bold text-foreground mb-2 font-display uppercase tracking-wide group-hover:text-accent transition-colors">
              <span className="text-accent/50 mr-2">0{idx + 1}.</span> {step.action}
            </h3>
            <div className="text-mutedForeground leading-relaxed mb-3 font-mono text-sm">
              {step.details}
            </div>
            {step.codeSnippet && (
              <div className="relative mt-2">
                <pre className="bg-black/80 border border-accent/30 text-accentTertiary p-4 rounded-none text-sm font-mono overflow-x-auto shadow-neon-sm cyber-chamfer-sm">
                  <code>{step.codeSnippet}</code>
                </pre>
                <button className="absolute top-2 right-2 text-mutedForeground hover:text-white transition-colors" title="Copy code">
                  <Copy size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Tags */}
      {article.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-1 text-xs text-mutedForeground bg-muted border border-border px-2 py-1 rounded-none font-mono uppercase hover:text-accent hover:border-accent transition-colors cursor-default">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
