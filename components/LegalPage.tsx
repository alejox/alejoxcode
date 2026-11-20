import type { Locale } from "@/lib/content";
import { legal, legalLabels, legalPath, type LegalDoc } from "@/lib/legal";
import { multichatHome, multichatPath, multichatPrivacy } from "@/lib/multichat";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

// Las URL del texto (https://…) se muestran como enlaces; el punto o paréntesis final no es parte del enlace.
export function linkify(text: string) {
  return text.split(/(https:\/\/[^\s)]+)/g).map((part, i) => {
    if (i % 2 === 0) return part;
    const url = part.replace(/[.,;:]+$/, "");
    const rest = part.slice(url.length);
    return (
      <span key={i}>
        <a href={url} target="_blank" rel="noreferrer" className="text-frost underline decoration-line underline-offset-4 hover:text-white">
          {url}
        </a>
        {rest}
      </span>
    );
  });
}

type DocKey = "terms" | "privacy" | "multichatPrivacy";

export function LegalPage({ locale, doc }: { locale: Locale; doc: DocKey }) {
  const otherLocale = locale === "es" ? "en" : "es";
  const l = legalLabels[locale];
  const d: LegalDoc = doc === "multichatPrivacy" ? multichatPrivacy[locale] : legal[doc][locale];
  const altHref = doc === "multichatPrivacy" ? multichatPath[otherLocale].privacy : legalPath[otherLocale][doc];
  // Enlaces al pie: los otros documentos que aplican.
  const links =
    doc === "multichatPrivacy"
      ? [
          { href: multichatPath[locale].home, label: multichatHome[locale].title },
          { href: legalPath[locale].terms, label: l.terms },
        ]
      : [{ href: legalPath[locale][doc === "terms" ? "privacy" : "terms"], label: doc === "terms" ? l.privacy : l.terms }];

  return (
    <>
      <Navbar locale={locale} altHref={altHref} />
      <main>
        <article className="mx-auto max-w-3xl px-4 pb-8 pt-16 sm:px-6 lg:pt-24">
          <p className="eyebrow eyebrow-left">{l.title}</p>
          <h1 className="text-gradient mt-5 text-[36px] leading-[1.16] sm:text-[48px]">{d.title}</h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{d.updated}</p>
          <p className="mt-8 text-[17px] leading-relaxed text-mist">{d.intro}</p>

          <div className="mt-10 space-y-8">
            {d.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="mt-3 leading-relaxed break-words text-mist">{linkify(p)}</p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted">
            {links.map((k) => (
              <a key={k.href} href={k.href} className="text-frost underline decoration-line underline-offset-4 hover:text-white">
                {k.label}
              </a>
            ))}
          </p>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
