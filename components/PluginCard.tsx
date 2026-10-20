import Link from "next/link";
import type { Plugin } from "@/lib/types";
import { CATEGORY_LABEL, PLATFORM_LABEL } from "@/lib/types";
import { formatNumber, latestVersion, totalDownloads } from "@/lib/utils";
import { DownloadIcon, PlatformIcon } from "./Icons";

const CATEGORY_GLYPH: Record<string, string> = {
  plugin: "⚙",
  script: "{ }",
  overlay: "▣",
  theme: "◐",
  tool: "⌘",
};

export function PluginCover({ plugin, className = "" }: { plugin: Plugin; className?: string }) {
  if (plugin.cover_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={plugin.cover_url} alt="" className={`h-full w-full object-cover ${className}`} />;
  }
  // Portada generativa basada en el nombre
  const hue = [...plugin.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 60;
  return (
    <div
      className={`scanlines relative grid h-full w-full place-items-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 20%, hsl(${265 + hue} 70% 45% / .55), transparent 60%),
                     radial-gradient(circle at 80% 90%, hsl(${205 + hue} 80% 50% / .45), transparent 55%), #0e0819`,
      }}
    >
      <span className="font-mono text-4xl font-bold text-white/80 drop-shadow-[0_0_20px_rgba(138,79,216,.8)]">
        {CATEGORY_GLYPH[plugin.category]}
      </span>
    </div>
  );
}

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const latest = latestVersion(plugin);
  const platforms = [...new Set((latest?.files ?? []).map((f) => f.platform))];

  return (
    <Link
      href={`/obs/${plugin.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel"
    >
      <div className="relative aspect-[16/9]">
        <PluginCover plugin={plugin} />
        <span className="absolute left-3 top-3 rounded-md bg-ink/80 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-brand-cyan backdrop-blur">
          {CATEGORY_LABEL[plugin.category]}
        </span>
        {plugin.featured && (
          <span className="bg-brand absolute right-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold">
            ★ Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-brand-cyan">{plugin.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{plugin.tagline}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted">
          <div className="flex items-center gap-2">
            {latest && <span className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-white">v{latest.version}</span>}
            <span className="flex gap-1.5">
              {platforms.map((p) => (
                <PlatformIcon key={p} platform={p} width={14} height={14} aria-label={PLATFORM_LABEL[p]} />
              ))}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <DownloadIcon width={14} height={14} /> {formatNumber(totalDownloads(plugin))}
          </span>
        </div>
      </div>
    </Link>
  );
}
