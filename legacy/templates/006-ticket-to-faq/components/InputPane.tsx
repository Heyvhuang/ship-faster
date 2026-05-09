import React from 'react';
import { Audience, GenerationConfig, GeneratedArticle } from '../types';
import { Wand2, Settings2, FileText, CheckCircle2 } from 'lucide-react';

interface InputPaneProps {
  ticketText: string;
  setTicketText: (text: string) => void;
  config: GenerationConfig;
  setConfig: React.Dispatch<React.SetStateAction<GenerationConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
  generatedArticle: GeneratedArticle | null;
}

const InputPane: React.FC<InputPaneProps> = ({
  ticketText,
  setTicketText,
  config,
  setConfig,
  onGenerate,
  isGenerating,
  generatedArticle
}) => {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6 border-b border-border bg-card/50 backdrop-blur-sm">
        <h2 className="text-sm font-bold text-accent uppercase tracking-widest flex items-center gap-2 font-display">
          <FileText size={16} className="text-accent/70" />
          SOURCE_DATA_INPUT
        </h2>
      </div>

      <div className="flex-1 p-4 relative bg-background/50">
        <div className="absolute top-6 left-6 text-accent font-mono z-10 pointer-events-none select-none text-sm">&gt;</div>
        <textarea
          className="w-full h-full bg-input border border-border rounded-none p-4 pl-8 text-sm font-mono text-foreground focus:ring-1 focus:ring-accent focus:border-accent focus:shadow-neon-sm outline-none resize-none placeholder:text-mutedForeground/50 transition-all cyber-chamfer-sm custom-scrollbar"
          placeholder="ENTER RAW TICKET LOGS...
// Example:
User: Cannot connect to VPN.
Log: Error 800.
Resolution: Restarted RRAS service on Gateway 1."
          value={ticketText}
          onChange={(e) => setTicketText(e.target.value)}
          disabled={isGenerating}
        />
      </div>

      <div className="p-6 bg-card border-t border-border space-y-6">
        
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-mutedForeground uppercase tracking-widest font-mono">TARGET_AUDIENCE</label>
              <div className="flex bg-muted p-1 rounded-none border border-border">
                <button
                  onClick={() => setConfig(prev => ({ ...prev, audience: Audience.CLIENT }))}
                  className={`px-3 py-1 text-xs font-bold font-mono uppercase transition-all ${config.audience === Audience.CLIENT ? 'bg-accent text-black shadow-neon-sm' : 'text-mutedForeground hover:text-white'}`}
                >
                  Client
                </button>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, audience: Audience.INTERNAL }))}
                  className={`px-3 py-1 text-xs font-bold font-mono uppercase transition-all ${config.audience === Audience.INTERNAL ? 'bg-accent text-black shadow-neon-sm' : 'text-mutedForeground hover:text-white'}`}
                >
                  Internal
                </button>
              </div>
           </div>

           <div className="flex items-center justify-between">
             <label className="text-xs font-bold text-mutedForeground uppercase tracking-widest font-mono">AUTO_REDACTION</label>
             <button
                onClick={() => setConfig(prev => ({ ...prev, redactionEnabled: !prev.redactionEnabled }))}
                className={`relative inline-flex h-5 w-9 items-center border border-border transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${config.redactionEnabled ? 'bg-accent/20 border-accent' : 'bg-muted'}`}
             >
               <span
                 className={`${config.redactionEnabled ? 'translate-x-5 bg-accent shadow-neon-sm' : 'translate-x-1 bg-mutedForeground'} inline-block h-3 w-3 transform transition-transform rounded-none`}
               />
             </button>
           </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={!ticketText.trim() || isGenerating}
          className={`w-full group relative flex items-center justify-center gap-2 py-4 px-4 font-bold text-sm transition-all cyber-chamfer-sm uppercase tracking-widest
            ${!ticketText.trim() || isGenerating 
              ? 'bg-muted border border-border text-mutedForeground cursor-not-allowed' 
              : 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-black hover:shadow-neon active:scale-[0.98]'
            }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              PROCESSING...
            </>
          ) : (
            <>
              <Wand2 size={16} className={ticketText.trim() ? "text-inherit" : ""} />
              EXECUTE_DRAFT
            </>
          )}
        </button>
        
        {generatedArticle && generatedArticle.redactedItems.length > 0 && (
          <div className="pt-2">
            <div className="p-3 bg-destructive/5 border border-destructive/30 rounded-none cyber-chamfer-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-destructive/5 animate-pulse pointer-events-none"></div>
              <div className="flex items-start gap-2 relative z-10">
                <CheckCircle2 size={14} className="text-destructive mt-0.5" />
                <div>
                   <p className="text-xs font-bold text-destructive uppercase tracking-wide font-mono">
                    PII_SANITIZED: {generatedArticle.redactedItems.length}
                   </p>
                   <p className="text-[10px] text-destructive/80 mt-1 leading-tight font-mono">
                     REMOVED: {generatedArticle.redactedItems.slice(0, 3).join(', ')} {generatedArticle.redactedItems.length > 3 ? `+${generatedArticle.redactedItems.length - 3} MORE` : ''}
                   </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InputPane;
