import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/dashboard`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
