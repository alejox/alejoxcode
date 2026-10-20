# AlejoxCode

Landing personal de Alejo: plugins, scripts y overlays para OBS + contenido dev.
Stack: **Next.js 16 (App Router) · Tailwind CSS 4 · Vercel**. Sitio 100 % estático: sin base de datos ni variables obligatorias.

## Secciones de la landing

- **Hero** con una ventana estilo OBS (tu foto en el preview) y tarjetas flotantes
- **Categorías**: plugins, scripts, overlays, temas, herramientas
- **Descargas OBS** (`#descargas`): se alimenta de [`lib/downloads.ts`](lib/downloads.ts); si está vacío muestra “Próximamente”
- **Cómo instalar**, **Sobre mí** y CTA final

## Publicar una descarga

Edita [`lib/downloads.ts`](lib/downloads.ts) y agrega un objeto por plugin (hay un ejemplo comentado):

```ts
{
  name: "Scene Autopilot",
  description: "Cambia de escena automáticamente según la ventana activa.",
  category: "plugin",            // plugin | script | overlay | theme | tool
  version: "1.0.0",
  obsMin: "30.0",
  repo: "https://github.com/alejox/scene-autopilot",
  files: [
    { platform: "windows", url: "https://github.com/…/releases/download/v1.0.0/plugin-windows.zip", size: "2.1 MB" },
    { platform: "macos", url: "/downloads/plugin-macos.pkg" },
  ],
}
```

Los archivos pueden estar en **GitHub Releases** (recomendado) o en `public/downloads/` (se sirven como `/downloads/archivo`). Haz commit y push: Vercel redespliega solo.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy en Vercel

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new) (rama `main`; Next.js se detecta solo).
2. Opcional: agrega `NEXT_PUBLIC_SITE_URL` con tu dominio para los metadatos y el sitemap.
3. Deploy.

## Personalizar

- Redes sociales y textos: [`lib/site.ts`](lib/site.ts) (las redes vacías no se muestran)
- Estilo visual "Frosted glass cathedral at midnight" (ref. AuthKit): tokens `@theme` y clases `.glass`, `.btn-primary`, `.btn-ghost`, `.eyebrow` en [`app/globals.css`](app/globals.css). El violeta `#663af3` es el único acento: úsalo solo para la acción principal.
- Imágenes: `public/img/`
