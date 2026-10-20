import type { Metadata } from "next";
import { DemoBanner } from "@/components/DemoBanner";
import { DownloadsExplorer } from "@/components/DownloadsExplorer";
import { getPlugins } from "@/lib/data";
import { formatNumber, totalDownloads } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Descargas OBS",
  description: "Descarga plugins, scripts, overlays y temas para OBS Studio creados por AlejoxCode.",
};

export default async function ObsDownloads({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const [{ cat }, plugins] = await Promise.all([searchParams, getPlugins()]);
  const downloads = plugins.reduce((a, p) => a + totalDownloads(p), 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 font-mono text-xs text-muted">
            <span className="size-2 rounded-full bg-[#3ddc84]" /> obs-studio/plugins
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Descargas <span className="text-gradient">OBS</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Plugins nativos, scripts Lua/Python, overlays para Browser Source y temas. Gratis, actualizados y
            listos para tu próximo directo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
            <span className="rounded-lg border border-line bg-panel px-3 py-2">{plugins.length} recursos</span>
            <span className="rounded-lg border border-line bg-panel px-3 py-2">{formatNumber(downloads)} descargas</span>
            <span className="rounded-lg border border-line bg-panel px-3 py-2">Windows · macOS · Linux</span>
          </div>
        </div>
      </section>

      <div className="pt-8">
        <DemoBanner />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <DownloadsExplorer plugins={plugins} initialCategory={cat} />
      </section>
    </>
  );
}
