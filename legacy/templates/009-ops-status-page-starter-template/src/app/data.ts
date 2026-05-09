export type ServiceStatus = "operational" | "degraded" | "partial_outage" | "major_outage";

export interface Service {
  name: string;
  status: ServiceStatus;
  description: string;
}

export interface Incident {
  id: string;
  title: string;
  status: "resolved" | "monitoring" | "investigating" | "identified";
  severity: "minor" | "major" | "critical";
  createdAt: string;
  updatedAt: string;
  updates: { message: string; timestamp: string }[];
}

export interface UptimeDay {
  date: string;
  status: ServiceStatus;
  uptime: number;
}

export const services: Service[] = [
  { name: "API", status: "operational", description: "Core REST & GraphQL APIs" },
  { name: "Web App", status: "operational", description: "Main dashboard application" },
  { name: "Database", status: "operational", description: "Primary data store" },
  { name: "CDN", status: "degraded", description: "Static asset delivery" },
  { name: "Auth Service", status: "operational", description: "Authentication & SSO" },
  { name: "Webhooks", status: "operational", description: "Event delivery system" },
];

export const incidents: Incident[] = [
  {
    id: "inc-004",
    title: "CDN latency increased in EU region",
    status: "monitoring",
    severity: "minor",
    createdAt: "2026-02-21T08:12:00Z",
    updatedAt: "2026-02-21T09:45:00Z",
    updates: [
      { message: "We are monitoring the situation after rerouting traffic to backup nodes.", timestamp: "2026-02-21T09:45:00Z" },
      { message: "Identified increased latency on EU-West CDN nodes. Investigating root cause.", timestamp: "2026-02-21T08:30:00Z" },
      { message: "We are investigating reports of slow asset loading in the EU region.", timestamp: "2026-02-21T08:12:00Z" },
    ],
  },
  {
    id: "inc-003",
    title: "Elevated error rates on API",
    status: "resolved",
    severity: "major",
    createdAt: "2026-02-19T14:05:00Z",
    updatedAt: "2026-02-19T15:32:00Z",
    updates: [
      { message: "This incident has been resolved. Error rates have returned to normal.", timestamp: "2026-02-19T15:32:00Z" },
      { message: "A fix has been deployed. Monitoring for stability.", timestamp: "2026-02-19T15:10:00Z" },
      { message: "Root cause identified: a misconfigured rate limiter was rejecting valid requests.", timestamp: "2026-02-19T14:40:00Z" },
      { message: "We are investigating elevated 5xx error rates on the API.", timestamp: "2026-02-19T14:05:00Z" },
    ],
  },
  {
    id: "inc-002",
    title: "Scheduled database maintenance",
    status: "resolved",
    severity: "minor",
    createdAt: "2026-02-15T02:00:00Z",
    updatedAt: "2026-02-15T03:15:00Z",
    updates: [
      { message: "Maintenance completed successfully. All systems nominal.", timestamp: "2026-02-15T03:15:00Z" },
      { message: "Database maintenance is underway. Brief read-only periods may occur.", timestamp: "2026-02-15T02:00:00Z" },
    ],
  },
  {
    id: "inc-001",
    title: "Auth service degradation",
    status: "resolved",
    severity: "critical",
    createdAt: "2026-02-10T18:22:00Z",
    updatedAt: "2026-02-10T20:05:00Z",
    updates: [
      { message: "Fully resolved. Auth service is operating normally.", timestamp: "2026-02-10T20:05:00Z" },
      { message: "Fix deployed. Login success rates recovering.", timestamp: "2026-02-10T19:30:00Z" },
      { message: "Identified issue with token validation service. Working on a fix.", timestamp: "2026-02-10T18:50:00Z" },
      { message: "Users reporting intermittent login failures. Investigating.", timestamp: "2026-02-10T18:22:00Z" },
    ],
  },
];

// Generate 90 days of uptime data for each service
function generateUptimeDays(seed: number): UptimeDay[] {
  const days: UptimeDay[] = [];
  const now = new Date("2026-02-21");
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const rand = Math.sin(seed * (i + 1)) * 10000;
    const v = rand - Math.floor(rand);
    let status: ServiceStatus = "operational";
    let uptime = 99.95 + v * 0.05;
    if (v < 0.03) {
      status = "major_outage";
      uptime = 95 + v * 30;
    } else if (v < 0.07) {
      status = "partial_outage";
      uptime = 98 + v * 10;
    } else if (v < 0.12) {
      status = "degraded";
      uptime = 99.5 + v * 0.5;
    }
    days.push({ date: d.toISOString().split("T")[0], status, uptime: Math.round(uptime * 100) / 100 });
  }
  return days;
}

export const uptimeData: Record<string, UptimeDay[]> = {
  API: generateUptimeDays(1),
  "Web App": generateUptimeDays(2),
  Database: generateUptimeDays(3),
  CDN: generateUptimeDays(4),
  "Auth Service": generateUptimeDays(5),
  Webhooks: generateUptimeDays(6),
};
