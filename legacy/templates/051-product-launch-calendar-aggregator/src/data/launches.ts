export type Category = "SaaS" | "Dev Tools" | "AI" | "Mobile" | "Fintech" | "Health" | "E-commerce" | "Productivity";
export type Platform = "Product Hunt" | "BetaList" | "Hacker News" | "Indie Hackers";

export interface Launch {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  platform: Platform;
  date: string; // YYYY-MM-DD
  url: string;
  logo: string; // emoji as placeholder
  upvotes?: number;
}

export const categories: Category[] = [
  "SaaS", "Dev Tools", "AI", "Mobile", "Fintech", "Health", "E-commerce", "Productivity"
];

export const platforms: Platform[] = [
  "Product Hunt", "BetaList", "Hacker News", "Indie Hackers"
];

const categoryColors: Record<Category, string> = {
  "SaaS": "bg-blue-100 text-blue-700",
  "Dev Tools": "bg-purple-100 text-purple-700",
  "AI": "bg-emerald-100 text-emerald-700",
  "Mobile": "bg-orange-100 text-orange-700",
  "Fintech": "bg-yellow-100 text-yellow-700",
  "Health": "bg-red-100 text-red-700",
  "E-commerce": "bg-pink-100 text-pink-700",
  "Productivity": "bg-cyan-100 text-cyan-700",
};

export function getCategoryColor(category: Category): string {
  return categoryColors[category] || "bg-gray-100 text-gray-700";
}

