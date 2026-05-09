import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import {
  constructWebhookEvent,
  calculateCreditsFromPrice,
} from "../../../../lib/services/stripe-service";
import type { Database } from "../../../../lib/supabase/types";

type UserProfileUpdate = Database["public"]["Tables"]["user_profiles"]["Update"];

const extractStripeId = (value: unknown): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "id" in (value as { id?: unknown })) {
    const id = (value as { id?: unknown }).id;
    return typeof id === "string" ? id : null;
  }
  return null;
};

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are missing." },
      { status: 500 }
    );
  }

  const supabase = createClient<Database>(supabaseUrl, serviceRoleKey);
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  try {
    const event = await constructWebhookEvent(body, signature);

    const idempotencyInsert = await supabase
      .from("stripe_events")
      .insert({
        id: event.id,
        type: event.type,
      })
      .select("id")
      .single();

    if (idempotencyInsert.error) {
      const code = idempotencyInsert.error.code;
      if (code === "23505") {
        return NextResponse.json({ received: true });
      }
      if (code !== "42P01") {
        throw idempotencyInsert.error;
      }
      console.warn("stripe_events table missing; skipping webhook idempotency.");
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const priceId = session.metadata?.priceId;

        if (userId) {
          const stripeCustomerId = extractStripeId(session.customer);
          const update: UserProfileUpdate = {
            stripe_customer_id: stripeCustomerId,
            updated_at: new Date().toISOString(),
          };

          // For subscriptions, credits are granted on invoice.payment_succeeded per billing cycle.
          // Avoid double-granting on the initial checkout.
          if (session.mode !== "subscription" && priceId) {
            const credits = calculateCreditsFromPrice(priceId);

            const { data: profile } = await supabase
              .from("user_profiles")
              .select("credits_balance")
              .eq("id", userId)
              .single();

            const currentBalance = profile?.credits_balance || 0;
            update.credits_balance = currentBalance + credits;
          }

          await supabase
            .from("user_profiles")
            .update(update)
            .eq("id", userId);
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          const plan =
            subscription.status === "active"
              ? "pro"
              : subscription.status === "canceled"
              ? "free"
              : "free";

          await supabase
            .from("user_profiles")
            .update({
              plan,
              updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = extractStripeId(invoice.customer);
        const customerEmail = invoice.customer_email;

        if (!customerId) {
          break;
        }

        let profileLookup = await supabase
          .from("user_profiles")
          .select("id, credits_balance")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profileLookup.error && customerEmail) {
          profileLookup = await supabase
            .from("user_profiles")
            .select("id, credits_balance")
            .eq("email", customerEmail)
            .single();
        }

        if (!profileLookup.data) {
          break;
        }

        const lines = invoice.lines?.data ?? [];
        const creditsToAdd = lines.reduce((sum: number, line) => {
          const priceId = extractStripeId(line.pricing?.price_details?.price);
          if (!priceId) return sum;
          return sum + calculateCreditsFromPrice(priceId);
        }, 0);

        if (creditsToAdd > 0) {
          const currentBalance = profileLookup.data.credits_balance || 0;
          await supabase
            .from("user_profiles")
            .update({
              credits_balance: currentBalance + creditsToAdd,
              stripe_customer_id: customerId,
              updated_at: new Date().toISOString(),
            })
            .eq("id", profileLookup.data.id);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        console.warn(`[Stripe Webhook] Payment failed for customer: ${customerId}`);
        break;
      }

      default:
        // Silently ignore unhandled events
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
