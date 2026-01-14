import React from 'react';
import { Button, Card, Badge } from '../components/ui';
import { ArrowRight, ShieldCheck, Activity, FileSpreadsheet } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-7xl mx-auto py-28 md:py-40">
      <div className="space-y-8 mb-24 max-w-4xl mx-auto">
        <Badge variant="neutral">Unit Economics Console</Badge>
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.1]">
          Stop guessing which AI customers <br className="hidden md:block" /> are <span className="text-foreground bg-gradient-to-r from-stone-800 to-stone-600 bg-clip-text supports-[background-clip:text]:text-transparent">burning your cash<span className="text-foreground">.</span></span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Turn usage logs + pricing into a per-customer gross margin table.
          Generate enforceable cap/overage policies in 10 minutes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Button size="lg" onClick={onStart} icon={ArrowRight}>
            Start Analysis
          </Button>
          <Button size="lg" variant="secondary" onClick={() => alert("Demo mode: Click Start Analysis to proceed.")}>
            View Sample Report
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full text-left">
        <Card className="p-8 space-y-4">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-accent">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">1. Set Margin Goals</h3>
          <p className="text-muted-foreground leading-relaxed">Define your target gross margin (e.g., 60%) to automatically flag dangerous accounts and outliers.</p>
        </Card>
        <Card className="p-8 space-y-4">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-accent">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">2. Upload Usage</h3>
          <p className="text-muted-foreground leading-relaxed">Drag & drop your raw usage CSV. We handle the parsing, cost mapping, and currency conversion.</p>
        </Card>
        <Card className="p-8 space-y-4">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-accent">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">3. Get Policy</h3>
          <p className="text-muted-foreground leading-relaxed">Instantly generate fair use terms and overage pricing to stop the bleeding and protect margins.</p>
        </Card>
      </div>

      <div className="mt-24 border-t border-border pt-12 w-full flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-mono tracking-widest gap-4">
        <span>TRUSTED BY AI TEAMS</span>
        <span className="hidden md:inline">•</span>
        <span>AUDIT READY EXPORTS</span>
        <span className="hidden md:inline">•</span>
        <span>SECURE PROCESSING</span>
      </div>
    </div>
  );
};