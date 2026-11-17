"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { content, type Locale } from "@/lib/content";
import { ALERTS_LAUNCH } from "@/lib/site";
import { DownloadIcon } from "./Icons";

// Anuncio de las alertas de GTA 6. Antes del lanzamiento avisa la fecha;
// al llegar la hora pasa a "ya disponibles" con las descargas, durante una semana.
const LAUNCH = Date.parse(ALERTS_LAUNCH);
const HIDE_AFTER = LAUNCH + 7 * 24 * 60 * 60 * 1000;
// Claves distintas: quien cerró el aviso previo también ve el de "ya disponibles".
const SEEN_KEY = { before: "popup-gta6-alertas", live: "popup-gta6-alertas-live" };
const STICKERS = ["flamenco", "vi", "sol", "lowrider", "palmera"];

const TEXT = {
  es: {
    eyebrow: "Lanzamiento",
    title: "Alertas GTA 6 · Vice City",
    date: "Martes 17 · 12:00 m.",
    body: "Este martes al mediodía (hora de Colombia) lanzamos el pack de alertas de GTA 6: 9 alertas animadas para Kick, Twitch y YouTube. Gratis.",
    cta: "Ver las alertas",
    close: "Cerrar",
    href: "/plugins#alertas",
    liveEyebrow: "Ya disponibles",
    liveBadge: "Descarga gratis",
    liveBody: "El pack de alertas de GTA 6 ya está disponible: 9 alertas animadas para Kick, Twitch y YouTube. Elige tu descarga.",
    liveMore: "Ver todas las opciones",
  },
  en: {
    eyebrow: "Launch",
    title: "GTA 6 · Vice City alerts",
    date: "Tuesday 17 · 12:00 PM",
    body: "This Tuesday at noon (Colombia time) we launch the GTA 6 alert pack: 9 animated alerts for Kick, Twitch and YouTube. Free.",
    cta: "See the alerts",
    close: "Close",
    href: "/en/plugins#alertas",
    liveEyebrow: "Out now",
    liveBadge: "Free download",
    liveBody: "The GTA 6 alert pack is now available: 9 animated alerts for Kick, Twitch and YouTube. Pick your download.",
    liveMore: "See all options",
  },
} as const;

export function LaunchPopup({ locale }: { locale: Locale }) {
  const t = TEXT[locale];
  const alerts = content[locale].alerts;
  const pack = alerts.items[0];
  const [open, setOpen] = useState(false);
  const [live, setLive] = useState(false);

  const seen = (key: string) => {
    try {
      return Boolean(sessionStorage.getItem(key));
    } catch {
      return false; // Sin acceso a sessionStorage: se muestra igual.
    }
  };

  useEffect(() => {
    const now = Date.now();
    if (now >= HIDE_AFTER) return;
    const isLive = now >= LAUNCH;
    setLive(isLive);
    const timers = [setTimeout(() => !seen(isLive ? SEEN_KEY.live : SEEN_KEY.before) && setOpen(true), 600)];
    if (!isLive) {
      // Con la página abierta al llegar la hora: cambia a "ya disponibles" y se vuelve a mostrar.
      timers.push(
        setTimeout(() => {
          setLive(true);
          if (!seen(SEEN_KEY.live)) setOpen(true);
        }, LAUNCH - now)
      );
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(live ? SEEN_KEY.live : SEEN_KEY.before, "1");
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
          <p className="eyebrow">{live ? t.liveEyebrow : t.eyebrow}</p>
          <h2 id="launch-popup-title" className="text-gradient mt-4 text-[28px] leading-tight">{t.title}</h2>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-purple px-4 py-1.5 text-sm font-semibold text-white">
            <span className="rec-dot inline-block size-1.5 rounded-full bg-white" />
            {live ? t.liveBadge : t.date}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-mist">{live ? t.liveBody : t.body}</p>
          {live ? (
            <>
              <div className="mt-6 grid gap-2">
                <a href={pack.streamlabsZip} onClick={close} className="btn-primary justify-center gap-2 px-6 py-3">
                  <DownloadIcon width={15} height={15} />
                  {alerts.downloadStreamlabs}
                </a>
                <a href={pack.streamlabs} target="_blank" rel="noreferrer" onClick={close} className="btn-ghost justify-center gap-2 px-6 py-3">
                  {alerts.oneClick}
                </a>
              </div>
              <a href={t.href} onClick={close} className="mt-4 inline-block text-sm text-mist underline decoration-line underline-offset-4 hover:text-white">
                {t.liveMore}
              </a>
            </>
          ) : (
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <a href={t.href} onClick={close} className="btn-primary px-6 py-3">{t.cta}</a>
              <button type="button" onClick={close} className="btn-ghost px-6 py-3">{t.close}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
