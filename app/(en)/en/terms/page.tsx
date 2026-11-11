import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal } from "@/lib/legal";

const doc = legal.terms.en;

export const metadata: Metadata = {
  title: `${doc.title} — Alejandro Grajales`,
  description: doc.description,
  alternates: { canonical: "/en/terms", languages: { es: "/terminos", en: "/en/terms" } },
};

export default function Page() {
  return <LegalPage locale="en" doc="terms" />;
}
