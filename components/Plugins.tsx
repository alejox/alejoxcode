import Image from "next/image";
import { content, type Locale } from "@/lib/content";
import { getLatestRelease } from "@/lib/downloads";
import { site } from "@/lib/site";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { PluginDownloads } from "./PluginDownloads";
import { SectionHead } from "./Section";

export async function Plugins({ locale }: { locale: Locale }) {
  const t = content[locale];
  const items = await Promise.all(
    t.pluginsPage.items.map(async (p) => ({ p, latest: await getLatestRelease(p.slug) }))
  );

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <section className="relative isolate overflow-hidden py-16 lg:py-24">
          <div className="spotlight absolute inset-0 -z-10" />
          <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHead eyebrow={t.pluginsPage.eyebrow} title={t.pluginsPage.title}>
              {t.pluginsPage.intro}
            </SectionHead>

            {site.buyMeACoffee && (
              <div className="mt-8 flex justify-center">
                <a
                  href={site.buyMeACoffee}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#FFDD00] px-7 py-3 text-[15px] font-semibold text-black shadow-[0_8px_30px_-8px_rgb(255_221_0/0.5)] transition hover:scale-[1.03] hover:brightness-105"
                >
                  <span aria-hidden className="text-lg">☕</span>
                  {t.pluginsPage.coffee}
                </a>
              </div>
            )}

            {items.map(({ p, latest }) => (
              <article key={p.slug} className="mt-14">
                <div className="glass-deep grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
                  <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(152_192_239/0.16),transparent_55%),#070914] p-6 sm:p-10">
                    {p.image ? (
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

                    <PluginDownloads
                      items={p.downloads}
                      releasesUrl={latest.releases}
                      repoUrl={latest.repo}
                      repoLink={t.pluginsPage.repoLink}
                      requirements={latest.requirements}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li key={f.title} className="glass p-5">
                        <h4 className="text-[15px]">{f.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="glass p-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{p.builtTitle}</span>
                    <ul className="mt-4 space-y-3">
                      {p.built.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-mist">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" />
                          {b}
                        </li>
                      ))}
                    </ul>
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
