type PolicyRequest = {
  losers?: Array<{
    name?: string;
    plan?: string;
    revenue?: number;
    cost?: number;
    marginPercent?: number;
  }>;
  targetMargin?: number;
};

const formatMoney = (amount: number) => {
  const safe = Number.isFinite(amount) ? amount : 0;
  return `$${safe.toFixed(0)}`;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const buildPolicy = (losers: NonNullable<PolicyRequest['losers']>, targetMargin: number) => {
  const margin = clamp(targetMargin, 0, 95);
  const marginFraction = margin / 100;

  const normalized = losers.map((l) => {
    const revenue = typeof l.revenue === 'number' ? l.revenue : 0;
    const cost = typeof l.cost === 'number' ? l.cost : 0;
    const allowedCost = revenue * (1 - marginFraction);
    const overspend = Math.max(0, cost - allowedCost);
    const name = l.name ?? 'Unknown';
    const plan = l.plan ?? 'Unknown';
    return { name, plan, revenue, cost, allowedCost, overspend };
  });

  const worst = normalized.sort((a, b) => b.overspend - a.overspend)[0];
  const avgAllowedCost =
    normalized.length > 0
      ? normalized.reduce((acc, x) => acc + x.allowedCost, 0) / normalized.length
      : 0;

  const hardCap = Math.max(50, Math.round(avgAllowedCost));
  const overagePriceHint = Math.max(1, Math.round((hardCap * 0.25) / 10) * 10); // coarse, demo-friendly

  const losersSummary = normalized
    .slice(0, 8)
    .map(
      (l) =>
        `- ${l.name} (${l.plan}) · Revenue ${formatMoney(l.revenue)} · Cost ${formatMoney(l.cost)} · Target cost ≤ ${formatMoney(l.allowedCost)}`
    )
    .join('\n');

  const clause = [
    `Fair Use & Overage Policy (Draft)`,
    ``,
    `Goal: protect a ${margin}% gross margin target while keeping normal users unaffected.`,
    ``,
    `1) Hard Cap (included usage)`,
    `- Included usage is limited to a monthly compute cost equivalent of ${formatMoney(hardCap)} per customer.`,
    `- If a customer exceeds this cap, overage applies automatically for the remainder of the billing period.`,
    ``,
    `2) Overage Pricing (simple stop-loss)`,
    `- Overage is billed at a rate that preserves margin. For a quick starting point: ${formatMoney(overagePriceHint)} per additional ${formatMoney(100)} of compute cost equivalent.`,
    `- Adjust per plan/tier once you have real unit cost baselines.`,
    ``,
    `3) Notes from current data (top unprofitable accounts)`,
    losersSummary || `- No unprofitable customers provided in this request.`,
    ``,
    `Worst offender (example): ${
      worst ? `${worst.name} (${worst.plan}) overspent by ~${formatMoney(worst.overspend)} vs target.` : 'N/A'
    }`,
    ``,
    `Customer email (2 paragraphs)`,
    ``,
    `Subject: Upcoming usage policy update`,
    ``,
    `Hi there — we’re updating our usage policy to keep performance predictable and pricing sustainable for all customers.`,
    `Starting next billing cycle, usage above the included cap will be billed as overage instead of being bundled into the base plan.`,
    ``,
    `This change only affects unusually high usage. If you’re impacted, we’ll reach out with your current usage level and options (upgrade, cap, or overage).`,
    `Reply to this email if you’d like help sizing the right plan for your workload.`,
  ].join('\n');

  return clause;
};

export async function POST(request: Request) {
  let payload: PolicyRequest;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const losers = Array.isArray(payload.losers) ? payload.losers : [];
  const targetMargin = typeof payload.targetMargin === 'number' ? payload.targetMargin : 0;

  const policy = buildPolicy(losers, targetMargin);
  return new Response(JSON.stringify({ policy }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
