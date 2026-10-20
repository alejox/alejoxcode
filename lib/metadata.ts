import type { Metadata } from "next";
import { content, localePath, type Locale } from "./content";
import { site } from "./site";

export function rootMetadata(locale: Locale): Metadata {
  const t = content[locale].meta;
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    icons: { icon: "/icon.png", apple: "/icon.png" },
    alternates: { canonical: localePath[locale], languages: { es: localePath.es, en: localePath.en } },
    openGraph: {
      title: t.title,
      description: t.description,
      images: ["/img/avatar.webp"],
      type: "profile",
      locale: locale === "es" ? "es_CO" : "en_US",
    },
  };
}
