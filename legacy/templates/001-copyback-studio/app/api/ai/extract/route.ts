import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { extractTextBlocks } from "../../../../lib/services/ai-service";

export async function POST(request: NextRequest) {
  const supabase = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const imageDataUrl = body?.imageDataUrl as string | undefined;
  const mimeType = body?.mimeType as string | undefined;

  if (!imageDataUrl) {
    return NextResponse.json({ error: "Missing imageDataUrl" }, { status: 400 });
  }

  try {
    const blocks = await extractTextBlocks(imageDataUrl, mimeType);
    return NextResponse.json({ blocks });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
