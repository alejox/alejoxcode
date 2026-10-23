// Datos técnicos de los plugins (los textos están en lib/content.ts).
// Para publicar un plugin nuevo: agrega su meta aquí y su ficha en content.ts.

export type Platform = "windows" | "macos" | "linux" | "any";

export type PluginMeta = {
  version: string;
  repo: string;
  // Siempre apunta a la última versión publicada.
  releases: string;
  requirements: string;
};

export const pluginMeta: Record<string, PluginMeta> = {
  "obs-now-playing": {
    version: "2.4.14",
    repo: "https://github.com/alejox/obs-music-player",
    releases: "https://github.com/alejox/obs-music-player/releases/latest",
    requirements: "OBS 31+ · macOS 12+ · Windows 10/11",
  },
};
