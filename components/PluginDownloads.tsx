"use client";

import { useEffect, useState } from "react";
import type { DownloadId, LatestRelease, Platform } from "@/lib/downloads";
import { ArrowIcon, DownloadIcon, GithubIcon, LockIcon, ObsIcon, PlatformIcon } from "./Icons";

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
  detectedLabel: string;
  macInstall: string;
  macHelp: string;
  downloadFor: string;
  otherPlatforms: string;
  obsForum?: { url: string; label: string; soon?: boolean };
};

function detectOS(): DownloadId | null {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "windows";
  if (/mac os x|macintosh/i.test(ua)) return "macos";
  if (/linux/i.test(ua)) return "linux";
  return null;
}

/** Botones por plataforma: detecta el SO y muestra esa descarga de primero. */
export function PluginDownloads({ items, urls, releasesUrl, repoUrl, repoLink, requirements, detectedLabel, macInstall, macHelp, downloadFor, otherPlatforms, obsForum }: Props) {
  const [detected, setDetected] = useState<DownloadId | null>(null);

  useEffect(() => {
    const os = detectOS();
    const ids = items.map((i) => i.id);
    // Compatibilidad con plugins que separan Apple Silicon e Intel.
    if (os === "macos" && !ids.includes("macos") && ids.includes("macos-apple")) {
      setDetected("macos-apple");
      return;
    }
    setDetected(os && ids.includes(os) ? os : null);
  }, [items]);

  const ordered = [...items].sort((a, b) => Number(b.id === detected) - Number(a.id === detected));

  const [primary, ...others] = ordered;
  const link = (id: DownloadId) => {
    const direct = urls[id];
    return { href: direct ?? releasesUrl, ...(!direct ? { target: "_blank", rel: "noreferrer" } : {}) };
  };

  return (
    <div className="mt-4">
      {/* Descarga principal: el sistema detectado (o el primero de la lista) */}
      <a {...link(primary.id)} className="btn-primary w-full justify-start gap-3 px-5 py-2.5">
        <PlatformIcon platform={primary.platform} width={16} height={16} />
        <span className="flex-1 text-left">
          {downloadFor} {primary.label}
        </span>
        <span className="hidden text-xs font-normal text-white/60 sm:inline">{primary.hint}</span>
        <DownloadIcon width={15} height={15} />
      </a>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        {primary.id === detected && (
          <span className="flex items-center gap-1.5 text-[11px] text-brand-blue">
            <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
            {detectedLabel}
          </span>
        )}
        {others.length > 0 && (
          <span className="ml-auto flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-muted">{otherPlatforms}</span>
            {others.map((d) => (
              <a key={d.id} {...link(d.id)} title={d.hint} className="btn-ghost gap-1.5 px-3 py-1.5 text-xs">
                <PlatformIcon platform={d.platform} width={13} height={13} />
                {d.label}
              </a>
            ))}
          </span>
        )}
      </div>

      {obsForum &&
        (obsForum.soon ? (
          <button
            type="button"
            disabled
            aria-disabled
            title={obsForum.label}
            className="btn-obs mt-3 w-full cursor-not-allowed justify-start gap-3 px-5 py-2.5 opacity-55"
          >
            <ObsIcon width={15} height={15} />
            <span className="flex-1 text-left">{obsForum.label}</span>
            <LockIcon width={14} height={14} />
          </button>
        ) : (
          <a href={obsForum.url} target="_blank" rel="noreferrer" className="btn-obs mt-3 w-full justify-start gap-3 px-5 py-2.5">
            <ObsIcon width={15} height={15} />
            <span className="flex-1 text-left">{obsForum.label}</span>
            <span className="hidden text-xs font-normal opacity-70 sm:inline">obsproject.com</span>
            <ArrowIcon width={15} height={15} />
          </a>
        ))}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{requirements}</p>
        <a href={repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-mist hover:text-white">
          <GithubIcon width={14} height={14} /> {repoLink} <ArrowIcon width={12} height={12} />
        </a>
      </div>
      {items.some((d) => d.platform === "macos") && (
        <details className="group mt-2 text-xs text-muted">
          <summary className="cursor-pointer list-none text-mist hover:text-white [&::-webkit-details-marker]:hidden">
            <span className="mr-1.5 inline-block transition group-open:rotate-90">›</span>
            {macHelp}
          </summary>
          <p className="mt-2 leading-relaxed">
            {macInstall}{" "}
            <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[11px] break-all text-frost">
              ~/Library/Application Support/obs-studio/plugins/
            </code>
          </p>
        </details>
      )}
    </div>
  );
}
