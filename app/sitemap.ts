import type { MetadataRoute } from "next";
import { legalPath } from "@/lib/legal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: `${site.url}/`, en: `${site.url}/en` };
  const pluginsLanguages = { es: `${site.url}/plugins`, en: `${site.url}/en/plugins` };
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${site.url}/en`, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    { url: `${site.url}/plugins`, changeFrequency: "monthly", priority: 0.8, alternates: { languages: pluginsLanguages } },
    { url: `${site.url}/en/plugins`, changeFrequency: "monthly", priority: 0.8, alternates: { languages: pluginsLanguages } },
    ...(["terms", "privacy"] as const).flatMap((doc) => {
      const languages = { es: `${site.url}${legalPath.es[doc]}`, en: `${site.url}${legalPath.en[doc]}` };
      return [
        { url: languages.es, changeFrequency: "yearly" as const, priority: 0.3, alternates: { languages } },
        { url: languages.en, changeFrequency: "yearly" as const, priority: 0.3, alternates: { languages } },
      ];
    }),
  ];
}
