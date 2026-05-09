export interface StoreStats {
  id: string;
  name: string;
  currency: string;
  color: string;
  todaySales: number;
  yesterdaySales: number;
  todayOrders: number;
  topProduct: string;
  topProductSales: number;
  conversionRate: number;
}

export interface AggregatedStats {
  totalSales: number;
  totalOrders: number;
  salesGrowth: number; // percentage vs yesterday
  stores: StoreStats[];
}

export interface BriefContent {
  headline: string;
  executiveSummary: string;
  anomaly: {
    detected: boolean;
    description: string;
    severity: 'low' | 'medium' | 'high';
  };
  topPerformer: string;
  actionItem: string;
}

export type AppView = 'landing' | 'dashboard' | 'billing';
