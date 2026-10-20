import Image from "next/image";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { Socials } from "@/components/Footer";
import { ArrowIcon, CategoryIcon, DownloadIcon } from "@/components/Icons";
import { ObsHero } from "@/components/ObsHero";
import { PluginCard } from "@/components/PluginCard";
import { PostCard } from "@/components/PostCard";
import { SectionHead } from "@/components/Section";
import { getPlugins, getPosts } from "@/lib/data";
import { CATEGORY_LABEL, type Category } from "@/lib/types";
import { formatNumber, totalDownloads } from "@/lib/utils";

export const revalidate = 60;

const stack = ["C / C++", "Lua", "Python", "TypeScript", "Next.js", "Node.js", "obs-websocket", "Supabase", "CMake", "Qt"];

const CATEGORY_BLURB: Record<Category, string> = {
  plugin: "Nativos en C/C++",
  script: "Lua y Python",
  overlay: "Browser Source",
  theme: "Interfaz de OBS",
  tool: "Utilidades",
};

export default async function Home() {
  const [plugins, posts] = await Promise.all([getPlugins(), getPosts(3)]);
  const downloads = plugins.reduce((a, p) => a + totalDownloads(p), 0);
  const featured = [...plugins].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

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
            <Link href="/obs" className="btn-primary btn-lg">
              <DownloadIcon width={16} height={16} /> Ver descargas OBS
            </Link>
            <Link href="/blog" className="btn-ghost btn-lg">
              Leer el blog <ArrowIcon width={16} height={16} />
            </Link>
          </div>

          <div className="mt-20">
            <ObsHero />
          </div>

          <dl className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-6">
            {[
              [plugins.length, "Recursos"],
              [formatNumber(downloads), "Descargas"],
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

      <DemoBanner />

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
                <Link href={`/obs?cat=${c}`} className="group flex flex-col items-center text-center">
                  <span className="icon-tile size-16 bg-ink transition group-hover:shadow-[inset_0_0_0_1px_rgb(186_215_247/0.3),0_0_32px_rgb(152_192_239/0.25)]">
                    <CategoryIcon category={c} />
                  </span>
                  <span className="mt-4 text-sm font-medium text-frost">{CATEGORY_LABEL[c]}s</span>
                  <span className="mt-1 text-xs text-muted">{CATEGORY_BLURB[c]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DESCARGAS DESTACADAS */}
      <section className="mx-auto mt-30 max-w-[1200px] px-4 sm:px-6">
        <SectionHead eyebrow="Descargas" title="Lo más nuevo para tu OBS">
          Los plugins destacados y más descargados del momento.
        </SectionHead>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PluginCard key={p.id} plugin={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/obs" className="btn-ghost">
            Ver todas las descargas <ArrowIcon width={15} height={15} />
          </Link>
        </div>
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

      {/* BLOG */}
      {posts.length > 0 && (
        <section className="mx-auto mt-30 max-w-[1200px] px-4 sm:px-6">
          <SectionHead eyebrow="Contenido dev" title="Últimos posts">
            Tutoriales, notas de desarrollo y trucos de OBS.
          </SectionHead>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/blog" className="btn-ghost">
              Ir al blog <ArrowIcon width={15} height={15} />
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto mt-30 max-w-[1200px] px-4 sm:px-6">
        <div className="glass spotlight relative isolate overflow-hidden px-8 py-20 text-center">
          <div className="bg-grid absolute inset-0 -z-10" />
          <p className="eyebrow">Brilla en vivo</p>
          <h2 className="text-gradient mt-5 text-[32px] sm:text-[44px]">¿Listo para mejorar tu stream?</h2>
          <p className="mx-auto mt-4 max-w-lg text-mist">Todos los plugins en un solo lugar, siempre actualizados.</p>
          <Link href="/obs" className="btn-primary btn-lg mt-10">
            <DownloadIcon width={16} height={16} /> Ir a descargas
          </Link>
        </div>
      </section>
    </>
  );
}
