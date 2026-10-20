import Link from "next/link";
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

export function Footer() {
  return (
    <footer className="mt-30 shadow-[inset_0_1px_0_rgb(186_215_247/0.08)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-muted">{site.description}</p>
          <Socials />
        </div>
        <div className="md:col-start-3">
          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">Sitio</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="text-mist hover:text-white" href="/#descargas">Descargas OBS</Link></li>
            <li><Link className="text-mist hover:text-white" href="/#sobre-mi">Sobre mí</Link></li>
            <li><a className="text-mist hover:text-white" href="https://obsproject.com" target="_blank" rel="noreferrer">obsproject.com ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="py-6 shadow-[inset_0_1px_0_rgb(186_215_247/0.06)] text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {site.name} · hecho con Next.js · desplegado en Vercel
      </div>
    </footer>
  );
}
