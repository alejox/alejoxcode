import { marked } from "marked";
import type { Plugin, Release } from "./types";

export function formatBytes(bytes: number | null | undefined) {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("es", { notation: "compact" }).format(n);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function renderMarkdown(md: string | null | undefined) {
  return marked.parse(md ?? "", { async: false, gfm: true }) as string;
}

export function totalDownloads(p: Plugin) {
  return p.releases.reduce((acc, r) => acc + r.downloads, 0);
}

/** Compara versiones tipo 1.10.2 vs 1.9.0 (descendente). */
function cmpVersion(a: string, b: string) {
  const pa = a.replace(/^v/, "").split(/[.-]/).map((x) => parseInt(x) || 0);
  const pb = b.replace(/^v/, "").split(/[.-]/).map((x) => parseInt(x) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pb[i] ?? 0) - (pa[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

/** Agrupa releases por versión, de la más nueva a la más vieja. */
export function groupByVersion(releases: Release[]) {
  const map = new Map<string, Release[]>();
  for (const r of releases) {
    if (!map.has(r.version)) map.set(r.version, []);
    map.get(r.version)!.push(r);
  }
  return [...map.entries()]
    .sort(([a], [b]) => cmpVersion(a, b))
    .map(([version, files]) => ({ version, files, date: files[0].created_at }));
}

export function latestVersion(p: Plugin) {
  return groupByVersion(p.releases)[0] ?? null;
}
