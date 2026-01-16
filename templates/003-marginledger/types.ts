export type ViewState = 'landing' | 'input' | 'processing' | 'results';

export interface CustomerMetric {
  id: string;
  name: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  revenue: number;
  cost: number;
  margin: number;
  marginPercent: number;
  usageTokens: number;
  status: 'healthy' | 'warning' | 'danger';
}

export interface AnalysisSummary {
  totalRevenue: number;
  totalCost: number;
  overallMargin: number;
  overallMarginPercent: number;
  targetMargin: number;
  customers: CustomerMetric[];
  topLosers: CustomerMetric[];
  largestCostItem: string;
}

export interface AppConfig {
  marginTarget: number; // e.g. 20 (percent)
  currency: string;
}

export interface CapStrategyResult {
  policyText: string;
  suggestedCap: number;
  overageRate: number;
}