export const launches: Launch[] = [
  // March 2026
  { id: "1", name: "Raycast AI 3.0", tagline: "Your AI-powered productivity command bar", description: "Raycast AI 3.0 brings inline AI completions, smart clipboard history, and team snippets to your desktop workflow.", category: "Productivity", platform: "Product Hunt", date: "2026-03-02", url: "#", logo: "⚡", upvotes: 842 },
  { id: "2", name: "Supabase Vector", tagline: "Postgres-native vector embeddings", description: "Store and query vector embeddings directly in your Supabase Postgres database with pgvector integration.", category: "Dev Tools", platform: "Product Hunt", date: "2026-03-03", url: "#", logo: "🔮", upvotes: 1203 },
  { id: "3", name: "NomadHealth", tagline: "Telehealth for digital nomads", description: "Get instant access to doctors in 140+ countries. Insurance-agnostic consultations with prescriptions delivered anywhere.", category: "Health", platform: "BetaList", date: "2026-03-05", url: "#", logo: "🏥" },
  { id: "4", name: "Stripe Atlas 2.0", tagline: "Incorporate globally in minutes", description: "Stripe Atlas now supports 50+ jurisdictions with automated compliance, tax filing, and banking setup.", category: "Fintech", platform: "Product Hunt", date: "2026-03-07", url: "#", logo: "💳", upvotes: 2100 },
  { id: "5", name: "CodeCraft AI", tagline: "AI pair programmer for teams", description: "Real-time collaborative AI coding with context-aware suggestions, automated PR reviews, and team knowledge graphs.", category: "AI", platform: "Hacker News", date: "2026-03-10", url: "#", logo: "🤖", upvotes: 567 },
  { id: "6", name: "ShopFlow", tagline: "No-code e-commerce builder", description: "Build a complete online store in 10 minutes. AI-generated product descriptions, automated inventory, and built-in analytics.", category: "E-commerce", platform: "BetaList", date: "2026-03-12", url: "#", logo: "🛒" },
  { id: "7", name: "LinearDB", tagline: "The database built for speed", description: "Sub-millisecond queries at any scale. LinearDB combines the simplicity of SQLite with the power of distributed systems.", category: "Dev Tools", platform: "Hacker News", date: "2026-03-14", url: "#", logo: "⚙️", upvotes: 934 },
  { id: "8", name: "Monzo Business 2.0", tagline: "Business banking reimagined", description: "Multi-currency accounts, automated bookkeeping, and instant team expense cards with real-time spend controls.", category: "Fintech", platform: "Product Hunt", date: "2026-03-15", url: "#", logo: "🏦", upvotes: 1567 },
  { id: "9", name: "Marble", tagline: "Design system automation", description: "Marble scans your codebase and generates a living design system. Keeps Figma and code in perfect sync.", category: "Dev Tools", platform: "Product Hunt", date: "2026-03-17", url: "#", logo: "🎨", upvotes: 723 },
  { id: "10", name: "FocusApp", tagline: "Deep work scheduling for teams", description: "AI blocks your calendar for deep work, manages meeting-free days, and syncs focus time across your team.", category: "Productivity", platform: "BetaList", date: "2026-03-18", url: "#", logo: "🎯" },
  { id: "11", name: "AeroFit", tagline: "AI personal trainer in your pocket", description: "Computer vision form correction, adaptive workout plans, and nutrition tracking powered by GPT.", category: "Mobile", platform: "Product Hunt", date: "2026-03-19", url: "#", logo: "💪", upvotes: 456 },
  { id: "12", name: "DataWeave Pro", tagline: "ETL pipelines in plain English", description: "Describe your data transformation in natural language. DataWeave generates, tests, and deploys production pipelines.", category: "AI", platform: "Indie Hackers", date: "2026-03-20", url: "#", logo: "🔄" },
  { id: "13", name: "Clerk 5.0", tagline: "Auth that just works", description: "Passwordless, social, and enterprise SSO in one SDK. New: passkeys, device trust, and org-level permissions.", category: "SaaS", platform: "Product Hunt", date: "2026-03-21", url: "#", logo: "🔐", upvotes: 1890 },
  { id: "14", name: "SnapShip", tagline: "Ship mobile apps in a day", description: "Cross-platform app builder with native performance. Drag-and-drop UI, built-in backend, and one-click App Store deploy.", category: "Mobile", platform: "BetaList", date: "2026-03-22", url: "#", logo: "📱" },
  { id: "15", name: "Neon Serverless 2.0", tagline: "Serverless Postgres, supercharged", description: "Instant branching, autoscaling to zero, and built-in connection pooling. The database for modern apps.", category: "Dev Tools", platform: "Hacker News", date: "2026-03-24", url: "#", logo: "🟢", upvotes: 1100 },
  { id: "16", name: "Inbox Zero AI", tagline: "AI email management", description: "Automatically categorize, draft responses, and schedule emails. Learns your communication style over time.", category: "AI", platform: "Product Hunt", date: "2026-03-25", url: "#", logo: "📧", upvotes: 678 },
  { id: "17", name: "PayHero", tagline: "Payroll for startups worldwide", description: "Run payroll in 100+ countries. Automated tax compliance, contractor payments, and equity management.", category: "SaaS", platform: "BetaList", date: "2026-03-26", url: "#", logo: "💰" },
  { id: "18", name: "VoiceFlow 3.0", tagline: "Build voice apps without code", description: "Design conversational AI experiences with a visual builder. Deploy to Alexa, Google Home, and phone systems.", category: "AI", platform: "Product Hunt", date: "2026-03-27", url: "#", logo: "🎙️", upvotes: 543 },
  { id: "19", name: "PlantPal", tagline: "Smart plant care companion", description: "Identify plants with your camera, get personalized care schedules, and connect smart soil sensors.", category: "Mobile", platform: "Indie Hackers", date: "2026-03-28", url: "#", logo: "🌱" },
  { id: "20", name: "MetricsDash", tagline: "Real-time SaaS analytics", description: "Connect Stripe, Paddle, and 50+ billing providers. Get MRR, churn, LTV, and cohort analysis in real-time.", category: "SaaS", platform: "Product Hunt", date: "2026-03-30", url: "#", logo: "📊", upvotes: 912 },

  // April 2026
  { id: "21", name: "Warp Terminal 2.0", tagline: "The terminal reimagined", description: "AI-powered command suggestions, collaborative sessions, and built-in notebooks for DevOps workflows.", category: "Dev Tools", platform: "Product Hunt", date: "2026-04-01", url: "#", logo: "🖥️", upvotes: 2340 },
  { id: "22", name: "MedTrack", tagline: "Medication management simplified", description: "Smart medication reminders, drug interaction checks, and pharmacy price comparison.", category: "Health", platform: "BetaList", date: "2026-04-03", url: "#", logo: "💊" },
  { id: "23", name: "CartGenius", tagline: "AI shopping assistant", description: "Chrome extension that finds better prices, applies coupons, and tracks price drops across all major retailers.", category: "E-commerce", platform: "Product Hunt", date: "2026-04-05", url: "#", logo: "🛍️", upvotes: 789 },
  { id: "24", name: "FlowState", tagline: "Meditation meets productivity", description: "Guided focus sessions with binaural beats, Pomodoro integration, and team mindfulness challenges.", category: "Productivity", platform: "Indie Hackers", date: "2026-04-07", url: "#", logo: "🧘" },
  { id: "25", name: "CryptoTax Pro", tagline: "Crypto taxes made simple", description: "Auto-import from 300+ exchanges and wallets. Generate tax reports for US, EU, and 20+ jurisdictions.", category: "Fintech", platform: "Product Hunt", date: "2026-04-09", url: "#", logo: "🪙", upvotes: 432 },
  { id: "26", name: "Buildship 2.0", tagline: "Visual backend builder", description: "Create APIs, workflows, and integrations with a visual node editor. Deploy to the edge with one click.", category: "Dev Tools", platform: "Product Hunt", date: "2026-04-10", url: "#", logo: "🚀", upvotes: 1456 },
  { id: "27", name: "SleepGenius", tagline: "AI-powered sleep optimization", description: "Smart alarm, sleep stage tracking, and personalized wind-down routines powered by machine learning.", category: "Health", platform: "BetaList", date: "2026-04-12", url: "#", logo: "😴" },
  { id: "28", name: "Retool Mobile", tagline: "Build internal mobile apps fast", description: "Drag-and-drop mobile app builder for internal tools. Connect any database or API.", category: "SaaS", platform: "Hacker News", date: "2026-04-14", url: "#", logo: "🔧", upvotes: 876 },
  { id: "29", name: "PixelPerfect AI", tagline: "Design-to-code in seconds", description: "Upload a screenshot or Figma file and get production-ready React, Vue, or Swift code instantly.", category: "AI", platform: "Product Hunt", date: "2026-04-15", url: "#", logo: "✨", upvotes: 2567 },
  { id: "30", name: "BudgetBuddy", tagline: "Personal finance for Gen Z", description: "Connect bank accounts, set savings goals, and get spending insights with a TikTok-style interface.", category: "Fintech", platform: "BetaList", date: "2026-04-17", url: "#", logo: "🐷" },
];

export function getLaunchesByDate(date: string): Launch[] {
  return launches.filter(l => l.date === date);
}

export function getLaunchesByMonth(year: number, month: number): Launch[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  return launches.filter(l => l.date.startsWith(prefix));
}

export function searchLaunches(query: string): Launch[] {
  const q = query.toLowerCase();
  return launches.filter(l =>
    l.name.toLowerCase().includes(q) ||
    l.tagline.toLowerCase().includes(q) ||
    l.category.toLowerCase().includes(q)
  );
}

export function filterByCategory(items: Launch[], category: Category | null): Launch[] {
  if (!category) return items;
  return items.filter(l => l.category === category);
}

export function getUpcomingLaunches(fromDate: string, limit = 10): Launch[] {
  return launches
    .filter(l => l.date >= fromDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}
