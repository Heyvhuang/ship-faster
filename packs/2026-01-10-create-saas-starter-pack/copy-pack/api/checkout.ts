import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "../stripe-service";
import { createClient } from "../supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const priceId = body?.priceId as string | undefined;
  const mode = body?.mode as "payment" | "subscription" | undefined;
  const successUrl = body?.successUrl as string | undefined;
  const cancelUrl = body?.cancelUrl as string | undefined;

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  const supabase = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

  if (!origin && (!successUrl || !cancelUrl)) {
    return NextResponse.json({ error: "Missing app URL" }, { status: 500 });
  }

  const checkoutUrl = await createCheckoutSession({
    priceId,
    userId: user.id,
    email: user.email,
    successUrl: successUrl ?? `${origin}/billing/status?status=success`,
    cancelUrl: cancelUrl ?? `${origin}/billing/status?status=canceled`,
    mode: mode ?? "payment",
  });

  return NextResponse.json({ url: checkoutUrl });
}
