"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/obs", label: "Descargas OBS" },
  { href: "/blog", label: "Blog dev" },
  { href: "/#sobre-mi", label: "Sobre mí" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo size={32} />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  isActive(l.href) ? "bg-panel-2 text-white" : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/obs"
          className="bg-brand hidden rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-purple/30 transition hover:brightness-110 md:inline-flex"
        >
          Descargar plugins
        </Link>

        <button
          className="rounded-lg p-2 text-muted hover:text-white md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="border-t border-line/60 px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 ${isActive(l.href) ? "bg-panel-2 text-white" : "text-muted"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
