// Descargas OBS que se muestran en la landing.
// Agrega un objeto por plugin. Los enlaces pueden apuntar a GitHub Releases,
// a un archivo en /public/downloads/ (p. ej. "/downloads/mi-plugin-1.0.0.zip") o a cualquier URL.
// Mientras la lista esté vacía, la sección muestra "Próximamente".

export type Platform = "windows" | "macos" | "linux" | "any";
export type Category = "plugin" | "script" | "overlay" | "theme" | "tool";

export interface Download {
  name: string;
  description: string;
  category: Category;
  version: string;
  obsMin?: string;
  repo?: string;
  files: { platform: Platform; url: string; size?: string }[];
}

export const downloads: Download[] = [
  // Ejemplo:
  // {
  //   name: "Scene Autopilot",
  //   description: "Cambia de escena automáticamente según la ventana activa.",
  //   category: "plugin",
  //   version: "1.0.0",
  //   obsMin: "30.0",
  //   repo: "https://github.com/alejox/scene-autopilot",
  //   files: [
  //     { platform: "windows", url: "https://github.com/alejox/scene-autopilot/releases/download/v1.0.0/scene-autopilot-windows.zip", size: "2.1 MB" },
  //     { platform: "macos", url: "https://github.com/alejox/scene-autopilot/releases/download/v1.0.0/scene-autopilot-macos.pkg" },
  //   ],
  // },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  plugin: "Plugin",
  script: "Script",
  overlay: "Overlay",
  theme: "Tema",
  tool: "Herramienta",
};

export const PLATFORM_LABEL: Record<Platform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  any: "Multiplataforma",
};
