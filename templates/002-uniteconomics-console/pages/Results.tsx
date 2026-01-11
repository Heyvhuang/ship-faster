import React, { useState, useMemo } from 'react';
import { AppState, AnalysisSummary } from '../types';
import { Button, Card, Badge } from '../components/ui';
import { generatePolicy } from '../services/geminiService';
import { Download, AlertTriangle, FileText, Lock, ChevronDown, Check } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface ResultsProps {
  appState: AppState;
  onUpgrade: () => void;
  onUpdatePolicy: (policy: string) => void;
  onGoHome: () => void;
}

export const Results: React.FC<ResultsProps> = ({ appState, onUpgrade, onUpdatePolicy, onGoHome }) => {
  const [generatingPolicy, setGeneratingPolicy] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  // Derive summary metrics
  const summary: AnalysisSummary = useMemo(() => {
    const totalRev = appState.data.reduce((acc, c) => acc + c.revenue, 0);
    const totalCost = appState.data.reduce((acc, c) => acc + c.cost, 0);
    const margin = totalRev - totalCost;
    return {
      totalRevenue: totalRev,
      totalCost: totalCost,
      grossMargin: margin,
      grossMarginPercent: (margin / totalRev) * 100,
      lossMakingCount: appState.data.filter(c => c.margin < 0).length,
      biggestLoser: [...appState.data].sort((a, b) => a.margin - b.margin)[0],
      highestCostItem: 'GPT-4 Input Tokens'
    };
  }, [appState.data]);

  const sortedData = [...appState.data].sort((a, b) => a.margin - b.margin);

  // Handlers
  const handleGeneratePolicy = async () => {
    if (!appState.isPaid) {
      onUpgrade();
      return;
    }
    
    setGeneratingPolicy(true);
    const losers = appState.data.filter(c => c.margin < 0);
    const policy = await generatePolicy(losers, appState.targetMargin);
    onUpdatePolicy(policy);
    setGeneratingPolicy(false);
    setShowPolicyModal(true);
  };

  const formatMoney = (n: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: appState.currency }).format(n);

  return (
    <div className="min-h-screen bg-muted/30 pb-32">
      {/* Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 transition-all duration-300">
          <Card className="w-full max-w-3xl max-h-[85vh] flex flex-col p-0 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background">
              <h3 className="font-serif text-xl font-medium text-foreground flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent" /> Recommended Policy
              </h3>
              <button onClick={() => setShowPolicyModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">Close</button>
            </div>
            <div className="p-8 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground/80 bg-white">
              {appState.policyDraft}
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/30">
              <Button variant="outline" onClick={() => setShowPolicyModal(false)}>Cancel</Button>
              <Button onClick={() => { navigator.clipboard.writeText(appState.policyDraft || ""); setShowPolicyModal(false); }}>Copy to Clipboard</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-10 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoHome}
              className="font-serif text-xl font-bold text-foreground tracking-tight hover:text-foreground/70 transition-colors"
            >
              UnitEconomics
            </button>
            <Badge variant="neutral">Jan 2026</Badge>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="secondary" size="sm" icon={Download}>Export CSV</Button>
             <Button variant="primary" size="sm" icon={FileText} onClick={handleGeneratePolicy} isLoading={generatingPolicy}>
               {appState.isPaid ? 'Generate Policy' : 'Unlock Policy'}
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Gross Margin</span>
            <div className="flex items-end justify-between">
              <span className={`text-3xl font-mono font-medium ${summary.grossMarginPercent < appState.targetMargin ? 'text-amber-600' : 'text-emerald-600'}`}>
                {summary.grossMarginPercent.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground mb-1">Target: {appState.targetMargin}%</span>
            </div>
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-3">
              <div className={`h-full transition-all duration-1000 ease-out ${summary.grossMarginPercent < appState.targetMargin ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.max(0, summary.grossMarginPercent)}%` }}></div>
            </div>
          </Card>

          <Card className="p-6 space-y-2">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Net Profit/Loss</span>
            <div className="text-3xl font-mono font-medium text-foreground">
              {formatMoney(summary.grossMargin)}
            </div>
            <div className="text-xs text-muted-foreground">
               On {formatMoney(summary.totalRevenue)} Revenue
            </div>
          </Card>

          <Card className="p-6 space-y-2">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">At Risk Accounts</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-mono font-medium text-rose-600">
                {summary.lossMakingCount}
              </span>
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
             <div className="text-xs text-muted-foreground">
               Negative contribution margin
            </div>
          </Card>

          <Card className="p-6 space-y-2 border-border bg-muted/50">
             <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Biggest Bleeder</span>
             <div className="font-medium text-foreground truncate text-lg">
               {summary.biggestLoser?.name || 'None'}
             </div>
             <div className="text-sm text-rose-600 font-mono">
               {summary.biggestLoser ? formatMoney(summary.biggestLoser.margin) : '$0.00'} margin
             </div>
          </Card>
        </div>

        {/* Chart (Viz) */}
        <Card className="p-8">
           <div className="flex justify-between items-center mb-8">
             <h3 className="font-medium text-foreground text-lg">Margin Distribution</h3>
             <div className="text-xs text-muted-foreground font-mono">X: Customers sorted by Margin</div>
           </div>
           <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={sortedData}>
                  <XAxis dataKey="name" hide />
                  <YAxis tickFormatter={(val) => `$${val}`} style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', fontFamily: 'JetBrains Mono', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#0F172A' }}
                    formatter={(val: number) => [`$${val}`, 'Margin']}
                  />
                  <Line type="step" dataKey="margin" stroke="#0F172A" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#0052FF' }} />
                  {/* Zero line */}
                  <Line type="monotone" dataKey={() => 0} stroke="#CBD5E1" strokeDasharray="4 4" strokeWidth={1} dot={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </Card>

        {/* The Ledger Table */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground text-lg">Customer Ledger</h3>
            {!appState.isPaid && (
              <Badge variant="neutral">
                Showing Top 5 of {appState.data.length} records
              </Badge>
            )}
          </div>
          
          <div className="relative">
            {/* Paywall Overlay */}
            {!appState.isPaid && (
               <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/95 to-transparent z-10 flex flex-col items-center justify-end pb-12 space-y-6">
                 <div className="flex items-center gap-3 text-foreground font-medium bg-white/50 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                   <Lock className="w-4 h-4 text-accent" />
                   <span>Unlock Full Ledger & Policy Generator</span>
                 </div>
                 <Button onClick={onUpgrade} className="shadow-xl px-8 h-12 text-base">
                   Get Full Access for $49
                 </Button>
               </div>
            )}

            <Card className="overflow-hidden border-0 shadow-none ring-1 ring-border">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-medium text-muted-foreground font-mono text-[10px] uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground font-mono text-[10px] uppercase tracking-wider text-right">Revenue</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground font-mono text-[10px] uppercase tracking-wider text-right">Cost</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground font-mono text-[10px] uppercase tracking-wider text-right">Margin $</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground font-mono text-[10px] uppercase tracking-wider text-right">Margin %</th>
                      <th className="px-6 py-4 font-medium text-muted-foreground font-mono text-[10px] uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sortedData.map((row) => (
                      <tr key={row.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4 font-medium text-foreground">
                          {row.name}
                          <div className="text-xs text-muted-foreground font-normal mt-0.5">{row.plan}</div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-right tabular-nums">{formatMoney(row.revenue)}</td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-right tabular-nums">{formatMoney(row.cost)}</td>
                        <td className={`px-6 py-4 font-mono text-right tabular-nums font-medium ${row.margin < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {formatMoney(row.margin)}
                        </td>
                         <td className="px-6 py-4 text-right">
                           <Badge variant={row.marginPercent < 0 ? 'danger' : row.marginPercent < appState.targetMargin ? 'warning' : 'success'}>
                             {row.marginPercent.toFixed(1)}%
                           </Badge>
                        </td>
                        <td className="px-6 py-4">
                           {row.isFlagged ? (
                             <button onClick={handleGeneratePolicy} className="text-xs font-medium text-foreground underline decoration-border hover:decoration-foreground hover:text-accent transition-all">
                               Cap Usage
                             </button>
                           ) : (
                             <span className="text-muted-foreground/50 text-xs flex items-center gap-1"><Check className="w-3 h-3"/> Healthy</span>
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
