import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = { title: "404 — Alejandro Grajales" };

export default function GlobalNotFound() {
  return (
    <html lang="es" className={fontVariables}>
      <body className="grid min-h-screen place-items-center overflow-x-hidden px-4">
        <div className="text-center">
          <p className="eyebrow">Página no encontrada · Page not found</p>
          <h1 className="text-gradient glow-text mt-6 text-[96px] leading-none">404</h1>
          <div className="mt-10 flex justify-center gap-3">
            <a href="/" className="btn-ghost btn-lg">Inicio</a>
            <a href="/en" className="btn-ghost btn-lg">Home</a>
          </div>
        </div>
      </body>
    </html>
  );
}
