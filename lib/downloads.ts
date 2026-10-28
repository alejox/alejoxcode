// Datos técnicos de los plugins (los textos están en lib/content.ts).
// Los botones de descarga abren la página de releases; aquí solo se lee
// la versión más reciente para mostrarla.
// Para publicar un plugin nuevo: agrega su entrada aquí y su ficha en content.ts.

export type Platform = "windows" | "macos" | "linux" | "any";

export type DownloadId = "windows" | "macos" | "macos-apple" | "macos-intel" | "linux";

export type LatestRelease = {
  version: string;
  repo: string;
  releases: string;
  requirements: string;
};

type PluginRelease = {
  repo: string; // owner/nombre en GitHub
  version: string; // respaldo si la API falla
  requirements: string;
};

const pluginReleases: Record<string, PluginRelease> = {
  "obs-now-playing": {
    repo: "alejox/music-now-playing",
    version: "2.4.25",
    requirements: "OBS 31+ · Windows 10/11 · macOS 12+ · Linux",
  },
  "multi-chat": {
    repo: "alejox/multi-chat",
    version: "2.0.4",
    requirements: "OBS 33 · Windows 10/11 · macOS 13+",
  },
};

export async function getLatestRelease(slug: string): Promise<LatestRelease> {
  const config = pluginReleases[slug];
  const fallback: LatestRelease = {
    version: config?.version ?? "",
    repo: `https://github.com/${config?.repo ?? "alejox"}`,
    releases: `https://github.com/${config?.repo ?? "alejox"}/releases/latest`,
    requirements: config?.requirements ?? "",
  };
  if (!config) return fallback;

  try {
    const res = await fetch(`https://api.github.com/repos/${config.repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    return { ...fallback, version: String(data.tag_name ?? fallback.version).replace(/^v/, "") };
  } catch {
    return fallback;
  }
}
