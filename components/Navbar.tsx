"use client";

import Link from "next/link";
import { useState } from "react";
import { content, localePath, type Locale } from "@/lib/content";
import { GlobeIcon } from "./Icons";
import { Logo } from "./Logo";

const sections = ["about", "projects", "experience", "obs", "contact"] as const;

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = content[locale];
  const home = localePath[locale];
  const other: Locale = locale === "es" ? "en" : "es";
  const links = sections.map((s) => ({ href: `${home === "/" ? "" : home}#${s}`, label: t.nav[s] }));

  const LangSwitch = ({ className = "" }: { className?: string }) => (
    <a href={localePath[other]} hrefLang={other} className={`btn-ghost gap-2 px-3.5 py-2 ${className}`} aria-label={t.langLabel}>
      <GlobeIcon width={15} height={15} />
      <span className="font-mono text-xs uppercase tracking-[0.1em]">{locale === "es" ? "ES" : "EN"}</span>
      <span className="text-muted">/</span>
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{other}</span>
    </a>
  );

  return (
    <header className="sticky top-0 z-50 bg-ink/60 shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={home} onClick={() => setOpen(false)}>
          <Logo size={32} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-sm text-mist transition hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <button
            className="rounded-full p-2 text-mist hover:text-white lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="px-4 py-3 shadow-[inset_0_1px_0_rgb(186_215_247/0.08)] lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-full px-4 py-2.5 text-mist">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
