// Datos técnicos de los plugins (los textos están en lib/content.ts).
// Las URLs de descarga se resuelven desde la última release de GitHub:
// cada botón descarga directamente el archivo de su plataforma y, si no
// se encuentra el asset, abre la página de releases como respaldo.
// Para publicar un plugin nuevo: agrega su entrada aquí y su ficha en content.ts.

export type Platform = "windows" | "macos" | "linux" | "any";

export type DownloadId = "windows" | "macos" | "macos-apple" | "macos-intel" | "linux";

export type LatestRelease = {
  version: string;
  repo: string;
  releases: string;
  requirements: string;
  urls: Partial<Record<DownloadId, string>>;
};

type PluginRelease = {
  repo: string; // owner/nombre en GitHub
  version: string; // respaldo si la API falla
  requirements: string;
  // Nombres de los assets publicados en cada release, por plataforma.
  matchers: [DownloadId, RegExp][];
};

const pluginReleases: Record<string, PluginRelease> = {
  "obs-now-playing": {
    repo: "alejox/music-now-playing",
    version: "2.4.25",
    requirements: "OBS 31+ · Windows 10/11 · macOS 12+ · Linux",
    matchers: [
      ["windows", /Setup-[\d.]+\.exe$/i],
      ["macos-apple", /mac-apple\.zip$/i],
      ["macos-intel", /mac-intel\.zip$/i],
      ["linux", /linux-x64\.tar\.gz$/i],
    ],
  },
  "multi-chat": {
    repo: "alejox/multi-chat",
    version: "2.0.4",
    requirements: "OBS 33 · Windows 10/11 · macOS 13+",
    matchers: [
      ["windows", /windows-x64\.zip$/i],
      ["macos", /macos\.zip$/i],
    ],
  },
};

export async function getLatestRelease(slug: string): Promise<LatestRelease> {
  const config = pluginReleases[slug];
  const fallback: LatestRelease = {
    version: config?.version ?? "",
    repo: `https://github.com/${config?.repo ?? "alejox"}`,
    releases: `https://github.com/${config?.repo ?? "alejox"}/releases/latest`,
    requirements: config?.requirements ?? "",
    urls: {},
  };
  if (!config) return fallback;

  try {
    const res = await fetch(`https://api.github.com/repos/${config.repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;

    const data = await res.json();
    const urls: LatestRelease["urls"] = {};
    for (const asset of data.assets ?? []) {
      for (const [id, re] of config.matchers) {
        if (re.test(asset.name)) urls[id] = asset.browser_download_url;
      }
    }

    return {
      ...fallback,
      version: String(data.tag_name ?? fallback.version).replace(/^v/, ""),
      urls,
    };
  } catch {
    return fallback;
  }
}
