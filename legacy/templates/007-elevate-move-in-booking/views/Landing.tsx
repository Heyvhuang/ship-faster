import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Clock, Users, Calendar, Sparkles, CheckCircle2, Building2, Zap, Check, Flame } from 'lucide-react';
import { Button } from '../components/ui';

interface LandingProps {
  onStartPilot: () => void;
  onResidentDemo: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStartPilot, onResidentDemo }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-lg z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Elevate</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onResidentDemo}>Resident Demo</Button>
          <Button onClick={onStartPilot} className="bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:scale-[1.02] transition-all">
            Manager Login
          </Button>
        </div>
      </nav>

      <main className="flex-1">
        <div className="relative">
          <div className="absolute inset-0 hidden pointer-events-none" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-50/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 py-24 text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Building Management</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 animate-slide-up">
              The end of{' '}
              <span className="relative">
                <span className="relative z-10 text-brand-500">
                  elevator chaos
                </span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-brand-200/50 -rotate-1 rounded" />
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
              Replace paper forms and PDF chains with a streamlined booking page.
              Manage deposits, conflicts, and staff notifications in one orderly flow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button
                size="lg"
                onClick={onStartPilot}
                className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/30 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all px-8"
              >
                Start Free Pilot
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onResidentDemo}
                className="w-full sm:w-auto border-2 hover:bg-slate-50"
              >
                View Demo Building
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Setup in 48 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        <TimelineDemo onTryDemo={onResidentDemo} />

        <div className="bg-slate-900 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px]" />
          </div>

          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Everything you need to manage move-ins
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                From booking to completion, Elevate handles every step of the resident move-in process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Clock className="w-6 h-6" />}
                title="Real-time Inventory"
                description="Residents see live availability with our smart timeline picker. No more double-booking or 'call to check' delays."
                gradient="bg-cyan-500"
              />
              <FeatureCard
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Automatic Deposits"
                description="Secure deposit holds via Stripe. Full ledger tracking for fast, hassle-free refunds after inspection."
                gradient="bg-emerald-500"
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Staff Sync"
                description="Security and cleaning crews get automated daily manifests. Everyone knows the plan before it happens."
                gradient="bg-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="py-24 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why top properties switch
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Join hundreds of buildings that have eliminated move-in headaches.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <StatCard
                value="48 hrs"
                label="Setup Time"
                description="Send us your PDF rules, we return a live booking portal."
                icon={<Zap className="w-5 h-5" />}
              />
              <StatCard
                value="Zero"
                label="Phone Tag"
                description="Residents self-serve. Managers just approve exceptions."
                icon={<CheckCircle2 className="w-5 h-5" />}
              />
              <StatCard
                value="100%"
                label="Deposit Recovery"
                description="Automated tracking means no more lost or disputed deposits."
                icon={<ShieldCheck className="w-5 h-5" />}
              />
              <StatCard
                value="4.9★"
                label="Resident Rating"
                description="Modern booking experience that residents actually love."
                icon={<Sparkles className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>

        <div className="py-24 bg-brand-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to eliminate move-in chaos?
            </h2>
            <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
              Start your free pilot today. No credit card required, no long-term commitment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={onStartPilot}
                className="bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/25 hover:scale-[1.02] transition-all px-8"
              >
                Start Free Pilot
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={onResidentDemo}
                className="text-white hover:bg-white/10"
              >
                View Demo First
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 py-12 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Elevate</span>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; 2026 Elevate Booking Systems. Built with precision.
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div className="group relative bg-slate-800/50 backdrop-blur border border-slate-700/50 p-8 rounded-2xl hover:bg-slate-800/80 transition-all hover:-translate-y-1">
    <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-6 shadow-lg text-white group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const StatCard = ({
  value,
  label,
  description,
  icon,
}: {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all">
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="text-4xl font-bold text-brand-500">
          {value}
        </div>
        <div className="font-semibold text-slate-900 mt-1">{label}</div>
      </div>
      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
        {icon}
      </div>
    </div>
    <p className="text-slate-500">{description}</p>
  </div>
);

const DEMO_SLOTS = [
  { id: '1', time: '9 AM', duration: '3hrs', status: 'booked', bookedBy: 'Unit 402', heat: 'high' },
  { id: '2', time: '12 PM', duration: '3hrs', status: 'available', heat: 'medium' },
  { id: '3', time: '3 PM', duration: '3hrs', status: 'available', heat: 'low' },
  { id: '4', time: '6 PM', duration: '3hrs', status: 'booked', bookedBy: 'Unit 1205', heat: 'high' },
];

const TimelineDemo = ({ onTryDemo }: { onTryDemo: () => void }) => {
  const [selectedId, setSelectedId] = useState<string | null>('2');

  return (
    <div className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE PREVIEW
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Smart Timeline Picker
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Residents see real-time availability with heat indicators showing popular times. Click to select a slot.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Friday, January 17</h3>
                <p className="text-sm text-slate-500">Freight Elevator A</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Quiet
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Moderate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Popular
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {DEMO_SLOTS.map((slot) => {
              const isSelected = selectedId === slot.id;
              const isBooked = slot.status === 'booked';
              
              return (
                <button
                  key={slot.id}
                  onClick={() => !isBooked && setSelectedId(slot.id)}
                  disabled={isBooked}
                  className={`
                    relative p-4 md:p-5 rounded-2xl border-2 text-left transition-all duration-200
                    ${isSelected
                      ? 'bg-brand-500 border-brand-400 text-white shadow-xl shadow-brand-500/30 scale-[1.02]'
                      : isBooked
                        ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                        : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-lg cursor-pointer active:scale-[0.98]'
                    }
                  `}
                >
                  <div className={`text-2xl font-bold ${isSelected ? 'text-white' : isBooked ? 'text-slate-400' : 'text-slate-900'}`}>
                    {slot.time}
                  </div>
                  <div className={`text-sm ${isSelected ? 'text-brand-100' : 'text-slate-500'}`}>
                    {slot.duration}
                  </div>
                  
                  <div className="mt-3 flex items-center gap-1.5">
                    {slot.heat === 'high' && !isBooked && (
                      <Flame className={`w-3.5 h-3.5 ${isSelected ? 'text-yellow-300' : 'text-orange-500'}`} />
                    )}
                    <span className={`text-xs font-medium ${isSelected ? 'text-brand-100' : isBooked ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isBooked ? slot.bookedBy : slot.heat === 'high' ? 'Popular' : slot.heat === 'medium' ? 'Moderate' : 'Quiet'}
                    </span>
                  </div>

                  {!isBooked && !isSelected && (
                    <div className={`absolute bottom-0 left-2 right-2 h-1 rounded-full ${
                      slot.heat === 'high' ? 'bg-orange-500' : slot.heat === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                  )}

                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-brand-600" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedId && (
            <div className="mt-6 p-4 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-brand-700 font-medium">Selected</p>
                  <p className="font-bold text-brand-900">
                    {DEMO_SLOTS.find(s => s.id === selectedId)?.time} - 3 hour slot
                  </p>
                </div>
              </div>
              <Button 
                onClick={onTryDemo}
                className="bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/20"
              >
                Try Full Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
