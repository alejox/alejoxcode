import type { Locale } from "@/lib/content";
import { legal, legalLabels, legalPath } from "@/lib/legal";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function LegalPage({ locale, doc }: { locale: Locale; doc: "terms" | "privacy" }) {
  const d = legal[doc][locale];
  const other = doc === "terms" ? "privacy" : "terms";
  const l = legalLabels[locale];

  return (
    <>
      <Navbar locale={locale} altHref={legalPath[locale === "es" ? "en" : "es"][doc]} />
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
                  <p key={p.slice(0, 32)} className="mt-3 leading-relaxed text-mist">{p}</p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
            <a href={legalPath[locale][other]} className="text-frost underline decoration-line underline-offset-4 hover:text-white">
              {other === "terms" ? l.terms : l.privacy}
            </a>
          </p>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
