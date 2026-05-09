export type RiskLevel = "critical" | "high" | "medium" | "low";

export interface Dependency {
  name: string;
  version: string;
  category: string;
  riskLevel: RiskLevel;
  riskScore: number;
  lastChecked: string;
  trendingMentions: number;
  issues: DependencyIssue[];
}

export interface DependencyIssue {
  id: string;
  title: string;
  severity: RiskLevel;
  source: string;
  repo: string;
  description: string;
  detectedAt: string;
  type: "breaking-change" | "security" | "deprecation" | "compatibility";
}

export interface Alert {
  id: string;
  dependency: string;
  title: string;
  severity: RiskLevel;
  description: string;
  trendingRepo: string;
  trendingStars: number;
  detectedAt: string;
  status: "new" | "acknowledged" | "resolved";
  details: string;
  affectedVersions: string;
  recommendation: string;
}

export const dependencies: Dependency[] = [
  {
    name: "jsonwebtoken",
    version: "9.0.2",
    category: "Authentication",
    riskLevel: "critical",
    riskScore: 92,
    lastChecked: "2 min ago",
    trendingMentions: 47,
    issues: [
      { id: "i1", title: "Algorithm confusion vulnerability in JWT verification", severity: "critical", source: "GitHub Trending", repo: "jwt-exploit-demo", description: "A trending repository demonstrates a novel algorithm confusion attack against jsonwebtoken's verify() function when using asymmetric keys.", detectedAt: "2h ago", type: "security" },
      { id: "i2", title: "Breaking change in key handling for v10 pre-release", severity: "high", source: "GitHub Discussions", repo: "auth0/node-jsonwebtoken", description: "The upcoming v10 release changes how PEM keys are parsed, potentially breaking existing implementations.", detectedAt: "6h ago", type: "breaking-change" },
    ],
  },
  {
    name: "lodash",
    version: "4.17.21",
    category: "Utility",
    riskLevel: "high",
    riskScore: 74,
    lastChecked: "5 min ago",
    trendingMentions: 23,
    issues: [
      { id: "i3", title: "Prototype pollution in nested object merge", severity: "high", source: "GitHub Trending", repo: "lodash-pollution-poc", description: "New proof-of-concept demonstrates prototype pollution via _.merge() with crafted payloads bypassing existing guards.", detectedAt: "4h ago", type: "security" },
    ],
  },
  {
    name: "axios",
    version: "1.6.7",
    category: "HTTP Client",
    riskLevel: "medium",
    riskScore: 45,
    lastChecked: "8 min ago",
    trendingMentions: 12,
    issues: [
      { id: "i4", title: "SSRF bypass in URL parsing", severity: "medium", source: "GitHub Issues", repo: "axios/axios", description: "Reports of URL parsing inconsistencies that could lead to SSRF in certain proxy configurations.", detectedAt: "12h ago", type: "security" },
    ],
  },
  {
    name: "express",
    version: "4.18.2",
    category: "Framework",
    riskLevel: "medium",
    riskScore: 38,
    lastChecked: "3 min ago",
    trendingMentions: 8,
    issues: [
      { id: "i5", title: "Express 5 migration breaking changes compilation", severity: "medium", source: "GitHub Trending", repo: "express-5-migration-guide", description: "Trending guide highlights 23 breaking changes in Express 5 that affect common middleware patterns.", detectedAt: "1d ago", type: "breaking-change" },
    ],
  },
  {
    name: "bcrypt",
    version: "5.1.1",
    category: "Cryptography",
    riskLevel: "low",
    riskScore: 15,
    lastChecked: "1 min ago",
    trendingMentions: 3,
    issues: [],
  },
  {
    name: "next",
    version: "14.1.0",
    category: "Framework",
    riskLevel: "low",
    riskScore: 22,
    lastChecked: "4 min ago",
    trendingMentions: 5,
    issues: [
      { id: "i6", title: "Server Actions cache invalidation edge case", severity: "low", source: "GitHub Discussions", repo: "vercel/next.js", description: "Discussion thread about cache invalidation not working correctly with nested server actions in specific configurations.", detectedAt: "2d ago", type: "compatibility" },
    ],
  },
  {
    name: "prisma",
    version: "5.9.1",
    category: "ORM",
    riskLevel: "low",
    riskScore: 18,
    lastChecked: "6 min ago",
    trendingMentions: 4,
    issues: [],
  },
  {
    name: "zod",
    version: "3.22.4",
    category: "Validation",
    riskLevel: "low",
    riskScore: 8,
    lastChecked: "7 min ago",
    trendingMentions: 2,
    issues: [],
  },
];

