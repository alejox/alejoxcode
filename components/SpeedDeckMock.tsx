"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

// Ilustración de Speed Deck dibujada en HTML/CSS. Todo se mide en `em` y el
// tamaño de letra sale del ancho del contenedor, así escala sin recortarse.

type IconName =
  | "clapper" | "eye" | "smile" | "music" | "broadcast" | "record" | "mic" | "plus"
  | "grid" | "apps" | "voice" | "video" | "phone" | "gear" | "plug" | "chevron" | "panel";

const PATHS: Record<IconName, React.ReactNode> = {
  clapper: (
    <>
      <path d="M4 11h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="m4 11-.6-3.4a1 1 0 0 1 .8-1.2L17.6 4a1 1 0 0 1 1.2.8l.4 2.2L4 11" />
      <path d="m8.5 5.6 2 3.6M13.5 4.7l2 3.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </>
  ),
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5" />
    </>
  ),
  record: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  apps: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  voice: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  video: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m22 8-6 4 6 4z" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </>
  ),
  plug: <path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5" />,
  chevron: <path d="m15 18-6-6 6-6" />,
  panel: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 10l-2 2 2 2" />
    </>
  ),
};

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {PATHS[name]}
    </svg>
  );
}

const LABELS = {
  es: {
    nav: ["Deck", "Aps", "Voz", "OBS", "Conectar", "Ajustes"],
    tiles: { intro: "INTRO", talk: "HABLAR", stream: "STREAM", mon2k: "MONITOR 2K", capture: "CAPTURADORA", monuw: "MONITOR UW", laugh: "RISA", song: "Pobre", live: "Transmitir", rec: "Grabar" },
    music: "Música (Now Playing)",
    mic: "Micrófono",
  },
  en: {
    nav: ["Deck", "Apps", "Voice", "OBS", "Connect", "Settings"],
    tiles: { intro: "INTRO", talk: "TALK", stream: "STREAM", mon2k: "MONITOR 2K", capture: "CAPTURE", monuw: "MONITOR UW", laugh: "LAUGH", song: "Song", live: "Go live", rec: "Record" },
    music: "Music (Now Playing)",
    mic: "Microphone",
  },
} as const;

const NAV_ICONS: IconName[] = ["grid", "apps", "voice", "video", "phone", "gear"];

type Tile = { icon: IconName; label: string; bg: string; dark?: boolean; scene?: number };

