import { AnalysisSummary, CustomerMetric } from '../types';

export const generateMockData = (targetMargin: number): AnalysisSummary => {
  const plans = {
    Starter: { price: 49, costBase: 10 },
    Pro: { price: 199, costBase: 40 },
    Enterprise: { price: 999, costBase: 200 },
  };

  const customers: CustomerMetric[] = Array.from({ length: 50 }).map((_, i) => {
    const rand = Math.random();
    
    const isBigSpender = rand > 0.75;
    const planType = isBigSpender ? 'Enterprise' : (rand > 0.4 ? 'Pro' : 'Starter');
    const baseRev = plans[planType].price;
    const baseCost = plans[planType].costBase;
    
    let usageMultiplier: number;
    let category: 'healthy' | 'warning' | 'danger';
    
    const categoryRand = Math.random();
    if (categoryRand < 0.35) {
      category = 'healthy';
      usageMultiplier = 0.3 + Math.random() * 0.4;
    } else if (categoryRand < 0.75) {
      category = 'warning';
      const targetRatio = 1 - (targetMargin / 100);
      usageMultiplier = targetRatio + Math.random() * (1 - targetRatio - 0.05);
    } else {
      category = 'danger';
      usageMultiplier = 1.2 + Math.random() * 2.5;
    }
    
    const cost = baseCost * usageMultiplier * (isBigSpender ? 1.3 : 1);
    const revenue = baseRev;
    const margin = revenue - cost;
    const marginPercent = (margin / revenue) * 100;

    let status: 'healthy' | 'warning' | 'danger' = 'healthy';
    if (marginPercent < 0) status = 'danger';
    else if (marginPercent < targetMargin) status = 'warning';

    return {
      id: `CUST-${1000 + i}`,
      name: `Account ${1000 + i}`,
      plan: planType as 'Starter' | 'Pro' | 'Enterprise',
      revenue: parseFloat(revenue.toFixed(2)),
      cost: parseFloat(cost.toFixed(2)),
      margin: parseFloat(margin.toFixed(2)),
      marginPercent: parseFloat(marginPercent.toFixed(1)),
      usageTokens: Math.floor(cost * 1000),
      status,
    };
  });

  const totalRevenue = customers.reduce((acc, c) => acc + c.revenue, 0);
  const totalCost = customers.reduce((acc, c) => acc + c.cost, 0);
  const overallMargin = totalRevenue - totalCost;

  return {
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    overallMargin: parseFloat(overallMargin.toFixed(2)),
    overallMarginPercent: parseFloat(((overallMargin / totalRevenue) * 100).toFixed(1)),
    targetMargin,
    customers: customers.sort((a, b) => a.marginPercent - b.marginPercent),
    topLosers: customers.filter(c => c.status === 'danger').sort((a, b) => a.margin - b.margin).slice(0, 5),
    largestCostItem: 'LLM - GPT-4 Turbo',
  };
};
