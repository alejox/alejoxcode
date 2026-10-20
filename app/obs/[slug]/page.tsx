import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner } from "@/components/DemoBanner";
import { DownloadIcon, GithubIcon, PlatformIcon } from "@/components/Icons";
import { PluginCover } from "@/components/PluginCard";
import { getPlugin } from "@/lib/data";
import type { Category } from "@/lib/types";
import { CATEGORY_LABEL, PLATFORM_LABEL } from "@/lib/types";
import { formatBytes, formatDate, formatNumber, groupByVersion, renderMarkdown, totalDownloads } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plugin = await getPlugin((await params).slug);
  if (!plugin) return { title: "No encontrado" };
  return {
    title: `${plugin.name} — Descarga para OBS`,
    description: plugin.tagline ?? undefined,
    openGraph: plugin.cover_url ? { images: [plugin.cover_url] } : undefined,
  };
}

const INSTALL: Record<Category, string[]> = {
  plugin: [
    "Cierra OBS Studio.",
    "Windows: ejecuta el instalador o extrae el .zip en C:\\Program Files\\obs-studio\\.",
    "macOS: abre el .pkg, o copia el .plugin en ~/Library/Application Support/obs-studio/plugins/.",
    "Linux: instala el .deb, o extrae en ~/.config/obs-studio/plugins/.",
    "Abre OBS: el plugin aparece como nueva fuente, filtro o en el menú Herramientas.",
  ],
  script: [
    "Descarga y extrae el archivo en una carpeta fija (p. ej. Documentos/obs-scripts).",
    "En OBS ve a Herramientas → Scripts.",
    "Pulsa + y selecciona el archivo .lua o .py.",
    "Configura las opciones del script en el panel derecho.",
  ],
  overlay: [
    "Extrae el .zip en una carpeta fija.",
    "En tu escena agrega una fuente Navegador (Browser Source).",
    "Marca “Archivo local” y elige el index.html del overlay, o pega la URL indicada.",
    "Ajusta ancho/alto (recomendado 1920×1080) y listo.",
  ],
  theme: [
    "Extrae el archivo del tema.",
    "Cópialo en la carpeta themes de OBS (Ayuda → Mostrar carpeta de configuración → themes).",
    "Reinicia OBS y selecciónalo en Ajustes → Apariencia.",
  ],
  tool: ["Descarga el archivo para tu sistema.", "Sigue las instrucciones del README incluido."],
};

export default async function PluginPage({ params }: Props) {
  const plugin = await getPlugin((await params).slug);
  if (!plugin) notFound();

  const versions = groupByVersion(plugin.releases);
  const latest = versions[0];

  return (
    <article>
      <section className="spotlight relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-10 sm:px-6">
          <nav className="mb-10 font-mono text-xs uppercase tracking-[0.1em] text-muted">
            <Link href="/obs" className="hover:text-white">descargas-obs</Link> / <span className="text-white">{plugin.slug}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-panel-2 px-2 py-1 text-xs font-medium text-frost">
                  {CATEGORY_LABEL[plugin.category]}
                </span>
                {plugin.tags.map((t) => (
                  <span key={t} className="hairline rounded-md px-2 py-1 text-xs text-mist">{t}</span>
                ))}
              </div>
              <h1 className="text-gradient mt-5 text-[40px] leading-[1.14] sm:text-[48px]">{plugin.name}</h1>
              <p className="mt-4 text-[17px] leading-relaxed text-mist">{plugin.tagline}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 font-mono text-xs">
                <Stat label="versión" value={latest ? `v${latest.version}` : "—"} />
                <Stat label="descargas" value={formatNumber(totalDownloads(plugin))} />
                <Stat label="obs mínimo" value={latest?.files[0]?.obs_min_version ?? "—"} />
              </dl>
              {plugin.repo_url && (
                <a
                  href={plugin.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost mt-6"
                >
                  <GithubIcon /> Código fuente
                </a>
              )}
            </div>

            {/* Caja de descarga */}
            <div className="glass-deep h-fit overflow-hidden">
              <div className="aspect-[16/8]">
                <PluginCover plugin={plugin} />
              </div>
              <div className="p-6">
                {latest ? (
                  <>
                    <div className="mb-4 flex items-baseline justify-between">
                      <h2 className="text-lg">Descargar v{latest.version}</h2>
                      <span className="font-mono text-xs text-muted">{formatDate(latest.date)}</span>
                    </div>
                    <div className="space-y-2">
                      {latest.files.map((f, i) => (
                        <a
                          key={f.id}
                          href={`/api/download/${f.id}`}
                          className={`${i === 0 ? "btn-primary" : "btn-ghost"} w-full justify-start gap-3 px-5 py-3`}
                        >
                          <PlatformIcon platform={f.platform} />
                          <span className="flex-1">{PLATFORM_LABEL[f.platform]}</span>
                          <span className="font-mono text-xs font-normal text-white/60">{formatBytes(f.file_size)}</span>
                          <DownloadIcon />
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted">Aún no hay archivos publicados.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-8">
        <DemoBanner />
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-10">
          {plugin.description && (
            <section>
              <h2 className="eyebrow eyebrow-left mb-6">Descripción</h2>
              <div className="prose-dev" dangerouslySetInnerHTML={{ __html: renderMarkdown(plugin.description) }} />
            </section>
          )}

          <section>
            <h2 className="eyebrow eyebrow-left mb-6">Instalación</h2>
            <ol className="space-y-3">
              {INSTALL[plugin.category].map((step, i) => (
                <li key={i} className="glass flex gap-4 p-4 text-sm">
                  <span className="icon-tile size-8 shrink-0 font-mono text-xs">{i + 1}</span>
                  <span className="pt-1.5 leading-relaxed text-mist">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside>
          <h2 className="eyebrow eyebrow-left mb-6">Historial de versiones</h2>
          <ol className="relative space-y-8 border-l border-line pl-6">
            {versions.map((v, i) => (
              <li key={v.version} className="relative">
                <span className={`absolute -left-[31px] top-1 size-3 rounded-full ring-4 ring-ink ${i === 0 ? "bg-ice shadow-[0_0_12px_rgb(186_207_247/0.6)]" : "bg-steel"}`} />
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-mono text-[15px] text-ice">
                    v{v.version} {i === 0 && <span className="ml-1 rounded-md bg-panel-2 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-frost">latest</span>}
                  </h3>
                  <span className="font-mono text-xs text-muted">{formatDate(v.date)}</span>
                </div>
                {v.files.find((f) => f.changelog)?.changelog && (
                  <div
                    className="prose-dev mt-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(v.files.find((f) => f.changelog)!.changelog) }}
                  />
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.files.map((f) => (
                    <a
                      key={f.id}
                      href={`/api/download/${f.id}`}
                      className="btn-ghost gap-1.5 px-3 py-1.5 text-xs"
                    >
                      <PlatformIcon platform={f.platform} width={13} height={13} />
                      {PLATFORM_LABEL[f.platform]}
                      <span className="opacity-60">· {formatNumber(f.downloads)}↓</span>
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass px-4 py-3">
      <dt className="uppercase tracking-[0.1em] text-muted">{label}</dt>
      <dd className="mt-1 font-display text-lg font-medium text-ice">{value}</dd>
    </div>
  );
}
