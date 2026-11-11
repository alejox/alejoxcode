import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal } from "@/lib/legal";

const doc = legal.privacy.en;

export const metadata: Metadata = {
  title: `${doc.title} — Alejandro Grajales`,
  description: doc.description,
  alternates: { canonical: "/en/privacy", languages: { es: "/privacidad", en: "/en/privacy" } },
};

export default function Page() {
  return <LegalPage locale="en" doc="privacy" />;
}