function DeckTile({ tile, active }: { tile: Tile; active: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-[0.45em] rounded-[0.8em] text-center transition duration-500 ${
        tile.dark ? "text-[#11131a]" : "text-white"
      } ${active ? "scale-[1.04] shadow-[0_0_0_0.18em_#fff,0_0.6em_1.6em_-0.3em_rgb(0_0_0/0.7)]" : "shadow-[0_0.4em_1em_-0.4em_rgb(0_0_0/0.6)]"}`}
      style={{ background: tile.bg }}
    >
      <Icon name={tile.icon} className="size-[1.7em]" />
      <span className="px-[0.3em] text-[0.78em] font-semibold leading-tight">{tile.label}</span>
    </div>
  );
}

function Fader({ label, icon, level, bg }: { label: string; icon: IconName; level: number; bg: string }) {
  return (
    <div className="row-span-3 flex flex-col items-center rounded-[0.8em] px-[0.5em] pb-[0.9em] pt-[0.8em] text-white" style={{ background: bg }}>
      <Icon name={icon} className="size-[1.6em]" />
      <span className="mt-[0.35em] w-full truncate text-center text-[0.72em] font-semibold">{label}</span>
      <span className="text-[0.72em] opacity-90">{level}%</span>
      <div className="relative mt-[0.7em] w-[0.35em] flex-1 rounded-full bg-black/25">
        <div className="absolute inset-x-0 bottom-0 rounded-full bg-white/85 transition-all duration-700" style={{ height: `${level}%` }} />
        <div
          className="absolute left-1/2 size-[0.9em] -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow-[0_0.1em_0.4em_rgb(0_0_0/0.5)] transition-all duration-700"
          style={{ bottom: `${level}%` }}
        />
      </div>
    </div>
  );
}

export function SpeedDeckMock({ locale }: { locale: Locale }) {
  const t = LABELS[locale];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const activeScene = tick % 3;
  const music = [56, 64, 48, 60][tick % 4];

  const g = (a: string, b: string) => `linear-gradient(135deg, ${a}, ${b})`;
  const tiles: (Tile | "add" | null)[] = [
    { icon: "clapper", label: t.tiles.intro, bg: g("#f4cf2e", "#6fd35a"), dark: true, scene: 0 },
    { icon: "clapper", label: t.tiles.talk, bg: g("#ef6a2f", "#d94a7c"), scene: 1 },
    { icon: "clapper", label: t.tiles.stream, bg: g("#3fae5a", "#2f9e8e"), scene: 2 },
    "add",
    { icon: "eye", label: t.tiles.mon2k, bg: g("#d63a83", "#a33cc2") },
    { icon: "eye", label: t.tiles.capture, bg: g("#7b3df2", "#5b3bf0") },
    { icon: "eye", label: t.tiles.monuw, bg: g("#d7383d", "#c23a8c") },
    null,
    { icon: "smile", label: t.tiles.laugh, bg: g("#3667f0", "#2b55e0") },
    null,
    null,
    null,
    { icon: "music", label: t.tiles.song, bg: g("#3fae5a", "#2f9e8e"), dark: true },
    null,
    { icon: "broadcast", label: t.tiles.live, bg: g("#d7383d", "#c23a8c") },
    { icon: "record", label: t.tiles.rec, bg: g("#d7383d", "#c23a8c") },
  ];

  return (
    <div className="float w-full [container-type:inline-size]">
      <div className="overflow-hidden rounded-[0.9em] border border-white/10 bg-[#121318] text-[calc(100cqw/62)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
        {/* Barra de título */}
        <div className="flex items-center gap-[0.45em] border-b border-white/5 bg-[#1b1c21] px-[0.9em] py-[0.6em]">
          <span className="size-[0.7em] rounded-full bg-[#ff5f57]" />
          <span className="size-[0.7em] rounded-full bg-[#febc2e]" />
          <span className="size-[0.7em] rounded-full bg-[#28c840]" />
          <span className="ml-[0.8em] text-[0.7em] font-medium text-white/50">Speed Deck</span>
        </div>

        <div className="grid grid-cols-[10.5em_1fr]">
          {/* Barra lateral */}
          <aside className="flex flex-col gap-[0.3em] border-r border-white/5 bg-[#17181d] px-[0.6em] py-[0.9em]">
            <div className="flex items-center gap-[0.55em] px-[0.4em]">
              <span className="grid grid-cols-3 gap-[0.12em]">
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i} className="size-[0.32em] rounded-[0.06em] bg-[#8b6cf6]" style={{ opacity: 0.45 + (i % 3) * 0.25 }} />
                ))}
              </span>
              <span className="text-[0.9em] font-bold text-white">Speed Deck</span>
            </div>
            <div className="flex justify-end px-[0.4em] py-[0.4em] text-white/50">
              <Icon name="panel" className="size-[1.1em]" />
            </div>
            {t.nav.map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-[0.6em] rounded-[0.55em] px-[0.6em] py-[0.55em] text-[0.8em] ${
                  i === 0 ? "bg-[#8b6cf6] font-semibold text-white" : "text-white/70"
                }`}
              >
                <span className="relative">
                  <Icon name={NAV_ICONS[i]} className="size-[1.25em]" />
                  {i === 3 && <span className="absolute -bottom-[0.1em] -right-[0.15em] size-[0.5em] rounded-full bg-[#3ddc84]" />}
                </span>
                {label}
              </div>
            ))}
          </aside>

          {/* Área principal */}
          <div className="p-[0.9em]">
            <div className="mb-[0.8em] flex items-center gap-[0.5em]">
              <span className="flex items-center gap-[0.45em] rounded-[0.55em] bg-[#1e1f25] px-[0.7em] py-[0.45em] text-[0.8em] font-semibold text-white">
                <Icon name="grid" className="size-[1.1em] text-white/60" />
                Deck
                <Icon name="chevron" className="size-[0.95em] -rotate-90 text-white/50" />
              </span>
              <span className="grid size-[1.9em] place-items-center rounded-[0.5em] text-white/50">
                <Icon name="apps" className="size-[1em]" />
              </span>
              <span className="ml-auto grid size-[1.9em] place-items-center rounded-[0.5em] bg-[#1e1f25] text-[#3ddc84]">
                <Icon name="plug" className="size-[1em]" />
              </span>
              <span className="grid size-[1.9em] place-items-center rounded-[0.5em] border border-white/10 text-white/60">
                <Icon name="chevron" className="size-[0.95em]" />
              </span>
              <span className="grid size-[1.9em] place-items-center rounded-[0.5em] border border-white/10 text-white">
                <Icon name="plus" className="size-[0.95em]" />
              </span>
            </div>

            <div className="grid grid-cols-6 grid-rows-[repeat(4,5.6em)] gap-[0.6em]">
              {tiles.slice(0, 4).map((tile, i) => <Cell key={i} tile={tile} activeScene={activeScene} />)}
              <Fader label={t.music} icon="music" level={music} bg={g("#7b3df2", "#5b3bf0")} />
              <Fader label={t.mic} icon="mic" level={100} bg={g("#3fae5a", "#2f9e8e")} />
              {tiles.slice(4, 12).map((tile, i) => <Cell key={i + 4} tile={tile} activeScene={activeScene} />)}
              {tiles.slice(12, 16).map((tile, i) => <Cell key={i + 12} tile={tile} activeScene={activeScene} />)}
              <div className="flex flex-col items-center justify-center gap-[0.4em] rounded-[0.8em] border border-white/10 bg-[#1e1f25] text-white/80">
                <Icon name="music" className="size-[1.5em]" />
                <span className="px-[0.3em] text-center text-[0.7em] font-semibold leading-tight">{t.music}</span>
              </div>
              <DeckTile tile={{ icon: "mic", label: t.mic, bg: g("#3fae5a", "#2f9e8e"), dark: true }} active={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell({ tile, activeScene }: { tile: Tile | "add" | null; activeScene: number }) {
  if (tile === "add") {
    return (
      <div className="grid place-items-center rounded-[0.8em] border border-dashed border-white/15 text-white/40">
        <Icon name="plus" className="size-[1.4em]" />
      </div>
    );
  }
  if (!tile) return <div className="rounded-[0.8em] bg-[#1a1b20]" />;
  return <DeckTile tile={tile} active={tile.scene === activeScene} />;
}
