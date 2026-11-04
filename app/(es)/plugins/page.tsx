import type { Metadata } from "next";
import { Plugins } from "@/components/Plugins";

// Vuelve a leer el último release de GitHub cada hora.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Plugins — Alejandro Grajales",
  description:
    "Plugins que desarrollo y publico de forma independiente. Gratuitos, de código abierto y con descargas para cada sistema.",
};

export default function Page() {
  return <Plugins locale="es" />;
}
