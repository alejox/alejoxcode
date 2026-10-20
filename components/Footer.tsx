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
            className="grid size-10 place-items-center rounded-xl border border-line bg-panel text-muted transition hover:border-brand-violet hover:text-white"
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
    <footer className="mt-24 border-t border-line/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-muted">{site.description}</p>
          <Socials />
        </div>
        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Sitio</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-brand-cyan" href="/obs">Descargas OBS</Link></li>
            <li><Link className="hover:text-brand-cyan" href="/blog">Blog dev</Link></li>
            <li><Link className="hover:text-brand-cyan" href="/#sobre-mi">Sobre mí</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">OBS</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-brand-cyan" href="/obs?cat=plugin">Plugins</Link></li>
            <li><Link className="hover:text-brand-cyan" href="/obs?cat=script">Scripts</Link></li>
            <li><Link className="hover:text-brand-cyan" href="/obs?cat=overlay">Overlays</Link></li>
            <li><a className="hover:text-brand-cyan" href="https://obsproject.com" target="_blank" rel="noreferrer">obsproject.com ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60 py-5 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {site.name} · hecho con Next.js + Supabase · desplegado en Vercel
      </div>
    </footer>
  );
}
