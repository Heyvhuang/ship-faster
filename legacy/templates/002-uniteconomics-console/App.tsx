"use client";

import React, { useEffect, useState } from 'react';
import { MOCK_DATA, TARGET_MARGIN_DEFAULT } from './constants';
import { AppState } from './types';
import { Landing } from './pages/Landing';
import { Setup } from './pages/Setup';
import { Progress } from './pages/Progress';
import { Results } from './pages/Results';
import { Billing } from './pages/Billing';

// Simple router states
enum View {
  LANDING,
  SETUP,
  PROGRESS,
  RESULTS,
  BILLING
}

export default function App() {
  const [view, setView] = useState<View>(View.LANDING);
  
  const [appState, setAppState] = useState<AppState>({
    targetMargin: TARGET_MARGIN_DEFAULT,
    currency: 'USD',
    data: MOCK_DATA,
    isProcessing: false,
    hasResult: false,
    isPaid: false,
    policyDraft: null
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      setAppState(prev => ({ ...prev, isPaid: true }));
      setView(View.RESULTS);
    }
  }, []);

  const handleStart = () => setView(View.SETUP);

  const handleSetupComplete = (targetMargin: number) => {
    setAppState(prev => ({ ...prev, targetMargin }));
    setView(View.PROGRESS);
  };

  const handleProgressComplete = () => {
    setAppState(prev => ({ ...prev, hasResult: true }));
    setView(View.RESULTS);
  };

  const handleUpgrade = () => {
    setView(View.BILLING);
  };

  const handlePaymentSuccess = () => {
    setAppState(prev => ({ ...prev, isPaid: true }));
    setView(View.RESULTS);
  };

  const handleUpdatePolicy = (policy: string) => {
    setAppState(prev => ({ ...prev, policyDraft: policy }));
  };

  // Router Switch
  switch (view) {
    case View.LANDING:
      return <Landing onStart={handleStart} />;
    
    case View.SETUP:
      return <Setup onComplete={handleSetupComplete} />;
    
    case View.PROGRESS:
      return <Progress onComplete={handleProgressComplete} />;
    
    case View.RESULTS:
      return (
        <Results 
          appState={appState} 
          onUpgrade={handleUpgrade} 
          onUpdatePolicy={handleUpdatePolicy}
          onGoHome={() => setView(View.LANDING)}
        />
      );
    
    case View.BILLING:
      return (
        <Billing 
          onSuccess={handlePaymentSuccess} 
          onCancel={() => setView(View.RESULTS)} 
        />
      );
      
    default:
      return <Landing onStart={handleStart} />;
  }
}
