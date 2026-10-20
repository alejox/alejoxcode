"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category, Platform, Plugin } from "@/lib/types";
import { CATEGORY_LABEL, PLATFORM_LABEL } from "@/lib/types";
import { formatBytes, formatDate, formatNumber, latestVersion, totalDownloads } from "@/lib/utils";
import { CategoryIcon, DownloadIcon, PlatformIcon, SearchIcon } from "./Icons";
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
      {/* Dock "Escenas" = categorías */}
      <aside className="glass h-fit min-w-0 lg:sticky lg:top-24">
        <div className="flex items-center justify-between px-5 py-4 shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)]">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-mist">Escenas</span>
          <span className="font-mono text-[10px] text-muted">{filtered.length} items</span>
        </div>
        <ul className="flex gap-1 overflow-x-auto p-2 lg:flex-col">
          {(["all", ...Object.keys(CATEGORY_LABEL)] as (Category | "all")[]).map((c) => (
            <li key={c} className="shrink-0">
              <button
                onClick={() => setCategory(c)}
                className={`flex w-full items-center justify-between gap-3 rounded-full px-4 py-2 text-left text-sm transition ${
                  category === c
                    ? "hairline bg-[rgb(186_214_247/0.08)] text-white"
                    : "text-mist hover:bg-[rgb(186_214_247/0.04)] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5"><CategoryIcon category={c} width={15} height={15} className="text-muted" />{c === "all" ? "Todo" : `${CATEGORY_LABEL[c]}s`}</span>
                <span className="font-mono text-xs opacity-70">{counts[c] ?? 0}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="p-4 shadow-[inset_0_1px_0_rgb(186_215_247/0.08)]">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.1em] text-mist">Sistema</span>
          <div className="hairline grid grid-cols-4 gap-1 rounded-full p-1">
            <button
              onClick={() => setPlatform("all")}
              className={`rounded-full py-1.5 text-xs ${platform === "all" ? "bg-panel-2 text-white" : "text-muted hover:text-white"}`}
            >
              Todos
            </button>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                title={PLATFORM_LABEL[p]}
                aria-label={PLATFORM_LABEL[p]}
                onClick={() => setPlatform(p)}
                className={`grid place-items-center rounded-full py-1.5 ${platform === p ? "bg-panel-2 text-white" : "text-muted hover:text-white"}`}
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
          <label className="hairline flex flex-1 items-center gap-2 rounded-full bg-[rgb(199_211_234/0.06)] px-5 focus-within:shadow-[inset_0_0_0_1px_rgb(186_215_247/0.24)]">
            <SearchIcon className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar plugins, scripts, overlays…"
              className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-mist/60"
            />
          </label>
          <div className="flex gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="hairline h-11 rounded-full bg-[rgb(199_211_234/0.06)] px-4 text-sm text-white outline-none"
            >
              <option value="popular">Más descargados</option>
              <option value="recent">Recientes</option>
              <option value="name">A–Z</option>
            </select>
            <div className="hairline flex rounded-full p-1">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={v === "grid" ? "Vista cuadrícula" : "Vista lista"}
                  className={`rounded-full px-3.5 text-sm ${view === v ? "bg-panel-2 text-white" : "text-muted"}`}
                >
                  {v === "grid" ? "▦" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass p-16 text-center text-muted">
            <p className="eyebrow">Sin resultados</p>
            <p className="mt-4">Prueba con otra búsqueda o categoría.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <PluginCard key={p.id} plugin={p} />
            ))}
          </div>
        ) : (
          <div className="glass overflow-hidden">
            {filtered.map((p) => {
              const latest = latestVersion(p);
              return (
                <div key={p.id} className="flex flex-wrap items-center gap-4 px-6 py-4 shadow-[inset_0_-1px_0_rgb(186_215_247/0.06)] last:shadow-none">
                  <div className="min-w-0 flex-1">
                    <Link href={`/obs/${p.slug}`} className="font-medium text-ice hover:text-white">
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
                        className="btn-ghost px-3 py-2 text-xs"
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
