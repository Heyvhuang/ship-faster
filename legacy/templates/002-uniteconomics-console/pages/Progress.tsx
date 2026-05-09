import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ProgressProps {
  onComplete: () => void;
}

export const Progress: React.FC<ProgressProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Parsing CSV structure...",
    "Mapping customers to plans...",
    "Calculating individual margins...",
    "Identifying outliers & abuse...",
    "Finalizing ledger..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="font-serif text-3xl font-medium text-foreground">Processing Ledger</h2>
          <p className="text-muted-foreground text-lg">Please wait while we reconcile your usage data.</p>
        </div>

        <div className="space-y-6 pl-8 border-l-2 border-border ml-8">
          {steps.map((label, index) => {
            const isCompleted = index < step;
            const isCurrent = index === step;
            const isPending = index > step;

            return (
              <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${isPending ? 'opacity-30 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-accent animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-border" />
                  )}
                </div>
                <span className={`text-base font-mono ${isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
