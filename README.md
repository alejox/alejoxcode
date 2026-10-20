# AlejoxCode

Sitio personal de **Alejandro Grajales**: hoja de vida como frontend developer, proyectos personales y, como sección aparte, los plugins para OBS.
Stack: **Next.js 16 (App Router) · Tailwind CSS 4 · Vercel**. Sitio 100 % estático: sin base de datos ni variables obligatorias.

## Secciones

- **Hero** con animación de motion graphics (órbitas con el stack, logo que se dibuja) y roles rotativos
- **Sobre mí**, **Proyectos**, **Herramientas para creadores** y **Experiencia**
- **OBS** (`#obs`): OBS Now Playing con descargas desde GitHub Releases, y Alejox Theme Panel
- **Contacto**

## Editar el contenido

| Qué | Archivo |
| --- | --- |
| Nombre, descripción, correo público y redes | [`lib/site.ts`](lib/site.ts) |
| Roles, stack, datos rápidos, experiencia, proyectos | [`lib/profile.ts`](lib/profile.ts) |
| Plugins de OBS (versión, funciones, descargas) | [`lib/downloads.ts`](lib/downloads.ts) |

Los botones de descarga de OBS Now Playing apuntan a `releases/latest`, así que siempre llevan a la última versión.

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
