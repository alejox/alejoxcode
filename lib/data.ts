import { demoPlugins, demoPosts } from "./demo";
import { serverClient } from "./supabase";
import type { Plugin, Post, Release } from "./types";

const PLUGIN_SELECT = "*, releases(*)";

export async function getPlugins(): Promise<Plugin[]> {
  const sb = serverClient();
  if (!sb) return demoPlugins;
  const { data, error } = await sb
    .from("plugins")
    .select(PLUGIN_SELECT)
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("updated_at", { ascending: false });
  if (error) {
    console.error("getPlugins", error.message);
    return [];
  }
  return (data ?? []) as Plugin[];
}

export async function getPlugin(slug: string): Promise<Plugin | null> {
  const sb = serverClient();
  if (!sb) return demoPlugins.find((p) => p.slug === slug) ?? null;
  const { data, error } = await sb
    .from("plugins")
    .select(PLUGIN_SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) console.error("getPlugin", error.message);
  return (data as Plugin) ?? null;
}

export async function getRelease(id: string): Promise<Release | null> {
  const sb = serverClient();
  if (!sb) return demoPlugins.flatMap((p) => p.releases).find((r) => r.id === id) ?? null;
  const { data } = await sb.from("releases").select("*").eq("id", id).maybeSingle();
  return (data as Release) ?? null;
}

export async function countDownload(id: string) {
  const sb = serverClient();
  if (!sb) return;
  const { error } = await sb.rpc("increment_download", { release_id: id });
  if (error) console.error("increment_download", error.message);
}

export async function getPosts(limit?: number): Promise<Post[]> {
  const sb = serverClient();
  if (!sb) return limit ? demoPosts.slice(0, limit) : demoPosts;
  let q = sb
    .from("posts")
    .select("id, slug, title, excerpt, cover_url, tags, published, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) {
    console.error("getPosts", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const sb = serverClient();
  if (!sb) return demoPosts.find((p) => p.slug === slug) ?? null;
  const { data } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Post) ?? null;
}
