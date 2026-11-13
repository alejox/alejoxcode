"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

// Anuncio del lanzamiento de las alertas de GTA 6.
// Deja de mostrarse solo al terminar el día del lanzamiento (hora de Colombia).
const HIDE_AFTER = Date.parse("2026-11-18T00:00:00-05:00");
const SEEN_KEY = "popup-gta6-alertas";
const STICKERS = ["flamenco", "vi", "sol", "lowrider", "palmera"];

const TEXT = {
  es: {
    eyebrow: "Lanzamiento",
    title: "Alertas GTA 6 · Vice City",
    date: "Martes 17 de noviembre",
    body: "Este martes lanzamos el pack de alertas de GTA 6: 9 alertas animadas para Kick, Twitch y YouTube. Gratis.",
    cta: "Ver las alertas",
    close: "Cerrar",
    href: "/plugins#alertas",
  },
  en: {
    eyebrow: "Launch",
    title: "GTA 6 · Vice City alerts",
    date: "Tuesday, November 17",
    body: "This Tuesday we launch the GTA 6 alert pack: 9 animated alerts for Kick, Twitch and YouTube. Free.",
    cta: "See the alerts",
    close: "Close",
    href: "/en/plugins#alertas",
  },
} as const;

export function LaunchPopup({ locale }: { locale: Locale }) {
  const t = TEXT[locale];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Date.now() >= HIDE_AFTER) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      // Sin acceso a sessionStorage: se muestra igual.
    }
    const id = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(id);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="launch-popup-title">
      <button type="button" aria-label={t.close} onClick={close} className="absolute inset-0 cursor-default bg-ink/75 backdrop-blur-sm" />

      <div className="popup-in glass-deep relative w-full max-w-md overflow-hidden text-center">
        <button
          type="button"
          onClick={close}
          aria-label={t.close}
          className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-ink/60 text-mist backdrop-blur hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="flex items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_85%_0%,rgb(123_44_255/0.45),transparent_60%),radial-gradient(ellipse_at_0%_100%,rgb(255_63_164/0.35),transparent_60%),#120a1c] px-6 py-7">
          {STICKERS.map((s, i) => (
            <Image
              key={s}
              src={`/img/alertas/gta6/${s}.png`}
              alt=""
              width={96}
              height={96}
              className="float h-10 w-auto min-w-0 shrink object-contain drop-shadow-[0_6px_12px_rgb(0_0_0/0.5)] sm:h-12"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>

        <div className="px-6 pb-7 pt-6 sm:px-8">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="launch-popup-title" className="text-gradient mt-4 text-[28px] leading-tight">{t.title}</h2>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-purple px-4 py-1.5 text-sm font-semibold text-white">
            <span className="rec-dot inline-block size-1.5 rounded-full bg-white" />
            {t.date}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-mist">{t.body}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <a href={t.href} onClick={close} className="btn-primary px-6 py-3">{t.cta}</a>
            <button type="button" onClick={close} className="btn-ghost px-6 py-3">{t.close}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
