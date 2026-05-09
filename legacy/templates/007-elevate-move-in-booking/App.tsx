import React, { useState } from 'react';
import { Landing } from './views/Landing';
import { Resident } from './views/Resident';
import { Manager } from './views/Manager';
import { BuildingRules } from './types';

// Default Demo Rules
const DEFAULT_RULES: BuildingRules = {
  moveInStart: '09:00',
  moveInEnd: '17:00',
  slotDuration: 3,
  depositAmount: 500,
  blackoutDays: ['Sunday']
};

export default function App() {
  const [view, setView] = useState<'landing' | 'resident' | 'manager'>('landing');
  const [rules, setRules] = useState<BuildingRules>(DEFAULT_RULES);

  const handleUpdateRules = (newRules: BuildingRules) => {
    setRules(newRules);
  };

  return (
    <>
      {view === 'landing' && (
        <Landing 
          onStartPilot={() => setView('manager')} 
          onResidentDemo={() => setView('resident')} 
        />
      )}
      
      {view === 'resident' && (
        <Resident 
          rules={rules} 
          onBack={() => setView('landing')} 
        />
      )}
      
      {view === 'manager' && (
        <Manager 
          initialRules={rules} 
          onUpdateRules={handleUpdateRules} 
          onLogout={() => setView('landing')} 
        />
      )}
    </>
  );
}
