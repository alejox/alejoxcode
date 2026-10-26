import type { Metadata } from "next";
import { Plugins } from "@/components/Plugins";

export const metadata: Metadata = {
  title: "Plugins — Alejandro Grajales",
  description:
    "Plugins que desarrollo y publico de forma independiente. Gratuitos, de código abierto y con descargas para cada sistema.",
};

export default function Page() {
  return <Plugins locale="es" />;
}
