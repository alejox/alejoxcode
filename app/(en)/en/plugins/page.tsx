import type { Metadata } from "next";
import { Plugins } from "@/components/Plugins";

// Vuelve a leer el último release de GitHub cada hora.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Plugins — Alejandro Grajales",
  description:
    "Plugins I build and publish independently. Free, open source, with downloads for every platform.",
};

export default function Page() {
  return <Plugins locale="en" />;
}
