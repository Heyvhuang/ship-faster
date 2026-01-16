import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { generateMockData } from './services/mockData';
import { generateCapPolicy } from './services/geminiService';
import { ProfitHeatmap } from './components/ProfitHeatmap';
import { ViewState, AppConfig, AnalysisSummary, CustomerMetric } from './types';
import { 
  ArrowRight, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Lock, 
  Download,
  Share2,
  Cpu,
  RefreshCw,
  LayoutGrid,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

// --- Sub-components defined here for simplicity of the single-file requirement structure, 
// normally would be split, but fits the instructions best to keep the XML clean.

const Landing = ({ onStart, onViewDemo }: { onStart: () => void; onViewDemo: () => void }) => (
  <div className="max-w-4xl mx-auto px-4 py-20 text-center">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 mb-8 animate-fade-in-up">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      Live Unit Economics Console
    </div>
    <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
      Stop guessing which AI customers <br/> are killing your margins.
    </h1>
    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
      Turn usage records and pricing plans into a per-customer gross-margin table 
      and a ready-to-apply cap policy in 10 minutes.
    </p>
    <div className="flex justify-center gap-4">
      <Button size="lg" onClick={onStart} className="group">
        Start Analysis 
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button variant="outline" size="lg" onClick={onViewDemo}>View Demo Data</Button>
    </div>
    
    <div className="mt-20 p-2 bg-slate-200 rounded-xl max-w-3xl mx-auto shadow-xl">
      <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
        <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        </div>
        <div className="p-8 flex flex-col items-center justify-center space-y-4">
             <div className="w-full h-4 bg-slate-100 rounded-sm w-3/4"></div>
             <div className="w-full h-4 bg-slate-100 rounded-sm"></div>
             <div className="w-full h-4 bg-slate-100 rounded-sm w-5/6"></div>
             <div className="grid grid-cols-4 gap-4 w-full mt-4">
                <div className="h-20 bg-emerald-50 border border-emerald-100 rounded"></div>
                <div className="h-20 bg-red-50 border border-red-100 rounded"></div>
                <div className="h-20 bg-slate-50 border border-slate-100 rounded"></div>
                <div className="h-20 bg-slate-50 border border-slate-100 rounded"></div>
             </div>
        </div>
      </div>
    </div>
  </div>
);

const InputFlow = ({ 
  config, 
  setConfig, 
  onNext 
}: { 
  config: AppConfig, 
  setConfig: (c: AppConfig) => void, 
  onNext: () => void 
}) => {
  const [usageFile, setUsageFile] = useState<File | null>(null);
  const [revenueFile, setRevenueFile] = useState<File | null>(null);

  const isReady = config.marginTarget > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Goals */}
        <div className="space-y-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">1. Define Success</h2>
            <p className="text-slate-500">Set your margin guardrails.</p>
          </div>

          <Card className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Target Gross Margin (%)
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  value={config.marginTarget}
                  onChange={(e) => setConfig({ ...config, marginTarget: Number(e.target.value) })}
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent font-mono text-lg transition-all duration-200"
                  placeholder="20"
                />
                <div className="absolute right-3 top-3.5 text-slate-400 font-mono">%</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Industry standard for AI SaaS is typically 20-40% gross margin initially.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Currency
              </label>
              <select 
                value={config.currency}
                onChange={(e) => setConfig({ ...config, currency: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </Card>
        </div>

        {/* Right: Input */}
        <div className="space-y-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">2. Upload Data</h2>
            <p className="text-slate-500">Provide evidence to reconcile.</p>
          </div>

          <Card className="space-y-4">
            <div className="p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors relative">
              <input 
                type="file" 
                onChange={(e) => setUsageFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center py-6 text-slate-500">
                {usageFile ? (
                   <>
                    <CheckCircle2 className="text-emerald-600 mb-2" size={24} />
                    <span className="text-slate-900 font-medium">{usageFile.name}</span>
                   </>
                ) : (
                  <>
                    <Cpu className="mb-2" size={24} />
                    <span className="font-medium">Upload Usage Logs (CSV)</span>
                    <span className="text-xs mt-1 text-slate-400">Optional - Demo data will be used if skipped</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors relative">
              <input 
                type="file" 
                onChange={(e) => setRevenueFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center py-6 text-slate-500">
                {revenueFile ? (
                   <>
                    <CheckCircle2 className="text-emerald-600 mb-2" size={24} />
                    <span className="text-slate-900 font-medium">{revenueFile.name}</span>
                   </>
                ) : (
                  <>
                    <DollarSign className="mb-2" size={24} />
                    <span className="font-medium">Upload Revenue/Pricing (Optional)</span>
                    <span className="text-xs mt-1">If skipped, we'll use default plan mocks.</span>
                  </>
                )}
              </div>
            </div>
          </Card>

          <div className="pt-4 flex flex-col gap-2">
            <Button size="lg" disabled={!isReady} onClick={onNext} className="w-full">
              {usageFile ? 'Calculate Margins' : 'Calculate with Demo Data'}
              <ArrowRight size={16} className="ml-2" />
            </Button>
            {!usageFile && (
              <p className="text-xs text-slate-400 text-center">
                No file? No problem. We'll use sample data from 50 AI SaaS customers.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessingView = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Parsing usage logs...",
    "Matching Customer IDs...",
    "Aggregating costs by Plan...",
    "Calculating unit margins...",
    "Audit complete."
  ];

  useEffect(() => {
    if (step < steps.length) {
      const timeout = setTimeout(() => setStep(s => s + 1), 800);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [step]);

  return (
    <div className="max-w-md mx-auto px-4 py-32 text-center">
      <div className="mb-8 relative h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-slate-900 transition-all duration-500 ease-out"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />
      </div>
      <h3 className="text-xl font-medium text-slate-900 mb-2 animate-pulse">
        {step < steps.length ? steps[step] : "Finalizing..."}
      </h3>
      <p className="text-slate-500 text-sm">Processing 50 accounts</p>
    </div>
  );
};

const ResultsDashboard = ({ 
  data, 
  config 
}: { 
  data: AnalysisSummary, 
  config: AppConfig 
}) => {
  const [generatedPolicy, setGeneratedPolicy] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [chartView, setChartView] = useState<'heatmap' | 'bar'>('heatmap');

  const handleGeneratePolicy = async () => {
    setIsGenerating(true);
    const policy = await generateCapPolicy(data);
    setGeneratedPolicy(policy);
    setIsGenerating(false);
  };

  const ChartData = data.customers
    .slice(0, 10) // Only top 10 for cleanliness
    .map(c => ({
      name: c.id.split('-')[1],
      margin: c.marginPercent,
      fill: c.marginPercent < 0 ? '#DC2626' : (c.marginPercent < config.marginTarget ? '#d97706' : '#059669')
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Overall Margin">
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-mono font-bold ${data.overallMarginPercent < config.marginTarget ? 'text-amber-600' : 'text-emerald-600'}`}>
              {data.overallMarginPercent.toFixed(1)}%
            </span>
            <span className="text-slate-400 text-sm">target {config.marginTarget}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1 mt-3 rounded-full overflow-hidden">
            <div 
              className={`h-full ${data.overallMarginPercent < config.marginTarget ? 'bg-amber-500' : 'bg-emerald-500'}`} 
              style={{ width: `${Math.min(data.overallMarginPercent, 100)}%` }}
            ></div>
          </div>
        </Card>
        
        <Card title="Total Revenue">
          <div className="text-3xl font-mono font-bold text-slate-900">
            ${data.totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center text-xs text-emerald-600 mt-2">
            <TrendingUp size={12} className="mr-1" /> On track
          </div>
        </Card>

        <Card title="Total Cost">
          <div className="text-3xl font-mono font-bold text-slate-900">
             ${data.totalCost.toLocaleString()}
          </div>
          <div className="flex items-center text-xs text-slate-500 mt-2">
            Largest: {data.largestCostItem}
          </div>
        </Card>

        <Card title="Accounts at Risk">
          <div className="text-3xl font-mono font-bold text-red-600">
            {data.topLosers.length}
          </div>
          <div className="flex items-center text-xs text-red-700 mt-2 font-medium">
             <AlertTriangle size={12} className="mr-1" />
             Requires Cap Strategy
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Customer Margin Ledger</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => window.print()}><Download size={14} className="mr-1"/> Export</Button>
                <Button size="sm" variant="outline"><Share2 size={14} className="mr-1"/> Share</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Plan</th>
                    <th className="px-6 py-3 text-right">Revenue</th>
                    <th className="px-6 py-3 text-right">Cost</th>
                    <th className="px-6 py-3 text-right">Margin $</th>
                    <th className="px-6 py-3 text-right">Margin %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.customers.slice(0, unlocked ? undefined : 8).map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-900">{customer.name}</td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                          {customer.plan}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right font-mono text-slate-600">${customer.revenue}</td>
                      <td className="px-6 py-3 text-right font-mono text-slate-600">${customer.cost}</td>
                      <td className="px-6 py-3 text-right font-mono font-medium">
                         ${customer.margin}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono
                          ${customer.status === 'danger' ? 'bg-red-100 text-red-800' : 
                            customer.status === 'warning' ? 'bg-amber-100 text-amber-800' : 
                            'bg-emerald-100 text-emerald-800'}`}>
                          {customer.marginPercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!unlocked && (
                <div className="bg-slate-50 p-8 text-center border-t border-slate-200">
                   <p className="text-slate-500 mb-4">...and 42 more rows hidden.</p>
                   <Button onClick={() => setUnlocked(true)}>
                     <Lock size={14} className="mr-2"/> Unlock Full Ledger ($19)
                   </Button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
             <div className="flex justify-between items-center mb-6">
               <h4 className="text-sm font-semibold uppercase text-slate-500 tracking-wider">
                 {chartView === 'heatmap' ? 'Customer Profit Map' : 'Margin Distribution'}
               </h4>
               <div className="flex bg-slate-100 p-1 rounded-lg">
                 <button
                   onClick={() => setChartView('heatmap')}
                   className={`p-2 rounded-md transition-all ${
                     chartView === 'heatmap' 
                       ? 'bg-white shadow-sm text-slate-900' 
                       : 'text-slate-500 hover:text-slate-700'
                   }`}
                   title="Heatmap View"
                 >
                   <LayoutGrid size={16} />
                 </button>
                 <button
                   onClick={() => setChartView('bar')}
                   className={`p-2 rounded-md transition-all ${
                     chartView === 'bar' 
                       ? 'bg-white shadow-sm text-slate-900' 
                       : 'text-slate-500 hover:text-slate-700'
                   }`}
                   title="Bar Chart View"
                 >
                   <BarChart3 size={16} />
                 </button>
               </div>
             </div>

             {chartView === 'heatmap' ? (
               <div className="animate-fade-in-up">
                 <ProfitHeatmap 
                   customers={data.customers} 
                   targetMargin={config.marginTarget} 
                 />
                 <p className="text-xs text-slate-400 mt-4 text-center">
                   Size represents Revenue • Color represents Margin Health
                 </p>
               </div>
             ) : (
               <div className="h-64 animate-fade-in-up">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis fontSize={10} tickLine={false} axisLine={false} unit="%" />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                      />
                      <ReferenceLine y={config.marginTarget} stroke="#94a3b8" strokeDasharray="3 3" />
                      <Bar dataKey="margin" radius={[2, 2, 0, 0]}>
                        {ChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
             )}
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
           <Card title="Action Required" className="bg-slate-900 border-slate-900 text-white">
             <div className="space-y-4">
               <p className="text-slate-300 text-sm">
                 You have {data.topLosers.length} customers below 0% margin. 
                 Without intervention, these will cost you projected <strong>${Math.abs(data.topLosers.reduce((a,b) => a+b.margin, 0) * 12).toLocaleString()}</strong> annually.
               </p>
               <Button 
                variant="secondary" 
                className="w-full" 
                onClick={handleGeneratePolicy}
                disabled={isGenerating}
              >
                 {isGenerating ? (
                   <span className="flex items-center"><RefreshCw className="animate-spin mr-2 h-4 w-4"/> Analyzing...</span>
                 ) : (
                   "Generate Stop-Loss Policy"
                 )}
               </Button>
             </div>
           </Card>

           {generatedPolicy && (
             <div className="animate-fade-in-up bg-white border border-slate-200 shadow-lg rounded-lg overflow-hidden">
               <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center gap-2">
                 <FileText size={14} className="text-amber-700"/>
                 <span className="text-xs font-bold text-amber-900 uppercase">Suggested Terms Update</span>
               </div>
               <div className="p-4">
                 <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
                   {generatedPolicy}
                 </pre>
                 <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                   <span className="text-xs text-slate-400">Generated by Gemini 2.0</span>
                   <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(generatedPolicy)}>Copy</Button>
                 </div>
               </div>
             </div>
           )}

           <Card title="Top Losers" subtitle="Immediate Review Needed">
              <div className="space-y-3">
                {data.topLosers.map(loser => (
                  <div key={loser.id} className="flex justify-between items-center p-2 rounded bg-red-50 border border-red-100">
                    <div>
                      <div className="text-sm font-medium text-red-900">{loser.name}</div>
                      <div className="text-xs text-red-700">{loser.plan} Plan</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-red-800">{loser.marginPercent}%</div>
                      <div className="text-xs text-red-600">Loss: ${Math.abs(loser.margin)}</div>
                    </div>
                  </div>
                ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [config, setConfig] = useState<AppConfig>({ marginTarget: 20, currency: 'USD' });
  const [analysisData, setAnalysisData] = useState<AnalysisSummary | null>(null);

  const startAnalysis = () => {
    const data = generateMockData(config.marginTarget);
    setAnalysisData(data);
    setView('processing');
  };

  const viewDemo = () => {
    const demoConfig = { marginTarget: 20, currency: 'USD' };
    setConfig(demoConfig);
    const data = generateMockData(demoConfig.marginTarget);
    setAnalysisData(data);
    setView('results');
  };

  return (
    <Layout onGoHome={() => setView('landing')}>
      {view === 'landing' && <Landing onStart={() => setView('input')} onViewDemo={viewDemo} />}
      
      {view === 'input' && (
        <InputFlow 
          config={config} 
          setConfig={setConfig} 
          onNext={startAnalysis} 
        />
      )}

      {view === 'processing' && (
        <ProcessingView onComplete={() => setView('results')} />
      )}

      {view === 'results' && analysisData && (
        <ResultsDashboard data={analysisData} config={config} />
      )}
    </Layout>
  );
};

export default App;