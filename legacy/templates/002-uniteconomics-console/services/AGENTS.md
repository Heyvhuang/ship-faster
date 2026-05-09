# SERVICES SCOPE

## OVERVIEW
External side-effects and integrations (currently: Gemini policy generation).

## STRUCTURE
- `geminiService.ts`: Gemini client + `generatePolicy(...)` helper.

## WHERE TO LOOK
- `services/geminiService.ts`: `generatePolicy(losers, targetMargin)` calls Gemini and returns plain text.

## CONVENTIONS (LOCAL)
- API key is read from `process.env.API_KEY` (injected by Vite `define` in `vite.config.ts`).
- Prompt is built from “loser” customers (negative margin) and the target margin.
- Output requirements (current prompt):
  - hard cap suggestion (tokens/credits)
  - overage price (per 1k tokens)
  - 2-paragraph customer email
- Model is hard-coded (`gemini-3-flash-preview`); thinking is disabled via `thinkingBudget: 0`.
- Return contract: always a `string` (either generated text or a fallback error string).

## NOTES
- Call sites treat the response as display-ready text (shown in a modal, copy-to-clipboard).
- Keep `thinkingBudget: 0` unless you explicitly need longer reasoning.
- Optional key setup: put `API_KEY` in `.env.local` (not committed; `*.local` is ignored).

## ANTI-PATTERNS
- Don’t log secrets or full prompts containing sensitive customer data.
- Don’t add new env keys without wiring them into `vite.config.ts#define`.
- Don’t change the return shape without updating call sites (expects `string`).
