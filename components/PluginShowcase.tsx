"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

// Vistas animadas que simulan cada plugin dentro de una escena de OBS.

const PLATFORM = {
  Twitch: "#9146FF",
  YouTube: "#FF0033",
  Kick: "#53FC18",
  TikTok: "#25F4EE",
} as const;
type PlatformName = keyof typeof PLATFORM;

/** Marco tipo "vista previa de OBS" con indicador EN VIVO. */
function SceneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="float w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d1a] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{label}</span>
        <span className="ml-auto flex items-center gap-1.5 rounded bg-live/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-live">
          <span className="rec-dot size-1.5 rounded-full bg-live" />
          Live
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------------- Multi Chat ---------------- */

const CHAT: { p: PlatformName; user: string; es: string; en: string }[] = [
  { p: "Twitch", user: "nebula_99", es: "¡vamos con todo! 🔥", en: "let's goooo 🔥" },
  { p: "YouTube", user: "Laura M.", es: "saludos desde Medellín 👋", en: "hello from Medellín 👋" },
  { p: "Kick", user: "rayo_gg", es: "esa jugada estuvo brutal", en: "that play was insane" },
  { p: "TikTok", user: "dani.streams", es: "envió 🌹 x5", en: "sent 🌹 x5" },
  { p: "Twitch", user: "pixelwolf", es: "cheer100 GG", en: "cheer100 GG" },
  { p: "YouTube", user: "Carlos R.", es: "Super Chat $5 · ¡gran stream!", en: "Super Chat $5 · great stream!" },
  { p: "Kick", user: "zeta", es: "primera vez por aquí", en: "first time here" },
  { p: "TikTok", user: "maria_live", es: "❤️❤️❤️", en: "❤️❤️❤️" },
];

