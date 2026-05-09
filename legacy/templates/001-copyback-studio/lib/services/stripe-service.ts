import Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../supabase/types";

let stripeClient: Stripe | null = null;

const getStripe = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error("Stripe secret key is missing.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(apiKey);
  }

  return stripeClient;
};

export interface CheckoutOptions {
  priceId: string;
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
  mode?: "payment" | "subscription";
}

export async function createCheckoutSession(
  options: CheckoutOptions
): Promise<string> {
  const { priceId, userId, email, successUrl, cancelUrl, mode = "payment" } = options;

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    mode,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${cancelUrl}?status=canceled`,
    metadata: {
      userId,
      priceId,
      mode,
    },
  });

  return session.url!;
}

export async function createCustomer(
  email: string,
  userId: string
): Promise<string> {
  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabase_user_id: userId,
    },
  });

  return customer.id;
}

export async function getCustomerByEmail(
  email: string
): Promise<Stripe.Customer | null> {
  const stripe = getStripe();
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  return customers.data[0] || null;
}

export async function retrieveSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId);
}

export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Stripe webhook secret is missing.");
  }

  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

export function calculateCreditsFromPrice(priceId: string): number {
  const starterPrice = process.env.STRIPE_PRICE_ID_STARTER;
  const proPrice = process.env.STRIPE_PRICE_ID_PRO || process.env.STRIPE_PRICE_ID_SUBSCRIPTION;
  const enterprisePrice = process.env.STRIPE_PRICE_ID_ENTERPRISE;
  const packPrice = process.env.STRIPE_PRICE_ID_PACK;

  const creditMap: Record<string, number> = {
    ...(starterPrice ? { [starterPrice]: 200 } : {}),
    ...(proPrice ? { [proPrice]: 500 } : {}),
    ...(enterprisePrice ? { [enterprisePrice]: 1000 } : {}),
    ...(packPrice ? { [packPrice]: 100 } : {}),
  };

  return creditMap[priceId] || 10;
}

export async function syncCreditsToDatabase(
  userId: string,
  credits: number,
  supabaseClient: SupabaseClient<Database>
): Promise<void> {
  const { error } = await supabaseClient
    .from("user_profiles")
    .update({
      credits_balance: credits,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to sync credits: ${error.message}`);
  }
}

export async function getSubscriptionStatus(
  customerId: string
): Promise<"active" | "canceled" | "past_due" | "none"> {
  const stripe = getStripe();
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 1,
  });

  const subscription = subscriptions.data[0];
  if (!subscription) return "none";

  return subscription.status as "active" | "canceled" | "past_due";
}
