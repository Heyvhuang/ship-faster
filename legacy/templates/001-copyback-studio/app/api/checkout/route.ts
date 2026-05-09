import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "../../../lib/services/stripe-service";
import type { Database } from "../../../lib/supabase/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const priceType = body?.priceType as "starter" | "pro" | "enterprise" | undefined;

  if (!priceType) {
    return NextResponse.json({ error: "Missing priceType" }, { status: 400 });
  }

  const cookieStore = request.cookies;
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const priceMap = {
    starter: process.env.STRIPE_PRICE_ID_STARTER,
    pro: process.env.STRIPE_PRICE_ID_PRO || process.env.STRIPE_PRICE_ID_SUBSCRIPTION,
    enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE,
  };

  const priceId = priceMap[priceType];

  if (!priceId) {
    return NextResponse.json({ error: "Missing price configuration" }, { status: 500 });
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

  if (!origin) {
    return NextResponse.json({ error: "Missing app URL" }, { status: 500 });
  }

  const checkoutUrl = await createCheckoutSession({
    priceId,
    userId: user.id,
    email: user.email,
    successUrl: `${origin}/billing/status?status=success`,
    cancelUrl: `${origin}/billing/status?status=canceled`,
    mode: "subscription",
  });

  return NextResponse.json({ url: checkoutUrl });
}
