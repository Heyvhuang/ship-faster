const DEFAULT_LOCAL_SITE_URL = "http://localhost:3000";

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizeSiteUrl(raw: string | null | undefined): string | null {
  const value = String(raw ?? "").trim();
  if (!value) return null;

  const prefixed =
    value.startsWith("http://") || value.startsWith("https://")
      ? value
      : value.includes("localhost") || value.startsWith("127.0.0.1")
        ? `http://${value}`
        : `https://${value}`;

  try {
    return trimTrailingSlash(new URL(prefixed).toString());
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeSiteUrl(candidate);
    if (normalized) return normalized;
  }

  return DEFAULT_LOCAL_SITE_URL;
}

export function absoluteUrl(pathname = "/"): string {
  const siteUrl = getSiteUrl();
  if (!pathname || pathname === "/") return siteUrl;
  if (/^https?:\/\//.test(pathname)) return pathname;
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
