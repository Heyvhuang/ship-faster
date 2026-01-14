import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase/types";

export const DEFAULT_CREDITS_PER_ITEM = 6;

const clampInt = (value: number, min: number, max: number) =>
  Math.min(Math.max(Math.floor(value), min), max);

export function getCreditsPerItem(): number {
  const raw = process.env.NEXT_PUBLIC_CREDITS_PER_ITEM;
  if (!raw) return DEFAULT_CREDITS_PER_ITEM;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_CREDITS_PER_ITEM;

  return clampInt(parsed, 1, 100);
}

export function estimateCredits(params: {
  itemCount: number;
  creditsPerItem?: number;
}): { totalItems: number; creditsPerItem: number; creditsEstimated: number } {
  const creditsPerItem = params.creditsPerItem ?? getCreditsPerItem();
  const totalItems = clampInt(params.itemCount, 0, 10000);
  return {
    totalItems,
    creditsPerItem,
    creditsEstimated: totalItems * creditsPerItem,
  };
}

export function checkCreditsBalance(params: {
  creditsBalance: number;
  creditsEstimated: number;
}): { ok: true } | { ok: false; creditsRequired: number; creditsAvailable: number } {
  if (params.creditsBalance >= params.creditsEstimated) {
    return { ok: true };
  }

  return {
    ok: false,
    creditsRequired: params.creditsEstimated,
    creditsAvailable: params.creditsBalance,
  };
}

export function buildInsufficientCreditsResponse(params: {
  creditsRequired: number;
  creditsAvailable: number;
}) {
  return {
    status: 402,
    body: {
      error: "Insufficient credits",
      creditsRequired: params.creditsRequired,
      creditsAvailable: params.creditsAvailable,
    },
  };
}

export async function updateCreditsBalance(params: {
  supabaseClient: SupabaseClient<Database>;
  userId: string;
  creditsBalance: number;
}): Promise<void> {
  const { error } = await params.supabaseClient
    .from("user_profiles")
    .update({
      credits_balance: params.creditsBalance,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.userId);

  if (error) {
    throw new Error(`Failed to update credits: ${error.message}`);
  }
}

export async function chargeCredits(params: {
  supabaseClient: SupabaseClient<Database>;
  userId: string;
  creditsBalance: number;
  creditsToCharge: number;
}): Promise<number> {
  const nextBalance = params.creditsBalance - params.creditsToCharge;
  await updateCreditsBalance({
    supabaseClient: params.supabaseClient,
    userId: params.userId,
    creditsBalance: nextBalance,
  });

  return nextBalance;
}

export async function rollbackCredits(params: {
  supabaseClient: SupabaseClient<Database>;
  userId: string;
  creditsBalance: number;
}): Promise<void> {
  await updateCreditsBalance({
    supabaseClient: params.supabaseClient,
    userId: params.userId,
    creditsBalance: params.creditsBalance,
  });
}
