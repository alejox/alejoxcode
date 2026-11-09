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

export function PluginShowcase({ slug, locale }: { slug: string; locale: Locale }) {
  if (slug === "multi-chat") return <MultiChatDemo locale={locale} />;
  if (slug === "goal-bar") return <GoalBarDemo locale={locale} />;
  return null;
}

