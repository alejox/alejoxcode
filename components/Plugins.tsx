import Image from "next/image";
import { content, type Locale } from "@/lib/content";
import { getLatestRelease } from "@/lib/downloads";
import { legalLabels, legalPath } from "@/lib/legal";
import { multichatPath } from "@/lib/multichat";
import { ALERTS_LAUNCH, site } from "@/lib/site";
import { Countdown } from "./Countdown";
import { Footer } from "./Footer";
import { ArrowIcon, DownloadIcon, GithubIcon, LockIcon, PlatformIcon, YoutubeIcon } from "./Icons";
import { LaunchPopup } from "./LaunchPopup";
import { Navbar } from "./Navbar";
import { PluginDownloads } from "./PluginDownloads";
import { PluginShowcase, YouTubeVideo } from "./PluginShowcase";
import { PageTabs } from "./PluginTabs";
import { SpeedDeckMock } from "./SpeedDeckMock";
import { UnlockAt } from "./UnlockAt";

const SHOWCASES = ["multi-chat", "goal-bar", "football-scores"];

const chip = "rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost";
const soonBadge = "flex items-center gap-2 rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-blue";
const stage =
  "relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(152_192_239/0.16),transparent_55%),#070914]";

/** Ícono simple (trazo) para cada plugin en camino. */
function UpcomingIcon({ slug }: { slug: string }) {
  const paths: Record<string, React.ReactNode> = {
    "multi-stream": <><circle cx="12" cy="12" r="2" /><path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8" /></>,
    songlist: <><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
    "event-timer": <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" /></>,
    "motion-mask": <><rect x="3" y="5" width="12" height="12" rx="3" /><path d="M19 9v10a2 2 0 0 1-2 2H9" /></>,
    "global-overlay": <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
    "scene-groups": <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /></>,
    "super-fx": <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[slug]}
    </svg>
  );
}

/** Encabezado de sección compacto, alineado a la izquierda. */
function Head({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
      <div>
        <p className="eyebrow eyebrow-left">{eyebrow}</p>
        <h2 className="text-gradient mt-3 text-[26px] leading-[1.16] sm:text-[32px]">{title}</h2>
      </div>
      {children && <p className="max-w-md text-sm leading-relaxed text-mist">{children}</p>}
    </div>
  );
}

