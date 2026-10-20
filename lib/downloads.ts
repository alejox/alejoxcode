// Plugins para OBS que aparecen en la sección "OBS".

export type Platform = "windows" | "macos" | "linux" | "any";

export interface ObsDownload {
  label: string;
  hint: string;
  platform: Platform;
  url: string;
}

const LATEST = "https://github.com/alejox/obs-music-player/releases/latest";

export const nowPlaying = {
  name: "OBS Now Playing",
  version: "2.4.14",
  tagline: "Muestra en tu stream la canción que estás escuchando, con su carátula, sus colores y botones para controlarla.",
  players: "Spotify, YouTube Music, Apple Music y cualquier reproductor que reconozca tu sistema. Sin cuentas ni API keys.",
  repo: "https://github.com/alejox/obs-music-player",
  releases: LATEST,
  requirements: "OBS 31+ · macOS 12+ · Windows 10/11",
  features: [
    { title: "Colores de la carátula", text: "La tarjeta toma los colores de cada canción con una transición suave." },
    { title: "Sólida o glass", text: "Tarjeta sólida o translúcida, tema claro u oscuro, horizontal o vertical." },
    { title: "Modo video", text: "Con YouTube Music muestra el videoclip en lugar de la carátula, sincronizado." },
    { title: "Dock de control", text: "Anterior, pausa, siguiente y búsqueda de canciones dentro de OBS." },
    { title: "Canal de música", text: "Un clic agrega al mezclador un canal solo con el audio del reproductor." },
    { title: "Actualizaciones", text: "OBS te avisa cuando hay versión nueva y la instala por ti." },
  ],
  downloads: [
    { label: "Windows", hint: "Instalador .exe (app + plugin)", platform: "windows", url: LATEST },
    { label: "macOS · Apple Silicon", hint: "App .zip", platform: "macos", url: LATEST },
    { label: "macOS · Intel", hint: "App .zip", platform: "macos", url: LATEST },
  ] satisfies ObsDownload[],
};

export const themePanel = {
  name: "Alejox Theme Panel",
  tagline: "Plugin nativo (C++/Qt) que agrega Herramientas → Alejox Theme: elige colores de marca, radio de botones y tipografía, previsualiza en caliente y exporta un tema .ovt instalable.",
  platform: "macOS · compilar desde el código",
  repo: "https://github.com/alejox/theme-edit-obs",
};
