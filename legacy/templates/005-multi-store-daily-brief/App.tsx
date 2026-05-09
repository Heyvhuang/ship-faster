import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import DailyBrief from './components/DailyBrief';
import StoreList from './components/StoreList';
import HeroStats from './components/HeroStats';
import { generateStoreData, aggregateStats } from './services/mockDataService';
import { generateBrief } from './services/geminiService';
import { StoreStats, BriefContent, AppView } from './types';
import { Plus, Loader2, Send } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [stores, setStores] = useState<StoreStats[]>([]);
  const [brief, setBrief] = useState<BriefContent | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setView('landing');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const handleStart = () => {
    const initialStores = generateStoreData(1);
    setStores(initialStores);
    setView('dashboard');
    window.history.pushState({ view: 'dashboard' }, '', '#dashboard');
    generateBriefData(initialStores);
  };

  const handleBackToLanding = () => {
    setView('landing');
    window.history.pushState({ view: 'landing' }, '', '/');
  };

  // Add another store simulation
  const handleConnectStore = () => {
    setIsConnecting(true);
    setTimeout(() => {
      const currentCount = stores.length;
      if (currentCount >= 5) {
        setIsConnecting(false);
        return; // Max stores reached for demo
      }
      
      // Generate a new set of data but keep existing store IDs consistent if we were doing persistent state
      // For this demo, generateStoreData generates random new ones, so we will append
      // To simulate "adding" a specific store, we'll just regenerate list + 1 size for simplicity of the mock service
      // In a real app, we'd add a single new store object.
      
      const newStores = generateStoreData(currentCount + 1);
      setStores(newStores);
      setIsConnecting(false);
      
      // Re-generate brief with new data
      generateBriefData(newStores);
    }, 1500);
  };

  const generateBriefData = async (currentStores: StoreStats[]) => {
    setIsGeneratingBrief(true);
    const content = await generateBrief(currentStores);
    setBrief(content);
    setIsGeneratingBrief(false);
  };

  const aggregated = aggregateStats(stores);

  if (view === 'landing') {
    return <Landing onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-900 font-sans pb-20">
      
      <div className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        <button onClick={handleBackToLanding} className="text-left hover:opacity-70 transition-opacity">
          <h1 className="font-serif font-bold text-lg">Daily Brief</h1>
          <p className="text-xs text-stone-500">Good morning, Founder.</p>
        </button>
        <div className="flex items-center gap-2">
            <div className="bg-stone-900 text-white text-xs font-bold px-2 py-1 rounded">
               {stores.length} {stores.length === 1 ? 'Store' : 'Stores'}
            </div>
        </div>
      </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        
        <section className="animate-fade-in-up mb-8">
          <HeroStats 
            totalSales={aggregated.totalSales}
            salesGrowth={aggregated.salesGrowth}
            stores={aggregated.stores}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <section className="lg:col-span-3">
            {brief ? (
              <DailyBrief content={brief} isLoading={isGeneratingBrief} />
            ) : (
               <div className="h-64 flex items-center justify-center bg-white rounded-xl border border-stone-200">
                  <Loader2 className="w-8 h-8 animate-spin text-stone-300" />
               </div>
            )}
          </section>

          <section className="lg:col-span-2">
            <StoreList stores={stores} />
            
            <button 
              onClick={handleConnectStore}
              disabled={isConnecting}
              className="w-full mt-4 py-3 border-2 border-dashed border-stone-300 rounded-xl text-stone-500 font-medium hover:border-stone-400 hover:text-stone-600 transition-colors flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting Store...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Connect Another Store</span>
                </>
              )}
            </button>
          </section>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 right-0 px-4 max-w-md mx-auto pointer-events-none lg:hidden">
        <div className="pointer-events-auto shadow-xl shadow-stone-200/50 bg-stone-900 text-white rounded-full p-1 pl-5 pr-1 flex items-center justify-between">
            <span className="text-sm font-medium">Get this via email daily</span>
            <button 
              className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-4 py-2 text-sm font-bold transition-colors flex items-center gap-2"
              onClick={() => alert("This would open the Stripe billing portal in a real app.")}
            >
              <span>Subscribe $9/mo</span>
              <Send className="w-3 h-3" />
            </button>
        </div>
      </div>

    </div>
  );
};

export default App;