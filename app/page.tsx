import Image from "next/image";
import { DownloadCard } from "@/components/DownloadCard";
import { Socials } from "@/components/Footer";
import { ArrowIcon, CategoryIcon, DownloadIcon, GithubIcon } from "@/components/Icons";
import { ObsHero } from "@/components/ObsHero";
import { SectionHead } from "@/components/Section";
import { CATEGORY_LABEL, downloads, type Category } from "@/lib/downloads";
import { site } from "@/lib/site";

const stack = ["C / C++", "Lua", "Python", "TypeScript", "Next.js", "Node.js", "obs-websocket", "Supabase", "CMake", "Qt"];

const CATEGORY_BLURB: Record<Category, string> = {
  plugin: "Nativos en C/C++",
  script: "Lua y Python",
  overlay: "Browser Source",
  theme: "Interfaz de OBS",
  tool: "Utilidades",
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="spotlight relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-20 text-center sm:px-6 sm:pt-28">
          <p className="eyebrow">Plugins · Scripts · Overlays para OBS</p>
          <h1 className="text-gradient glow-text mt-8 text-[56px] leading-[1.05] sm:text-[96px] lg:text-[128px]">
            AlejoxCode
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-mist sm:text-lg">
            Hola, soy Alejo. Construyo herramientas para que tu stream se vea pro: plugins para OBS Studio,
            tutoriales y todo el contenido dev que voy creando.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#descargas" className="btn-primary btn-lg">
              <DownloadIcon width={16} height={16} /> Descargas OBS
            </a>
            <a href="#sobre-mi" className="btn-ghost btn-lg">
              Sobre mí <ArrowIcon width={16} height={16} />
            </a>
          </div>

          <div className="mt-20">
            <ObsHero />
          </div>

          <dl className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-6">
            {[
              ["5", "Tipos de recurso"],
              ["3", "Sistemas"],
              ["30+", "OBS compatible"],
            ].map(([n, l]) => (
              <div key={String(l)}>
                <dt className="font-display text-[28px] font-medium text-ice">{n}</dt>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CATEGORÍAS — fila de tiles conectados */}
      <section className="mx-auto mt-16 max-w-[1200px] px-4 sm:px-6">
        <SectionHead eyebrow="Extensible por diseño" title="Todo lo que tu OBS necesita">
          Recursos gratuitos, organizados por tipo y listos para Windows, macOS y Linux.
        </SectionHead>
        <div className="relative">
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-linear-to-r from-transparent via-line to-transparent sm:block" />
          <ul className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-5">
            {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
              <li key={c}>
                <div className="flex flex-col items-center text-center">
                  <span className="icon-tile size-16 bg-ink">
                    <CategoryIcon category={c} />
                  </span>
                  <span className="mt-4 text-sm font-medium text-frost">{CATEGORY_LABEL[c]}s</span>
                  <span className="mt-1 text-xs text-muted">{CATEGORY_BLURB[c]}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DESCARGAS OBS */}
      <section id="descargas" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
        <SectionHead eyebrow="Descargas OBS" title="Plugins listos para tu OBS">
          Gratis y para Windows, macOS y Linux.
        </SectionHead>
        {downloads.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((d) => (
              <DownloadCard key={d.name} item={d} />
            ))}
          </div>
        ) : (
          <div className="glass spotlight relative isolate mx-auto max-w-2xl overflow-hidden px-8 py-16 text-center">
            <div className="bg-grid absolute inset-0 -z-10" />
            <span className="icon-tile mx-auto size-16 bg-ink">
              <DownloadIcon width={22} height={22} />
            </span>
            <p className="eyebrow mt-8">Próximamente</p>
            <h3 className="mt-4 text-2xl">Los primeros plugins están en camino</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
              Estoy preparando los primeros lanzamientos. Sígueme en GitHub para enterarte cuando salgan.
            </p>
            <a href={site.socials.github} target="_blank" rel="noreferrer" className="btn-ghost mt-8">
              <GithubIcon width={15} height={15} /> Seguir en GitHub
            </a>
          </div>
        )}
      </section>

      {/* CÓMO INSTALAR */}
      <section className="mx-auto mt-30 max-w-[1200px] px-4 sm:px-6">
        <SectionHead eyebrow="En tres pasos" title="De la descarga al directo" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["01", "Descarga", "Elige el plugin y la versión para tu sistema: Windows, macOS o Linux."],
            ["02", "Instala", "Ejecuta el instalador o copia la carpeta en obs-studio/plugins. Los scripts van en Herramientas → Scripts."],
            ["03", "Transmite", "Reinicia OBS, agrega la nueva fuente o filtro y sal en vivo."],
          ].map(([n, t, d]) => (
            <div key={n} className="glass p-6">
              <span className="font-mono text-xs tracking-[0.1em] text-muted">{n}</span>
              <h3 className="mt-4 text-2xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="mx-auto mt-30 max-w-[1200px] scroll-mt-24 px-4 sm:px-6">
        <div className="grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="glass absolute inset-x-4 bottom-0 top-20 -z-10" />
            <div className="absolute inset-x-10 top-10 -z-20 h-2/3 rounded-full bg-[rgb(152_192_239/0.18)] blur-[80px]" />
            <Image
              src="/img/alejo-side.webp"
              alt="Alejo, desarrollador de AlejoxCode"
              width={989}
              height={1200}
              className="w-full rounded-b-2xl [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
            />
            <span className="icon-tile float absolute -left-3 bottom-10 size-16 bg-ink">
              <Image src="/img/logo.png" alt="" width={36} height={36} />
            </span>
          </div>
          <div>
            <p className="eyebrow eyebrow-left">Sobre mí</p>
            <h2 className="text-gradient mt-5 text-[32px] leading-[1.16] sm:text-[44px]">Código, streaming y mucha cafeína.</h2>
            <p className="mt-5 leading-relaxed text-mist">
              Soy Alejo, el desarrollador detrás de <span className="text-white">AlejoxCode</span>. Me apasiona crear
              herramientas que hacen más fácil la vida de los creadores de contenido: plugins nativos para OBS,
              scripts que automatizan escenas, overlays animados y todo lo que se me ocurra entre commit y commit.
            </p>
            <div className="glass-deep mt-8 overflow-hidden font-mono text-[13px]">
              <div className="px-4 py-2.5 text-[11px] text-muted shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)]">~/alejoxcode — zsh</div>
              <div className="space-y-1.5 p-4">
                <p className="text-frost"><span className="text-muted">$</span> whoami</p>
                <p className="text-muted">alejo — dev · creador de plugins OBS · streamer</p>
                <p className="text-frost"><span className="text-muted">$</span> cat stack.txt</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stack.map((s) => (
                    <span key={s} className="rounded-md bg-panel-2 px-2 py-1 text-xs text-frost">{s}</span>
                  ))}
                </div>
                <p className="pt-1 text-frost"><span className="text-muted">$</span> <span className="rec-dot">▍</span></p>
              </div>
            </div>
            <Socials className="mt-6" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-30 max-w-[1200px] px-4 sm:px-6">
        <div className="glass spotlight relative isolate overflow-hidden px-8 py-20 text-center">
          <div className="bg-grid absolute inset-0 -z-10" />
          <p className="eyebrow">Brilla en vivo</p>
          <h2 className="text-gradient mt-5 text-[32px] sm:text-[44px]">¿Listo para mejorar tu stream?</h2>
          <p className="mx-auto mt-4 max-w-lg text-mist">Plugins, scripts y overlays para OBS en un solo lugar.</p>
          <a href="#descargas" className="btn-primary btn-lg mt-10">
            <DownloadIcon width={16} height={16} /> Ir a descargas
          </a>
        </div>
      </section>
    </>
  );
}
