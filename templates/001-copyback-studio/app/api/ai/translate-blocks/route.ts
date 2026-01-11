import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { translateBlocks } from "../../../../lib/services/ai-service";
import type { RecipeType, TextBlock } from "../../../../lib/types";

export async function POST(request: NextRequest) {
  const supabase = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const blocks = body?.blocks as TextBlock[] | undefined;
  const targetLanguage = body?.targetLanguage as string | undefined;
  const recipe = body?.recipe as RecipeType | undefined;

  if (!blocks || !targetLanguage || !recipe) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  try {
    const translated = await translateBlocks(blocks, targetLanguage, recipe);
    return NextResponse.json({ blocks: translated });
  } catch (error) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
