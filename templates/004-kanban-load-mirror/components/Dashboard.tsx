import React, { useMemo, useState } from 'react';
import { 
  AlertTriangle, Clock, Share2, 
  LayoutTemplate, MessageSquare, Briefcase, Activity, Users, AlertCircle, Plus
} from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';
import { KanbanCard, AgendaItem } from '../types';
import { ParticleField } from './ParticleField';

interface DashboardProps {
  data: KanbanCard[];
  config: {
    inProgressStatuses: string[];
    agingThreshold: number;
  };
  agenda: AgendaItem[];
  onUpgrade: () => void;
  onNewAnalysis: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, config, agenda, onUpgrade, onNewAnalysis }) => {
  const [hoveredCard, setHoveredCard] = useState<KanbanCard | null>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);

  const activeCards = useMemo(() => 
    data.filter(c => config.inProgressStatuses.includes(c.status)),
  [data, config]);

  const cardsByPerson = useMemo(() => {
    const grouped: Record<string, KanbanCard[]> = {};
    activeCards.forEach(c => {
      if (!grouped[c.assignee]) grouped[c.assignee] = [];
      grouped[c.assignee].push(c);
    });
    return grouped;
  }, [activeCards]);

  const stats = useMemo(() => {
    const overloadedLimit = 3;
    return {
      totalWip: activeCards.length,
      overloaded: Object.keys(cardsByPerson).filter(p => cardsByPerson[p].length > overloadedLimit).length,
      blockers: activeCards.filter(c => c.isBlocked).length,
      avgAge: activeCards.length > 0 ? Math.round(activeCards.reduce((acc, c) => acc + c.daysInStatus, 0) / activeCards.length) : 0,
      oldestCard: activeCards.sort((a,b) => b.daysInStatus - a.daysInStatus)[0]
    };
  }, [activeCards, cardsByPerson]);

  const chartData = (Object.entries(cardsByPerson) as [string, KanbanCard[]][]).map(([name, cards]) => ({
    name: name.split(' ')[0],
    count: cards.length,
    blocked: cards.filter(c => c.isBlocked).length
  })).sort((a,b) => b.count - a.count);

  const AgingTicks = ({ days }: { days: number }) => {
    const tickCount = Math.min(days, 20);
    const isOld = days > config.agingThreshold;
    
    return (
      <div className="flex space-x-[2px] items-end h-4" title={`${days} days in status`}>
        {Array.from({ length: tickCount }).map((_, i) => (
          <div 
            key={i} 
            className={`w-[2px] rounded-full transition-all ${
              isOld ? 'bg-[#ff00aa]' : 'bg-[#5a5a70]'
            } ${(i + 1) % 5 === 0 ? 'h-full' : 'h-2/3'}`}
          />
        ))}
        {days > 20 && <span className="text-[10px] text-[#5a5a70] ml-1">+</span>}
      </div>
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bottleneck': return '#ffaa00';
      case 'aging': return '#ff00aa';
      case 'risk': return '#ff00aa';
      default: return '#00f0ff';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] pb-20">
      <nav className="sticky top-0 z-20 glass border-b border-white/5 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/20 flex items-center justify-center">
            <LayoutTemplate className="w-4 h-4 text-[#00f0ff]" />
          </div>
          <span className="font-bold text-[#f0f0f5]">Load Mirror</span>
          <span className="text-xs text-[#5a5a70] px-2 border-l border-white/10 font-mono">Weekly Snapshot</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onNewAnalysis} 
            className="text-sm font-medium text-[#5a5a70] hover:text-[#f0f0f5] px-3 py-1.5 transition-colors flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Analysis</span>
          </button>
          <button onClick={onUpgrade} className="text-sm font-medium text-[#5a5a70] hover:text-[#f0f0f5] px-3 py-1.5 transition-colors">
            History
          </button>
          <button onClick={onUpgrade} className="bg-[#00f0ff] text-[#0a0a0f] text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#00f0ff]/90 transition-all flex items-center space-x-2 glow-cyan">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Cards', value: stats.totalWip, icon: Activity, color: '#00f0ff' },
            { label: 'Overloaded', value: stats.overloaded, unit: 'people', icon: Users, color: stats.overloaded > 0 ? '#ffaa00' : '#5a5a70' },
            { label: 'Blockers', value: stats.blockers, unit: 'cards', icon: AlertCircle, color: stats.blockers > 0 ? '#ff00aa' : '#5a5a70' },
            { label: 'Avg Aging', value: stats.avgAge, unit: 'days', icon: Clock, color: stats.avgAge > config.agingThreshold ? '#ffaa00' : '#5a5a70' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-[#12121a] p-5 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#5a5a70] uppercase tracking-wider">{stat.label}</span>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <div className="flex items-baseline space-x-2">
                <span 
                  className="text-4xl font-bold tracking-tight font-mono animate-count"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                {stat.unit && <span className="text-sm text-[#5a5a70]">{stat.unit}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#12121a] rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-[#00f0ff]" />
              <h2 className="text-lg font-bold">Workload Flow Field</h2>
              <span className="text-xs text-[#5a5a70] font-mono bg-[#1a1a24] px-2 py-1 rounded">LIVE</span>
            </div>
            {hoveredCard && (
              <div className="text-sm text-[#8888a0] animate-fade-in">
                <span className="text-[#f0f0f5] font-medium">{hoveredCard.title}</span>
                <span className="mx-2">·</span>
                <span className="font-mono text-xs">{hoveredCard.id}</span>
              </div>
            )}
          </div>
          <div className="h-[450px]">
            <ParticleField 
              data={data}
              config={config}
              onCardHover={setHoveredCard}
              onCardClick={setSelectedCard}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-[#8888a0]" />
                <h2 className="text-lg font-bold">Team Load</h2>
              </div>
              <div className="h-10 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.count > 3 ? '#ffaa00' : '#00f0ff'} 
                          fillOpacity={0.6}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#12121a] border border-white/5 rounded-xl overflow-hidden">
              {(Object.entries(cardsByPerson) as [string, KanbanCard[]][])
                .sort((a, b) => b[1].length - a[1].length)
                .map(([person, cards]) => {
                  const isOverloaded = cards.length > 3;
                  return (
                    <div 
                      key={person} 
                      className="group border-b border-white/5 last:border-0 p-6 hover:bg-[#1a1a24]/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                            isOverloaded 
                              ? 'bg-[#ffaa00]/20 text-[#ffaa00]' 
                              : 'bg-[#1a1a24] text-[#8888a0]'
                          }`}>
                            {person.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-[#f0f0f5]">{person}</h3>
                            <div className="text-xs text-[#5a5a70] font-mono">{cards.length} Active</div>
                          </div>
                        </div>
                        {isOverloaded && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-[#ffaa00]/10 text-[#ffaa00] border border-[#ffaa00]/20">
                            High Load
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-3 pl-13">
                        {cards.map(card => (
                          <div 
                            key={card.id} 
                            className={`flex items-start justify-between group/card p-3 -mx-3 rounded-lg hover:bg-[#0a0a0f]/50 transition-all cursor-pointer ${
                              selectedCard?.id === card.id ? 'bg-[#0a0a0f]/50 ring-1 ring-[#00f0ff]/30' : ''
                            }`}
                            onClick={() => setSelectedCard(card)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                                card.isBlocked ? 'bg-[#ff00aa] glow-magenta' : 
                                card.daysInStatus > config.agingThreshold ? 'bg-[#ffaa00]' : 'bg-[#00f0ff]'
                              }`} />
                              <div>
                                <p className={`text-sm ${
                                  card.isBlocked ? 'text-[#ff00aa] font-medium' : 'text-[#f0f0f5]'
                                }`}>
                                  {card.title}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-[10px] font-mono text-[#5a5a70] bg-[#0a0a0f] px-1.5 py-0.5 rounded">{card.status}</span>
                                  <span className="text-[10px] font-mono text-[#5a5a70]">{card.id}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              <AgingTicks days={card.daysInStatus} />
                              <span className={`text-[10px] font-mono ${
                                card.daysInStatus > config.agingThreshold ? 'text-[#ff00aa] font-bold' : 'text-[#5a5a70]'
                              }`}>
                                {card.daysInStatus}d
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-[#8888a0]" />
              <h2 className="text-lg font-bold">Meeting Agenda</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#12121a] to-[#1a1a24] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff00aa]/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-xs font-mono text-[#5a5a70] uppercase tracking-widest mb-6 pb-3 border-b border-white/5">
                Top Discussion Items
              </h3>
              
              <div className="space-y-6 relative z-10">
                {agenda.map((item, i) => (
                  <div key={i} className="space-y-2 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center space-x-3">
                      <span 
                        className="text-lg font-mono font-bold"
                        style={{ color: getTypeColor(item.type) }}
                      >
                        0{i+1}
                      </span>
                      <h4 className="font-semibold text-[#f0f0f5]">{item.title}</h4>
                    </div>
                    <p className="text-sm text-[#8888a0] pl-9 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
                {agenda.length === 0 && (
                  <div className="text-sm text-[#5a5a70] italic flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-[#5a5a70] border-t-[#00f0ff] rounded-full animate-spin"></div>
                    <span>Generating agenda...</span>
                  </div>
                )}
              </div>
            </div>

            {stats.oldestCard && (
              <div className="bg-[#12121a] border border-[#ffaa00]/20 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#ffaa00]/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 text-[#ffaa00] mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wide">Aging Risk</span>
                  </div>
                  <p className="text-sm text-[#f0f0f5] font-medium mb-2">"{stats.oldestCard.title}"</p>
                  <p className="text-xs text-[#5a5a70]">
                    {stats.oldestCard.assignee} · <span className="text-[#ffaa00] font-mono">{stats.oldestCard.daysInStatus}d</span> in status
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
