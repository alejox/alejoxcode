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
      <section className="spotlight relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-20 text-center sm:px-6">
          <p className="eyebrow">obs-studio / plugins</p>
          <h1 className="text-gradient glow-text mt-6 text-[48px] leading-[1.1] sm:text-[72px]">Descargas OBS</h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-mist">
            Plugins nativos, scripts Lua/Python, overlays para Browser Source y temas. Gratis, actualizados y
            listos para tu próximo directo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs">
            <span className="hairline rounded-full px-4 py-2 text-mist">{plugins.length} recursos</span>
            <span className="hairline rounded-full px-4 py-2 text-mist">{formatNumber(downloads)} descargas</span>
            <span className="hairline rounded-full px-4 py-2 text-mist">Windows · macOS · Linux</span>
          </div>
        </div>
      </section>

      <div className="pt-8">
        <DemoBanner />
      </div>

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <DownloadsExplorer plugins={plugins} initialCategory={cat} />
      </section>
    </>
  );
}
