export interface KanbanCard {
  id: string;
  title: string;
  assignee: string;
  status: string;
  isBlocked: boolean;
  daysInStatus: number;
  priority?: 'Low' | 'Medium' | 'High';
}

export interface ProcessingStats {
  totalCards: number;
  overloadedPeople: number;
  blockers: number;
  maxAge: number;
}

export interface AgendaItem {
  title: string;
  description: string;
  type: 'bottleneck' | 'aging' | 'risk' | 'general';
  cards?: string[]; // IDs of related cards
}

export interface AppState {
  view: 'landing' | 'import' | 'processing' | 'dashboard' | 'billing';
  data: KanbanCard[];
  config: {
    inProgressStatuses: string[];
    doneStatuses: string[];
    agingThreshold: number;
  };
  agenda: AgendaItem[];
}

export const MOCK_DATA: KanbanCard[] = [
  { id: 'KAN-101', title: 'Auth Service Refactor', assignee: 'Sarah J.', status: 'In Progress', isBlocked: false, daysInStatus: 3 },
  { id: 'KAN-102', title: 'Fix Login Latency', assignee: 'Sarah J.', status: 'In Progress', isBlocked: true, daysInStatus: 8 },
  { id: 'KAN-103', title: 'User Profile API', assignee: 'Sarah J.', status: 'Code Review', isBlocked: false, daysInStatus: 2 },
  { id: 'KAN-104', title: 'Stripe Integration', assignee: 'Mike T.', status: 'In Progress', isBlocked: false, daysInStatus: 12 },
  { id: 'KAN-105', title: 'Dashboard Analytics', assignee: 'Mike T.', status: 'In Progress', isBlocked: false, daysInStatus: 1 },
  { id: 'KAN-106', title: 'Export PDF Feature', assignee: 'Mike T.', status: 'Blocked', isBlocked: true, daysInStatus: 15 },
  { id: 'KAN-107', title: 'Mobile Responsive Layout', assignee: 'Jessica L.', status: 'In Progress', isBlocked: false, daysInStatus: 4 },
  { id: 'KAN-108', title: 'Update dependencies', assignee: 'Jessica L.', status: 'To Do', isBlocked: false, daysInStatus: 0 },
  { id: 'KAN-109', title: 'Landing Page Copy', assignee: 'Unassigned', status: 'Backlog', isBlocked: false, daysInStatus: 30 },
  { id: 'KAN-110', title: 'Q3 Goal Planning', assignee: 'Sarah J.', status: 'Done', isBlocked: false, daysInStatus: 0 },
];
