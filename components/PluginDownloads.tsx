"use client";

import { useEffect, useState } from "react";
import type { DownloadId, Platform } from "@/lib/downloads";
import { ArrowIcon, DownloadIcon, GithubIcon, PlatformIcon } from "./Icons";

type DownloadItem = {
  id: DownloadId;
  label: string;
  hint: string;
  platform: Platform;
};

type Props = {
  items: DownloadItem[];
  urls: Partial<Record<DownloadId, string>>;
  fallbackUrl: string;
  repoUrl: string;
  version: string;
  labels: {
    detected: string;
    directNote: string;
    allReleases: string;
    repoLink: string;
  };
};

function detectOS(): DownloadId | null {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "windows";
  // macOS no distingue Apple Silicon de Intel en el userAgent:
  // se recomienda Apple Silicon (equipos desde finales de 2020).
  if (/mac os x|macintosh/i.test(ua)) return "macos-apple";
  if (/linux/i.test(ua)) return "linux";
  return null;
}

export function PluginDownloads({ items, urls, fallbackUrl, repoUrl, version, labels }: Props) {
  const [detected, setDetected] = useState<DownloadId | null>(null);

  useEffect(() => {
    setDetected(detectOS());
  }, []);

  return (
    <div className="mt-6">
      {/* 1. Todas las versiones (GitHub) */}
      <a href={fallbackUrl} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center gap-2 px-5 py-3">
        <GithubIcon width={15} height={15} /> {labels.allReleases}
      </a>

      {/* 2. Descarga recomendada para el equipo, 3. resto de plataformas */}
      <div className="mt-3 space-y-2">
        {[...items]
          .sort((a, b) => Number(b.id === detected) - Number(a.id === detected))
          .map((d) => {
            const direct = urls[d.id];
            const isDetected = d.id === detected;
            return (
              <div key={d.id}>
                <a
                  href={direct ?? fallbackUrl}
                  {...(!direct ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`${isDetected ? "btn-primary" : "btn-ghost"} w-full justify-start gap-3 px-5 py-3`}
                >
                  <PlatformIcon platform={d.platform} width={15} height={15} />
                  <span className="flex-1 text-left">{d.label}</span>
                  <span className="hidden text-xs font-normal text-white/60 sm:inline">{d.hint}</span>
                  <DownloadIcon width={15} height={15} />
                </a>
                {isDetected && (
                  <p className="mt-1.5 flex items-center gap-1.5 px-1 text-[11px] text-brand-blue">
                    <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                    {labels.detected}
                  </p>
                )}
              </div>
            );
          })}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
        v{version} · {labels.directNote}
      </p>
      <div className="mt-4 text-sm">
        <a href={repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-mist hover:text-white">
          <GithubIcon width={14} height={14} /> {labels.repoLink} <ArrowIcon width={13} height={13} />
        </a>
      </div>
    </div>
  );
}
