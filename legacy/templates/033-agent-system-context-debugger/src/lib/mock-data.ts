export interface ContextSegment {
  id: string;
  label: string;
  tokens: number;
  color: string;
  description: string;
}

export interface Session {
  id: string;
  name: string;
  model: string;
  maxTokens: number;
  usedTokens: number;
  timestamp: string;
  status: "healthy" | "warning" | "critical";
  segments: ContextSegment[];
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: "info" | "warning" | "critical";
  message: string;
  timestamp: string;
}

export const sessions: Session[] = [
  {
    id: "sess-001",
    name: "Customer Support Agent",
    model: "gpt-4-turbo",
    maxTokens: 128000,
    usedTokens: 98420,
    timestamp: "2026-03-02T14:23:00Z",
    status: "critical",
    segments: [
      { id: "s1", label: "System Prompt", tokens: 4200, color: "#58a6ff", description: "Base instructions and persona definition" },
      { id: "s2", label: "Tool Definitions", tokens: 12800, color: "#bc8cff", description: "18 tool schemas with parameter definitions" },
      { id: "s3", label: "Conversation History", tokens: 62400, color: "#d29922", description: "147 messages across 23 turns" },
      { id: "s4", label: "Retrieved Memories", tokens: 8900, color: "#3fb950", description: "Long-term memory retrieval from vector store" },
      { id: "s5", label: "RAG Documents", tokens: 7200, color: "#d18616", description: "3 retrieved documents from knowledge base" },
      { id: "s6", label: "Function Results", tokens: 2920, color: "#f85149", description: "Cached results from previous tool calls" },
    ],
    alerts: [
      { id: "a1", type: "critical", message: "Context at 76.9% capacity — conversation history consuming 63.4% of total", timestamp: "14:23:00" },
      { id: "a2", type: "warning", message: "Tool definitions could be compressed by ~30% using reference schemas", timestamp: "14:20:12" },
      { id: "a3", type: "info", message: "3 retrieved memories are duplicates of conversation content", timestamp: "14:18:45" },
    ],
  },
  {
    id: "sess-002",
    name: "Code Review Agent",
    model: "claude-sonnet-4-6",
    maxTokens: 200000,
    usedTokens: 87300,
    timestamp: "2026-03-02T13:45:00Z",
    status: "warning",
    segments: [
      { id: "s1", label: "System Prompt", tokens: 6800, color: "#58a6ff", description: "Detailed code review guidelines and standards" },
      { id: "s2", label: "Tool Definitions", tokens: 8400, color: "#bc8cff", description: "12 tools for file reading, diffing, and commenting" },
      { id: "s3", label: "Conversation History", tokens: 24100, color: "#d29922", description: "32 messages across 8 turns" },
      { id: "s4", label: "Code Files", tokens: 38200, color: "#3fb950", description: "5 source files loaded for review" },
      { id: "s5", label: "Diff Context", tokens: 6800, color: "#d18616", description: "Git diff for PR #847" },
      { id: "s6", label: "Style Guide", tokens: 3000, color: "#f85149", description: "Team coding standards document" },
    ],
    alerts: [
      { id: "a1", type: "warning", message: "Code files segment growing — consider selective file loading", timestamp: "13:45:00" },
      { id: "a2", type: "info", message: "System prompt could be split into base + conditional sections", timestamp: "13:42:30" },
    ],
  },
  {
    id: "sess-003",
    name: "Research Assistant",
    model: "gpt-4o",
    maxTokens: 128000,
    usedTokens: 34500,
    timestamp: "2026-03-02T12:10:00Z",
    status: "healthy",
    segments: [
      { id: "s1", label: "System Prompt", tokens: 2100, color: "#58a6ff", description: "Research assistant base instructions" },
      { id: "s2", label: "Tool Definitions", tokens: 5600, color: "#bc8cff", description: "8 tools for web search and citation" },
      { id: "s3", label: "Conversation History", tokens: 18200, color: "#d29922", description: "24 messages across 6 turns" },
      { id: "s4", label: "Search Results", tokens: 6400, color: "#3fb950", description: "Cached web search results" },
      { id: "s5", label: "Citations", tokens: 2200, color: "#d18616", description: "Formatted citation references" },
    ],
    alerts: [
      { id: "a1", type: "info", message: "Context usage healthy at 27.0%", timestamp: "12:10:00" },
    ],
  },
  {
    id: "sess-004",
    name: "Data Pipeline Agent",
    model: "claude-opus-4-6",
    maxTokens: 200000,
    usedTokens: 156000,
    timestamp: "2026-03-02T11:30:00Z",
    status: "critical",
    segments: [
      { id: "s1", label: "System Prompt", tokens: 8200, color: "#58a6ff", description: "Complex pipeline orchestration instructions" },
      { id: "s2", label: "Tool Definitions", tokens: 22400, color: "#bc8cff", description: "34 tools for data transformation and IO" },
      { id: "s3", label: "Conversation History", tokens: 45600, color: "#d29922", description: "89 messages across 31 turns" },
      { id: "s4", label: "Schema Definitions", tokens: 34800, color: "#3fb950", description: "Database schemas and data models" },
      { id: "s5", label: "Execution Logs", tokens: 28400, color: "#d18616", description: "Previous pipeline execution outputs" },
      { id: "s6", label: "Error Context", tokens: 16600, color: "#f85149", description: "Stack traces and error messages" },
    ],
    alerts: [
      { id: "a1", type: "critical", message: "Context at 78.0% — approaching model limit", timestamp: "11:30:00" },
      { id: "a2", type: "critical", message: "Execution logs contain redundant entries — 40% could be summarized", timestamp: "11:28:15" },
      { id: "a3", type: "warning", message: "34 tool definitions exceed recommended maximum of 20", timestamp: "11:25:00" },
    ],
  },
  {
    id: "sess-005",
    name: "Email Drafting Agent",
    model: "gpt-4o-mini",
    maxTokens: 128000,
    usedTokens: 12400,
    timestamp: "2026-03-02T10:05:00Z",
    status: "healthy",
    segments: [
      { id: "s1", label: "System Prompt", tokens: 1800, color: "#58a6ff", description: "Email writing guidelines and tone" },
      { id: "s2", label: "Tool Definitions", tokens: 2200, color: "#bc8cff", description: "4 tools for email send and draft" },
      { id: "s3", label: "Conversation History", tokens: 5400, color: "#d29922", description: "12 messages across 4 turns" },
      { id: "s4", label: "Contact Context", tokens: 1800, color: "#3fb950", description: "Recipient information and history" },
      { id: "s5", label: "Templates", tokens: 1200, color: "#d18616", description: "Email template library" },
    ],
    alerts: [
      { id: "a1", type: "info", message: "Lightweight session — 9.7% context usage", timestamp: "10:05:00" },
    ],
  },
];

export const systemPromptExample = `You are a customer support agent for Acme Corp. Your role is to help customers with their orders, returns, and product questions.

## Guidelines
- Always be polite and professional
- Use the customer's name when available
- Check order status before suggesting solutions
- Escalate to human agent for refund requests over $500
- Never share internal pricing or margin information

## Available Tools
You have access to the following tools:
- lookup_order: Find order by ID or customer email
- check_inventory: Check product availability
- create_return: Initiate a return request
- send_email: Send confirmation emails
- transfer_agent: Escalate to human agent

## Response Format
- Keep responses concise (under 200 words)
- Use bullet points for multiple items
- Include order numbers in all references
- End with a follow-up question when appropriate

## Tone
- Friendly but professional
- Empathetic when handling complaints
- Confident when providing solutions
- Never use slang or overly casual language`;
