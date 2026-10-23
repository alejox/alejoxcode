import { content, localePath, type Locale } from "@/lib/content";
import { nowPlaying } from "@/lib/downloads";
import { site } from "@/lib/site";
import { SOCIAL_ICONS } from "./Icons";
import { Logo } from "./Logo";

export function Socials({ className = "" }: { className?: string }) {
  const entries = Object.entries(site.socials).filter(([, url]) => url);
  return (
    <div className={`flex gap-2 ${className}`}>
      {entries.map(([key, url]) => {
        const Icon = SOCIAL_ICONS[key];
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={key}
            className="icon-tile size-10 transition hover:text-white"
          >
            {Icon && <Icon />}
          </a>
        );
      })}
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = content[locale];
  const base = localePath[locale] === "/" ? "" : localePath[locale];
  return (
    <footer className="mt-30 shadow-[inset_0_1px_0_rgb(186_215_247/0.08)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-muted">{t.meta.description}</p>
          <Socials />
        </div>
        <div className="md:col-start-3">
          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">{t.footer.site}</h4>
          <ul className="space-y-2 text-sm">
            {(["projects", "experience", "obs", "contact"] as const).map((k) =>
              k === "obs" ? (
                <li key={k}>
                  <a className="text-mist hover:text-white" href={nowPlaying.repo} target="_blank" rel="noreferrer">
                    {t.nav[k]}
                  </a>
                </li>
              ) : (
                <li key={k}><a className="text-mist hover:text-white" href={`${base}#${k}`}>{t.nav[k]}</a></li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className="py-6 text-center font-mono text-xs text-muted shadow-[inset_0_1px_0_rgb(186_215_247/0.06)]">
        © {new Date().getFullYear()} {site.author} · {site.name} · {t.footer.built}
      </div>
    </footer>
  );
}
