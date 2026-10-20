import Image from "next/image";
import { Socials } from "@/components/Footer";
import { ArrowIcon, DownloadIcon, GithubIcon, PlatformIcon } from "@/components/Icons";
import { HeroMotion } from "@/components/HeroMotion";
import { RoleTicker } from "@/components/RoleTicker";
import { SectionHead } from "@/components/Section";
import { nowPlaying, themePanel } from "@/lib/downloads";
import { creatorTools, experience, facts, projects, roles, stack, type Project } from "@/lib/profile";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="spotlight relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
          <div className="text-center lg:text-left">
            <p className="eyebrow lg:justify-start lg:before:hidden">Frontend developer · Colombia</p>
            <h1 className="text-gradient glow-text mt-7 text-[52px] leading-[1.04] sm:text-[80px]">
              Alejandro
              <br />
              Grajales
            </h1>
            <p className="mt-6 font-display text-2xl text-mist sm:text-[28px]">
              <RoleTicker roles={roles} />
            </p>
            <p className="mx-auto mt-6 max-w-[540px] text-[17px] leading-relaxed text-mist lg:mx-0">
              Diseñador gráfico y músico de formación, desarrollador por pasión. Construyo productos web con Next.js,
              Vue y Supabase, y en mi tiempo libre, herramientas para streamers y creadores.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#proyectos" className="btn-primary btn-lg">
                Ver proyectos <ArrowIcon width={16} height={16} />
              </a>
              <a href={site.socials.github} target="_blank" rel="noreferrer" className="btn-ghost btn-lg">
                <GithubIcon width={16} height={16} /> GitHub
              </a>
            </div>
          </div>
          <HeroMotion />
        </div>

        {/* Marquee del stack */}
        <div className="relative overflow-hidden py-6 shadow-[inset_0_1px_0_rgb(186_215_247/0.06),inset_0_-1px_0_rgb(186_215_247/0.06)] [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee flex w-max gap-3">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="hairline rounded-full px-4 py-2 font-mono text-xs text-mist">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
        <div className="grid items-center gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="glass absolute inset-x-4 bottom-0 top-20 -z-10" />
            <div className="absolute inset-x-10 top-10 -z-20 h-2/3 rounded-full bg-[rgb(152_192_239/0.18)] blur-[80px]" />
            <Image
              src="/img/alejo-side.webp"
              alt="Alejandro Grajales"
              width={989}
              height={1200}
              className="w-full rounded-b-2xl [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
            />
          </div>
          <div>
            <p className="eyebrow eyebrow-left">Sobre mí</p>
            <h2 className="text-gradient mt-5 text-[32px] leading-[1.16] sm:text-[44px]">Del diseño y la música al código.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-mist">
              <p>
                Empecé en 2006 como diseñador gráfico: vectores, fotomontaje, animación 2D y edición de video. El
                diseño web me llevó al HTML y al CSS, y de ahí a programar en serio.
              </p>
              <p>
                Hoy soy <span className="text-white">frontend developer</span> y construyo productos completos: desde
                la interfaz hasta la base de datos. Me considero autodidacta: me lanzo a proyectos sin saberlo todo y
                aprendo lo necesario para sacarlos adelante.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              {facts.map((f) => (
                <div key={f.label} className="glass px-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{f.label}</dt>
                  <dd className="mt-1 text-sm text-ice">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
        <SectionHead eyebrow="Proyectos" title="Cosas que he construido">
          Productos, sitios y herramientas personales. El código está en GitHub.
        </SectionHead>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>

        <div className="mt-20">
          <SectionHead eyebrow="Para creadores" title="Herramientas de video y audio">
            Scripts que uso en mi propio flujo con DaVinci Resolve.
          </SectionHead>
          <div className="grid gap-6 md:grid-cols-3">
            {creatorTools.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section id="experiencia" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
        <SectionHead eyebrow="Experiencia" title="Trayectoria" />
        <ol className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-linear-to-b from-[rgb(186_215_247/0.3)] via-line to-transparent sm:left-1/2" />
          {experience.map((e, i) => (
            <li key={e.company} className={`relative mb-10 flex gap-6 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:flex-row-reverse sm:pr-10 sm:text-right"}`}>
              <span className={`icon-tile relative z-10 size-10 shrink-0 bg-ink font-mono text-[10px] sm:absolute sm:top-0 ${i % 2 ? "sm:-left-5" : "sm:-right-5"}`}>
                {e.year.slice(2)}
              </span>
              <div className="glass flex-1 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{e.year} · {e.company}</p>
                <h3 className="mt-2 text-lg">{e.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* OBS — HOBBY */}
      <section id="obs" className="relative isolate mt-30 scroll-mt-24 overflow-hidden py-24">
        <div className="spotlight absolute inset-0 -z-10" />
        <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHead eyebrow="Mi hobby · OBS & streaming" title="Plugins para OBS Studio">
            Cuando no estoy en un proyecto, hago herramientas para streamers. Uniendo la música y el código salió este:
          </SectionHead>

          <div className="glass-deep grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,rgb(102_58_243/0.28),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(152_192_239/0.16),transparent_55%),#070914] p-6 sm:p-10">
              <Image
                src="/img/now-playing.png"
                alt="Overlay de OBS Now Playing mostrando la canción actual"
                width={1120}
                height={400}
                className="float w-full rounded-2xl shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
              />
              <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-mist">
                <span className="eq flex h-4 items-end gap-[3px]">
                  {[0.2, 0.5, 0.1, 0.35].map((d) => (
                    <span key={d} className="w-[3px] rounded-full bg-frost" style={{ height: "100%", animationDelay: `${d}s` }} />
                  ))}
                </span>
                Spotify · YouTube Music · Apple Music
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] text-frost">v{nowPlaying.version}</span>
                <span className="rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost">Gratis · MIT</span>
              </div>
              <h3 className="mt-4 text-[28px] leading-tight">{nowPlaying.name}</h3>
              <p className="mt-3 leading-relaxed text-mist">{nowPlaying.tagline}</p>
              <p className="mt-2 text-sm text-muted">{nowPlaying.players}</p>

              <div className="mt-6 space-y-2">
                {nowPlaying.downloads.map((d, i) => (
                  <a
                    key={d.label}
                    href={d.url}
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
                <GithubIcon width={15} height={15} /> Código, instalación y FAQ <ArrowIcon width={14} height={14} />
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <ul className="grid gap-4 sm:grid-cols-2">
              {nowPlaying.features.map((f) => (
                <li key={f.title} className="glass p-5">
                  <h4 className="text-[15px]">{f.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                </li>
              ))}
            </ul>
            <div className="glass flex flex-col p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">También</span>
              <h3 className="mt-3 text-xl">{themePanel.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{themePanel.tagline}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{themePanel.platform}</p>
              <a href={themePanel.repo} target="_blank" rel="noreferrer" className="btn-ghost mt-auto self-start">
                <GithubIcon width={15} height={15} /> Ver en GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="mx-auto mt-24 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
        <div className="glass spotlight relative isolate overflow-hidden px-8 py-20 text-center">
          <div className="bg-grid absolute inset-0 -z-10" />
          <p className="eyebrow">Contacto</p>
          <h2 className="text-gradient mt-5 text-[32px] sm:text-[44px]">¿Construimos algo juntos?</h2>
          <p className="mx-auto mt-4 max-w-lg text-mist">
            Abierto a proyectos frontend, productos web y colaboraciones con creadores de contenido.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {site.email && (
              <a href={`mailto:${site.email}`} className="btn-primary btn-lg">Escríbeme</a>
            )}
            <a href={site.socials.github} target="_blank" rel="noreferrer" className={`${site.email ? "btn-ghost" : "btn-primary"} btn-lg`}>
              <GithubIcon width={16} height={16} /> github.com/alejox
            </a>
          </div>
          <Socials className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a href={project.repo} target="_blank" rel="noreferrer" className="glass card-hover group flex flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{project.kind}</span>
        <span className="font-mono text-[11px] text-muted/60">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-5 text-xl text-ice">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.tags.map((t) => (
          <span key={t} className="rounded-md bg-panel-2 px-2 py-1 text-[11px] text-frost">{t}</span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-mist transition group-hover:text-white">
        <GithubIcon width={13} height={13} /> Ver código <ArrowIcon width={12} height={12} className="transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
