export type Category = "database" | "caching" | "ci-cd" | "cloud" | "monitoring" | "messaging" | "auth" | "hosting";
export type Cloud = "AWS" | "GCP" | "Azure" | "Vercel" | "Other";

export interface Decision {
  id: string;
  tool: string;
  category: Category;
  cloud: Cloud;
  regretScore: number; // 1 = no regret, 5 = massive regret
  oneLiner: string;
  fullAdvice: string;
  companyStage: string;
  teamSize: string;
  submittedBy: string;
  upvotes: number;
  createdAt: string;
}

export const categoryLabels: Record<Category, string> = {
  database: "Database",
  caching: "Caching",
  "ci-cd": "CI/CD",
  cloud: "Cloud",
  monitoring: "Monitoring",
  messaging: "Messaging",
  auth: "Auth",
  hosting: "Hosting",
};

export const categoryColors: Record<Category, string> = {
  database: "bg-blue-100 text-blue-800",
  caching: "bg-purple-100 text-purple-800",
  "ci-cd": "bg-orange-100 text-orange-800",
  cloud: "bg-sky-100 text-sky-800",
  monitoring: "bg-pink-100 text-pink-800",
  messaging: "bg-teal-100 text-teal-800",
  auth: "bg-yellow-100 text-yellow-800",
  hosting: "bg-green-100 text-green-800",
};

