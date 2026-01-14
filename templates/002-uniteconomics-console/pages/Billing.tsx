import React, { useState } from 'react';
import { Button, Card } from '../components/ui';
import { Check, Shield } from 'lucide-react';

interface BillingProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const Billing: React.FC<BillingProps> = ({ onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  const handlePay = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-10 space-y-10 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto text-accent mb-6 rotate-3">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-medium text-foreground">Unlock Full Audit</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            One-time payment to audit all customers and generate enforceable policies.
          </p>
        </div>

        <div className="bg-muted/50 border border-border rounded-xl p-8 space-y-6">
          <div className="flex justify-between items-end border-b border-border pb-6">
            <span className="font-medium text-foreground">Single Report</span>
            <span className="text-4xl font-mono font-bold text-foreground">$49</span>
          </div>
          <ul className="space-y-4">
            {[
              "Complete customer margin ledger",
              "Unlimited rows export (CSV/PDF)",
              "AI-generated Cap & Overage Policy",
              "Shareable 'Read-Only' link"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full h-14 text-lg shadow-xl shadow-stone-900/20 hover:shadow-stone-900/30" 
            onClick={handlePay}
            isLoading={isProcessing}
          >
            Pay & Unlock Report
          </Button>
          <button 
            onClick={onCancel}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel and return to preview
          </button>
        </div>

        <div className="text-center border-t border-border pt-6">
             <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-mono">Secured by Stripe</span>
        </div>
      </Card>
    </div>
  );
};
