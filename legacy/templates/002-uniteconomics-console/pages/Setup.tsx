import React, { useState } from 'react';
import { Button, Card, Input } from '../components/ui';
import { Upload, ArrowRight, Settings2 } from 'lucide-react';

interface SetupProps {
  onComplete: (margin: number) => void;
}

export const Setup: React.FC<SetupProps> = ({ onComplete }) => {
  const [margin, setMargin] = useState('60');
  const [fileAttached, setFileAttached] = useState(false);

  const handleNext = () => {
    if (fileAttached && margin) {
      onComplete(parseInt(margin));
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col md:flex-row gap-16 max-w-7xl mx-auto items-center">
      {/* Left: Goals */}
      <div className="flex-1 space-y-10">
        <div className="space-y-4">
          <h2 className="font-serif text-4xl font-medium text-foreground">Configure Analysis</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">Define what "healthy" looks like for your business to establish a baseline.</p>
        </div>

        <div className="space-y-8">
          <Input 
            label="Target Gross Margin (%)"
            type="number" 
            value={margin} 
            onChange={(e) => setMargin(e.target.value)}
            placeholder="e.g. 60"
            className="text-lg font-mono"
          />
          <div className="flex gap-6">
            <Input label="Currency" defaultValue="USD" disabled className="bg-muted text-muted-foreground" />
            <Input label="Period" defaultValue="Last 30 Days" disabled className="bg-muted text-muted-foreground" />
          </div>
        </div>

        <div className="bg-muted p-6 rounded-xl border border-border text-sm text-muted-foreground flex gap-4">
          <Settings2 className="w-6 h-6 shrink-0 text-accent" />
          <p className="leading-relaxed">
            We calculate margin as: <br/>
            <span className="font-mono text-foreground font-medium">(Revenue - Model_Cost) / Revenue</span>
          </p>
        </div>
      </div>

      {/* Right: Input */}
      <div className="flex-1 flex flex-col justify-center w-full">
        <Card className="p-10 space-y-8 border-dashed border-2 shadow-sm hover:bg-muted/30 transition-colors cursor-pointer group">
          <div className="text-center space-y-4 py-8">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground group-hover:bg-white group-hover:text-accent transition-colors duration-300">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-medium text-foreground">Upload Usage Logs</h3>
            <p className="text-muted-foreground px-8 leading-relaxed">
              CSV with columns: <code className="bg-muted px-2 py-1 rounded text-foreground font-mono text-xs">customer_id</code>, <code className="bg-muted px-2 py-1 rounded text-foreground font-mono text-xs">usage_cost</code>, <code className="bg-muted px-2 py-1 rounded text-foreground font-mono text-xs">plan_revenue</code>
            </p>
          </div>
          <div className="flex flex-col gap-4">
             <input 
                type="file" 
                id="usage-upload" 
                className="hidden" 
                onChange={() => setFileAttached(true)}
              />
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => document.getElementById('usage-upload')?.click()}
              >
                {fileAttached ? 'File Selected: usage_export_oct.csv' : 'Select CSV File'}
              </Button>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase tracking-widest">Or</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => setFileAttached(true)}
              >
                Use Mock Data (Demo)
              </Button>
          </div>
        </Card>

        <div className="mt-10 flex justify-end">
          <Button 
            size="lg" 
            disabled={!fileAttached} 
            onClick={handleNext}
            icon={ArrowRight}
            className="w-full md:w-auto"
          >
            Run Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};
