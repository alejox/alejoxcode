import type { Locale } from "@/lib/content";
import { legalPath } from "@/lib/legal";
import { MULTICHAT_RELEASES, MULTICHAT_REPO, multichatHome, multichatPath } from "@/lib/multichat";
import { site } from "@/lib/site";
import { Footer } from "./Footer";
import { DownloadIcon, GithubIcon } from "./Icons";
import { linkify } from "./LegalPage";
import { Navbar } from "./Navbar";
import { PluginShowcase } from "./PluginShowcase";

// Página principal de AC Multichat (la que figura en la pantalla de consentimiento de Google).
export function MultichatHome({ locale }: { locale: Locale }) {
  const t = multichatHome[locale];
  const other = locale === "es" ? "en" : "es";
  const link = "text-frost underline decoration-line underline-offset-4 hover:text-white";

  return (
    <>
      <Navbar locale={locale} altHref={multichatPath[other].home} />
      <main>
        <article className="mx-auto max-w-4xl px-4 pb-8 pt-16 sm:px-6 lg:pt-24">
          <p className="eyebrow eyebrow-left">{t.eyebrow}</p>
          <h1 className="text-gradient mt-5 text-[40px] leading-[1.1] sm:text-[56px]">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-[18px] leading-relaxed text-mist">{t.lead}</p>
          <p className="mt-3 text-sm text-muted">{t.by}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={MULTICHAT_RELEASES} target="_blank" rel="noreferrer" className="btn-primary gap-2 px-6 py-3">
              <DownloadIcon width={15} height={15} />
              {t.download}
            </a>
            <a href={MULTICHAT_REPO} target="_blank" rel="noreferrer" className="btn-ghost gap-2 px-6 py-3">
              <GithubIcon width={15} height={15} />
              {t.source}
            </a>
            <a href={multichatPath[locale].privacy} className="btn-ghost px-6 py-3">{t.privacyCta}</a>
          </div>

          <div className="glass-deep mt-12 overflow-hidden">
            <PluginShowcase slug="multi-chat" locale={locale} />
          </div>

          <section className="mt-14">
            <h2 className="text-2xl">{t.featuresTitle}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {t.features.map((f) => (
                <div key={f.title} className="glass p-5">
                  <h3 className="text-[17px] text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="google" className="mt-14">
            <h2 className="text-2xl">{t.googleTitle}</h2>
            {t.google.map((p) => (
              <p key={p.slice(0, 32)} className="mt-3 leading-relaxed break-words text-mist">{linkify(p)}</p>
            ))}
            <p className="mt-4">
              <a href={multichatPath[locale].privacy} className={link}>{t.privacyCta}</a>
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl">{t.contactTitle}</h2>
            <p className="mt-3 leading-relaxed text-mist">
              {t.contact.split(site.email)[0]}
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
              {t.contact.split(site.email)[1]}
            </p>
          </section>

          <p className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted">
            <a href={multichatPath[locale].privacy} className={link}>{t.privacyCta}</a>
            <a href={legalPath[locale].terms} className={link}>{t.termsCta}</a>
          </p>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
