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

### Actualizar la página de plugins al publicar un release

La página `/plugins` lee el último release de cada plugin en GitHub y se regenera sola cada hora. Para que se actualice al instante:

1. En Vercel: **Project → Settings → Git → Deploy Hooks**, crea un hook (nombre `release`, rama `main`) y copia la URL.
2. En cada repo de plugin (`music-now-playing`, `multi-chat`): **Settings → Secrets and variables → Actions → New repository secret**, nombre `VERCEL_DEPLOY_HOOK`, valor la URL del paso 1.
3. Al final del job que publica la Release, añade:

```yaml
      - name: Actualizar alejoxcode
        env:
          VERCEL_DEPLOY_HOOK: ${{ secrets.VERCEL_DEPLOY_HOOK }}
        run: |
          [ -n "$VERCEL_DEPLOY_HOOK" ] || { echo "Sin VERCEL_DEPLOY_HOOK: se omite"; exit 0; }
          curl -fsS -X POST "$VERCEL_DEPLOY_HOOK"
```

Opcional: agrega `GITHUB_TOKEN` (token de solo lectura) en las variables de Vercel para no depender del límite de 60 consultas/hora de la API de GitHub.

## Personalizar

- Redes sociales y textos: [`lib/site.ts`](lib/site.ts) (las redes vacías no se muestran)
- Estilo visual "Frosted glass cathedral at midnight" (ref. AuthKit): tokens `@theme` y clases `.glass`, `.btn-primary`, `.btn-ghost`, `.eyebrow` en [`app/globals.css`](app/globals.css). El violeta `#663af3` es el único acento: úsalo solo para la acción principal.
- Imágenes: `public/img/`
