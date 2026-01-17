import React, { useRef, useEffect, useState } from 'react';
import { Clock, Zap, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TimeSlot {
  id: string;
  startHour: number;
  endHour: number;
  available: boolean;
  popularity: 'low' | 'medium' | 'high' | 'full';
  bookedBy?: string;
}

interface TimelineSlotPickerProps {
  date: Date;
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
  startHour?: number;
  endHour?: number;
}

const formatHour = (hour: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}${period}`;
};

const getPopularityLabel = (popularity: TimeSlot['popularity']): string => {
  switch (popularity) {
    case 'low': return 'Quiet';
    case 'medium': return 'Moderate';
    case 'high': return 'Popular';
    case 'full': return 'Booked';
  }
};

const getHeatClass = (popularity: TimeSlot['popularity']): string => {
  switch (popularity) {
    case 'low': return 'heat-low';
    case 'medium': return 'heat-medium';
    case 'high': return 'heat-high';
    case 'full': return 'heat-full';
  }
};

export const TimelineSlotPicker: React.FC<TimelineSlotPickerProps> = ({
  date,
  slots,
  selectedSlotId,
  onSelectSlot,
  startHour = 6,
  endHour = 20,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      setShowLeftArrow(track.scrollLeft > 20);
      setShowRightArrow(track.scrollLeft < track.scrollWidth - track.clientWidth - 20);
    };

    track.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const scrollAmount = track.clientWidth * 0.8;
    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const totalHours = endHour - startHour;
  const nowPosition = currentHour >= startHour && currentHour <= endHour
    ? ((currentHour - startHour) / totalHours) * 100
    : null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Select Time Slot</h3>
            <p className="text-sm text-slate-500">
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
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

      <div className="relative group">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 -translate-x-1/2"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 translate-x-1/2"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="timeline-track flex gap-3 py-4 px-2 -mx-2"
        >
          {slots.map((slot, index) => {
            const isSelected = selectedSlotId === slot.id;
            const isDisabled = !slot.available;

            return (
              <button
                key={slot.id}
                onClick={() => slot.available && onSelectSlot(slot)}
                disabled={isDisabled}
                className={`
                  timeline-slot relative flex-shrink-0 w-36 p-4 rounded-2xl border-2 transition-all
                  ${isSelected
                    ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 border-cyan-400 text-white shadow-xl shadow-cyan-500/30 scale-105'
                    : isDisabled
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-white border-slate-200 text-slate-900 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer'
                  }
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="text-lg font-bold tracking-tight">
                  {formatHour(slot.startHour)}
                </div>
                <div className={`text-sm ${isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>
                  to {formatHour(slot.endHour)}
                </div>

                <div className="mt-3 flex items-center gap-1.5">
                  {slot.popularity === 'high' && !isDisabled && (
                    <Zap className={`w-3.5 h-3.5 ${isSelected ? 'text-yellow-300' : 'text-orange-500'}`} />
                  )}
                  {isDisabled && slot.bookedBy && (
                    <Users className="w-3.5 h-3.5" />
                  )}
                  <span className={`text-xs font-medium ${isSelected ? 'text-cyan-100' : ''}`}>
                    {isDisabled ? (slot.bookedBy || 'Booked') : getPopularityLabel(slot.popularity)}
                  </span>
                </div>

                {!isSelected && !isDisabled && (
                  <div className={`heat-indicator ${getHeatClass(slot.popularity)}`} />
                )}

                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce-in">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {nowPosition !== null && (
          <div
            className="timeline-now-indicator h-full"
            style={{ left: `${nowPosition}%` }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded whitespace-nowrap">
              NOW
            </span>
          </div>
        )}
      </div>

      {selectedSlotId && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-cyan-100/50 border border-cyan-200 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-cyan-700 font-medium">Selected Time</p>
              <p className="text-lg font-bold text-cyan-900">
                {slots.find(s => s.id === selectedSlotId)?.startHour !== undefined && (
                  <>
                    {formatHour(slots.find(s => s.id === selectedSlotId)!.startHour)} - {formatHour(slots.find(s => s.id === selectedSlotId)!.endHour)}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const generateMockSlots = (
  date: Date,
  startHour: number,
  endHour: number,
  slotDuration: number
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  for (let hour = startHour; hour < endHour; hour += slotDuration) {
    const random = Math.random();
    const isMorning = hour < 12;
    const isAfternoon = hour >= 12 && hour < 17;

    let popularity: TimeSlot['popularity'] = 'low';
    let available = true;

    if (isWeekend) {
      if (isMorning) {
        popularity = random > 0.3 ? 'high' : 'medium';
        available = random > 0.4;
      } else {
        popularity = random > 0.5 ? 'medium' : 'low';
        available = random > 0.2;
      }
    } else {
      if (isMorning) {
        popularity = random > 0.6 ? 'high' : random > 0.3 ? 'medium' : 'low';
        available = random > 0.3;
      } else if (isAfternoon) {
        popularity = random > 0.4 ? 'medium' : 'low';
        available = random > 0.2;
      } else {
        popularity = 'low';
        available = random > 0.1;
      }
    }

    if (!available) {
      popularity = 'full';
    }

    slots.push({
      id: `${date.toISOString().split('T')[0]}-${hour}`,
      startHour: hour,
      endHour: hour + slotDuration,
      available,
      popularity,
      bookedBy: !available ? ['Unit 402', 'Unit 1205', 'Unit PH', 'Unit 803'][Math.floor(Math.random() * 4)] : undefined,
    });
  }

  return slots;
};
