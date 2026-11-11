"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

/**
 * Botón de compra de Lemon Squeezy. lemon.js convierte los enlaces con la clase
 * `lemonsqueezy-button` en un checkout superpuesto; sin JavaScript, el enlace
 * abre el checkout normal.
 */
export function LemonBuyButton({ href, className = "", children }: { href: string; className?: string; children: React.ReactNode }) {
  // Al navegar dentro del sitio el script ya está cargado: hay que volver a enlazar los botones.
  useEffect(() => {
    window.createLemonSqueezy?.();
  }, []);

  return (
    <>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" onLoad={() => window.createLemonSqueezy?.()} />
      <a href={href} className={`lemonsqueezy-button ${className}`}>
        {children}
      </a>
    </>
  );
}
