export type FeedSource = {
  id: string;
  name: string;
  type: "news" | "social" | "technical" | "government" | "threat-intel";
  region: string;
  status: "online" | "degraded" | "offline";
  latencyMs: number;
  itemsPerHour: number;
  premium: boolean;
};

export type FeedItem = {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceType: FeedSource["type"];
  title: string;
  summary: string;
  timestamp: string;
  region: string;
  tags: string[];
  severity: "low" | "medium" | "high" | "critical";
  url: string;
};

export type Alert = {
  id: string;
  keyword: string;
  isRegex: boolean;
  channel: "email" | "webhook" | "both";
  enabled: boolean;
  matchCount: number;
  lastTriggered: string | null;
};

export const feedSources: FeedSource[] = [
  { id: "reuters-osint", name: "Reuters Wire", type: "news", region: "Global", status: "online", latencyMs: 230, itemsPerHour: 48, premium: false },
  { id: "ap-feed", name: "AP News Feed", type: "news", region: "Global", status: "online", latencyMs: 180, itemsPerHour: 52, premium: false },
  { id: "bbc-monitor", name: "BBC Monitoring", type: "news", region: "Europe", status: "online", latencyMs: 310, itemsPerHour: 35, premium: false },
  { id: "xinhua-en", name: "Xinhua English", type: "news", region: "Asia-Pacific", status: "degraded", latencyMs: 890, itemsPerHour: 22, premium: false },
  { id: "tass-en", name: "TASS English", type: "news", region: "Russia/CIS", status: "online", latencyMs: 450, itemsPerHour: 28, premium: false },
  { id: "twitter-osint", name: "X/Twitter OSINT", type: "social", region: "Global", status: "online", latencyMs: 120, itemsPerHour: 340, premium: false },
  { id: "telegram-monitor", name: "Telegram Monitor", type: "social", region: "Global", status: "online", latencyMs: 95, itemsPerHour: 185, premium: true },
  { id: "reddit-osint", name: "Reddit OSINT", type: "social", region: "Global", status: "online", latencyMs: 200, itemsPerHour: 78, premium: false },
  { id: "cve-feed", name: "CVE Database", type: "technical", region: "Global", status: "online", latencyMs: 340, itemsPerHour: 12, premium: false },
  { id: "shodan-alerts", name: "Shodan Alerts", type: "technical", region: "Global", status: "online", latencyMs: 280, itemsPerHour: 45, premium: true },
  { id: "virustotal", name: "VirusTotal Feed", type: "technical", region: "Global", status: "online", latencyMs: 190, itemsPerHour: 67, premium: true },
  { id: "us-cert", name: "CISA Alerts", type: "government", region: "North America", status: "online", latencyMs: 520, itemsPerHour: 8, premium: false },
  { id: "eu-cert", name: "ENISA Advisories", type: "government", region: "Europe", status: "online", latencyMs: 610, itemsPerHour: 5, premium: false },
  { id: "mitre-attack", name: "MITRE ATT&CK", type: "threat-intel", region: "Global", status: "online", latencyMs: 400, itemsPerHour: 3, premium: false },
  { id: "alienvault-otx", name: "AlienVault OTX", type: "threat-intel", region: "Global", status: "degraded", latencyMs: 1200, itemsPerHour: 34, premium: true },
  { id: "recorded-future", name: "Recorded Future", type: "threat-intel", region: "Global", status: "online", latencyMs: 350, itemsPerHour: 56, premium: true },
];

