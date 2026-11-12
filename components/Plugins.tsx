import Image from "next/image";
import { content, type Locale } from "@/lib/content";
import { getLatestRelease } from "@/lib/downloads";
import { legalLabels, legalPath } from "@/lib/legal";
import { site } from "@/lib/site";
import { Footer } from "./Footer";
import { ArrowIcon, DownloadIcon, GithubIcon, PlatformIcon } from "./Icons";
import { Navbar } from "./Navbar";
import { PluginDownloads } from "./PluginDownloads";
import { PluginShowcase, YouTubeVideo } from "./PluginShowcase";

const SHOWCASES = ["multi-chat", "goal-bar"];
import { SectionHead } from "./Section";
import { SpeedDeckMock } from "./SpeedDeckMock";

export async function Plugins({ locale }: { locale: Locale }) {
  const t = content[locale];
  const items = await Promise.all(
    t.pluginsPage.items.map(async (p) => ({ p, latest: await getLatestRelease(p.slug) }))
  );

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <section id="apps" className="relative isolate scroll-mt-20 overflow-hidden pb-16 pt-16 lg:pb-24 lg:pt-24">
          <div className="spotlight absolute inset-0 -z-10" />
          <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHead eyebrow={t.apps.eyebrow} title={t.apps.title} />

            {t.apps.items.map((app) => (
              <article key={app.slug} className="mt-14">
                <div className="glass-deep grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
                  <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(152_192_239/0.16),transparent_55%),#070914] p-6 sm:p-10">
                    <div role="img" aria-label={app.imageAlt} className="w-full">
                      <SpeedDeckMock locale={locale} />
                    </div>
                    <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">{app.platforms}</div>
                  </div>

                  <div className="p-6 sm:p-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-2 rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-blue">
                        <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                        {t.apps.soon}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[28px] leading-tight">{app.name}</h3>
                      <p className="flex items-baseline gap-2">
                        <span className="font-display text-[28px] font-medium leading-none text-ice">{t.apps.price}</span>
                        <span className="text-sm text-muted">{t.apps.priceNote}</span>
                      </p>
                    </div>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{app.kind}</p>
                    <p className="mt-3 leading-relaxed text-mist">{app.tagline}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {app.highlights.map((h) => (
                        <li key={h} className="rounded-md bg-panel-2 px-2.5 py-1 text-xs text-frost">{h}</li>
                      ))}
                    </ul>

                    <div className="mt-6 space-y-2">
                      <button
                        type="button"
                        disabled
                        aria-disabled
                        title={t.apps.disabledHint}
                        className="btn-primary w-full cursor-not-allowed justify-center gap-2 px-5 py-3 opacity-60 shadow-none hover:brightness-100"
                      >
                        <PlatformIcon platform="android" width={16} height={16} />
                        {t.apps.playCta}
                      </button>
                      <p className="pb-2 text-center text-xs text-muted">
                        {t.apps.buyNote} {legalLabels[locale].agree}{" "}
                        <a href={legalPath[locale].terms} className="text-frost underline decoration-line underline-offset-4 hover:text-white">
                          {legalLabels[locale].terms}
                        </a>{" "}
                        {legalLabels[locale].and}{" "}
                        <a href={legalPath[locale].privacy} className="text-frost underline decoration-line underline-offset-4 hover:text-white">
                          {legalLabels[locale].privacy}
                        </a>
                        .
                      </p>
                      {app.downloads.map((d) => (
                        <button
                          key={d.label}
                          type="button"
                          disabled
                          aria-disabled
                          title={t.apps.disabledHint}
                          className="btn-ghost w-full cursor-not-allowed justify-start gap-3 px-5 py-3 opacity-50 hover:bg-transparent"
                        >
                          <PlatformIcon platform={d.platform} width={15} height={15} />
                          <span className="flex-1 text-left">{d.label}</span>
                          <span className="hidden text-xs font-normal text-white/60 sm:inline">{d.hint}</span>
                          <DownloadIcon width={15} height={15} />
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-mist">{t.apps.soonText}</p>

                    <dl className="mt-6 space-y-4 border-t border-line pt-6 text-sm">
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
                  </div>
                </div>

              </article>
            ))}
          </div>
        </section>

        <section className="relative isolate overflow-hidden py-16 lg:py-24">
          <div className="spotlight absolute inset-0 -z-10" />
          <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHead eyebrow={t.pluginsPage.eyebrow} title={t.pluginsPage.title}>
              {t.pluginsPage.intro}
            </SectionHead>

            {site.kofi && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <p className="max-w-md text-center text-[15px] leading-relaxed text-mist">{t.pluginsPage.coffeeCta}</p>
                <a
                  href={site.kofi}
                  target="_blank"
                  rel="noreferrer"
                  className="coffee-cta inline-flex items-center gap-2.5 rounded-full bg-[#13C3FF] px-8 py-3.5 text-base font-semibold text-white transition hover:scale-[1.05] hover:brightness-110"
                >
                  <span aria-hidden className="coffee-cup text-xl">☕</span>
                  {t.pluginsPage.coffee}
                </a>
              </div>
            )}

            {items.map(({ p, latest }) => (
              <article key={p.slug} className="mt-14">
                <div className="glass-deep grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
                  <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(152_192_239/0.16),transparent_55%),#070914] p-6 sm:p-10">
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
                    ) : (
                      <div className="float glass flex w-full flex-col items-center gap-5 rounded-2xl px-6 py-14 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
                        <span className="text-gradient text-3xl font-semibold sm:text-4xl">{p.name}</span>
                        <div className="flex flex-wrap justify-center gap-2">
                          {p.platforms.split(" · ").map((name) => (
                            <span key={name} className="rounded-md bg-panel-2 px-3 py-1.5 text-sm text-frost">
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">
                      <span className="eq flex h-4 items-end gap-[3px]">
                        {[0.2, 0.5, 0.1, 0.35].map((d) => (
                          <span key={d} className="h-full w-[3px] rounded-full bg-frost" style={{ animationDelay: `${d}s` }} />
                        ))}
                      </span>
                      {p.platforms}
                    </div>
                  </div>

                  <div className="p-6 sm:p-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] text-frost">v{latest.version}</span>
                      <span className="rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost">{t.pluginsPage.free}</span>
                    </div>
                    <h3 className="mt-4 text-[28px] leading-tight">{p.name}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{p.kind}</p>
                    <p className="mt-3 leading-relaxed text-mist">{p.tagline}</p>
                    <p className="mt-2 text-sm text-muted">{p.players}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.features.map((f) => (
                        <li key={f.title} className="rounded-md bg-panel-2 px-2.5 py-1 text-xs text-frost">{f.title}</li>
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
                    />
                  </div>
                </div>

              </article>
            ))}
          </div>
        </section>


        <section id="alertas" className="relative isolate scroll-mt-20 overflow-hidden pb-16 lg:pb-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHead eyebrow={t.alerts.eyebrow} title={t.alerts.title}>
              {t.alerts.intro}
            </SectionHead>

            {t.alerts.items.map((a) => (
              <article key={a.slug} className="relative mt-14">
                {a.comingSoon && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                    <div className="glass-deep flex max-w-md flex-col items-center gap-3 px-8 py-8 text-center shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
                      <span className="flex items-center gap-2 rounded-full bg-panel-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-brand-blue">
                        <span className="rec-dot inline-block size-1.5 rounded-full bg-brand-blue" />
                        {t.alerts.soon}
                      </span>
                      <h3 className="text-gradient text-[28px] leading-tight">{a.name}</h3>
                      <p className="leading-relaxed text-mist">{t.alerts.soonText}</p>
                    </div>
                  </div>
                )}
                <div
                  {...(a.comingSoon ? { "aria-hidden": true, inert: true } : {})}
                  className={a.comingSoon ? "pointer-events-none select-none blur-md opacity-60" : undefined}
                >
                <div className="glass-deep grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
                  <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_85%_0%,rgb(123_44_255/0.35),transparent_60%),radial-gradient(ellipse_at_0%_100%,rgb(255_63_164/0.25),transparent_60%),#120a1c] p-6 sm:p-10">
                    <div className="float grid w-full grid-cols-3 place-items-center gap-4 sm:gap-6">
                      {a.stickers.map((s) => (
                        <Image
                          key={s}
                          src={`/img/alertas/${a.slug}/${s}.png`}
                          alt=""
                          width={120}
                          height={120}
                          className="h-16 w-auto object-contain drop-shadow-[0_6px_12px_rgb(0_0_0/0.5)] sm:h-24"
                        />
                      ))}
                    </div>
                    <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">{a.platforms}</div>
                  </div>

                  <div className="p-6 sm:p-10">
                    <span className="rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost">{t.alerts.free}</span>
                    <h3 className="mt-4 text-[28px] leading-tight">{a.name}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{a.kind}</p>
                    <p className="mt-3 leading-relaxed text-mist">{a.tagline}</p>
                    <p className="mt-2 text-sm text-muted">{a.note}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {a.features.map((f) => (
                        <li key={f.title} className="rounded-md bg-panel-2 px-2.5 py-1 text-xs text-frost">{f.title}</li>
                      ))}
                    </ul>

                    <div className="mt-6 space-y-2">
                      <a href={a.comingSoon ? undefined : a.download} className="btn-primary w-full justify-start gap-3 px-5 py-3">
                        <DownloadIcon width={15} height={15} />
                        <span className="flex-1 text-left">{t.alerts.download}</span>
                        <span className="hidden text-xs font-normal text-white/60 sm:inline">StreamElements · Streamlabs</span>
                      </a>
                      <a
                        href={a.comingSoon ? undefined : a.streamlabs}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost w-full justify-start gap-3 px-5 py-3"
                      >
                        <ArrowIcon width={15} height={15} />
                        <span className="flex-1 text-left">{t.alerts.oneClick}</span>
                      </a>
                    </div>
                    <a href={a.comingSoon ? undefined : a.repo} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-mist hover:text-white">
                      <GithubIcon width={15} height={15} /> {t.alerts.repoLink} <ArrowIcon width={14} height={14} />
                    </a>
                  </div>
                </div>

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
