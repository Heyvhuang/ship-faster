export enum PlanType {
  STARTER = 'Starter',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise'
}

export interface CustomerMetric {
  id: string;
  name: string;
  plan: PlanType;
  revenue: number;
  cost: number;
  margin: number;
  marginPercent: number;
  usageTokens: number;
  isFlagged: boolean; // If margin is below target
}

export interface AppState {
  targetMargin: number; // e.g., 60%
  currency: string;
  data: CustomerMetric[];
  isProcessing: boolean;
  hasResult: boolean;
  isPaid: boolean;
  policyDraft: string | null;
}

export interface AnalysisSummary {
  totalRevenue: number;
  totalCost: number;
  grossMargin: number;
  grossMarginPercent: number;
  lossMakingCount: number;
  biggestLoser: CustomerMetric | null;
  highestCostItem: string;
}