export const feedItems: FeedItem[] = [
  {
    id: "fi-001", sourceId: "reuters-osint", sourceName: "Reuters Wire", sourceType: "news",
    title: "NATO allies agree on joint cyber defense framework at emergency summit",
    summary: "Defense ministers from 31 NATO member states signed a binding agreement to coordinate cyber defense responses, establishing a shared threat intelligence platform and rapid response teams.",
    timestamp: "2 min ago", region: "Europe", tags: ["NATO", "cyber-defense", "geopolitics"], severity: "high",
    url: "#"
  },
  {
    id: "fi-002", sourceId: "twitter-osint", sourceName: "X/Twitter OSINT", sourceType: "social",
    title: "Multiple reports of internet blackout in Khartoum region",
    summary: "NetBlocks confirms near-total internet shutdown in Khartoum state. Multiple OSINT accounts reporting communications disruption since 0400 UTC.",
    timestamp: "5 min ago", region: "Africa", tags: ["internet-shutdown", "Sudan", "connectivity"], severity: "critical",
    url: "#"
  },
  {
    id: "fi-003", sourceId: "cve-feed", sourceName: "CVE Database", sourceType: "technical",
    title: "CVE-2026-1847: Critical RCE in widely-used enterprise VPN appliance",
    summary: "CVSS 9.8 — Unauthenticated remote code execution vulnerability affecting firmware versions 4.2 through 4.7. Active exploitation confirmed by CISA.",
    timestamp: "8 min ago", region: "Global", tags: ["CVE", "RCE", "VPN", "critical"], severity: "critical",
    url: "#"
  },
  {
    id: "fi-004", sourceId: "telegram-monitor", sourceName: "Telegram Monitor", sourceType: "social",
    title: "Leaked documents circulating in Telegram channels claim government surveillance expansion",
    summary: "Unverified documents appearing in multiple Telegram groups detail alleged plans for expanded domestic surveillance capabilities. Authenticity not yet confirmed.",
    timestamp: "12 min ago", region: "Asia-Pacific", tags: ["surveillance", "leak", "unverified"], severity: "medium",
    url: "#"
  },
  {
    id: "fi-005", sourceId: "us-cert", sourceName: "CISA Alerts", sourceType: "government",
    title: "CISA adds 3 vulnerabilities to Known Exploited Vulnerabilities catalog",
    summary: "CISA has added CVE-2026-1847, CVE-2026-1623, and CVE-2026-1590 to the KEV catalog. Federal agencies must remediate by March 29, 2026.",
    timestamp: "15 min ago", region: "North America", tags: ["CISA", "KEV", "compliance"], severity: "high",
    url: "#"
  },
  {
    id: "fi-006", sourceId: "ap-feed", sourceName: "AP News Feed", sourceType: "news",
    title: "Major shipping route disrupted as cargo vessel runs aground in Suez Canal",
    summary: "Container ship Ever Forward has run aground in the Suez Canal, blocking northbound traffic. Tugboats deployed. Estimated 72-hour delay for rerouting.",
    timestamp: "18 min ago", region: "Middle East", tags: ["shipping", "supply-chain", "Suez"], severity: "high",
    url: "#"
  },
  {
    id: "fi-007", sourceId: "shodan-alerts", sourceName: "Shodan Alerts", sourceType: "technical",
    title: "Spike in exposed industrial control systems detected in Eastern Europe",
    summary: "Shodan monitoring detects 340% increase in internet-facing SCADA/ICS endpoints in Poland, Romania, and Czech Republic over the past 48 hours.",
    timestamp: "22 min ago", region: "Europe", tags: ["ICS", "SCADA", "exposure"], severity: "high",
    url: "#"
  },
  {
    id: "fi-008", sourceId: "mitre-attack", sourceName: "MITRE ATT&CK", sourceType: "threat-intel",
    title: "New APT group 'Velvet Tempest' added to threat landscape database",
    summary: "MITRE has cataloged a new threat group targeting financial institutions in Southeast Asia using novel supply-chain compromise techniques.",
    timestamp: "28 min ago", region: "Asia-Pacific", tags: ["APT", "threat-actor", "finance"], severity: "medium",
    url: "#"
  },
  {
    id: "fi-009", sourceId: "reddit-osint", sourceName: "Reddit OSINT", sourceType: "social",
    title: "Researchers identify coordinated inauthentic behavior campaign on social platforms",
    summary: "Stanford Internet Observatory researchers document a network of 2,400+ fake accounts spreading climate disinformation across multiple platforms.",
    timestamp: "34 min ago", region: "Global", tags: ["disinformation", "CIB", "social-media"], severity: "medium",
    url: "#"
  },
  {
    id: "fi-010", sourceId: "virustotal", sourceName: "VirusTotal Feed", sourceType: "technical",
    title: "New ransomware variant 'BlackMist' shows zero detection rate across 68 engines",
    summary: "Submitted sample uses novel encryption and anti-analysis techniques. First detection by CrowdStrike at T+4 hours. Currently 3/68 detection rate.",
    timestamp: "41 min ago", region: "Global", tags: ["ransomware", "malware", "zero-day"], severity: "critical",
    url: "#"
  },
  {
    id: "fi-011", sourceId: "bbc-monitor", sourceName: "BBC Monitoring", sourceType: "news",
    title: "Satellite imagery reveals new construction at disputed border region",
    summary: "Commercial satellite providers have captured images showing significant military infrastructure development at a disputed territorial border in South Asia.",
    timestamp: "47 min ago", region: "Asia-Pacific", tags: ["satellite", "military", "border"], severity: "medium",
    url: "#"
  },
  {
    id: "fi-012", sourceId: "recorded-future", sourceName: "Recorded Future", sourceType: "threat-intel",
    title: "Dark web marketplace announces auction of stolen government credentials",
    summary: "A prominent dark web forum has listed what it claims are 50,000+ government employee credentials from multiple agencies. Verification pending.",
    timestamp: "53 min ago", region: "North America", tags: ["dark-web", "credentials", "government"], severity: "critical",
    url: "#"
  },
];

export const alerts: Alert[] = [
  { id: "a-1", keyword: "CVE-2026", isRegex: false, channel: "email", enabled: true, matchCount: 47, lastTriggered: "8 min ago" },
  { id: "a-2", keyword: "ransomware|malware", isRegex: true, channel: "both", enabled: true, matchCount: 156, lastTriggered: "41 min ago" },
  { id: "a-3", keyword: "internet shutdown", isRegex: false, channel: "webhook", enabled: true, matchCount: 12, lastTriggered: "5 min ago" },
  { id: "a-4", keyword: "APT|threat.actor", isRegex: true, channel: "email", enabled: false, matchCount: 89, lastTriggered: "2 hours ago" },
  { id: "a-5", keyword: "supply chain", isRegex: false, channel: "both", enabled: true, matchCount: 34, lastTriggered: "18 min ago" },
];

export const stats = {
  totalFeeds: 16,
  activeFeeds: 14,
  itemsToday: 2847,
  alertsTriggered: 23,
  avgLatency: 380,
  uptime: 99.7,
};

export const regions = ["Global", "North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Russia/CIS", "South America"];
export const sourceTypes: FeedSource["type"][] = ["news", "social", "technical", "government", "threat-intel"];
