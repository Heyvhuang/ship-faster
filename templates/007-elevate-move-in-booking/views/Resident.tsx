import React, { useState, useMemo } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { Calendar, Check, CreditCard, FileText, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Building2, Truck } from 'lucide-react';
import { Button, Card, InputGroup, StepIndicator } from '../components/ui';
import { TimelineSlotPicker, generateMockSlots, TimeSlot } from '../components/TimelineSlotPicker';
import { BuildingRules } from '../types';

interface ResidentProps {
  rules: BuildingRules;
  onBack: () => void;
}

export const Resident: React.FC<ResidentProps> = ({ rules, onBack }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startHour = parseInt(rules.moveInStart.split(':')[0]);
  const endHour = parseInt(rules.moveInEnd.split(':')[0]);

  const slots = useMemo(() => {
    const dayName = format(selectedDate, 'EEEE');
    if (rules.blackoutDays.includes(dayName)) return [];
    return generateMockSlots(selectedDate, startHour, endHour, rules.slotDuration);
  }, [selectedDate, startHour, endHour, rules.slotDuration, rules.blackoutDays]);

  const selectedSlot = slots.find(s => s.id === selectedSlotId);

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlotId(slot.id);
  };

  const handleBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const formatSlotTime = (slot: TimeSlot) => {
    const formatHour = (h: number) => {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h % 12 || 12;
      return `${displayHour}:00 ${period}`;
    };
    return `${formatHour(slot.startHour)} - ${formatHour(slot.endHour)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans">
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Exit
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-sm">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 hidden sm:inline">Reserve Freight Elevator</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="hidden sm:inline">Step</span>
            <span className="font-bold text-brand-600">{step}</span>
            <span>/</span>
            <span>3</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <StepIndicator currentStep={step} totalSteps={3} />

        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Choose Your Date</h2>
                      <p className="text-sm text-slate-500">Select when you'd like to move in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[-2, -1, 0, 1, 2, 3, 4].map(offset => {
                    const date = addDays(new Date(), offset);
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    const isToday = offset === 0;
                    const dayName = format(date, 'EEEE');
                    const isBlackout = rules.blackoutDays.includes(dayName);

                    return (
                      <button
                        key={offset}
                        onClick={() => !isBlackout && setSelectedDate(date)}
                        disabled={isBlackout}
                        className={`
                          relative flex flex-col items-center p-3 rounded-xl transition-all min-w-[72px]
                          ${isSelected
                            ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 scale-105'
                            : isBlackout
                              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                              : 'hover:bg-slate-100 text-slate-700'
                          }
                        `}
                      >
                        <span className={`text-xs font-medium uppercase tracking-wide ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                          {format(date, 'EEE')}
                        </span>
                        <span className={`text-xl font-bold mt-0.5 ${isToday && !isSelected ? 'text-brand-600' : ''}`}>
                          {format(date, 'd')}
                        </span>
                        {isToday && (
                          <span className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-brand-200' : 'text-brand-500'}`}>
                            TODAY
                          </span>
                        )}
                        {isBlackout && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">✕</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 p-6">
              {slots.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Slots Available</h3>
                  <p className="text-slate-500">
                    Move-ins are not available on {format(selectedDate, 'EEEE')}s.
                    <br />
                    Please select a different date.
                  </p>
                </div>
              ) : (
                <TimelineSlotPicker
                  date={selectedDate}
                  slots={slots}
                  selectedSlotId={selectedSlotId}
                  onSelectSlot={handleSelectSlot}
                  startHour={startHour}
                  endHour={endHour}
                />
              )}
            </div>

            <div className="flex justify-end">
              <Button
                size="lg"
                disabled={!selectedSlotId}
                onClick={() => setStep(2)}
                className={`
                  px-8 shadow-xl transition-all
                  ${selectedSlotId
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:shadow-brand-500/30 hover:scale-[1.02]'
                    : ''
                  }
                `}
              >
                <span>Continue to Details</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white shadow-xl shadow-brand-500/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Truck className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-brand-100 text-sm font-medium">Your Reserved Slot</p>
                  <p className="text-2xl font-bold">
                    {format(selectedDate, 'EEEE, MMM d')} • {selectedSlot && formatSlotTime(selectedSlot)}
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900">Refundable Security Deposit</p>
                  <p className="text-sm text-amber-700">
                    A <span className="font-bold">${rules.depositAmount}</span> hold will be placed on your card.
                    Released within 24 hours after move completion inspection.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="First Name">
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                      placeholder="Jane"
                    />
                  </InputGroup>
                  <InputGroup label="Last Name">
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                      placeholder="Doe"
                    />
                  </InputGroup>
                </div>

                <InputGroup label="Unit Number">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                    placeholder="e.g. 1402"
                  />
                </InputGroup>

                <InputGroup label="Moving Company (Optional)">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                    placeholder="Available Movers Inc."
                  />
                </InputGroup>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-slate-900">Payment Method</span>
                    <div className="flex gap-2">
                      <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded shadow-sm" />
                      <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded shadow-sm" />
                    </div>
                  </div>
                  <div className="p-4 border-2 border-slate-200 rounded-xl flex items-center gap-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-16 bg-transparent outline-none text-center text-slate-900 placeholder-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-12 bg-transparent outline-none text-center text-slate-900 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleBook}
                isLoading={isProcessing}
                className="px-8 bg-gradient-to-r from-brand-500 to-brand-600 shadow-xl hover:shadow-brand-500/30 hover:scale-[1.02] transition-all"
              >
                {isProcessing ? 'Processing...' : `Pay $${rules.depositAmount} Deposit`}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12 animate-scale-in">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-bounce-in">
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-slate-900 mb-3">You're All Set!</h2>
            <p className="text-lg text-slate-500 mb-8 max-w-md mx-auto">
              Your move-in slot for{' '}
              <span className="font-semibold text-slate-900">{format(selectedDate, 'MMMM d')}</span> at{' '}
              <span className="font-semibold text-slate-900">{selectedSlot && formatSlotTime(selectedSlot)}</span> is confirmed.
            </p>

            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20 shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Insurance Certificate Required</h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Please upload your movers' COI at least 24 hours before the move.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload COI
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-left">
                <p className="text-sm text-slate-400 mb-2">Confirmation #</p>
                <p className="text-2xl font-mono font-bold tracking-wider">ELV-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                <p className="text-sm text-slate-400 mt-4">A receipt has been sent to your email.</p>
              </div>
            </div>

            <Button onClick={onBack} size="lg" className="mt-8">
              Return to Home
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
