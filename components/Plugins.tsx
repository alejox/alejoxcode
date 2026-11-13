import Image from "next/image";
import { content, type Locale } from "@/lib/content";
import { getLatestRelease } from "@/lib/downloads";
import { legalLabels, legalPath } from "@/lib/legal";
import { site } from "@/lib/site";
import { Footer } from "./Footer";
import { ArrowIcon, DownloadIcon, GithubIcon, PlatformIcon, YoutubeIcon } from "./Icons";
import { Navbar } from "./Navbar";
import { PluginDownloads } from "./PluginDownloads";
import { PluginShowcase, YouTubeVideo } from "./PluginShowcase";
import { PluginTabs } from "./PluginTabs";
import { SectionNav } from "./SectionNav";
import { SpeedDeckMock } from "./SpeedDeckMock";

const SHOWCASES = ["multi-chat", "goal-bar"];

const chip = "rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost";
const soonBadge = "flex items-center gap-2 rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-blue";
const stage =
  "relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(152_192_239/0.16),transparent_55%),#070914]";

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
  const items = await Promise.all(
    t.pluginsPage.items.map(async (p) => ({ p, latest: await getLatestRelease(p.slug) }))
  );
  const legal = legalLabels[locale];

  return (
    <>
      <Navbar locale={locale} />
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

        <SectionNav
          items={[
            { id: "plugins", label: t.pluginsPage.nav.plugins },
            { id: "streamers", label: t.pluginsPage.nav.creators },
            { id: "proximamente", label: t.pluginsPage.nav.soon },
          ]}
        />

        {/* 1. Plugins: una pestaña por plugin */}
        <section id="plugins" className="mx-auto max-w-[1200px] scroll-mt-32 px-4 pt-8 sm:px-6">
          <PluginTabs
            label={t.pluginsPage.tabsLabel}
            tabs={items.map(({ p, latest }) => ({ slug: p.slug, name: p.name, version: latest.version }))}
          >
            {items.map(({ p, latest }) => (
              <article key={p.slug} className="glass-deep grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
                <div className={`${stage} p-5 sm:p-8`}>
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
                  <div className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">
                    <span className="eq flex h-4 items-end gap-[3px]">
                      {[0.2, 0.5, 0.1, 0.35].map((d) => (
                        <span key={d} className="h-full w-[3px] rounded-full bg-frost" style={{ animationDelay: `${d}s` }} />
                      ))}
                    </span>
                    {p.platforms}
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`${chip} font-mono`}>v{latest.version}</span>
                    <span className={chip}>{t.pluginsPage.free}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{p.kind}</span>
                  </div>
                  <h3 className="mt-3 text-[28px] leading-tight">{p.name}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{p.tagline}</p>
                  <p className="mt-1.5 text-sm text-muted">{p.players}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
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
          </PluginTabs>
        </section>

        {/* 2. Creadores */}
        <section id="streamers" className="mx-auto mt-16 max-w-[1200px] scroll-mt-32 px-4 sm:px-6">
          <Head eyebrow={t.streamers.eyebrow} title={t.streamers.title}>
            {t.streamers.intro}
          </Head>

          {t.streamers.items.map((st) => (
            <article key={st.handle} className="glass-deep overflow-hidden">
              <a href={st.url} target="_blank" rel="noreferrer" className="block" aria-label={st.name}>
                <Image src={st.banner} alt="" width={1278} height={204} className="h-20 w-full object-cover sm:h-28" />
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

        {/* 3. Próximamente: Speed Deck y packs de alertas, lado a lado */}
        <section id="proximamente" className="mx-auto mt-16 max-w-[1200px] scroll-mt-32 px-4 sm:px-6">
          <Head eyebrow={t.pluginsPage.soonEyebrow} title={t.pluginsPage.soonTitle} />

          <div className="grid gap-6 lg:grid-cols-2">
            {t.apps.items.map((app) => (
              <article key={app.slug} id="apps" className="glass-deep scroll-mt-32 overflow-hidden">
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

            {t.alerts.items.map((a) => (
              <article key={a.slug} id="alertas" className="glass-deep scroll-mt-32 overflow-hidden">
                <div className="relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_85%_0%,rgb(123_44_255/0.35),transparent_60%),radial-gradient(ellipse_at_0%_100%,rgb(255_63_164/0.25),transparent_60%),#120a1c] px-5 py-6 sm:px-8">
                  <div
                    aria-hidden
                    className={`float grid w-full max-w-md grid-cols-5 place-items-center gap-3 ${a.comingSoon ? "opacity-60 blur-[3px]" : ""}`}
                  >
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
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    {a.comingSoon && (
                      <span className={soonBadge}>
                        <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                        {t.alerts.soon}
                      </span>
                    )}
                    <span className={chip}>{t.alerts.free}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{a.platforms}</span>
                  </div>
                  <h3 className="mt-3 text-[26px] leading-tight">{a.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{a.tagline}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {a.features.map((f) => (
                      <li key={f.title} className={chip}>{f.title}</li>
                    ))}
                  </ul>

                  {a.comingSoon ? (
                    <>
                      <button
                        type="button"
                        disabled
                        aria-disabled
                        className="btn-primary mt-5 w-full cursor-not-allowed justify-center gap-2 px-5 py-3 opacity-60 shadow-none hover:brightness-100"
                      >
                        <DownloadIcon width={15} height={15} />
                        {t.alerts.download}
                      </button>
                      <p className="mt-4 text-sm leading-relaxed text-mist">{t.alerts.soonText}</p>
                    </>
                  ) : (
                    <>
                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        <a href={a.download} className="btn-primary justify-center gap-2 px-5 py-3">
                          <DownloadIcon width={15} height={15} />
                          {t.alerts.download}
                        </a>
                        <a href={a.streamlabs} target="_blank" rel="noreferrer" className="btn-ghost justify-center gap-2 px-5 py-3">
                          {t.alerts.oneClick}
                        </a>
                      </div>
                      <a href={a.repo} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs text-mist hover:text-white">
                        <GithubIcon width={14} height={14} /> {t.alerts.repoLink} <ArrowIcon width={12} height={12} />
                      </a>
                    </>
                  )}
                  <p className="mt-4 text-xs text-muted">{a.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
