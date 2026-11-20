import type { Metadata } from "next";
import { MultichatHome } from "@/components/MultichatHome";
import { multichatHome, multichatPath } from "@/lib/multichat";

const t = multichatHome.es;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: multichatPath.es.home, languages: { es: multichatPath.es.home, en: multichatPath.en.home } },
};

export default function Page() {
  return <MultichatHome locale="es" />;
}
