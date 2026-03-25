export type Agent = "claude" | "gpt" | "ollama";

export interface Template {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  agents: Agent[];
  permissions: {
    allow: string[];
    deny: string[];
  };
  configPreview: string;
  downloads: number;
  version: string;
}

export const templates: Template[] = [
  {
    id: "code-review",
    title: "Code Review",
    slug: "code-review",
    description:
      "Sandbox for AI-assisted code review. Read-only access to project files with network isolation.",
    icon: "🔍",
    agents: ["claude", "gpt", "ollama"],
    permissions: {
      allow: [
        "read ~/Projects/**",
        "read ~/.gitconfig",
        "execute /usr/bin/git",
        "execute /usr/bin/diff",
      ],
      deny: [
        "write ~/Projects/**",
        "network *",
        "execute /bin/rm",
        "read ~/.ssh/*",
      ],
    },
    configPreview: `{
  "sandbox": "code-review",
  "version": "1.3.0",
  "fs": {
    "allow_read": ["~/Projects/**", "~/.gitconfig"],
    "deny_write": ["~/Projects/**"],
    "deny_read": ["~/.ssh/*", "~/.env*"]
  },
  "network": { "allow": [] },
  "process": {
    "allow": ["/usr/bin/git", "/usr/bin/diff"],
    "deny": ["/bin/rm", "/bin/mv"]
  }
}`,
    downloads: 2847,
    version: "1.3.0",
  },
  {
    id: "data-processing",
    title: "Data Processing",
    slug: "data-processing",
    description:
      "Isolated environment for data transformation. Write access to output directory only.",
    icon: "📊",
    agents: ["claude", "gpt", "ollama"],
    permissions: {
      allow: [
        "read ~/Data/input/**",
        "write ~/Data/output/**",
        "execute /usr/bin/python3",
        "execute /usr/bin/sqlite3",
      ],
      deny: [
        "network *",
        "write ~/Documents/**",
        "read ~/.ssh/*",
        "execute /bin/rm -rf",
      ],
    },
    configPreview: `{
  "sandbox": "data-processing",
  "version": "1.1.0",
  "fs": {
    "allow_read": ["~/Data/input/**"],
    "allow_write": ["~/Data/output/**"],
    "deny_read": ["~/.ssh/*", "~/.env*"]
  },
  "network": { "allow": [] },
  "process": {
    "allow": ["/usr/bin/python3", "/usr/bin/sqlite3"],
    "deny": ["/bin/rm"]
  }
}`,
    downloads: 1923,
    version: "1.1.0",
  },
  {
    id: "web-scraping",
    title: "Web Scraping",
    slug: "web-scraping",
    description:
      "Controlled network access for web scraping. Allowlisted domains with write to scrape output only.",
    icon: "🌐",
    agents: ["claude", "gpt"],
    permissions: {
      allow: [
        "network *.example.com",
        "write ~/Scrapes/**",
        "execute /usr/bin/curl",
        "execute /usr/bin/python3",
      ],
      deny: [
        "read ~/Documents/**",
        "network *.internal",
        "write ~/Projects/**",
        "execute /bin/rm",
      ],
    },
    configPreview: `{
  "sandbox": "web-scraping",
  "version": "1.2.1",
  "fs": {
    "allow_write": ["~/Scrapes/**"],
    "deny_read": ["~/Documents/**", "~/.ssh/*"]
  },
  "network": {
    "allow": ["*.example.com", "api.github.com"],
    "deny": ["*.internal", "localhost"]
  },
  "process": {
    "allow": ["/usr/bin/curl", "/usr/bin/python3"]
  }
}`,
    downloads: 3412,
    version: "1.2.1",
  },
  {
    id: "file-handling",
    title: "File Handling",
    slug: "file-handling",
    description:
      "Safe file manipulation sandbox. Scoped write access with delete protection.",
    icon: "📁",
    agents: ["claude", "gpt", "ollama"],
    permissions: {
      allow: [
        "read ~/Workspace/**",
        "write ~/Workspace/**",
        "execute /usr/bin/zip",
        "execute /usr/bin/tar",
      ],
      deny: [
        "network *",
        "write ~/Desktop/**",
        "execute /bin/rm -rf",
        "read ~/.ssh/*",
      ],
    },
    configPreview: `{
  "sandbox": "file-handling",
  "version": "1.0.2",
  "fs": {
    "allow_read": ["~/Workspace/**"],
    "allow_write": ["~/Workspace/**"],
    "deny_write": ["~/Desktop/**", "~/Documents/**"],
    "deny_read": ["~/.ssh/*"]
  },
  "network": { "allow": [] },
  "process": {
    "allow": ["/usr/bin/zip", "/usr/bin/tar"],
    "deny": ["/bin/rm"]
  }
}`,
    downloads: 1654,
    version: "1.0.2",
  },
  {
    id: "api-calls",
    title: "API Calls",
    slug: "api-calls",
    description:
      "Outbound API sandbox with domain allowlisting. No filesystem write access.",
    icon: "⚡",
    agents: ["claude", "gpt"],
    permissions: {
      allow: [
        "network api.stripe.com",
        "network api.github.com",
        "read ~/.config/api-keys.json",
        "execute /usr/bin/curl",
      ],
      deny: [
        "write ~/**",
        "network *.internal",
        "execute /bin/rm",
        "read ~/.ssh/*",
      ],
    },
    configPreview: `{
  "sandbox": "api-calls",
  "version": "1.4.0",
  "fs": {
    "allow_read": ["~/.config/api-keys.json"],
    "deny_write": ["~/**"],
    "deny_read": ["~/.ssh/*"]
  },
  "network": {
    "allow": ["api.stripe.com", "api.github.com"],
    "deny": ["*.internal", "localhost"]
  },
  "process": {
    "allow": ["/usr/bin/curl"]
  }
}`,
    downloads: 4201,
    version: "1.4.0",
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer, Raycast",
    text: "Finally, I can let Claude review my code without worrying about it touching things it shouldn't. The code review template just works.",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Indie Hacker",
    text: "I was hand-rolling sandbox configs for months. These templates saved me hours and they're more secure than what I had.",
    avatar: "MR",
  },
  {
    name: "Yuki Tanaka",
    role: "Security Engineer, Figma",
    text: "The permission breakdowns are exactly what I want to see. Transparent, granular, and easy to audit.",
    avatar: "YT",
  },
];