export const alerts: Alert[] = [
  {
    id: "a1",
    dependency: "jsonwebtoken",
    title: "Critical: JWT Algorithm Confusion Attack Vector",
    severity: "critical",
    description: "A new trending repository (2.3k stars in 48h) demonstrates a novel algorithm confusion attack that can bypass jsonwebtoken's verify() when asymmetric keys are used.",
    trendingRepo: "jwt-exploit-demo",
    trendingStars: 2347,
    detectedAt: "2 hours ago",
    status: "new",
    affectedVersions: "<=9.0.2",
    recommendation: "Pin algorithm in verify options: jwt.verify(token, key, { algorithms: ['RS256'] }). Never allow the token header to dictate the algorithm. Update to latest patch when available.",
    details: `## Vulnerability Analysis

A trending repository on GitHub demonstrates a sophisticated algorithm confusion attack against the \`jsonwebtoken\` package. The attack exploits the default behavior where \`jwt.verify()\` does not restrict which algorithms are accepted.

### Attack Vector
\`\`\`javascript
// Vulnerable code pattern
const decoded = jwt.verify(token, publicKey);

// An attacker can craft a token using HS256 with the public key as secret
// Since the public key is often accessible, this allows forging valid tokens
\`\`\`

### Impact
- Authentication bypass in applications using asymmetric JWT verification
- Token forgery allowing unauthorized access
- Affects any service using RS256/ES256 without algorithm pinning

### Trending Signal
- Repository gained 2,347 stars in 48 hours
- 89 forks with active exploit development
- Referenced in 12 security-focused Twitter threads
- Discussion opened on jsonwebtoken's main repository

### Timeline
- **T-48h**: Repository created with initial PoC
- **T-36h**: First wave of Twitter discussions
- **T-24h**: Security researchers validate the attack
- **T-12h**: Major security blogs begin coverage
- **T-2h**: DepRadar alert generated`,
  },
  {
    id: "a2",
    dependency: "lodash",
    title: "High: New Prototype Pollution Vector in _.merge()",
    severity: "high",
    description: "Proof-of-concept repository trending with a new prototype pollution technique that bypasses lodash's existing sanitization in _.merge() and _.defaultsDeep().",
    trendingRepo: "lodash-pollution-poc",
    trendingStars: 891,
    detectedAt: "4 hours ago",
    status: "new",
    affectedVersions: "<=4.17.21",
    recommendation: "Use Object.create(null) for untrusted input objects. Consider migrating critical paths to native Object methods or a maintained alternative.",
    details: `## Vulnerability Analysis

A new proof-of-concept demonstrates that existing prototype pollution guards in lodash can be bypassed using Unicode normalization tricks.

### Attack Vector
\`\`\`javascript
// The new bypass technique uses Unicode characters
// that normalize to "__proto__" after lodash's sanitization
_.merge({}, JSON.parse('{"\\\\u005f_proto__": {"polluted": true}}'));
console.log({}.polluted); // true
\`\`\`

### Impact
- Remote code execution in server-side applications
- Denial of service through object poisoning
- Potential privilege escalation in certain frameworks

### Trending Signal
- 891 stars in 72 hours
- Active discussion in Node.js security channels`,
  },
  {
    id: "a3",
    dependency: "axios",
    title: "Medium: SSRF Bypass via URL Parsing Inconsistency",
    severity: "medium",
    description: "Reports indicate that axios URL parsing can be tricked to bypass SSRF protections in applications using URL allowlisting.",
    trendingRepo: "axios-ssrf-bypass",
    trendingStars: 342,
    detectedAt: "12 hours ago",
    status: "acknowledged",
    affectedVersions: "<=1.6.7",
    recommendation: "Implement server-side URL validation independent of axios. Use a dedicated SSRF protection library for URL verification before passing to axios.",
    details: `## Vulnerability Analysis

URL parsing differences between axios and standard URL parsers can lead to SSRF bypass when applications rely on URL validation before making requests.

### Impact
- Internal network scanning via SSRF
- Access to cloud metadata endpoints
- Bypass of URL-based security controls`,
  },
  {
    id: "a4",
    dependency: "express",
    title: "Info: Express 5 Breaking Changes Compilation",
    severity: "medium",
    description: "A comprehensive migration guide trending on GitHub catalogs 23 breaking changes in Express 5 that will affect most applications.",
    trendingRepo: "express-5-migration-guide",
    trendingStars: 1205,
    detectedAt: "1 day ago",
    status: "acknowledged",
    affectedVersions: "4.x → 5.x",
    recommendation: "Begin planning Express 5 migration. Review the breaking changes list against your codebase. Key areas: removed req.param(), changed path matching, updated body-parser defaults.",
    details: `## Migration Analysis

The trending Express 5 migration guide has identified critical breaking changes:

1. \`req.param()\` removed — use \`req.params\`, \`req.body\`, or \`req.query\`
2. Path route matching syntax changes
3. \`res.json()\` no longer calls \`res.send()\`
4. Promise-based middleware rejection handling
5. Updated \`body-parser\` defaults

### Planning Recommendation
- Audit middleware stack for compatibility
- Review all route path patterns
- Test error handling middleware chain`,
  },
];

export const riskColors: Record<RiskLevel, string> = {
  critical: "text-red-500",
  high: "text-orange-500",
  medium: "text-yellow-500",
  low: "text-emerald-500",
};

export const riskBgColors: Record<RiskLevel, string> = {
  critical: "bg-red-500/10 border-red-500/20",
  high: "bg-orange-500/10 border-orange-500/20",
  medium: "bg-yellow-500/10 border-yellow-500/20",
  low: "bg-emerald-500/10 border-emerald-500/20",
};

export const riskDotColors: Record<RiskLevel, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-emerald-500",
};
