// Contenido de ejemplo que se muestra mientras Supabase no está configurado.
import type { Plugin, Post, Release } from "./types";

const d = (days: number) => new Date(Date.now() - days * 864e5).toISOString();

function rel(
  plugin_id: string,
  version: string,
  platform: Release["platform"],
  downloads: number,
  days: number,
  extra: Partial<Release> = {}
): Release {
  return {
    id: `${plugin_id}-${version}-${platform}`,
    plugin_id,
    version,
    platform,
    file_url: "#",
    file_name: `${plugin_id}-${version}-${platform}.zip`,
    file_size: 1_800_000 + downloads * 37,
    obs_min_version: "30.0",
    changelog: null,
    downloads,
    created_at: d(days),
    ...extra,
  };
}

export const demoPlugins: Plugin[] = [
  {
    id: "chat-overlay",
    slug: "chat-overlay",
    name: "Neon Chat Overlay",
    tagline: "Chat de Twitch/YouTube animado con estilo neón para tus escenas.",
    description: `Un overlay de chat **ligero** que se agrega como *Browser Source* y combina mensajes de Twitch y YouTube en una sola caja.

### Características
- Animaciones de entrada personalizables
- Emotes de 7TV, BTTV y FFZ
- Tema claro / oscuro / neón
- Filtro de bots y palabras

> Ejemplo de contenido: crea tus propios plugins desde **/admin**.`,
    category: "overlay",
    tags: ["chat", "twitch", "youtube"],
    cover_url: null,
    repo_url: "https://github.com/alejox",
    featured: true,
    published: true,
    created_at: d(120),
    updated_at: d(4),
    releases: [
      rel("chat-overlay", "2.1.0", "any", 3120, 4, {
        changelog: "- Soporte para emotes de 7TV\n- Nuevo tema *Synthwave*",
      }),
      rel("chat-overlay", "2.0.0", "any", 1840, 40),
    ],
  },
  {
    id: "scene-autopilot",
    slug: "scene-autopilot",
    name: "Scene Autopilot",
    tagline: "Cambia de escena automáticamente según la ventana activa o el audio.",
    description: `Plugin nativo para OBS que detecta la **ventana activa**, niveles de micrófono o reglas por horario y cambia de escena sin que toques nada.

### Ideal para
- Streams de programación (cambia a la escena del IDE automáticamente)
- Podcasts con varias cámaras
- Escenas "Vuelvo enseguida" cuando estás AFK`,
    category: "plugin",
    tags: ["escenas", "automatización"],
    cover_url: null,
    repo_url: "https://github.com/alejox",
    featured: true,
    published: true,
    created_at: d(200),
    updated_at: d(10),
    releases: [
      rel("scene-autopilot", "1.4.2", "windows", 5420, 10, {
        changelog: "- Corrige un crash al cerrar OBS\n- Reglas por proceso",
      }),
      rel("scene-autopilot", "1.4.2", "macos", 1310, 10),
      rel("scene-autopilot", "1.4.2", "linux", 860, 10),
      rel("scene-autopilot", "1.3.0", "windows", 2900, 70),
    ],
  },
  {
    id: "lower-thirds",
    slug: "lower-thirds",
    name: "Dev Lower Thirds",
    tagline: "Pack de lower thirds animados con controles desde un dock.",
    description:
      "Lower thirds en HTML/CSS controlados desde un **dock personalizado** de OBS. Cambia nombre, título y color en vivo.",
    category: "overlay",
    tags: ["gráficos", "dock"],
    cover_url: null,
    repo_url: null,
    featured: false,
    published: true,
    created_at: d(60),
    updated_at: d(20),
    releases: [rel("lower-thirds", "1.0.3", "any", 980, 20)],
  },
  {
    id: "obs-timer",
    slug: "obs-timer",
    name: "Pomodoro Timer",
    tagline: "Script Lua con temporizador pomodoro para streams de estudio/código.",
    description:
      "Script **Lua** que actualiza una fuente de texto con un temporizador Pomodoro y cambia de escena en los descansos.",
    category: "script",
    tags: ["lua", "timer", "productividad"],
    cover_url: null,
    repo_url: "https://github.com/alejox",
    featured: false,
    published: true,
    created_at: d(30),
    updated_at: d(30),
    releases: [rel("obs-timer", "0.9.0", "any", 640, 30)],
  },
  {
    id: "purple-theme",
    slug: "purple-theme",
    name: "Alejox Purple Theme",
    tagline: "Tema oscuro morado/azul para la interfaz de OBS Studio.",
    description: "Tema `.obt` para OBS 30+ con los colores de AlejoxCode.",
    category: "theme",
    tags: ["tema", "ui"],
    cover_url: null,
    repo_url: null,
    featured: false,
    published: true,
    created_at: d(15),
    updated_at: d(15),
    releases: [rel("purple-theme", "1.0.0", "any", 410, 15)],
  },
];

export const demoPosts: Post[] = [
  {
    id: "p1",
    slug: "como-crear-un-plugin-de-obs",
    title: "Cómo crear tu primer plugin de OBS en C++",
    excerpt: "De cero a un filtro de video funcionando: CMake, obs-plugintemplate y debugging.",
    content: `Crear un plugin para OBS es más fácil de lo que parece.

## 1. Clona la plantilla oficial

\`\`\`bash
git clone https://github.com/obsproject/obs-plugintemplate mi-plugin
\`\`\`

## 2. Compila

Usa los *presets* de CMake incluidos para tu sistema operativo.

> Este es un post de ejemplo. Publica los tuyos desde **/admin**.`,
    cover_url: null,
    tags: ["obs", "c++", "tutorial"],
    published: true,
    published_at: d(6),
  },
  {
    id: "p2",
    slug: "overlays-con-browser-source",
    title: "Overlays modernos con Browser Source y CSS",
    excerpt: "Animaciones fluidas, transparencias y WebSockets para controlar tus overlays.",
    content: "Contenido de ejemplo sobre *Browser Source*.",
    cover_url: null,
    tags: ["css", "overlays"],
    published: true,
    published_at: d(18),
  },
  {
    id: "p3",
    slug: "automatiza-obs-con-websocket",
    title: "Automatiza OBS con obs-websocket y Node.js",
    excerpt: "Controla escenas, fuentes y grabación desde código.",
    content: "Contenido de ejemplo sobre *obs-websocket*.",
    cover_url: null,
    tags: ["node", "websocket"],
    published: true,
    published_at: d(33),
  },
];
