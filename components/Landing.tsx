import Image from "next/image";
import { content, type Locale, type Project } from "@/lib/content";
import { nowPlaying } from "@/lib/downloads";
import { site } from "@/lib/site";
import { Footer } from "./Footer";
import { HeroMotion } from "./HeroMotion";
import { ArrowIcon, DownloadIcon, GithubIcon, GlobeIcon, PlatformIcon } from "./Icons";
import { Navbar } from "./Navbar";
import { RoleTicker } from "./RoleTicker";
import { SectionHead } from "./Section";

export function Landing({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <>
      <Navbar locale={locale} />
      <main>
        {/* HERO */}
        <section className="spotlight relative isolate overflow-hidden">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
            <div className="text-center lg:text-left">
              <p className="eyebrow lg:justify-start lg:before:hidden">{t.hero.eyebrow}</p>
              <h1 className="text-gradient glow-text mt-7 text-[52px] leading-[1.04] sm:text-[80px]">
                Alejandro
                <br />
                Grajales
              </h1>
              <p className="mt-6 font-display text-2xl text-mist sm:text-[28px]">
                <RoleTicker roles={t.hero.roles} />
              </p>
              <p className="mx-auto mt-6 max-w-[540px] text-[17px] leading-relaxed text-mist lg:mx-0">{t.hero.summary}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="#projects" className="btn-primary btn-lg">
                  {t.hero.ctaProjects} <ArrowIcon width={16} height={16} />
                </a>
                <a href="#contact" className="btn-ghost btn-lg">{t.hero.ctaContact}</a>
                <a href={site.socials.github} target="_blank" rel="noreferrer" className="btn-ghost btn-lg" aria-label="GitHub">
                  <GithubIcon width={16} height={16} />
                </a>
              </div>
            </div>
            <HeroMotion />
          </div>

          <div className="relative overflow-hidden py-6 shadow-[inset_0_1px_0_rgb(186_215_247/0.06),inset_0_-1px_0_rgb(186_215_247/0.06)] [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee flex w-max gap-3">
              {[...t.stack, ...t.stack].map((s, i) => (
                <span key={i} className="hairline rounded-full px-4 py-2 font-mono text-xs text-mist">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section id="about" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <div>
              <div className="flex items-center gap-5">
                <Image
                  src="/img/avatar.webp"
                  alt="Alejandro Grajales"
                  width={160}
                  height={160}
                  className="size-20 shrink-0 rounded-full shadow-[0_0_0_1px_rgb(186_215_247/0.2),0_0_32px_rgb(152_192_239/0.2)] sm:size-24"
                />
                <div>
                  <p className="eyebrow eyebrow-left">{t.about.eyebrow}</p>
                  <p className="mt-2 text-sm text-mist">Alejandro Grajales · Frontend Developer</p>
                </div>
              </div>
              <h2 className="text-gradient mt-8 text-[32px] leading-[1.16] sm:text-[44px]">{t.about.title}</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-mist">
                {t.about.body.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2 lg:mt-24 lg:grid-cols-1">
              {t.about.facts.map((f) => (
                <div key={f.label} className="glass px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{f.label}</dt>
                  <dd className="mt-1 text-[15px] text-ice">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="projects" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
          <SectionHead eyebrow={t.projects.eyebrow} title={t.projects.title}>{t.projects.intro}</SectionHead>
          <div className="grid gap-6 md:grid-cols-2">
            {t.projects.items.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} wide={i === t.projects.items.length - 1} />
            ))}
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section id="experience" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
          <SectionHead eyebrow={t.experience.eyebrow} title={t.experience.title} />
          <ol className="relative mx-auto max-w-3xl">
            <div className="absolute bottom-2 left-[19px] top-2 w-px bg-linear-to-b from-[rgb(186_215_247/0.3)] via-line to-transparent sm:left-1/2" />
            {t.experience.items.map((e, i) => (
              <li
                key={e.role + e.company}
                className={`relative mb-10 flex gap-6 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:flex-row-reverse sm:pr-10 sm:text-right"}`}
              >
                <span
                  className={`icon-tile relative z-10 size-10 shrink-0 font-mono text-[10px] sm:absolute sm:top-0 ${i % 2 ? "sm:-left-5" : "sm:-right-5"} ${
                    e.current ? "bg-brand-purple text-white shadow-[0_0_24px_rgb(102_58_243/0.6)]" : "bg-ink"
                  }`}
                >
                  {e.mark}
                </span>
                <div className={`flex-1 p-5 ${e.current ? "glass-deep" : "glass"}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {e.current && <span className="rec-dot mr-1.5 inline-block size-1.5 rounded-full bg-brand-blue align-middle" />}
                    {e.period} · {e.company}
                  </p>
                  <h3 className="mt-2 text-lg">{e.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* OBS */}
        <section id="obs" className="relative isolate mt-30 scroll-mt-24 overflow-hidden py-24">
          <div className="spotlight absolute inset-0 -z-10" />
          <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHead eyebrow={t.obs.eyebrow} title={t.obs.title}>{t.obs.intro}</SectionHead>

            <div className="glass-deep grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
              <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(152_192_239/0.16),transparent_55%),#070914] p-6 sm:p-10">
                <Image
                  src="/img/now-playing.png"
                  alt={t.obs.imageAlt}
                  width={1120}
                  height={400}
                  className="float w-full rounded-2xl shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
                />
                <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">
                  <span className="eq flex h-4 items-end gap-[3px]">
                    {[0.2, 0.5, 0.1, 0.35].map((d) => (
                      <span key={d} className="h-full w-[3px] rounded-full bg-frost" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </span>
                  Spotify · YouTube Music · Apple Music
                </div>
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] text-frost">v{nowPlaying.version}</span>
                  <span className="rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost">{t.obs.free}</span>
                </div>
                <h3 className="mt-4 text-[28px] leading-tight">{nowPlaying.name}</h3>
                <p className="mt-3 leading-relaxed text-mist">{t.obs.tagline}</p>
                <p className="mt-2 text-sm text-muted">{t.obs.players}</p>
                <div className="mt-6 space-y-2">
                  {t.obs.downloads.map((d, i) => (
                    <a
                      key={d.label}
                      href={nowPlaying.releases}
                      target="_blank"
                      rel="noreferrer"
                      className={`${i === 0 ? "btn-primary" : "btn-ghost"} w-full justify-start gap-3 px-5 py-3`}
                    >
                      <PlatformIcon platform={d.platform} width={15} height={15} />
                      <span className="flex-1 text-left">{d.label}</span>
                      <span className="hidden text-xs font-normal text-white/60 sm:inline">{d.hint}</span>
                      <DownloadIcon width={15} height={15} />
                    </a>
                  ))}
                </div>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{nowPlaying.requirements}</p>
                <a href={nowPlaying.repo} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-mist hover:text-white">
                  <GithubIcon width={15} height={15} /> {t.obs.repoLink} <ArrowIcon width={14} height={14} />
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
              <ul className="grid gap-4 sm:grid-cols-2">
                {t.obs.features.map((f) => (
                  <li key={f.title} className="glass p-5">
                    <h4 className="text-[15px]">{f.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                  </li>
                ))}
              </ul>
              <div className="glass p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{t.obs.builtTitle}</span>
                <ul className="mt-4 space-y-3">
                  {t.obs.built.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-mist">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contact" className="mx-auto mt-24 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
          <div className="glass spotlight relative isolate overflow-hidden px-8 py-20 text-center">
            <div className="bg-grid absolute inset-0 -z-10" />
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 className="text-gradient mt-5 text-[32px] sm:text-[44px]">{t.contact.title}</h2>
            <p className="mx-auto mt-4 max-w-lg text-mist">{t.contact.text}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {site.email && (
                <a href={`mailto:${site.email}`} className="btn-primary btn-lg">{t.contact.email}</a>
              )}
              {site.socials.linkedin && (
                <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className={`${site.email ? "btn-ghost" : "btn-primary"} btn-lg`}>
                  LinkedIn
                </a>
              )}
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                className={`${site.email || site.socials.linkedin ? "btn-ghost" : "btn-primary"} btn-lg`}
              >
                <GithubIcon width={16} height={16} /> github.com/alejox
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function ProjectCard({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  return (
    <a
      href={project.href}
      {...(project.external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`glass card-hover group flex flex-col p-7 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{project.kind}</span>
        <span className="font-mono text-[11px] text-muted/60">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-5 text-2xl text-ice">{project.name}</h3>
      <p className="mt-2 leading-relaxed text-mist">{project.summary}</p>
      <ul className={`mt-5 grid gap-2.5 ${wide ? "md:grid-cols-3" : ""}`}>
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost">{tag}</span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-mist transition group-hover:text-white">
          {project.external && <GlobeIcon width={13} height={13} />} {project.linkLabel}
          <ArrowIcon width={12} height={12} className="transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
