import type { DownloadId, LatestRelease, Platform } from "@/lib/downloads";
import { ArrowIcon, DownloadIcon, GithubIcon, PlatformIcon } from "./Icons";

type DownloadItem = {
  id: DownloadId;
  label: string;
  hint: string;
  platform: Platform;
};

type Props = {
  items: DownloadItem[];
  urls: LatestRelease["urls"];
  releasesUrl: string;
  repoUrl: string;
  repoLink: string;
  requirements: string;
};

/** Botones por plataforma: descargan directo el archivo del repo (respaldo: página de releases). */
export function PluginDownloads({ items, urls, releasesUrl, repoUrl, repoLink, requirements }: Props) {
  return (
    <div className="mt-6">
      <div className="space-y-2">
        {items.map((d, i) => {
          const direct = urls[d.id];
          return (
            <a
              key={d.id}
              href={direct ?? releasesUrl}
              {...(!direct ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`${i === 0 ? "btn-primary" : "btn-ghost"} w-full justify-start gap-3 px-5 py-3`}
            >
              <PlatformIcon platform={d.platform} width={15} height={15} />
              <span className="flex-1 text-left">{d.label}</span>
              <span className="hidden text-xs font-normal text-white/60 sm:inline">{d.hint}</span>
              <DownloadIcon width={15} height={15} />
            </a>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{requirements}</p>
      <a href={repoUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-mist hover:text-white">
        <GithubIcon width={15} height={15} /> {repoLink} <ArrowIcon width={14} height={14} />
      </a>
    </div>
  );
}
