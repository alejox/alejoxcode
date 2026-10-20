"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category, Platform, Plugin } from "@/lib/types";
import { CATEGORY_LABEL, PLATFORM_LABEL } from "@/lib/types";
import { formatBytes, formatDate, formatNumber, latestVersion, totalDownloads } from "@/lib/utils";
import { DownloadIcon, PlatformIcon, SearchIcon } from "./Icons";
import { PluginCard } from "./PluginCard";

type Sort = "popular" | "recent" | "name";
const PLATFORMS: Platform[] = ["windows", "macos", "linux"];

export function DownloadsExplorer({
  plugins,
  initialCategory,
}: {
  plugins: Plugin[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">(
    initialCategory && initialCategory in CATEGORY_LABEL ? (initialCategory as Category) : "all"
  );
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [sort, setSort] = useState<Sort>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: plugins.length };
    for (const p of plugins) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [plugins]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return plugins
      .filter((p) => category === "all" || p.category === category)
      .filter(
        (p) =>
          platform === "all" ||
          p.releases.some((r) => r.platform === platform || r.platform === "any")
      )
      .filter(
        (p) =>
          !q ||
          [p.name, p.tagline, ...p.tags].some((s) => s?.toLowerCase().includes(q))
      )
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "recent") return +new Date(b.updated_at) - +new Date(a.updated_at);
        return totalDownloads(b) - totalDownloads(a);
      });
  }, [plugins, query, category, platform, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Dock "Escenas" = categorías */}
      <aside className="h-fit rounded-2xl border border-line bg-panel lg:sticky lg:top-24">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Escenas</span>
          <span className="font-mono text-[10px] text-muted">{filtered.length} items</span>
        </div>
        <ul className="flex gap-1 overflow-x-auto p-2 lg:flex-col">
          {(["all", ...Object.keys(CATEGORY_LABEL)] as (Category | "all")[]).map((c) => (
            <li key={c} className="shrink-0">
              <button
                onClick={() => setCategory(c)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                  category === c
                    ? "bg-brand-purple/30 text-white ring-1 ring-brand-violet/60"
                    : "text-muted hover:bg-panel-2 hover:text-white"
                }`}
              >
                <span>{c === "all" ? "Todo" : `${CATEGORY_LABEL[c]}s`}</span>
                <span className="font-mono text-xs opacity-70">{counts[c] ?? 0}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-line p-4">
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">Sistema</span>
          <div className="grid grid-cols-4 gap-1.5 lg:grid-cols-4">
            <button
              onClick={() => setPlatform("all")}
              className={`rounded-lg py-2 text-xs ${platform === "all" ? "bg-brand text-white" : "bg-panel-2 text-muted hover:text-white"}`}
            >
              Todos
            </button>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                title={PLATFORM_LABEL[p]}
                aria-label={PLATFORM_LABEL[p]}
                onClick={() => setPlatform(p)}
                className={`grid place-items-center rounded-lg py-2 ${platform === p ? "bg-brand text-white" : "bg-panel-2 text-muted hover:text-white"}`}
              >
                <PlatformIcon platform={p} width={15} height={15} />
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Barra de herramientas */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-panel px-4 focus-within:border-brand-violet">
            <SearchIcon className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar plugins, scripts, overlays…"
              className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </label>
          <div className="flex gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-xl border border-line bg-panel px-3 text-sm outline-none focus:border-brand-violet"
            >
              <option value="popular">Más descargados</option>
              <option value="recent">Recientes</option>
              <option value="name">A–Z</option>
            </select>
            <div className="flex rounded-xl border border-line bg-panel p-1">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={v === "grid" ? "Vista cuadrícula" : "Vista lista"}
                  className={`rounded-lg px-3 text-sm ${view === v ? "bg-panel-2 text-white" : "text-muted"}`}
                >
                  {v === "grid" ? "▦" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-16 text-center text-muted">
            <p className="font-mono text-sm">// sin resultados</p>
            <p className="mt-2">Prueba con otra búsqueda o categoría.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <PluginCard key={p.id} plugin={p} />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-panel">
            {filtered.map((p) => {
              const latest = latestVersion(p);
              return (
                <div key={p.id} className="flex flex-wrap items-center gap-4 border-b border-line px-5 py-4 last:border-0">
                  <div className="min-w-0 flex-1">
                    <Link href={`/obs/${p.slug}`} className="font-semibold text-white hover:text-brand-cyan">
                      {p.name}
                    </Link>
                    <p className="truncate text-sm text-muted">{p.tagline}</p>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {CATEGORY_LABEL[p.category]} · {latest ? `v${latest.version}` : "—"} ·{" "}
                    {latest ? formatDate(latest.date) : ""}
                  </span>
                  <div className="flex gap-2">
                    {latest?.files.map((f) => (
                      <a
                        key={f.id}
                        href={`/api/download/${f.id}`}
                        title={`${PLATFORM_LABEL[f.platform]} · ${formatBytes(f.file_size)}`}
                        className="flex items-center gap-1.5 rounded-lg bg-panel-2 px-3 py-2 text-xs hover:bg-brand-purple/40"
                      >
                        <PlatformIcon platform={f.platform} width={14} height={14} />
                        <DownloadIcon width={14} height={14} />
                      </a>
                    ))}
                  </div>
                  <span className="w-16 text-right font-mono text-xs text-muted">
                    {formatNumber(totalDownloads(p))} ↓
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
