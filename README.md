# AlejoxCode

Sitio personal de Alejo: **descargas de plugins para OBS** + blog de contenido dev.
Stack: **Next.js 16 (App Router) · Tailwind CSS 4 · Supabase (Postgres + Storage + Auth) · Vercel**.

## Secciones

| Ruta | Qué es |
| --- | --- |
| `/` | Landing con hero tipo ventana de OBS, descargas destacadas, sobre mí y últimos posts |
| `/obs` | **Descargas OBS**: buscador, filtros por categoría (plugins, scripts, overlays, temas, herramientas) y sistema operativo, orden por popularidad / fecha, vista cuadrícula o lista |
| `/obs/[slug]` | Ficha del plugin: descarga por plataforma, guía de instalación, historial de versiones con changelog |
| `/blog`, `/blog/[slug]` | Posts en Markdown |
| `/admin` | Panel privado para crear plugins, **subir archivos de cada versión** y escribir posts |
| `/api/download/[id]` | Cuenta la descarga y redirige al archivo |

Sin variables de entorno el sitio funciona en **modo demo** con contenido de ejemplo.

## 1. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. **SQL Editor → New query**: pega y ejecuta [`supabase/schema.sql`](supabase/schema.sql).
   Crea las tablas, las políticas RLS, el contador de descargas y los buckets `plugins` y `media`.
3. **Authentication → Users → Add user**: crea tu usuario con email y contraseña.
4. Hazlo admin (en el SQL Editor):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'tu-correo@ejemplo.com';
   ```
5. Copia de **Project Settings → API** la `Project URL` y la `anon public key`.

> Límite de subida: el plan Free de Supabase permite archivos de hasta 50 MB. Para instaladores más grandes usa la opción “URL externa” (p. ej. GitHub Releases).

## 2. Desarrollo local

```bash
cp .env.example .env.local   # rellena las claves
npm install
npm run dev                  # http://localhost:3000
```

## 3. Deploy en Vercel

1. Importa este repositorio en [vercel.com/new](https://vercel.com/new) (detecta Next.js automáticamente).
2. En **Environment Variables** agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (tu dominio, p. ej. `https://alejoxcode.vercel.app`)
3. Deploy. Entra a `/admin`, inicia sesión y publica tu primer plugin.

Las páginas se regeneran cada 60 s, así que lo que publiques aparece en ~1 minuto.

## Publicar un plugin

1. `/admin` → **Plugins** → crea el recurso (nombre, categoría, portada, descripción en Markdown).
2. **Subir versión** → elige el plugin, versión, plataforma (Windows / macOS / Linux / Multiplataforma), sube el archivo y el changelog.
   Repite por cada plataforma de la misma versión.

## Personalizar

- Redes sociales y textos: [`lib/site.ts`](lib/site.ts)
- Colores (morado/azul del logo): tokens `@theme` en [`app/globals.css`](app/globals.css)
- Imágenes: `public/img/`
