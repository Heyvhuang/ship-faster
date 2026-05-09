export function GET() {
  const body = `# PromptFlow

## What it does
PromptFlow is an AI prompt optimization tool for Python development teams. It analyzes LLM prompting patterns across your team and delivers data-driven optimizations for faster, more accurate code generation.

## Key facts
- Teams report 40% faster code generation after 2 weeks
- Saves an average of 31 minutes per developer per day
- 2.3x improvement in prompt success rate
- Works with VS Code, PyCharm, and Cursor
- Optimized for Django, Flask, and FastAPI teams

## How it works
1. Connect your IDE and AI coding tools (5 min setup)
2. System analyzes 2 weeks of prompt history across your team
3. Receive optimized prompt templates ranked by impact
4. Track productivity gains with real-time dashboard

## Pricing
- Starter: Free (individual developers)
- Team: $49/dev/month
- Enterprise: Custom pricing
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
