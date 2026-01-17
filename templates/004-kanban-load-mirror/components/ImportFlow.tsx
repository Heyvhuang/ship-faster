import React, { useState } from 'react';
import { Upload, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, FileJson, Sparkles, Home } from 'lucide-react';
import { KanbanCard, MOCK_DATA } from '../types';

interface ImportFlowProps {
  onComplete: (data: KanbanCard[], config: any) => void;
  onBack: () => void;
}

export const ImportFlow: React.FC<ImportFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [rawData, setRawData] = useState<string>('');
  const [parsedData, setParsedData] = useState<KanbanCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [inProgressStatuses, setInProgressStatuses] = useState<string[]>([]);
  const [doneStatuses, setDoneStatuses] = useState<string[]>([]);
  const [agingThreshold, setAgingThreshold] = useState<number>(7);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        setRawData(text);
        setError(null);
      } catch (err) {
        setError("Failed to read file");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        setRawData(text);
      };
      reader.readAsText(file);
    }
  };

  const loadSample = () => {
    setParsedData(MOCK_DATA);
    extractStatuses(MOCK_DATA);
    setStep(2);
  };

  const processInput = () => {
    if (!rawData) {
      setError("Please enter data or upload a file");
      return;
    }
    
    try {
      const json = JSON.parse(rawData);
      if (Array.isArray(json)) {
        const validData = json.map((item: any, idx) => ({
          id: item.id || `ITEM-${idx}`,
          title: item.title || item.summary || 'Untitled',
          assignee: item.assignee || 'Unassigned',
          status: item.status || 'To Do',
          isBlocked: !!item.isBlocked,
          daysInStatus: Number(item.daysInStatus) || 0
        }));
        setParsedData(validData);
        extractStatuses(validData);
        setStep(2);
        setError(null);
      } else {
        setError("JSON must be an array of cards.");
      }
    } catch (e) {
      setError("Invalid JSON format. Try the sample data for this demo.");
    }
  };

  const extractStatuses = (data: KanbanCard[]) => {
    const statuses = Array.from(new Set(data.map(c => c.status)));
    setStatusOptions(statuses);
    setInProgressStatuses(statuses.filter(s => s.toLowerCase().includes('progress') || s.toLowerCase().includes('doing') || s.toLowerCase().includes('review')));
    setDoneStatuses(statuses.filter(s => s.toLowerCase().includes('done') || s.toLowerCase().includes('closed')));
  };

  const handleFinish = () => {
    onComplete(parsedData, {
      inProgressStatuses,
      doneStatuses,
      agingThreshold
    });
  };

  const toggleStatus = (status: string, type: 'inProgress' | 'done') => {
    if (type === 'inProgress') {
      setInProgressStatuses(prev => 
        prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
      );
    } else {
      setDoneStatuses(prev => 
        prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className={`flex items-center space-x-2 ${step === 1 ? 'text-[#00f0ff]' : 'text-[#5a5a70]'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${step === 1 ? 'bg-[#00f0ff]/20 text-[#00f0ff] glow-cyan' : 'bg-[#1a1a24]'}`}>
              {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '01'}
            </div>
            <span className="text-sm font-medium hidden sm:inline">Import</span>
          </div>
          <div className="w-12 h-px bg-gradient-to-r from-[#00f0ff]/50 to-[#a0ff00]/50"></div>
          <div className={`flex items-center space-x-2 ${step === 2 ? 'text-[#a0ff00]' : 'text-[#5a5a70]'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${step === 2 ? 'bg-[#a0ff00]/20 text-[#a0ff00] glow-lime' : 'bg-[#1a1a24]'}`}>
              02
            </div>
            <span className="text-sm font-medium hidden sm:inline">Configure</span>
          </div>
        </div>

        <div className="bg-[#12121a] rounded-2xl border border-white/5 overflow-hidden">
          <div className="bg-[#0a0a0f] px-6 py-4 border-b border-white/5">
            <h2 className="text-xl font-bold text-[#f0f0f5]">
              {step === 1 ? 'Import Board Data' : 'Configure Mirror'}
            </h2>
            <p className="text-sm text-[#5a5a70] mt-1">
              {step === 1 ? 'Paste JSON or upload your board export' : 'Define what counts as active work'}
            </p>
          </div>

          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                    isDragging 
                      ? 'border-[#00f0ff] bg-[#00f0ff]/5' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <textarea 
                    className="w-full h-48 p-4 bg-transparent text-sm font-mono text-[#f0f0f5] placeholder-[#5a5a70] focus:outline-none resize-none"
                    placeholder='[{"id": "TASK-1", "title": "Fix login bug", "status": "In Progress", "assignee": "Sarah", "daysInStatus": 3}]'
                    value={rawData}
                    onChange={(e) => setRawData(e.target.value)}
                  />
                  {!rawData && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <FileJson className="w-10 h-10 text-[#5a5a70] mx-auto mb-2" />
                        <p className="text-[#5a5a70] text-sm">Drop JSON file or paste data</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".json,.csv"
                      onChange={handleFileUpload} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <button className="px-4 py-2.5 bg-[#1a1a24] border border-white/10 rounded-xl text-sm font-medium text-[#8888a0] hover:text-[#f0f0f5] hover:border-white/20 flex items-center space-x-2 transition-all">
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </button>
                  </div>
                  
                  <span className="text-sm text-[#5a5a70]">or</span>
                  
                  <button 
                    onClick={loadSample} 
                    className="px-4 py-2.5 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-xl text-sm font-medium text-[#00f0ff] hover:bg-[#00f0ff]/20 flex items-center space-x-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Use Sample Data</span>
                  </button>
                </div>

                {error && (
                  <div className="flex items-center space-x-3 text-[#ff00aa] text-sm bg-[#ff00aa]/10 border border-[#ff00aa]/20 p-4 rounded-xl">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                <div className="pt-4 flex justify-between items-center">
                  <button 
                    onClick={onBack}
                    className="flex items-center space-x-2 text-sm text-[#5a5a70] hover:text-[#f0f0f5] transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>
                  <button 
                    onClick={processInput} 
                    className="px-6 py-3 bg-[#00f0ff] text-[#0a0a0f] rounded-xl font-bold hover:bg-[#00f0ff]/90 flex items-center space-x-2 transition-all glow-cyan"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#00f0ff]"></div>
                    <h3 className="text-sm font-bold text-[#f0f0f5] uppercase tracking-wider">Status Mapping</h3>
                  </div>
                  <p className="text-sm text-[#5a5a70]">Select which columns represent active work vs completed.</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider">In Progress</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {statusOptions.map(status => (
                          <div 
                            key={`ip-${status}`} 
                            onClick={() => toggleStatus(status, 'inProgress')}
                            className={`p-3 rounded-xl border text-sm cursor-pointer transition-all flex items-center justify-between ${
                              inProgressStatuses.includes(status) 
                                ? 'border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff]' 
                                : 'border-white/10 hover:border-white/20 text-[#8888a0]'
                            }`}
                          >
                            <span className="font-mono text-xs">{status}</span>
                            {inProgressStatuses.includes(status) && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-xs font-mono text-[#a0ff00] uppercase tracking-wider">Done / Excluded</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {statusOptions.map(status => (
                          <div 
                            key={`done-${status}`} 
                            onClick={() => toggleStatus(status, 'done')}
                            className={`p-3 rounded-xl border text-sm cursor-pointer transition-all flex items-center justify-between ${
                              doneStatuses.includes(status) 
                                ? 'border-[#a0ff00]/50 bg-[#a0ff00]/10 text-[#a0ff00]' 
                                : 'border-white/10 hover:border-white/20 text-[#8888a0]'
                            }`}
                          >
                            <span className="font-mono text-xs">{status}</span>
                            {doneStatuses.includes(status) && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#ffaa00]"></div>
                    <h3 className="text-sm font-bold text-[#f0f0f5] uppercase tracking-wider">Aging Threshold</h3>
                  </div>
                  <div className="flex items-center space-x-6">
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={agingThreshold} 
                      onChange={(e) => setAgingThreshold(Number(e.target.value))}
                      className="flex-1 h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-[#ffaa00]"
                      style={{
                        background: `linear-gradient(to right, #ffaa00 0%, #ffaa00 ${(agingThreshold / 30) * 100}%, #1a1a24 ${(agingThreshold / 30) * 100}%, #1a1a24 100%)`
                      }}
                    />
                    <div className="font-mono text-2xl font-bold text-[#ffaa00] w-16 text-right">{agingThreshold}d</div>
                  </div>
                  <p className="text-xs text-[#5a5a70]">Cards older than this threshold will be flagged as risk.</p>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <button 
                    onClick={() => setStep(1)} 
                    className="flex items-center space-x-2 text-sm text-[#5a5a70] hover:text-[#f0f0f5] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleFinish} 
                    className="px-6 py-3 bg-[#a0ff00] text-[#0a0a0f] rounded-xl font-bold hover:bg-[#a0ff00]/90 flex items-center space-x-2 transition-all glow-lime"
                  >
                    <span>Generate Mirror</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
