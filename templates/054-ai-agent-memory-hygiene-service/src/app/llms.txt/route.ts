import { NextResponse } from "next/server";

const LLMS_TEMPLATE = `# MemoryGuard — AI Agent Memory Hygiene Service

## What it is
MemoryGuard is an automated PII scrubbing and memory compression service for AI agent conversation memory. It helps companies running persistent AI coworkers (support agents, AI assistants, autonomous agents) stay GDPR compliant.

## Core problem
AI agents accumulate PII (names, emails, phone numbers, addresses) across conversation chains. When a GDPR deletion request arrives, teams must manually search thousands of conversation logs. MemoryGuard automates this.

## How it works
1. Connect your agent memory source via SDK or log export (LangChain, AutoGen, CrewAI, OpenAI Assistants, Custom GPTs, Haystack, LlamaIndex, Semantic Kernel)
2. ML-powered scanner detects PII across all conversation history
3. Scrub on schedule (daily, weekly, monthly) with selective memory pruning that preserves business context
4. Generate audit trails and deletion certificates for GDPR Art. 17 compliance

## Key differentiator
First automated PII scrubber purpose-built for conversational AI agent memory contexts — not generic database privacy tools. Works with conversation chains, not tabular data.

## Pricing
- Starter: Free (1 agent, basic PII detection, weekly hygiene runs)
- Pro: $29/agent/month (unlimited agents, ML detection, custom rules, daily runs, audit trail)
- Enterprise: Custom (HIPAA BAA, SSO, SLA guarantee)

## Compliance
SOC 2 Type II, GDPR, CCPA, HIPAA ready. Zero data retention — processes memory in-stream without storing raw conversations.

## Links
- Homepage: https://h9932-1774622526141.vercel.app
- Features: https://h9932-1774622526141.vercel.app/features
- Pricing: https://h9932-1774622526141.vercel.app/pricing
- Documentation: https://h9932-1774622526141.vercel.app/docs
`;
const SITE_ORIGINS = [
  "https://h9932-1774622526141.vercel.app"
];

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const siteUrl = new URL(request.url).origin;
  let body = LLMS_TEMPLATE;

  for (const origin of SITE_ORIGINS) {
    body = body.split(origin).join(siteUrl);
  }

  return new NextResponse(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=300",
    },
  });
}