function MultiChatDemo({ locale }: { locale: Locale }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: 5 }, (_, i) => {
    const n = tick + i;
    return { key: n, ...CHAT[n % CHAT.length] };
  });
  const viewers: Record<PlatformName, number> = { Twitch: 412, YouTube: 268, Kick: 97, TikTok: 153 };
  const wobble = (base: number, seed: number) => base + ((tick * 7 + seed * 13) % 9) - 4;
  const total = (Object.keys(viewers) as PlatformName[]).reduce((s, k, i) => s + wobble(viewers[k], i), 0);

  return (
    <SceneFrame label={locale === "es" ? "Escena · Multichat" : "Scene · Multichat"}>
      <div className="grid gap-3 p-4 sm:grid-cols-[1fr_auto]">
        <ul className="flex h-[248px] flex-col justify-end gap-2 overflow-hidden">
          {visible.map((m, i) => (
            <li
              key={m.key}
              className="chat-in flex items-start gap-2.5 rounded-xl bg-white/[0.04] px-3 py-2 text-sm"
              style={{ opacity: 0.45 + i * 0.14 }}
            >
              <span
                className="mt-1 size-2.5 shrink-0 rounded-full"
                style={{ background: PLATFORM[m.p], boxShadow: `0 0 10px ${PLATFORM[m.p]}` }}
              />
              <span className="min-w-0">
                <span className="font-semibold" style={{ color: PLATFORM[m.p] }}>
                  {m.user}
                </span>{" "}
                <span className="text-mist">{locale === "es" ? m.es : m.en}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-4 gap-2 sm:w-[132px] sm:grid-cols-1">
          {(Object.keys(viewers) as PlatformName[]).map((k, i) => (
            <div key={k} className="rounded-lg bg-white/[0.04] px-2.5 py-1.5">
              <div className="truncate text-[10px] uppercase tracking-[0.08em]" style={{ color: PLATFORM[k] }}>
                {k}
              </div>
              <div className="font-mono text-sm tabular-nums text-frost">{wobble(viewers[k], i)}</div>
            </div>
          ))}
          <div className="col-span-4 rounded-lg bg-brand-purple/25 px-2.5 py-1.5 sm:col-span-1">
            <div className="text-[10px] uppercase tracking-[0.08em] text-brand-blue">Total</div>
            <div className="font-mono text-sm tabular-nums text-white">{total}</div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}

/* ---------------- Goal Bar ---------------- */

const GOAL = 500;
const START = 362;

function GoalBarDemo({ locale }: { locale: Locale }) {
  const [value, setValue] = useState(START);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    let v = START;
    let pause = 0;
    const id = setInterval(() => {
      if (pause > 0) {
        pause -= 1;
        if (pause === 0) {
          v = START;
          setCelebrate(false);
          setValue(v);
        }
        return;
      }
      v = Math.min(GOAL, v + 4 + Math.floor(Math.random() * 9));
      setValue(v);
      if (v >= GOAL) {
        setCelebrate(true);
        pause = 14; // ~3,5 s de celebración
      }
    }, 250);
    return () => clearInterval(id);
  }, []);

  const pct = Math.round((value / GOAL) * 100);
  const confetti = ["#663af3", "#98c0ef", "#ff3fa4", "#ffb03a", "#53fc18", "#25f4ee"];

  return (
    <SceneFrame label={locale === "es" ? "Escena · Barra de meta" : "Scene · Goal bar"}>
      <div className="relative flex h-[248px] flex-col justify-center px-6 sm:px-10">
        <div className={`relative rounded-2xl bg-black/40 p-5 ring-1 ring-white/10 transition ${celebrate ? "goal-glow" : ""}`}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.08em] text-frost">
              {locale === "es" ? "Meta de me gusta" : "Likes goal"} 👍
            </span>
            <span className="font-mono text-sm tabular-nums text-mist">
              <span className="text-white">{value}</span> / {GOAL}
            </span>
          </div>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
            <div
              className="goal-fill h-full rounded-full bg-[linear-gradient(90deg,#663af3,#98c0ef)] transition-[width] duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            <span>YouTube · @alejoxcode</span>
            <span>{pct}%</span>
          </div>

          {celebrate && (
            <>
              <div className="pointer-events-none absolute inset-x-0 -top-10 text-center">
                <span className="goal-pop inline-block rounded-full bg-brand-purple px-4 py-1.5 text-sm font-semibold text-white shadow-[0_0_30px_rgb(102_58_243/0.7)]">
                  🎉 {locale === "es" ? "¡Meta cumplida!" : "Goal reached!"}
                </span>
              </div>
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  className="confetti pointer-events-none absolute top-1/2 size-1.5 rounded-[2px]"
                  style={
                    {
                      left: `${(i * 37) % 100}%`,
                      background: confetti[i % confetti.length],
                      "--dx": `${((i * 53) % 120) - 60}px`,
                      "--dy": `${-60 - ((i * 29) % 80)}px`,
                      "--r": `${(i * 47) % 360}deg`,
                      animationDelay: `${(i % 7) * 40}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </>
          )}
        </div>
        <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {locale === "es" ? "Siguiente meta automática: 600" : "Automatic next goal: 600"}
        </p>
      </div>
    </SceneFrame>
  );
}

/* ---------------- YouTube ---------------- */

/** Video de YouTube que solo se carga al pulsar (no frena la página). */
export function YouTubeVideo({ id, title, playLabel }: { id: string; title: string; playLabel: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="float relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
      {play ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`${playLabel}: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            className="size-full object-cover opacity-80 transition group-hover:opacity-100"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-full bg-[#FF0033] shadow-[0_10px_30px_rgb(255_0_51/0.5)] transition group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

// AC Football Scores: el diseño «Estadio» del plugin (escudos que sobresalen de la barra),
// con equipos ficticios. El minuto avanza y cada tanto entra un gol con su animación.
const TEAMS = [
  { name: "HALCONES", short: "HAL", color: "#d62839", dark: "#5c0f19", stripe: "#ffffff" },
  { name: "MAREA SC", short: "MAR", color: "#1f6feb", dark: "#0b2a5c", stripe: "#9fd3ff" },
] as const;

function Crest({ x, y, size, team, bounce }: { x: number; y: number; size: number; team: (typeof TEAMS)[number]; bounce: boolean }) {
  const s = size / 100;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={bounce ? "crest-bounce" : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      <path d="M50 4 L92 16 L88 58 Q82 84 50 98 Q18 84 12 58 L8 16 Z" fill="#0b0d14" opacity="0.45" transform="translate(3 4)" />
      <path d="M50 4 L92 16 L88 58 Q82 84 50 98 Q18 84 12 58 L8 16 Z" fill={team.color} stroke="#fff" strokeWidth="4" />
      <path d="M36 9 L50 5 L64 9 L64 92 Q57 96 50 98 Q43 96 36 92 Z" fill={team.stripe} opacity="0.9" />
      <circle cx="50" cy="48" r="17" fill={team.dark} stroke="#fff" strokeWidth="3" />
      <text x="50" y="54" textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">{team.short[0]}</text>
      </g>
    </g>
  );
}

function FootballDemo({ locale }: { locale: Locale }) {
  const [minute, setMinute] = useState(63);
  const [score, setScore] = useState<[number, number]>([1, 1]);
  const [goal, setGoal] = useState<0 | 1 | null>(null);

  useEffect(() => {
    let m = 63;
    let sc: [number, number] = [1, 1];
    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      if (tick % 8 === 0) {
        const side = (tick / 8) % 2 === 1 ? 0 : 1;
        sc = side === 0 ? [sc[0] + 1, sc[1]] : [sc[0], sc[1] + 1];
        setScore(sc);
        setGoal(side);
        setTimeout(() => setGoal(null), 3200);
      }
      m = m >= 90 ? 63 : m + 1;
      if (m === 63) {
        sc = [1, 1];
        setScore(sc);
      }
      setMinute(m);
    }, 900);
    return () => clearInterval(id);
  }, []);

  const goalText = locale === "es" ? "¡GOOOL!" : "GOAL!";
  const cx = 640;
  const box = 250;
  const slant = 34;

  return (
    <SceneFrame label={locale === "es" ? "Escena · Marcador" : "Scene · Scoreboard"}>
      <div className="relative bg-[radial-gradient(ellipse_at_50%_120%,rgb(34_139_74/0.45),transparent_65%),linear-gradient(180deg,#0b0d1a,#0a1a12)] px-3 py-10 sm:px-6">
        <svg viewBox="0 0 1280 220" className="w-full" role="img" aria-label={`${TEAMS[0].name} ${score[0]} - ${score[1]} ${TEAMS[1].name}`}>
          <defs>
            <clipPath id="fs-bar"><rect x="20" y="70" width="1240" height="130" rx="18" /></clipPath>
            {TEAMS.map((t, i) => (
              <linearGradient key={t.short} id={`fs-team-${i}`} x1={i === 0 ? "0" : "1"} y1="0" x2={i === 0 ? "1" : "0"} y2="0">
                <stop offset="0" stopColor={t.dark} />
                <stop offset="1" stopColor={t.color} stopOpacity={goal === i ? 1 : 0.85} />
              </linearGradient>
            ))}
            <linearGradient id="fs-box" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#242632" />
              <stop offset="1" stopColor="#08090e" />
            </linearGradient>
            <linearGradient id="fs-gloss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect x="20" y="76" width="1240" height="130" rx="18" fill="#000" opacity="0.35" />
          <g clipPath="url(#fs-bar)">
            <rect x="20" y="70" width="1240" height="130" fill="#0d0f16" />
            <polygon points={`20,70 ${cx - box / 2 + slant},70 ${cx - box / 2 - slant},200 20,200`} fill="url(#fs-team-0)" />
            <polygon points={`1260,70 ${cx + box / 2 + slant},70 ${cx + box / 2 - slant},200 1260,200`} fill="url(#fs-team-1)" />
            <rect x="20" y="70" width="1240" height="130" fill="url(#fs-gloss)" />
          </g>

          {/* Marcador central */}
          <polygon
            points={`${cx - box / 2 + slant},56 ${cx + box / 2 + slant},56 ${cx + box / 2 - slant},200 ${cx - box / 2 - slant},200`}
            fill="url(#fs-box)"
            stroke={goal !== null ? "#ffd23f" : "rgb(255 255 255 / 0.25)"}
            strokeWidth={goal !== null ? 6 : 2}
          />
          <text x={cx} y="142" textAnchor="middle" fontSize="80" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif" style={{ fontVariantNumeric: "tabular-nums" }}>
            {score[0]} - {score[1]}
          </text>
          <rect x={cx - 34} y="166" width="68" height="28" rx="14" fill="#282a36" />
          <circle cx={cx - 18} cy="180" r="5" fill="#ff3b3b" className="rec-dot" />
          <text x={cx + 8} y="188" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">{minute}&apos;</text>

          {/* Pestaña de la liga */}
          <rect x={cx - 120} y="14" width="240" height="40" rx="12" fill="#0d0f16" opacity="0.92" />
          <circle cx={cx - 96} cy="34" r="12" fill="#ffd23f" />
          <path d={`M${cx - 102} 34 l4 -6 l4 6 l4 -6 l4 6 v5 h-16 Z`} fill="#0d0f16" />
          <text x={cx + 12} y="41" textAnchor="middle" fontSize="18" fontWeight="800" letterSpacing="2" fill="#fff" fontFamily="system-ui, sans-serif">SUPERLIGA</text>

          {/* Escudos y nombres */}
          <Crest x={50} y={22} size={180} team={TEAMS[0]} bounce={goal === 0} />
          <Crest x={1050} y={22} size={180} team={TEAMS[1]} bounce={goal === 1} />
          {TEAMS.map((t, i) => {
            const home = i === 0;
            const x = home ? 252 : 1028;
            const anchor = home ? "start" : "end";
            return goal === i ? (
              <g key={t.short} className="goal-pop" style={{ transformBox: "fill-box", transformOrigin: home ? "left center" : "right center" }}>
                <text x={x} y="135" textAnchor={anchor} fontSize="60" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">{goalText}</text>
                <text x={x} y="178" textAnchor={anchor} fontSize="22" fontWeight="700" fill="#fff" opacity="0.85" fontFamily="system-ui, sans-serif">{minute}&apos; · {t.name}</text>
              </g>
            ) : (
              <text key={t.short} x={x} y="148" textAnchor={anchor} fontSize="40" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">{t.name}</text>
            );
          })}
        </svg>
      </div>
    </SceneFrame>
  );
}

export function PluginShowcase({ slug, locale }: { slug: string; locale: Locale }) {
  if (slug === "multi-chat") return <MultiChatDemo locale={locale} />;
  if (slug === "goal-bar") return <GoalBarDemo locale={locale} />;
  if (slug === "football-scores") return <FootballDemo locale={locale} />;
  return null;
}

