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
