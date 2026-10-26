# AlejoxCode

Sitio personal de **Alejandro Grajales**, Frontend Developer en Linktic: hoja de vida, proyectos y, como sección aparte, su plugin para OBS. Disponible en español (`/`) e inglés (`/en`).
Stack: **Next.js 16 (App Router) · Tailwind CSS 4 · Vercel**. Sitio 100 % estático: sin base de datos ni variables obligatorias.

## Secciones

- **Hero** con animación de motion graphics (órbitas con el stack, logo que se dibuja) y roles rotativos
- **Sobre mí**, **Proyectos destacados** (Ventex, Cotejo, Devtecia, ENSAMA) y **Experiencia**
- **Plugins** (`/plugins` y `/en/plugins`): página aparte con Music Now Playing y descargas por plataforma
- **Contacto**

## Editar el contenido

| Qué | Archivo |
| --- | --- |
| Todos los textos en español e inglés (perfil, proyectos, experiencia, OBS) | [`lib/content.ts`](lib/content.ts) |
| Correo público, LinkedIn y redes | [`lib/site.ts`](lib/site.ts) |
| Versión y descargas de los plugins | [`lib/downloads.ts`](lib/downloads.ts) |


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
