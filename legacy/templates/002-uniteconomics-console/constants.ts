import { CustomerMetric, PlanType } from './types';

export const MOCK_DATA: CustomerMetric[] = [
  {
    id: 'cust_001',
    name: 'Acme Corp',
    plan: PlanType.ENTERPRISE,
    revenue: 2500,
    cost: 2100,
    margin: 400,
    marginPercent: 16,
    usageTokens: 45000000,
    isFlagged: true
  },
  {
    id: 'cust_002',
    name: 'TechFlow Inc',
    plan: PlanType.PRO,
    revenue: 299,
    cost: 45,
    margin: 254,
    marginPercent: 84.9,
    usageTokens: 900000,
    isFlagged: false
  },
  {
    id: 'cust_003',
    name: 'RapidScale',
    plan: PlanType.PRO,
    revenue: 299,
    cost: 350,
    margin: -51,
    marginPercent: -17,
    usageTokens: 7500000,
    isFlagged: true
  },
  {
    id: 'cust_004',
    name: 'Solo Dev A',
    plan: PlanType.STARTER,
    revenue: 49,
    cost: 2,
    margin: 47,
    marginPercent: 95.9,
    usageTokens: 40000,
    isFlagged: false
  },
  {
    id: 'cust_005',
    name: 'DataMiners Ltd',
    plan: PlanType.ENTERPRISE,
    revenue: 2500,
    cost: 3200,
    margin: -700,
    marginPercent: -28,
    usageTokens: 68000000,
    isFlagged: true
  },
  {
    id: 'cust_006',
    name: 'Creative Studio',
    plan: PlanType.PRO,
    revenue: 299,
    cost: 120,
    margin: 179,
    marginPercent: 59.8,
    usageTokens: 2400000,
    isFlagged: false
  },
  {
    id: 'cust_007',
    name: 'StartUp Alpha',
    plan: PlanType.STARTER,
    revenue: 49,
    cost: 48,
    margin: 1,
    marginPercent: 2,
    usageTokens: 980000,
    isFlagged: true
  }
];

export const TARGET_MARGIN_DEFAULT = 60; // 60%
