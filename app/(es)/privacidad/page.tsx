import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal } from "@/lib/legal";

const doc = legal.privacy.es;

export const metadata: Metadata = {
  title: `${doc.title} — Alejandro Grajales`,
  description: doc.description,
  alternates: { canonical: "/privacidad", languages: { es: "/privacidad", en: "/en/privacy" } },
};

export default function Page() {
  return <LegalPage locale="es" doc="privacy" />;
}
