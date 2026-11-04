"use client";

import { useEffect, useState } from "react";
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
  detectedLabel: string;
  macInstall: string;
};

function detectOS(): DownloadId | null {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "windows";
  if (/mac os x|macintosh/i.test(ua)) return "macos";
  if (/linux/i.test(ua)) return "linux";
  return null;
}

/** Botones por plataforma: detecta el SO y muestra esa descarga de primero. */
export function PluginDownloads({ items, urls, releasesUrl, repoUrl, repoLink, requirements, detectedLabel, macInstall }: Props) {
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

  return (
    <div className="mt-6">
      <div className="space-y-2">
        {ordered.map((d, i) => {
          const direct = urls[d.id];
          const isDetected = d.id === detected;
          return (
            <div key={d.id}>
              <a
                href={direct ?? releasesUrl}
                {...(!direct ? { target: "_blank", rel: "noreferrer" } : {})}
                className={`${isDetected || (detected === null && i === 0) ? "btn-primary" : "btn-ghost"} w-full justify-start gap-3 px-5 py-3`}
              >
                <PlatformIcon platform={d.platform} width={15} height={15} />
                <span className="flex-1 text-left">{d.label}</span>
                <span className="hidden text-xs font-normal text-white/60 sm:inline">{d.hint}</span>
                <DownloadIcon width={15} height={15} />
              </a>
              {isDetected && (
                <p className="mt-1.5 flex items-center gap-1.5 px-1 text-[11px] text-brand-blue">
                  <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                  {detectedLabel}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {items.some((d) => d.platform === "macos") && (
        <p className="mt-4 text-xs leading-relaxed text-muted">
          {macInstall}{" "}
          <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[11px] break-all text-frost">
            ~/Library/Application Support/obs-studio/plugins/
          </code>
        </p>
      )}
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{requirements}</p>
      <a href={repoUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-mist hover:text-white">
        <GithubIcon width={15} height={15} /> {repoLink} <ArrowIcon width={14} height={14} />
      </a>
    </div>
  );
}
