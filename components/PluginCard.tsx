import Link from "next/link";
import type { Plugin } from "@/lib/types";
import { CATEGORY_LABEL, PLATFORM_LABEL } from "@/lib/types";
import { formatNumber, latestVersion, totalDownloads } from "@/lib/utils";
import { CategoryIcon, DownloadIcon, PlatformIcon } from "./Icons";

export function PluginCover({ plugin, className = "" }: { plugin: Plugin; className?: string }) {
  if (plugin.cover_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={plugin.cover_url} alt="" className={`h-full w-full object-cover ${className}`} />;
  }
  // Portada generativa: placa de vidrio con halo y tile de icono
  const x = 25 + ([...plugin.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 50);
  return (
    <div
      className={`relative grid h-full w-full place-items-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(ellipse 70% 90% at ${x}% 0%, rgb(152 192 239 / .16), transparent 70%), #070914`,
      }}
    >
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <span className="icon-tile relative size-16 bg-ink">
        <CategoryIcon category={plugin.category} width={24} height={24} />
      </span>
    </div>
  );
}

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const latest = latestVersion(plugin);
  const platforms = [...new Set((latest?.files ?? []).map((f) => f.platform))];

  return (
    <Link href={`/obs/${plugin.slug}`} className="glass card-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)]">
        <PluginCover plugin={plugin} />
        <span className="absolute left-3 top-3 rounded-md bg-panel-2 px-2 py-1 text-[11px] font-medium text-frost backdrop-blur">
          {CATEGORY_LABEL[plugin.category]}
        </span>
        {plugin.featured && (
          <span className="absolute right-3 top-3 rounded-md bg-panel-2 px-2 py-1 text-[11px] font-medium text-ice backdrop-blur">
            ✦ Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg text-ice">{plugin.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{plugin.tagline}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted">
          <div className="flex items-center gap-2.5">
            {latest && <span className="rounded-md bg-panel-2 px-1.5 py-0.5 font-mono text-frost">v{latest.version}</span>}
            <span className="flex gap-1.5 text-mist">
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
