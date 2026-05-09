import React, { useState } from 'react';
import { LayoutDashboard, Calendar as CalIcon, DollarSign, Settings, Bell, Search, CheckCircle, AlertCircle, RefreshCcw, Building2, Sparkles, LogOut, ChevronRight } from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { Booking, BookingStatus, BuildingRules } from '../types';
import { extractRulesFromText } from '../services/ai';

interface ManagerProps {
  initialRules: BuildingRules;
  onUpdateRules: (rules: BuildingRules) => void;
  onLogout: () => void;
}

const TABS = [
  { id: 'queue', label: 'Queue', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'calendar', label: 'Calendar', icon: <CalIcon className="w-4 h-4" /> },
  { id: 'billing', label: 'Billing', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

const MOCK_BOOKINGS: Booking[] = [
  { id: '1', residentName: 'Sarah Jenkins', unit: '402', date: '2023-10-24', timeSlot: '09:00 - 12:00', depositAmount: 500, status: BookingStatus.PENDING_REVIEW, documentsUploaded: true },
  { id: '2', residentName: 'Mike Ross', unit: '1205', date: '2023-10-25', timeSlot: '13:00 - 16:00', depositAmount: 500, status: BookingStatus.CONFIRMED, documentsUploaded: true },
  { id: '3', residentName: 'Jessica Pearson', unit: 'PH', date: '2023-10-26', timeSlot: '09:00 - 12:00', depositAmount: 1000, status: BookingStatus.PENDING_DEPOSIT, documentsUploaded: false },
  { id: '4', residentName: 'Louis Litt', unit: '803', date: '2023-10-23', timeSlot: '13:00 - 16:00', depositAmount: 500, status: BookingStatus.COMPLETED, documentsUploaded: true },
];

export const Manager: React.FC<ManagerProps> = ({ initialRules, onUpdateRules, onLogout }) => {
  const [activeTab, setActiveTab] = useState('queue');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [rules, setRules] = useState(initialRules);
  const [aiText, setAiText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleAiGenerate = async () => {
    if (!aiText.trim()) return;
    setIsAiLoading(true);
    const extracted = await extractRulesFromText(aiText);
    if (extracted) {
      setRules(extracted);
      onUpdateRules(extracted);
    }
    setIsAiLoading(false);
  };

  const pendingCount = bookings.filter(b => b.status === BookingStatus.PENDING_REVIEW).length;

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6">
          <button
            onClick={onLogout}
            className="flex items-center gap-2.5 group w-full text-left hover:opacity-80 transition-opacity"
            title="Back to Home"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">Elevate</span>
              <p className="text-xs text-slate-500 group-hover:text-slate-400">Click to exit</p>
            </div>
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.97] ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25'
                  : 'hover:bg-slate-800 hover:text-white active:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={activeTab === tab.id ? 'scale-110 transition-transform' : ''}>
                  {tab.icon}
                </span>
                {tab.label}
              </div>
              {tab.id === 'queue' && pendingCount > 0 && (
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                  activeTab === tab.id ? 'bg-white text-brand-600' : 'bg-amber-500 text-white'
                }`}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold">
              BA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Building Admin</div>
              <div className="text-xs text-slate-500 truncate">admin@building.com</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all duration-150 active:scale-[0.97] border border-slate-700 hover:border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Exit to Home</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab}</h2>
            <p className="text-sm text-slate-500">Manage your building's move-in operations</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search unit or resident..."
                className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm w-72 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'queue' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  label="Pending Review"
                  value={pendingCount.toString()}
                  icon={<AlertCircle className="w-5 h-5" />}
                  color="amber"
                />
                <StatCard
                  label="Confirmed Today"
                  value={bookings.filter(b => b.status === BookingStatus.CONFIRMED).length.toString()}
                  icon={<CheckCircle className="w-5 h-5" />}
                  color="emerald"
                />
                <StatCard
                  label="Refunds Due"
                  value="$500"
                  icon={<RefreshCcw className="w-5 h-5" />}
                  color="blue"
                />
                <StatCard
                  label="This Week"
                  value={bookings.length.toString()}
                  icon={<CalIcon className="w-5 h-5" />}
                  color="purple"
                />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Bookings</h3>
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Resident</th>
                      <th className="px-6 py-4">Date & Slot</th>
                      <th className="px-6 py-4">Deposit</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center font-bold text-slate-600">
                              {booking.residentName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">{booking.residentName}</div>
                              <div className="text-slate-500 text-xs">Unit {booking.unit}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{booking.date}</div>
                          <div className="text-slate-500 text-xs">{booking.timeSlot}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-900">${booking.depositAmount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          {booking.status === BookingStatus.PENDING_REVIEW && (
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleStatusChange(booking.id, BookingStatus.PENDING_DEPOSIT)}>
                                Reject
                              </Button>
                              <Button size="sm" onClick={() => handleStatusChange(booking.id, BookingStatus.CONFIRMED)} className="bg-gradient-to-r from-brand-500 to-brand-600">
                                Approve
                              </Button>
                            </div>
                          )}
                          {booking.status === BookingStatus.CONFIRMED && (
                            <Button size="sm" variant="outline">View Docs</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl animate-fade-in">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">AI Rules Generator</h3>
                      <p className="text-sm text-slate-500">Paste your PDF or email rules. AI will configure instantly.</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <textarea
                    className="w-full h-40 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm leading-relaxed transition-all resize-none"
                    placeholder="e.g. Residents can move in Monday to Friday between 9am and 5pm. Slots are 4 hours long. A $500 damage deposit is required. No moves on weekends."
                    value={aiText}
                    onChange={(e) => setAiText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAiGenerate}
                      isLoading={isAiLoading}
                      disabled={!aiText}
                      className="bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Configuration
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900 mb-4">Current Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ConfigItem label="Move-in Hours" value={`${rules.moveInStart} - ${rules.moveInEnd}`} />
                  <ConfigItem label="Slot Duration" value={`${rules.slotDuration} Hours`} />
                  <ConfigItem label="Deposit Amount" value={`$${rules.depositAmount}`} />
                  <ConfigItem label="Blackout Days" value={rules.blackoutDays.join(', ') || 'None'} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-medium text-slate-600">Deposit Ledger</p>
              <p className="text-sm">Stripe Integration would appear here.</p>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <CalIcon className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-medium text-slate-600">Calendar View</p>
              <p className="text-sm">Full month grid would appear here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'amber' | 'emerald' | 'blue' | 'purple';
}) => {
  const colors = {
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-900">{value}</div>
          <div className="text-sm text-slate-500 mt-1">{label}</div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  switch (status) {
    case BookingStatus.PENDING_REVIEW:
      return <Badge variant="warning">Review Docs</Badge>;
    case BookingStatus.CONFIRMED:
      return <Badge variant="success">Confirmed</Badge>;
    case BookingStatus.COMPLETED:
      return <Badge variant="neutral">Completed</Badge>;
    case BookingStatus.PENDING_DEPOSIT:
      return <Badge variant="error">Unpaid</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const ConfigItem = ({ label, value }: { label: string; value: string }) => (
  <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
    <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{label}</div>
    <div className="font-semibold text-slate-900 mt-1 text-lg">{value}</div>
  </div>
);
