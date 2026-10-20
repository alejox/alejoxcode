import type { MetadataRoute } from "next";
import { getPlugins, getPosts } from "@/lib/data";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [plugins, posts] = await Promise.all([getPlugins(), getPosts()]);
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/obs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...plugins.map((p) => ({ url: `${site.url}/obs/${p.slug}`, lastModified: p.updated_at })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.published_at })),
  ];
}
