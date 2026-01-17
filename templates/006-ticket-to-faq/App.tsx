import React, { useState, useCallback } from 'react';
import { Audience, GenerationConfig, GeneratedArticle, AppState } from './types';
import { generateArticle } from './services/geminiService';
import InputPane from './components/InputPane';
import ArticleView from './components/ArticleView';
import StreamingArticleView from './components/StreamingArticleView';
import { History, Layout, BookOpen, Share, Check, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [ticketText, setTicketText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [config, setConfig] = useState<GenerationConfig>({
    audience: Audience.CLIENT,
    redactionEnabled: true,
    tone: 'professional'
  });
  const [hasApiKey, setHasApiKey] = useState<boolean>(!!process.env.API_KEY);

  const handleStreamingComplete = useCallback(() => {
    setIsStreaming(false);
  }, []);

  const handleGenerate = async () => {
    if (!ticketText) return;
    
    setIsGenerating(true);
    setIsStreaming(false);
    setAppState(AppState.EDITOR);
    
    try {
      const article = await generateArticle(ticketText, config);
      setGeneratedArticle(article);
      setIsStreaming(true);
    } catch (error) {
      console.error(error);
      alert("Failed to generate article. Check API Key configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    setAppState(AppState.SUCCESS);
  };

  // --- Views ---

  // Landing Page View
  if (appState === AppState.LANDING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-grid-pattern text-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background z-0 pointer-events-none"></div>
        
        <div className="max-w-4xl w-full space-y-12 z-10 relative">
           <div className="inline-flex items-center justify-center p-4 bg-black/50 rounded-none border border-accent/30 shadow-neon-sm mb-6 cyber-chamfer-sm">
             <Layout className="w-10 h-10 text-accent animate-pulse" />
           </div>
           
           <div className="space-y-4">
             <h1 className="text-5xl md:text-7xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accentTertiary tracking-widest uppercase cyber-glitch" data-text="Ticket to Knowledge">
               Ticket to Knowledge
             </h1>
             <p className="text-xl md:text-2xl text-mutedForeground max-w-2xl mx-auto font-mono tracking-wide cursor-blink">
               &gt; Turn raw data into actionable intelligence.
             </p>
           </div>

           {!hasApiKey && (
             <div className="p-4 bg-destructive/10 border border-destructive text-destructive font-mono text-sm cyber-chamfer-sm inline-block">
               [SYSTEM WARNING]: API_KEY missing. Protocols compromised.
             </div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-16">
              {[
                { label: 'Input Stream', desc: 'Ingest raw logs.', icon: '01' },
                { label: 'Neural Process', desc: 'Sanitize & Structure.', icon: '02' },
                { label: 'Data Uplink', desc: 'Broadcast to network.', icon: '03' }
              ].map((step, i) => (
                <div key={i} className="group p-6 bg-card border border-border cyber-chamfer hover:border-accent hover:shadow-neon transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-mono text-accent/50 group-hover:text-accent">sys.process.{step.icon}</div>
                    <div className="w-2 h-2 bg-zinc-800 group-hover:bg-accent transition-colors"></div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2 font-display tracking-wide group-hover:text-accent transition-colors">{step.label}</h3>
                  <p className="text-sm text-mutedForeground font-mono">{step.desc}</p>
                </div>
              ))}
           </div>

           <div className="pt-12">
             <button 
               onClick={() => setAppState(AppState.EDITOR)}
               className="group relative inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-accent text-accent font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-black transition-all duration-200 active:scale-95 shadow-neon cyber-chamfer-sm"
             >
               <span className="relative z-10 flex items-center gap-3">
                 Initialize System <BookOpen size={20} />
               </span>
               <div className="absolute inset-0 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
             </button>
           </div>
        </div>
      </div>
    );
  }

  if (appState === AppState.SUCCESS) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-grid-pattern p-6 text-center relative">
           <button 
             onClick={() => {
               setTicketText('');
               setGeneratedArticle(null);
               setAppState(AppState.LANDING);
             }}
             className="absolute top-6 left-6 p-3 text-mutedForeground hover:text-accent hover:shadow-neon-sm transition-all duration-300"
             title="Return to Home"
           >
             <Layout size={24} />
           </button>
           
           <div className="w-24 h-24 bg-accent/10 border-2 border-accent text-accent rounded-none cyber-chamfer flex items-center justify-center mb-8 shadow-neon relative">
              <div className="absolute inset-0 border border-accent opacity-50 blur-sm"></div>
              <Check size={48} strokeWidth={3} />
           </div>
           <h2 className="text-4xl font-black font-display text-white mb-4 tracking-wider text-glow">UPLOAD COMPLETE</h2>
           <p className="text-mutedForeground font-mono mb-12 max-w-md">Data packet successfully transmitted to the knowledge base network.</p>
           
           <div className="flex flex-col md:flex-row gap-6">
              <button 
                onClick={() => {
                    setTicketText('');
                    setGeneratedArticle(null);
                    setAppState(AppState.EDITOR);
                }}
                className="px-8 py-3 bg-transparent border border-mutedForeground text-mutedForeground font-mono hover:border-white hover:text-white transition-all cyber-chamfer-sm uppercase tracking-widest text-sm"
              >
                // Process Another
              </button>
              <button 
                onClick={() => {
                  setTicketText('');
                  setGeneratedArticle(null);
                  setAppState(AppState.LANDING);
                }}
                className="px-8 py-3 bg-accent text-black font-bold font-mono hover:bg-white transition-all shadow-neon cyber-chamfer-sm uppercase tracking-widest text-sm"
              >
                Return Home_
              </button>
           </div>
        </div>
     );
  }

  // Main Editor View
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar Navigation */}
      <nav className="w-20 flex flex-col items-center py-8 bg-black/80 border-r border-border shrink-0 z-50 backdrop-blur-sm">
        <div className="w-10 h-10 bg-transparent border border-accent text-accent flex items-center justify-center font-bold font-display text-xl mb-12 shadow-neon-sm cyber-chamfer-sm">
          T
        </div>
        <div className="space-y-8 flex flex-col items-center w-full">
          <button onClick={() => setAppState(AppState.LANDING)} className="p-3 text-mutedForeground hover:text-accent hover:shadow-neon-sm transition-all duration-300"><Layout size={24} /></button>
          <button className="p-3 text-accent border-l-2 border-accent bg-accent/10"><History size={24} /></button>
          <button className="p-3 text-mutedForeground hover:text-accent hover:shadow-neon-sm transition-all duration-300"><Menu size={24} /></button>
        </div>
      </nav>

      {/* Main Content Area - Split Pane */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        
        {/* Left Pane: Input & Controls */}
        <div className="w-full md:w-1/3 min-w-[350px] max-w-md h-full z-10 border-r border-border bg-card/95 backdrop-blur">
          <InputPane 
            ticketText={ticketText}
            setTicketText={setTicketText}
            config={config}
            setConfig={setConfig}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            generatedArticle={generatedArticle}
          />
        </div>

        {/* Right Pane: Preview */}
        <div className="flex-1 h-full relative bg-background/50">
          {/* Toolbar */}
          <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 border-b border-border bg-background/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-3 text-sm font-mono">
                 <span className="text-accent font-bold">&gt; PREVIEW_MODE</span>
                 <span className="text-zinc-700">|</span>
                <span className="text-mutedForeground uppercase tracking-wider">{generatedArticle ? 'STATUS: READY' : 'STATUS: AWAITING_INPUT'}</span>
             </div>
             
             {generatedArticle && (
                <button 
                  onClick={handlePublish}
                  className="flex items-center gap-2 px-5 py-2 bg-accent text-black text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-neon transition-all cyber-chamfer-sm"
                >
                  <Share size={14} />
                  Initiate Upload
                </button>
             )}
          </div>

          <div className="h-full pt-16 p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="h-full max-w-5xl mx-auto">
               {isStreaming && generatedArticle ? (
                 <StreamingArticleView 
                   article={generatedArticle} 
                   onComplete={handleStreamingComplete} 
                 />
               ) : (
                 <ArticleView article={generatedArticle} isLoading={isGenerating} />
               )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
