import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { ImportFlow } from './components/ImportFlow';
import { Processing } from './components/Processing';
import { Dashboard } from './components/Dashboard';
import { Billing } from './components/Billing';
import { generateAgenda } from './services/geminiService';
import { AppState, KanbanCard, AgendaItem } from './types';

export default function App() {
  const [view, setView] = useState<AppState['view']>('landing');
  const [data, setData] = useState<KanbanCard[]>([]);
  const [config, setConfig] = useState<AppState['config']>({ inProgressStatuses: [], doneStatuses: [], agingThreshold: 7 });
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [showBilling, setShowBilling] = useState(false);

  const handleStart = () => setView('import');
  
  const handleBackToLanding = () => setView('landing');

  const handleImportComplete = async (importedData: KanbanCard[], importedConfig: any) => {
    setData(importedData);
    setConfig(importedConfig);
    setView('processing');
    
    const generatedAgenda = await generateAgenda(importedData, importedConfig.agingThreshold);
    setAgenda(generatedAgenda);
  };

  const handleProcessingComplete = () => {
    setView('dashboard');
  };

  const handleUpgradeClick = () => {
    setShowBilling(true);
  };

  const handleNewAnalysis = () => {
    setData([]);
    setConfig({ inProgressStatuses: [], doneStatuses: [], agingThreshold: 7 });
    setAgenda([]);
    setView('import');
  };

  return (
    <>
      {view === 'landing' && <Landing onStart={handleStart} />}
      
      {view === 'import' && (
        <ImportFlow 
          onComplete={handleImportComplete} 
          onBack={handleBackToLanding}
        />
      )}
      
      {view === 'processing' && (
        <Processing onComplete={handleProcessingComplete} />
      )}
      
      {view === 'dashboard' && (
        <Dashboard 
          data={data} 
          config={config} 
          agenda={agenda}
          onUpgrade={handleUpgradeClick}
          onNewAnalysis={handleNewAnalysis}
        />
      )}

      {showBilling && (
        <Billing onClose={() => setShowBilling(false)} />
      )}
    </>
  );
}