import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { multichatPath, multichatPrivacy } from "@/lib/multichat";

const doc = multichatPrivacy.en;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: multichatPath.en.privacy, languages: { es: multichatPath.es.privacy, en: multichatPath.en.privacy } },
};

export default function Page() {
  return <LegalPage locale="en" doc="multichatPrivacy" />;
}
