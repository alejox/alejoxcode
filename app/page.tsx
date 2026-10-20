import Image from "next/image";
import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { Socials } from "@/components/Footer";
import { ArrowIcon, DownloadIcon } from "@/components/Icons";
import { ObsHero } from "@/components/ObsHero";
import { PluginCard } from "@/components/PluginCard";
import { PostCard } from "@/components/PostCard";
import { getPlugins, getPosts } from "@/lib/data";
import { formatNumber, totalDownloads } from "@/lib/utils";

export const revalidate = 60;

const stack = ["C / C++", "Lua", "Python", "TypeScript", "Next.js", "Node.js", "obs-websocket", "Supabase", "CMake", "Qt"];

export default async function Home() {
  const [plugins, posts] = await Promise.all([getPlugins(), getPosts(3)]);
  const downloads = plugins.reduce((a, p) => a + totalDownloads(p), 0);
  const featured = [...plugins].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 font-mono text-xs text-muted">
              <span className="rec-dot size-2 rounded-full bg-live" /> plugins · scripts · overlays para OBS
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Hola, soy <span className="text-gradient">Alejo</span>.
              <br />
              Construyo herramientas para que tu stream <span className="text-gradient">se vea pro</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Desarrollador y creador de plugins para OBS Studio. Aquí encuentras mis descargas, tutoriales y todo
              el contenido dev que voy creando.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/obs"
                className="bg-brand inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold shadow-xl shadow-brand-purple/30 transition hover:brightness-110"
              >
                <DownloadIcon /> Ver descargas OBS
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-6 py-3.5 font-semibold transition hover:border-brand-violet"
              >
                Leer el blog <ArrowIcon />
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                [plugins.length, "recursos"],
                [formatNumber(downloads), "descargas"],
                ["30+", "OBS compatible"],
              ].map(([n, l]) => (
                <div key={String(l)}>
                  <dt className="text-3xl font-bold text-white">{n}</dt>
                  <dd className="font-mono text-xs uppercase tracking-wider text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex justify-center lg:justify-end">
            <ObsHero />
          </div>
        </div>
      </section>

      <DemoBanner />

      {/* DESCARGAS DESTACADAS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          kicker="// descargas"
          title="Lo más nuevo para tu OBS"
          action={<Link href="/obs" className="inline-flex items-center gap-1.5 text-sm text-brand-cyan hover:underline">Ver todas <ArrowIcon width={15} /></Link>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PluginCard key={p.id} plugin={p} />
          ))}
        </div>
      </section>

      {/* CÓMO INSTALAR */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="border-gradient grid gap-8 rounded-3xl p-8 md:grid-cols-3 md:p-10">
          {[
            ["01", "Descarga", "Elige el plugin y la versión para tu sistema: Windows, macOS o Linux."],
            ["02", "Instala", "Ejecuta el instalador o copia la carpeta en obs-studio/plugins. Scripts: Herramientas → Scripts."],
            ["03", "Transmite", "Reinicia OBS, agrega la nueva fuente o filtro y sal en vivo. ✨"],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span className="font-mono text-sm text-brand-violet">{n}</span>
              <h3 className="mt-2 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="bg-brand absolute inset-x-6 bottom-0 top-16 -z-10 rounded-[2rem] opacity-80" />
            <div className="absolute -right-4 top-10 -z-10 size-40 rounded-full bg-brand-cyan/30 blur-3xl" />
            <Image
              src="/img/alejo-side.webp"
              alt="Alejo, desarrollador de AlejoxCode"
              width={989}
              height={1200}
              className="w-full rounded-b-[2rem]"
            />
            <Image src="/img/logo.png" alt="" width={72} height={72} className="float absolute -left-4 bottom-8 rounded-2xl bg-ink/80 p-2 backdrop-blur" />
          </div>
          <div>
            <span className="font-mono text-sm text-brand-violet">// sobre mí</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Código, streaming y mucha cafeína.</h2>
            <p className="mt-5 text-muted">
              Soy Alejo, desarrollador detrás de <strong className="text-white">AlejoxCode</strong>. Me apasiona crear
              herramientas que hacen más fácil la vida de los creadores de contenido: plugins nativos para OBS,
              scripts que automatizan escenas, overlays animados y todo lo que se me ocurra entre commit y commit.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-[#0c0717] font-mono text-sm">
              <div className="border-b border-line px-4 py-2 text-xs text-muted">~/alejoxcode — zsh</div>
              <div className="space-y-1 p-4">
                <p><span className="text-brand-cyan">❯</span> whoami</p>
                <p className="text-muted">alejo — dev · creador de plugins OBS · streamer</p>
                <p><span className="text-brand-cyan">❯</span> cat stack.txt</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stack.map((s) => (
                    <span key={s} className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-white">{s}</span>
                  ))}
                </div>
                <p className="pt-1"><span className="text-brand-cyan">❯</span> <span className="rec-dot">▍</span></p>
              </div>
            </div>
            <Socials className="mt-6" />
          </div>
        </div>
      </section>

      {/* BLOG */}
      {posts.length > 0 && (
        <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
          <SectionHead
            kicker="// contenido dev"
            title="Últimos posts"
            action={<Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-brand-cyan hover:underline">Ir al blog <ArrowIcon width={15} /></Link>}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <div className="bg-brand relative overflow-hidden rounded-3xl px-8 py-14 text-center">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">¿Listo para mejorar tu stream?</h2>
          <p className="relative mx-auto mt-3 max-w-lg text-white/80">Todos los plugins en un solo lugar, siempre actualizados.</p>
          <Link href="/obs" className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-semibold transition hover:bg-ink/80">
            <DownloadIcon /> Ir a descargas
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHead({ kicker, title, action }: { kicker: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <span className="font-mono text-sm text-brand-violet">{kicker}</span>
        <h2 className="mt-1 text-3xl font-bold">{title}</h2>
      </div>
      {action}
    </div>
  );
}