export const decisions: Decision[] = [
  {
    id: "1",
    tool: "MongoDB",
    category: "database",
    cloud: "AWS",
    regretScore: 4,
    oneLiner: "Schema-less seemed great until we needed joins for literally everything.",
    fullAdvice: "We picked MongoDB because 'we don't know our schema yet.' Turns out, we did know our schema — we just didn't want to think about it. Within 6 months we were doing $lookup aggregations everywhere, performance tanked, and we spent 3 months migrating to PostgreSQL. If you have any relational data at all, just use Postgres from day one. MongoDB is great for document-heavy workloads like CMS or logging, but for a typical SaaS app with users, teams, and billing? Save yourself the pain.",
    companyStage: "Seed",
    teamSize: "3-5",
    submittedBy: "Alex K., CTO @ DataFlow",
    upvotes: 247,
    createdAt: "2025-11-15",
  },
  {
    id: "2",
    tool: "PostgreSQL",
    category: "database",
    cloud: "AWS",
    regretScore: 1,
    oneLiner: "Boring technology wins. Postgres does everything we need and more.",
    fullAdvice: "We chose Postgres on RDS from day one and never looked back. JSON columns handle our semi-structured data, full-text search replaced Elasticsearch for 90% of use cases, and the ecosystem (pgvector, PostGIS) means we keep finding new capabilities without adding services. The only 'regret' is we should have used it for our job queue too instead of adding Redis + BullMQ. Postgres with SKIP LOCKED is remarkably good at queues.",
    companyStage: "Series A",
    teamSize: "8-15",
    submittedBy: "Sarah M., Founder @ BuildKit",
    upvotes: 312,
    createdAt: "2025-10-22",
  },
  {
    id: "3",
    tool: "Kubernetes",
    category: "hosting",
    cloud: "GCP",
    regretScore: 5,
    oneLiner: "We spent more time managing K8s than building our actual product.",
    fullAdvice: "As a 4-person startup, we decided to 'do it right from the start' with Kubernetes on GKE. We spent 2 months setting up the cluster, Helm charts, Istio service mesh, and monitoring. Meanwhile our competitor shipped on Heroku in a week. K8s is an amazing platform — for companies with 50+ engineers and a dedicated platform team. For an early-stage startup, it's a massive time sink. We eventually moved to Cloud Run and our deployment complexity dropped by 90%. Don't build for Netflix scale when you have Netflix-party-of-four scale.",
    companyStage: "Pre-seed",
    teamSize: "2-4",
    submittedBy: "Marcus T., Co-founder @ ShipFast",
    upvotes: 489,
    createdAt: "2025-12-01",
  },
  {
    id: "4",
    tool: "Firebase",
    category: "database",
    cloud: "GCP",
    regretScore: 3,
    oneLiner: "Lightning fast to prototype, nightmare to migrate away from.",
    fullAdvice: "Firebase got us to market in 2 weeks. The real-time features were incredible for our collaboration tool. But the Firestore data model forced us into weird denormalization patterns, our bill went from $50 to $2,000/month as we scaled, and the vendor lock-in is real. When we needed server-side rendering and complex queries, we hit walls everywhere. Great for hackathons and MVPs you plan to throw away. Terrible if there's any chance you'll need to scale or pivot.",
    companyStage: "Seed",
    teamSize: "2-4",
    submittedBy: "Priya S., CEO @ CollabSpace",
    upvotes: 198,
    createdAt: "2025-09-18",
  },
  {
    id: "5",
    tool: "Redis",
    category: "caching",
    cloud: "AWS",
    regretScore: 2,
    oneLiner: "Redis is great, but we over-relied on it as a primary data store.",
    fullAdvice: "We used Redis for caching, sessions, rate limiting, and job queues — all great uses. The mistake was using it as a primary data store for leaderboards and real-time analytics. We lost data twice during failovers. Redis is best as a caching/acceleration layer in front of a durable database. Use Redis Streams or Pub/Sub for real-time features, but always have a source of truth elsewhere. ElastiCache managed Redis on AWS has been solid for us.",
    companyStage: "Series A",
    teamSize: "8-15",
    submittedBy: "James L., VP Eng @ GameMetrics",
    upvotes: 156,
    createdAt: "2025-10-05",
  },
  {
    id: "6",
    tool: "CircleCI",
    category: "ci-cd",
    cloud: "Other",
    regretScore: 4,
    oneLiner: "Constant outages and pricing changes made us switch to GitHub Actions.",
    fullAdvice: "We used CircleCI for 2 years. The platform itself is powerful, but we experienced major outages every few months, and they kept changing pricing in ways that increased our bill. The security incident in early 2023 was the final straw — we had to rotate every secret. GitHub Actions is 'good enough' for 95% of startups, it's free for public repos, and the marketplace has actions for everything. We migrated in a weekend and our CI costs dropped from $450/month to $0 (we're on the free tier with our team size).",
    companyStage: "Seed",
    teamSize: "5-8",
    submittedBy: "Chen W., CTO @ DevToolsCo",
    upvotes: 134,
    createdAt: "2025-11-28",
  },
  {
    id: "7",
    tool: "AWS Lambda",
    category: "cloud",
    cloud: "AWS",
    regretScore: 3,
    oneLiner: "Serverless is amazing until you need to debug a cold start in production at 2am.",
    fullAdvice: "Lambda reduced our ops burden significantly. But cold starts killed our P99 latency (1.5s+ for Java), debugging distributed Lambda chains is painful, and the 15-minute timeout caught us off guard for long-running tasks. We ended up with a hybrid: Lambda for event processing and webhooks, ECS Fargate for our API. The sweet spot is using Lambda for truly event-driven work, not trying to force your entire API into it. Also, Provisioned Concurrency exists but it defeats the cost purpose.",
    companyStage: "Series A",
    teamSize: "10-20",
    submittedBy: "Rachel K., Platform Lead @ EventStream",
    upvotes: 201,
    createdAt: "2025-08-12",
  },
  {
    id: "8",
    tool: "Datadog",
    category: "monitoring",
    cloud: "AWS",
    regretScore: 4,
    oneLiner: "Best monitoring tool we ever used. Also the most expensive SaaS bill we have.",
    fullAdvice: "Datadog is genuinely excellent — APM, logs, metrics, dashboards all in one place. The problem is cost. We went from $200/month to $3,500/month in 6 months as we added hosts and log volume grew. Custom metrics are especially expensive. We now use a mix: Grafana Cloud for metrics (much cheaper), Datadog APM for critical services only, and we pipe logs to Loki instead of Datadog Logs. If you're pre-Series A, start with Grafana Cloud or even just CloudWatch. Datadog is a Series B luxury.",
    companyStage: "Series A",
    teamSize: "15-25",
    submittedBy: "Tom H., SRE Lead @ ScaleUp",
    upvotes: 278,
    createdAt: "2025-12-10",
  },
  {
    id: "9",
    tool: "Vercel",
    category: "hosting",
    cloud: "Vercel",
    regretScore: 1,
    oneLiner: "Deploy on push, preview URLs, zero config. This is how hosting should work.",
    fullAdvice: "We moved from a custom AWS setup (CloudFront + S3 + Lambda@Edge) to Vercel and it was transformative. Preview deployments alone save us hours of QA time. Edge functions are fast, the DX is unmatched, and we deleted hundreds of lines of Terraform. The pricing is fair for our scale. Only caveat: if you need long-running background jobs or websockets, you'll still need a separate backend. But for Next.js apps, there's nothing better.",
    companyStage: "Seed",
    teamSize: "3-5",
    submittedBy: "Nina R., Founder @ PageCraft",
    upvotes: 345,
    createdAt: "2025-11-02",
  },
  {
    id: "10",
    tool: "Kafka",
    category: "messaging",
    cloud: "AWS",
    regretScore: 5,
    oneLiner: "We had 10 users and a Kafka cluster. Don't be us.",
    fullAdvice: "Our ex-LinkedIn engineer insisted on Kafka for 'future scale.' We spent 3 months setting up and maintaining a Kafka cluster for what turned out to be ~100 events per minute. A simple PostgreSQL NOTIFY/LISTEN or even SQS would have been fine. Kafka is incredible at what it does, but operating it is a full-time job. Unless you're processing millions of events per second, use SQS, Redis Streams, or even a simple database-backed queue. We replaced Kafka with SQS in a day and it's been rock solid.",
    companyStage: "Seed",
    teamSize: "3-5",
    submittedBy: "Derek M., CTO @ TinyStartup",
    upvotes: 523,
    createdAt: "2025-10-30",
  },
  {
    id: "11",
    tool: "Auth0",
    category: "auth",
    cloud: "Other",
    regretScore: 3,
    oneLiner: "Great until you need anything custom, then it's a maze of rules and hooks.",
    fullAdvice: "Auth0 saved us 2 weeks of building auth from scratch. But as we grew, every custom requirement (different login flows per tenant, custom MFA, organization-level roles) meant diving into Auth0 Rules, Actions, and Hooks — each with different execution models. The free tier is generous but the jump to paid is steep. We eventually switched to a self-hosted solution with NextAuth.js + our own user table. For simple B2C auth, Auth0 is fine. For B2B with complex requirements, consider Clerk or building your own.",
    companyStage: "Series A",
    teamSize: "8-15",
    submittedBy: "Lisa P., Lead Dev @ SaaSBuilder",
    upvotes: 167,
    createdAt: "2025-09-25",
  },
  {
    id: "12",
    tool: "GitHub Actions",
    category: "ci-cd",
    cloud: "Other",
    regretScore: 1,
    oneLiner: "Free, integrated with our repo, and the marketplace has everything we need.",
    fullAdvice: "After trying Jenkins, CircleCI, and GitLab CI, we settled on GitHub Actions and couldn't be happier. The YAML config is straightforward, the marketplace has pre-built actions for everything, and it's free for our team size. Matrix builds for testing across Node versions, automatic deployments to Vercel, and Dependabot integration all work seamlessly. The only downside is debugging workflow runs can be slow (no SSH into runners like CircleCI), but act for local testing helps.",
    companyStage: "Seed",
    teamSize: "3-5",
    submittedBy: "Mike D., Solo Founder @ DevWidget",
    upvotes: 189,
    createdAt: "2025-12-05",
  },
  {
    id: "13",
    tool: "DynamoDB",
    category: "database",
    cloud: "AWS",
    regretScore: 4,
    oneLiner: "Single-table design sounded clever. 6 months later nobody could read our code.",
    fullAdvice: "We followed the DynamoDB single-table design pattern religiously. It was fast, sure, but the access patterns were so rigid that every new feature required rethinking our data model. New engineers took weeks to understand the PK/SK naming conventions. When we needed to add a search feature, we had to pipe everything to OpenSearch anyway. DynamoDB is perfect for specific use cases (session stores, gaming leaderboards, IoT data), but for a general-purpose SaaS application, Postgres + a cache layer is far more flexible and developer-friendly.",
    companyStage: "Series A",
    teamSize: "10-20",
    submittedBy: "Anita J., Eng Manager @ CloudFirst",
    upvotes: 234,
    createdAt: "2025-11-08",
  },
  {
    id: "14",
    tool: "Terraform",
    category: "cloud",
    cloud: "AWS",
    regretScore: 2,
    oneLiner: "Steep learning curve but once it clicks, you'll never go back to ClickOps.",
    fullAdvice: "We resisted IaC for a year, clicking through the AWS console like cavemen. When an intern accidentally deleted our production VPC, we finally adopted Terraform. The learning curve is real — HCL is weird, state management is tricky, and modules can get complex. But now our entire infrastructure is versioned, reviewable, and reproducible. We use Terraform Cloud for state management and it works great. The key insight: start simple. Don't try to abstract everything into modules on day one. Write inline resources first, refactor later.",
    companyStage: "Series A",
    teamSize: "8-15",
    submittedBy: "Kevin O., DevOps @ InfraHQ",
    upvotes: 145,
    createdAt: "2025-10-17",
  },
  {
    id: "15",
    tool: "Elasticsearch",
    category: "database",
    cloud: "AWS",
    regretScore: 4,
    oneLiner: "Running your own Elasticsearch cluster is a full-time job nobody signed up for.",
    fullAdvice: "We added Elasticsearch for search and analytics. Self-managing it on AWS was a nightmare — cluster health issues, JVM tuning, index management, and the storage costs were astronomical. When we finally tried OpenSearch Serverless and later Typesense, we realized we'd been over-engineering our search needs. For most startups, PostgreSQL full-text search or Typesense/Meilisearch will cover 95% of your search needs at a fraction of the cost and complexity. Only reach for Elasticsearch if you're doing complex log analytics at scale.",
    companyStage: "Seed",
    teamSize: "5-8",
    submittedBy: "Ryan B., CTO @ SearchLite",
    upvotes: 178,
    createdAt: "2025-08-30",
  },
  {
    id: "16",
    tool: "Stripe",
    category: "auth",
    cloud: "Other",
    regretScore: 1,
    oneLiner: "Just use Stripe. The API is a work of art and the docs are the gold standard.",
    fullAdvice: "We evaluated 5 payment providers and Stripe won on every dimension: documentation, API design, webhook reliability, and the dashboard. Stripe Checkout saved us weeks of building payment UI. The only pain point is dealing with sales tax (but Stripe Tax helps) and the 2.9% + 30¢ fee adds up at scale. We now process $500K/month through Stripe and have never had a payment issue. If you're a startup, just use Stripe and spend your time on your actual product.",
    companyStage: "Series B",
    teamSize: "20-50",
    submittedBy: "Emma S., VP Eng @ PayScale",
    upvotes: 402,
    createdAt: "2025-12-15",
  },
];

export function getRegretColor(score: number): string {
  if (score <= 2) return "text-green-600";
  if (score <= 3) return "text-yellow-600";
  return "text-red-600";
}

export function getRegretBg(score: number): string {
  if (score <= 2) return "bg-green-50 border-green-200";
  if (score <= 3) return "bg-yellow-50 border-yellow-200";
  return "bg-red-50 border-red-200";
}

export function getRegretLabel(score: number): string {
  if (score === 1) return "No Regrets";
  if (score === 2) return "Minor Regrets";
  if (score === 3) return "Mixed Feelings";
  if (score === 4) return "Significant Regret";
  return "Massive Regret";
}
