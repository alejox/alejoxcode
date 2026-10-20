// Datos del plugin OBS Now Playing (los textos están en lib/content.ts).

export type Platform = "windows" | "macos" | "linux" | "any";

export const nowPlaying = {
  name: "OBS Now Playing",
  version: "2.4.14",
  repo: "https://github.com/alejox/obs-music-player",
  // Siempre apunta a la última versión publicada.
  releases: "https://github.com/alejox/obs-music-player/releases/latest",
  requirements: "OBS 31+ · macOS 12+ · Windows 10/11",
};
