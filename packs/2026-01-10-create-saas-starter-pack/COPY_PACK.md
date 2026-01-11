# Copy Pack: SaaS Starter Pack

Version: 1.0.0
Last updated: 2026-01-10

## Ship Faster

- Repo home: [`../../`](../../)
- Website: https://voxyz.space

## Overview
This pack provides copy-ready templates for a minimal SaaS stack:
- Supabase Auth + RLS + schema
- Stripe Checkout + Webhook
- Credits estimation + charge helpers
- R2/S3-compatible storage helpers

## Recommended Template

- [`../../templates/001-copyback-studio/`](../../templates/001-copyback-studio/) - CopyBack Studio (full app)

## Structure

```
COPY_PACK.md
copy-pack/
├── stripe-service.ts
├── credits.ts
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   ├── types.ts
│   └── AuthProvider.tsx
├── storage/
│   └── r2.ts
├── api/
│   ├── checkout.ts
│   └── webhook-stripe.ts
├── schema.sql
└── .env.example
```

## Environment Variables

Use `copy-pack/.env.example` as the base:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_PRICE_CREDITS_MAP={"price_123":100,"price_456":500}

R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com
R2_BUCKET=your-bucket
R2_PUBLIC_BASE=https://cdn.your-domain.com

NEXT_PUBLIC_APP_URL=https://your-app.example.com
NEXT_PUBLIC_CREDITS_PER_ITEM=6
```

## Supabase Module

### copy-pack/supabase/client.ts
```ts
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./types";

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

### copy-pack/supabase/server.ts
```ts
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { Database } from "./types";

export const createClient = (request: NextRequest) => {
  const cookieStore = request.cookies;

  return createServerClient<Database>(
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
};
```

### copy-pack/supabase/types.ts
```ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      stripe_events: {
        Row: {
          created_at: string | null
          id: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          type?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          credits_balance: number | null
          display_name: string | null
          email: string
          id: string
          plan: string | null
          role: string
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credits_balance?: number | null
          display_name?: string | null
          email: string
          id: string
          plan?: string | null
          role?: string
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credits_balance?: number | null
          display_name?: string | null
          email?: string
          id?: string
          plan?: string | null
          role?: string
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
```

### copy-pack/supabase/AuthProvider.tsx
```tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "./client";
import type { Database } from "./types";

type AuthContextValue = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    syncSession();

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ supabase, session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### copy-pack/schema.sql
```sql
create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  stripe_customer_id text,
  plan text default 'free' check (plan in ('free', 'pro', 'enterprise')),
  credits_balance integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create policy "Users can view own profile"
  on public.user_profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.user_profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create table public.stripe_events (
  id text primary key,
  type text,
  created_at timestamptz default now()
);

alter table public.stripe_events enable row level security;
```

## Stripe Module

### copy-pack/stripe-service.ts
```ts
import Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase/types";

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

export type PriceCreditsMap = Record<string, number>;

export async function createCheckoutSession(
  options: CheckoutOptions
): Promise<string> {
  const { priceId, userId, email, successUrl, cancelUrl, mode = "payment" } = options;

  const resolvedSuccessUrl = new URL(successUrl);
  resolvedSuccessUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
  const resolvedCancelUrl = new URL(cancelUrl);

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
    success_url: resolvedSuccessUrl.toString(),
    cancel_url: resolvedCancelUrl.toString(),
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

export function getPriceCreditsMap(): PriceCreditsMap {
  const raw = process.env.STRIPE_PRICE_CREDITS_MAP;
  if (!raw) return {};

  const parsed = JSON.parse(raw) as PriceCreditsMap;
  return parsed ?? {};
}

export function calculateCreditsFromPrice(
  priceId: string,
  priceCreditsMap: PriceCreditsMap
): number {
  return priceCreditsMap[priceId] || 0;
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
```

### copy-pack/api/checkout.ts
```ts
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
```

### copy-pack/api/webhook-stripe.ts
```ts
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import {
  constructWebhookEvent,
  calculateCreditsFromPrice,
  getPriceCreditsMap,
} from "../stripe-service";
import type { Database } from "../supabase/types";

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
    const priceCreditsMap = getPriceCreditsMap();

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

          if (session.mode !== "subscription" && priceId) {
            const credits = calculateCreditsFromPrice(priceId, priceCreditsMap);

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
          const priceId =
            extractStripeId((line as { price?: unknown }).price) ??
            extractStripeId(line.pricing?.price_details?.price);
          if (!priceId) return sum;
          return sum + calculateCreditsFromPrice(priceId, priceCreditsMap);
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

        console.log(`Payment failed for customer: ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
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
```

## Storage Module

### copy-pack/storage/r2.ts
```ts
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type StorageConfig = {
  client: S3Client;
  bucket: string;
  publicBase?: string;
};

export const createStorageConfig = (): StorageConfig | null => {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.R2_ENDPOINT;
  const bucket = process.env.R2_BUCKET;
  const publicBase = process.env.R2_PUBLIC_BASE;

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    return null;
  }

  return {
    bucket,
    publicBase,
    client: new S3Client({
      region: "auto",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    }),
  };
};

export const generateStoragePath = (
  userId: string,
  fileId: string,
  extension: string
) => {
  const normalizedExtension = extension.replace(/^\./, "");
  return `${userId}/${fileId}.${normalizedExtension}`;
};

export const resolveFileUrl = async (
  key: string,
  expiresInSeconds = 60 * 60 * 24
): Promise<string> => {
  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket, publicBase } = config;
  if (publicBase) {
    return `${publicBase.replace(/\/$/, "")}/${key}`;
  }

  return getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: key }), {
    expiresIn: expiresInSeconds,
  });
};

export const uploadFile = async (
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string | null> => {
  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket, publicBase } = config;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  if (publicBase) {
    return `${publicBase.replace(/\/$/, "")}/${key}`;
  }

  return null;
};

export const deleteFile = async (key: string): Promise<void> => {
  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket } = config;
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
};

export const deleteFiles = async (keys: string[]): Promise<void> => {
  if (keys.length === 0) return;

  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket } = config;
  await client.send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
        Quiet: true,
      },
    })
  );
};
```

## Credits Module

### copy-pack/credits.ts
```ts
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
```

## Copy Steps

1. Copy `copy-pack/` into your project.
2. Apply `copy-pack/schema.sql` in Supabase.
3. Add env vars from `copy-pack/.env.example`.
4. Wire `AuthProvider` in your app layout.
5. Add API routes by moving `copy-pack/api/checkout.ts` to `app/api/checkout/route.ts` and `copy-pack/api/webhook-stripe.ts` to `app/api/webhook/stripe/route.ts`, then adjust import paths.
