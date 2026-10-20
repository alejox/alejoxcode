import type { Download } from "@/lib/downloads";
import { CATEGORY_LABEL, PLATFORM_LABEL } from "@/lib/downloads";
import { CategoryIcon, DownloadIcon, GithubIcon, PlatformIcon } from "./Icons";

export function DownloadCard({ item }: { item: Download }) {
  return (
    <article className="glass card-hover flex flex-col overflow-hidden">
      <div className="relative grid aspect-[16/8] place-items-center overflow-hidden bg-[radial-gradient(ellipse_70%_90%_at_50%_0%,rgb(152_192_239/0.16),transparent_70%),#070914] shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <span className="icon-tile relative size-16 bg-ink">
          <CategoryIcon category={item.category} width={24} height={24} />
        </span>
        <span className="absolute left-3 top-3 rounded-md bg-panel-2 px-2 py-1 text-[11px] font-medium text-frost">
          {CATEGORY_LABEL[item.category]}
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-panel-2 px-2 py-1 font-mono text-[11px] text-frost">v{item.version}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg text-ice">{item.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
        {item.obsMin && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">OBS {item.obsMin}+</p>
        )}
        <div className="mt-auto space-y-2 pt-5">
          {item.files.map((f, i) => (
            <a
              key={f.url}
              href={f.url}
              className={`${i === 0 ? "btn-primary" : "btn-ghost"} w-full justify-start gap-3 px-5 py-2.5`}
            >
              <PlatformIcon platform={f.platform} width={15} height={15} />
              <span className="flex-1 text-left">{PLATFORM_LABEL[f.platform]}</span>
              {f.size && <span className="font-mono text-xs font-normal text-white/60">{f.size}</span>}
              <DownloadIcon width={15} height={15} />
            </a>
          ))}
          {item.repo && (
            <a href={item.repo} target="_blank" rel="noreferrer" className="btn-ghost w-full gap-2 bg-transparent py-2.5 text-mist">
              <GithubIcon width={15} height={15} /> Código fuente
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