export async function Plugins({ locale }: { locale: Locale }) {
  const t = content[locale];
  // Los marcados comingSoon van a la pestaña Próximamente, con todo bloqueado.
  const isSoon = (p: (typeof t.pluginsPage.items)[number]) => "comingSoon" in p && p.comingSoon;
  const soonPlugins = t.pluginsPage.items.filter(isSoon);
  const items = await Promise.all(
    t.pluginsPage.items.filter((p) => !isSoon(p)).map(async (p) => ({ p, latest: await getLatestRelease(p.slug) }))
  );
  const legal = legalLabels[locale];

  return (
    <>
      <Navbar locale={locale} />
      <LaunchPopup locale={locale} />
      <main>
        {/* Cabecera */}
        <section className="relative isolate overflow-hidden">
          <div className="spotlight absolute inset-0 -z-10" />
          <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-x-10 gap-y-6 px-4 pb-8 pt-12 sm:px-6 lg:pt-16">
            <div className="max-w-xl">
              <p className="eyebrow eyebrow-left">{t.pluginsPage.eyebrow}</p>
              <h1 className="text-gradient glow-text mt-4 text-[40px] leading-[1.05] sm:text-[56px]">{t.pluginsPage.title}</h1>
              <p className="mt-4 leading-relaxed text-mist">{t.pluginsPage.intro}</p>
            </div>
            {site.kofi && (
              <div className="flex max-w-xs flex-col items-start gap-3 lg:items-end lg:text-right">
                <p className="text-sm leading-relaxed text-mist">{t.pluginsPage.coffeeCta}</p>
                <a
                  href={site.kofi}
                  target="_blank"
                  rel="noreferrer"
                  className="coffee-cta inline-flex items-center gap-2 rounded-full bg-[#13C3FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.04] hover:brightness-110"
                >
                  <span aria-hidden className="coffee-cup text-base">☕</span>
                  {t.pluginsPage.coffee}
                </a>
              </div>
            )}
          </div>
        </section>

        <PageTabs
          label={t.pluginsPage.tabsLabel}
          tabs={[
            {
              id: "plugins",
              label: t.pluginsPage.nav.plugins,
              count: items.length + t.alerts.items.length,
              anchors: ["streamers", "alertas", ...items.map(({ p }) => p.slug)],
            },
            {
              id: "proximamente",
              label: t.pluginsPage.nav.soon,
              count: soonPlugins.length + t.upcoming.items.length + t.apps.items.length,
              anchors: ["apps", "en-camino", ...soonPlugins.map((p) => p.slug)],
            },
          ]}
        >
          {/* Pestaña 1: los plugins y, debajo, los creadores */}
          <div>
        <section id="plugins" className="mx-auto max-w-[1200px] scroll-mt-32 space-y-5 px-4 pt-8 sm:px-6">
            {items.map(({ p, latest }) => (
              <article key={p.slug} id={p.slug} className="glass-deep grid scroll-mt-32 overflow-hidden lg:grid-cols-[0.8fr_1.2fr]">
                <div className={`${stage} p-4 sm:p-6`}>
                  {p.video ? (
                    <YouTubeVideo id={p.video} title={p.name} playLabel={t.pluginsPage.play} />
                  ) : SHOWCASES.includes(p.slug) ? (
                    <div className="relative w-full">
                      <PluginShowcase slug={p.slug} locale={locale} />
                      {p.videoSoon && (
                        <span className="absolute -top-3 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#FF0033] px-3 py-1 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgb(255_0_51/0.4)]">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          {t.pluginsPage.videoSoon}
                        </span>
                      )}
                    </div>
                  ) : p.image ? (
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      width={1120}
                      height={400}
                      className="float w-full rounded-2xl shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
                    />
                  ) : null}
                  <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-mist">
                    <span className="eq flex h-4 items-end gap-[3px]">
                      {[0.2, 0.5, 0.1, 0.35].map((d) => (
                        <span key={d} className="h-full w-[3px] rounded-full bg-frost" style={{ animationDelay: `${d}s` }} />
                      ))}
                    </span>
                    {p.platforms}
                  </div>
                </div>

                <div className="p-5 sm:px-7 sm:py-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`${chip} font-mono`}>v{latest.version}</span>
                    <span className={chip}>{t.pluginsPage.free}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{p.kind}</span>
                  </div>
                  <h3 className="mt-2.5 text-2xl leading-tight">
                    {p.slug === "multi-chat" ? (
                      <a href={multichatPath[locale].home} className="hover:text-frost">{p.name}</a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-mist">{p.tagline}</p>
                  <p className="mt-1 text-[13px] text-muted">{p.players}</p>
                  {p.slug === "multi-chat" && (
                    <p className="mt-1 text-[13px] text-muted">
                      <a href={multichatPath[locale].home} className="text-frost underline decoration-line underline-offset-4 hover:text-white">
                        {locale === "es" ? "Página del plugin" : "Plugin page"}
                      </a>
                      {" · "}
                      <a href={multichatPath[locale].privacy} className="text-frost underline decoration-line underline-offset-4 hover:text-white">
                        {locale === "es" ? "Privacidad" : "Privacy"}
                      </a>
                    </p>
                  )}
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <li key={f.title} className={chip}>{f.title}</li>
                    ))}
                  </ul>

                  <PluginDownloads
                    items={p.downloads}
                    urls={latest.urls}
                    releasesUrl={latest.releases}
                    repoUrl={latest.repo}
                    repoLink={t.pluginsPage.repoLink}
                    requirements={latest.requirements}
                    detectedLabel={t.pluginsPage.detected}
                    macInstall={t.pluginsPage.macInstall}
                    macHelp={t.pluginsPage.macHelp}
                    downloadFor={t.pluginsPage.downloadFor}
                    otherPlatforms={t.pluginsPage.otherPlatforms}
                    obsForum={
                      p.obsForum
                        ? { url: p.obsForum, label: p.obsForumSoon ? t.pluginsPage.obsForumSoon : t.pluginsPage.obsForum, soon: p.obsForumSoon }
                        : undefined
                    }
                  />
                </div>
              </article>
            ))}

            {/* Pack de alertas: bloqueado, con cuenta regresiva hasta el lanzamiento */}
            {t.alerts.items.map((a) => (
              <article key={a.slug} id="alertas" className="glass-deep grid scroll-mt-32 overflow-hidden lg:grid-cols-[0.8fr_1.2fr]">
                <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_85%_0%,rgb(123_44_255/0.35),transparent_60%),radial-gradient(ellipse_at_0%_100%,rgb(255_63_164/0.25),transparent_60%),#120a1c] p-4 sm:p-6">
                  {/* Hasta el lanzamiento, los stickers; desde entonces, el video (está programado en YouTube) */}
                  <UnlockAt
                    at={a.video ? (a.comingSoon ? ALERTS_LAUNCH : "1970-01-01") : "9999-12-31"}
                    before={
                  <div aria-hidden className="float grid w-full max-w-xs grid-cols-3 place-items-center gap-4">
                    {a.stickers.map((s) => (
                      <Image
                        key={s}
                        src={`/img/alertas/${a.slug}/${s}.png`}
                        alt=""
                        width={120}
                        height={120}
                        className="h-14 w-auto object-contain drop-shadow-[0_6px_12px_rgb(0_0_0/0.5)] sm:h-16"
                      />
                    ))}
                  </div>
                    }
                    after={<YouTubeVideo id={a.video} title={a.name} playLabel={t.pluginsPage.play} />}
                  />
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-mist">{a.platforms}</div>
                </div>

                <div className="p-5 sm:px-7 sm:py-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {a.comingSoon && (
                      <UnlockAt
                        at={ALERTS_LAUNCH}
                        before={
                          <span className={soonBadge}>
                            <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                            {t.alerts.soon}
                          </span>
                        }
                        after={null}
                      />
                    )}
                    <span className={chip}>{t.alerts.free}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{a.kind}</span>
                  </div>
                  <h3 className="mt-2.5 text-2xl leading-tight">{a.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-mist">{a.tagline}</p>
                  <p className="mt-1 text-[13px] text-muted">{a.note}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {a.features.map((f) => (
                      <li key={f.title} className={chip}>{f.title}</li>
                    ))}
                  </ul>

                  {/* Con comingSoon, la descarga se desbloquea sola a la hora del lanzamiento */}
                  <UnlockAt
                    at={a.comingSoon ? ALERTS_LAUNCH : "1970-01-01"}
                    before={
                    <div className="mt-4 grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
                      <Countdown
                        target={ALERTS_LAUNCH}
                        label={t.alerts.countdownLabel}
                        doneLabel={t.alerts.countdownDone}
                        units={t.alerts.countdownUnits}
                      />
                      <div>
                        {/* Los mismos dos botones que se activan al desbloquear */}
                        <div className="grid gap-2">
                          <button
                            type="button"
                            disabled
                            aria-disabled
                            title={t.alerts.launchDate}
                            className="btn-primary w-full cursor-not-allowed justify-center gap-2 px-5 py-2.5 opacity-60 shadow-none hover:brightness-100"
                          >
                            <LockIcon width={14} height={14} />
                            {t.alerts.downloadStreamlabs}
                          </button>
                          <button
                            type="button"
                            disabled
                            aria-disabled
                            title={t.alerts.launchDate}
                            className="btn-ghost w-full cursor-not-allowed justify-center gap-2 px-5 py-2.5 opacity-60 hover:bg-transparent"
                          >
                            <LockIcon width={14} height={14} />
                            {t.alerts.oneClick}
                          </button>
                        </div>
                        <p className="mt-2 text-center text-xs text-mist">{t.alerts.launchDate}</p>
                      </div>
                    </div>
                    }
                    after={
                    <>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <a href={a.streamlabsZip} className="btn-primary justify-center gap-2 px-5 py-2.5">
                          <DownloadIcon width={15} height={15} />
                          {t.alerts.downloadStreamlabs}
                        </a>
                        <a href={a.streamlabs} target="_blank" rel="noreferrer" className="btn-ghost justify-center gap-2 px-5 py-2.5">
                          {t.alerts.oneClick}
                        </a>
                      </div>
                      <a href={a.repo} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs text-mist hover:text-white">
                        <GithubIcon width={14} height={14} /> {t.alerts.repoLink} <ArrowIcon width={12} height={12} />
                      </a>
                    </>
                    }
                  />
                </div>
              </article>
            ))}
        </section>

        {/* 2. Creadores */}
        <section id="streamers" className="mx-auto mt-14 max-w-[1200px] scroll-mt-32 px-4 sm:px-6">
          <Head eyebrow={t.streamers.eyebrow} title={t.streamers.title}>
            {t.streamers.intro}
          </Head>

          {t.streamers.items.map((st) => (
            <article key={st.handle} className="glass-deep overflow-hidden">
              <a href={st.url} target="_blank" rel="noreferrer" className="block" aria-label={st.name}>
                <Image src={st.banner} alt="" width={1278} height={204} className="h-20 w-full object-cover sm:aspect-[1278/204] sm:h-auto" />
              </a>

              <div className="flex flex-wrap items-end gap-x-5 gap-y-3 px-5 sm:px-8">
                <Image
                  src={st.avatar}
                  alt={st.name}
                  width={96}
                  height={96}
                  className="relative -mt-8 size-[72px] shrink-0 rounded-full ring-4 ring-[#05060f] sm:-mt-10 sm:size-24"
                />
                <div className="min-w-0 flex-1 pb-1">
                  <h3 className="text-2xl leading-tight">{st.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {st.handle} · {st.stats}
                  </p>
                </div>
                <a
                  href={st.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-1 inline-flex items-center gap-2 rounded-full bg-[#FF0033] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <YoutubeIcon width={17} height={17} /> {t.streamers.cta}
                </a>
              </div>

              {/* Tira de videos: los de los plugins primero, luego más del canal */}
              <ul className="mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-6 sm:px-8 lg:grid lg:grid-cols-6 lg:overflow-visible">
                {[...st.videos, ...st.more.map((v) => ({ ...v, plugin: "" }))].map((v) => (
                  <li key={v.title} className="w-[200px] shrink-0 snap-start lg:w-auto">
                    <a href={st.videosUrl} target="_blank" rel="noreferrer" className="group block">
                      <div className={`relative overflow-hidden rounded-lg ${v.plugin ? "ring-2 ring-brand-purple" : ""}`}>
                        <Image
                          src={v.image}
                          alt={v.title}
                          width={421}
                          height={236}
                          className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                        />
                      </div>
                      {v.plugin && (
                        <span className="mt-2 inline-block rounded-md bg-brand-purple px-1.5 py-0.5 text-[10px] font-medium text-white">{v.plugin}</span>
                      )}
                      <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted transition group-hover:text-white">{v.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

          </div>

          {/* Pestaña 2: lo que viene (plugins marcados comingSoon y Speed Deck) */}
        <section id="proximamente" className="mx-auto max-w-[1200px] scroll-mt-32 px-4 pt-8 sm:px-6">

          <div className="space-y-5">
            {soonPlugins.map((p) => (
              <article key={p.slug} id={p.slug} className="glass-deep grid scroll-mt-32 overflow-hidden lg:grid-cols-[0.8fr_1.2fr]">
                <div className={`${stage} p-4 sm:p-6`}>
                  <div className="relative w-full">
                    <PluginShowcase slug={p.slug} locale={locale} />
                    <span className="absolute -top-3 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#FF0033] px-3 py-1 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgb(255_0_51/0.4)]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      {t.pluginsPage.videoSoon}
                    </span>
                  </div>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-mist">{p.platforms}</div>
                </div>

                <div className="p-5 sm:px-7 sm:py-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={soonBadge}>
                      <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                      {t.apps.soon}
                    </span>
                    <span className={chip}>{t.pluginsPage.free}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{p.kind}</span>
                  </div>
                  <h3 className="mt-2.5 text-2xl leading-tight">{p.name}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-mist">{p.tagline}</p>
                  <p className="mt-1 text-[13px] text-muted">{p.players}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <li key={f.title} className={chip}>{f.title}</li>
                    ))}
                  </ul>

                  {/* Todo bloqueado hasta el lanzamiento */}
                  <button
                    type="button"
                    disabled
                    aria-disabled
                    title={t.apps.disabledHint}
                    className="btn-primary mt-5 w-full cursor-not-allowed justify-center gap-2 px-5 py-3 opacity-60 shadow-none hover:brightness-100"
                  >
                    <LockIcon width={14} height={14} />
                    {t.apps.disabledHint}
                  </button>
                  <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
                    {p.downloads.map((d) => (
                      <span key={d.label} title={t.apps.disabledHint} className="btn-ghost cursor-not-allowed gap-1.5 px-3 py-1.5 text-xs opacity-50">
                        <LockIcon width={12} height={12} />
                        <PlatformIcon platform={d.platform} width={13} height={13} />
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* Plugins que aún no tienen ficha: tarjetas compactas, todo bloqueado */}
            <div id="en-camino" className="scroll-mt-32 pt-4">
              <Head eyebrow={t.upcoming.eyebrow} title={t.upcoming.title}>{t.upcoming.text}</Head>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.upcoming.items.map((u) => (
                  <article key={u.slug} className="glass-deep flex flex-col p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.55),transparent_70%),#0b0d1a] text-frost ring-1 ring-white/10">
                        <UpcomingIcon slug={u.slug} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-lg leading-tight">{u.name}</h3>
                        <span className={`${soonBadge} mt-1 w-fit px-1.5 py-0.5 text-[10px]`}>
                          <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                          {t.apps.soon}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{u.tagline}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {u.chips.map((c) => (
                        <li key={c} className={chip}>{c}</li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-4">
                      <button
                        type="button"
                        disabled
                        aria-disabled
                        className="btn-ghost w-full cursor-not-allowed justify-center gap-2 px-4 py-2 text-sm opacity-60 hover:bg-transparent"
                      >
                        <LockIcon width={13} height={13} />
                        {t.upcoming.locked}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {t.apps.items.map((app) => (
              <article key={app.slug} id="apps" className="glass-deep grid scroll-mt-32 overflow-hidden lg:grid-cols-2">
                <div className={`${stage} px-5 py-6 sm:px-8`}>
                  <div role="img" aria-label={app.imageAlt} className="w-full">
                    <SpeedDeckMock locale={locale} />
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={soonBadge}>
                      <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                      {t.apps.soon}
                    </span>
                    <span className={chip}>
                      {t.apps.price} {t.apps.priceNote}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{app.platforms}</span>
                  </div>
                  <h3 className="mt-3 text-[26px] leading-tight">{app.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{app.tagline}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {app.highlights.map((h) => (
                      <li key={h} className={chip}>{h}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    disabled
                    aria-disabled
                    title={t.apps.disabledHint}
                    className="btn-primary mt-5 w-full cursor-not-allowed justify-center gap-2 px-5 py-3 opacity-60 shadow-none hover:brightness-100"
                  >
                    <PlatformIcon platform="android" width={16} height={16} />
                    {t.apps.playCta}
                  </button>
                  <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
                    {app.downloads.map((d) => (
                      <span key={d.label} title={t.apps.disabledHint} className="btn-ghost cursor-not-allowed gap-1.5 px-3 py-1.5 text-xs opacity-50">
                        <PlatformIcon platform={d.platform} width={13} height={13} />
                        {d.label}
                      </span>
                    ))}
                  </div>

                  <details className="group mt-5 border-t border-line pt-4 text-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-mist hover:text-white [&::-webkit-details-marker]:hidden">
                      {t.apps.detailsLabel}
                      <span className="transition group-open:rotate-90">›</span>
                    </summary>
                    <dl className="mt-4 space-y-4">
                      <div>
                        <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{t.apps.includesTitle}</dt>
                        {t.apps.includes.map((item) => (
                          <dd key={item} className="mt-1.5 leading-relaxed text-mist">{item}</dd>
                        ))}
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{t.apps.refundTitle}</dt>
                        <dd className="mt-1.5 leading-relaxed text-mist">
                          {t.apps.refundText}{" "}
                          <a href={`mailto:${site.email}`} className="text-frost underline decoration-line underline-offset-4 hover:text-white">{site.email}</a>.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{t.apps.supportTitle}</dt>
                        <dd className="mt-1.5 leading-relaxed text-mist">
                          {t.apps.supportText}{" "}
                          <a href={`mailto:${site.email}`} className="text-frost underline decoration-line underline-offset-4 hover:text-white">{site.email}</a>.
                        </dd>
                      </div>
                    </dl>
                  </details>
                  <p className="mt-4 text-xs text-muted">
                    {legal.agree}{" "}
                    <a href={legalPath[locale].terms} className="text-frost underline decoration-line underline-offset-4 hover:text-white">{legal.terms}</a>{" "}
                    {legal.and}{" "}
                    <a href={legalPath[locale].privacy} className="text-frost underline decoration-line underline-offset-4 hover:text-white">{legal.privacy}</a>.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        </PageTabs>
      </main>
      <Footer locale={locale} />
    </>
  );
}
