export interface Dependency {
  name: string;
  version: string;
  latestVersion: string;
  healthScore: number;
  severity: "critical" | "warning" | "info" | "healthy";
  issues: string[];
  lastPublish: string;
  weeklyDownloads: string;
  maintainers: number;
  openIssues: number;
  openPRs: number;
  license: string;
  deprecated: boolean;
  lastCommitDays: number;
}

export interface ScanResult {
  repo: string;
  scannedAt: string;
  overallScore: number;
  totalDependencies: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  healthyCount: number;
  dependencies: Dependency[];
}

export const mockScanResult: ScanResult = {
  repo: "acme-corp/web-dashboard",
  scannedAt: "2026-03-19T14:32:00Z",
  overallScore: 62,
  totalDependencies: 34,
  criticalCount: 3,
  warningCount: 5,
  infoCount: 8,
  healthyCount: 18,
  dependencies: [
    {
      name: "event-stream",
      version: "3.3.4",
      latestVersion: "4.0.1",
      healthScore: 8,
      severity: "critical",
      issues: [
        "Known supply chain attack (CVE-2018-16487)",
        "Package hijacked — malicious code injected in v3.3.6",
        "No maintainer activity in 4+ years",
      ],
      lastPublish: "2018-09-09",
      weeklyDownloads: "1.2M",
      maintainers: 0,
      openIssues: 48,
      openPRs: 12,
      license: "MIT",
      deprecated: true,
      lastCommitDays: 2100,
    },
    {
      name: "request",
      version: "2.88.2",
      latestVersion: "2.88.2",
      healthScore: 15,
      severity: "critical",
      issues: [
        "Officially deprecated since Feb 2020",
        "No security patches will be released",
        "Migrate to undici, got, or node-fetch",
      ],
      lastPublish: "2020-02-11",
      weeklyDownloads: "14.8M",
      maintainers: 1,
      openIssues: 203,
      openPRs: 34,
      license: "Apache-2.0",
      deprecated: true,
      lastCommitDays: 1860,
    },
    {
      name: "node-uuid",
      version: "1.4.8",
      latestVersion: "1.4.8",
      healthScore: 12,
      severity: "critical",
      issues: [
        "Renamed to 'uuid' — this package is abandoned",
        "Last published 8+ years ago",
        "Known collision vulnerabilities in v1-v3",
      ],
      lastPublish: "2016-01-06",
      weeklyDownloads: "285K",
      maintainers: 0,
      openIssues: 5,
      openPRs: 0,
      license: "MIT",
      deprecated: true,
      lastCommitDays: 3700,
    },
    {
      name: "moment",
      version: "2.29.4",
      latestVersion: "2.30.1",
      healthScore: 38,
      severity: "warning",
      issues: [
        "In maintenance mode — no new features",
        "Large bundle size (329kB)",
        "Consider migrating to date-fns or dayjs",
      ],
      lastPublish: "2023-10-12",
      weeklyDownloads: "21.5M",
      maintainers: 2,
      openIssues: 264,
      openPRs: 87,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 450,
    },
    {
      name: "lodash",
      version: "4.17.19",
      latestVersion: "4.17.21",
      healthScore: 45,
      severity: "warning",
      issues: [
        "2 versions behind latest (security patches)",
        "Prototype pollution fix missing (CVE-2021-23337)",
        "Consider lodash-es for tree-shaking",
      ],
      lastPublish: "2021-02-20",
      weeklyDownloads: "48.2M",
      maintainers: 3,
      openIssues: 156,
      openPRs: 45,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 820,
    },
    {
      name: "chalk",
      version: "4.1.2",
      latestVersion: "5.3.0",
      healthScore: 52,
      severity: "warning",
      issues: [
        "Major version behind (ESM-only in v5)",
        "Migration required for ESM compatibility",
      ],
      lastPublish: "2023-11-25",
      weeklyDownloads: "195M",
      maintainers: 1,
      openIssues: 18,
      openPRs: 4,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 380,
    },
    {
      name: "glob",
      version: "7.2.3",
      latestVersion: "10.3.10",
      healthScore: 48,
      severity: "warning",
      issues: [
        "3 major versions behind",
        "v7 and v8 entering maintenance mode",
        "Performance improvements in v10+",
      ],
      lastPublish: "2024-01-15",
      weeklyDownloads: "89M",
      maintainers: 1,
      openIssues: 12,
      openPRs: 3,
      license: "ISC",
      deprecated: false,
      lastCommitDays: 200,
    },
    {
      name: "rimraf",
      version: "3.0.2",
      latestVersion: "5.0.5",
      healthScore: 50,
      severity: "warning",
      issues: [
        "2 major versions behind",
        "v3 uses deprecated glob APIs internally",
      ],
      lastPublish: "2024-01-15",
      weeklyDownloads: "54M",
      maintainers: 1,
      openIssues: 8,
      openPRs: 1,
      license: "ISC",
      deprecated: false,
      lastCommitDays: 200,
    },
    {
      name: "express",
      version: "4.18.2",
      latestVersion: "4.21.0",
      healthScore: 68,
      severity: "info",
      issues: ["Minor versions behind — update recommended"],
      lastPublish: "2024-09-10",
      weeklyDownloads: "32.5M",
      maintainers: 5,
      openIssues: 45,
      openPRs: 22,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 30,
    },
    {
      name: "debug",
      version: "4.3.4",
      latestVersion: "4.3.7",
      healthScore: 72,
      severity: "info",
      issues: ["Patch versions behind"],
      lastPublish: "2024-08-15",
      weeklyDownloads: "245M",
      maintainers: 2,
      openIssues: 14,
      openPRs: 6,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 60,
    },
    {
      name: "axios",
      version: "1.6.0",
      latestVersion: "1.7.2",
      healthScore: 75,
      severity: "info",
      issues: ["Minor version behind"],
      lastPublish: "2024-06-20",
      weeklyDownloads: "52M",
      maintainers: 3,
      openIssues: 89,
      openPRs: 15,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 45,
    },
    {
      name: "dotenv",
      version: "16.3.1",
      latestVersion: "16.4.5",
      healthScore: 78,
      severity: "info",
      issues: ["Patch versions behind"],
      lastPublish: "2024-03-01",
      weeklyDownloads: "32M",
      maintainers: 1,
      openIssues: 22,
      openPRs: 8,
      license: "BSD-2-Clause",
      deprecated: false,
      lastCommitDays: 90,
    },
    {
      name: "cors",
      version: "2.8.5",
      latestVersion: "2.8.5",
      healthScore: 65,
      severity: "info",
      issues: ["No updates in 18 months — low maintainer activity"],
      lastPublish: "2023-01-10",
      weeklyDownloads: "12M",
      maintainers: 1,
      openIssues: 35,
      openPRs: 12,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 600,
    },
    {
      name: "jsonwebtoken",
      version: "9.0.0",
      latestVersion: "9.0.2",
      healthScore: 70,
      severity: "info",
      issues: ["Patch behind — includes security fixes"],
      lastPublish: "2024-01-05",
      weeklyDownloads: "16M",
      maintainers: 2,
      openIssues: 67,
      openPRs: 18,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 150,
    },
    {
      name: "helmet",
      version: "7.1.0",
      latestVersion: "7.1.0",
      healthScore: 70,
      severity: "info",
      issues: ["High open issue count relative to maintainers"],
      lastPublish: "2024-02-10",
      weeklyDownloads: "4.2M",
      maintainers: 1,
      openIssues: 28,
      openPRs: 5,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 120,
    },
    {
      name: "compression",
      version: "1.7.4",
      latestVersion: "1.7.4",
      healthScore: 62,
      severity: "info",
      issues: ["No updates in 24 months"],
      lastPublish: "2022-06-15",
      weeklyDownloads: "8.5M",
      maintainers: 2,
      openIssues: 15,
      openPRs: 3,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 900,
    },
    {
      name: "mongoose",
      version: "8.0.3",
      latestVersion: "8.2.1",
      healthScore: 72,
      severity: "info",
      issues: ["Minor versions behind"],
      lastPublish: "2024-10-01",
      weeklyDownloads: "2.8M",
      maintainers: 4,
      openIssues: 120,
      openPRs: 25,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 7,
    },
    {
      name: "zod",
      version: "3.22.4",
      latestVersion: "3.22.4",
      healthScore: 92,
      severity: "healthy",
      issues: [],
      lastPublish: "2024-09-20",
      weeklyDownloads: "18M",
      maintainers: 2,
      openIssues: 45,
      openPRs: 10,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 14,
    },
    {
      name: "typescript",
      version: "5.3.3",
      latestVersion: "5.4.5",
      healthScore: 95,
      severity: "healthy",
      issues: [],
      lastPublish: "2024-10-10",
      weeklyDownloads: "48M",
      maintainers: 8,
      openIssues: 5800,
      openPRs: 250,
      license: "Apache-2.0",
      deprecated: false,
      lastCommitDays: 1,
    },
    {
      name: "next",
      version: "14.1.0",
      latestVersion: "14.2.5",
      healthScore: 90,
      severity: "healthy",
      issues: [],
      lastPublish: "2024-10-08",
      weeklyDownloads: "6.5M",
      maintainers: 12,
      openIssues: 2800,
      openPRs: 180,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 1,
    },
    {
      name: "react",
      version: "18.2.0",
      latestVersion: "18.3.1",
      healthScore: 88,
      severity: "healthy",
      issues: [],
      lastPublish: "2024-04-26",
      weeklyDownloads: "24M",
      maintainers: 6,
      openIssues: 1200,
      openPRs: 95,
      license: "MIT",
      deprecated: false,
      lastCommitDays: 3,
    },
  ],
};

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green";
  if (score >= 50) return "text-yellow";
  return "text-red";
}

export function getScoreBg(score: number): string {
  if (score >= 80) return "bg-green/10 border-green/20";
  if (score >= 50) return "bg-yellow/10 border-yellow/20";
  return "bg-red/10 border-red/20";
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "text-red";
    case "warning":
      return "text-yellow";
    case "info":
      return "text-blue-400";
    case "healthy":
      return "text-green";
    default:
      return "text-muted";
  }
}

export function getSeverityBg(severity: string): string {
  switch (severity) {
    case "critical":
      return "bg-red/10 border-red/30";
    case "warning":
      return "bg-yellow/10 border-yellow/30";
    case "info":
      return "bg-blue-500/10 border-blue-500/30";
    case "healthy":
      return "bg-green/10 border-green/30";
    default:
      return "bg-neutral-800 border-neutral-700";
  }
}

export function getSeverityLabel(severity: string): string {
  switch (severity) {
    case "critical":
      return "CRITICAL";
    case "warning":
      return "WARNING";
    case "info":
      return "INFO";
    case "healthy":
      return "HEALTHY";
    default:
      return severity.toUpperCase();
  }
}
