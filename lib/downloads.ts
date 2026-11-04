// Datos técnicos de los plugins (los textos están en lib/content.ts).
// Las URLs de descarga se resuelven desde la última release de GitHub:
// cada botón descarga directamente el archivo de su plataforma y, si no
// se encuentra el asset, abre la página de releases como respaldo.
// Todo se revalida cada hora, así que un release nuevo aparece solo.
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
  version: string; // respaldo si GitHub no responde
  requirements: string;
  // Nombres de los assets publicados en cada release, por plataforma.
  matchers: [DownloadId, RegExp][];
};

const REVALIDATE = 3600;

const pluginReleases: Record<string, PluginRelease> = {
  "obs-now-playing": {
    repo: "alejox/music-now-playing",
    version: "2.4.29",
    requirements: "OBS 31+ · Windows 10/11 · macOS 12+ · Linux",
    matchers: [
      ["windows", /windows-x64\.zip$/i],
      ["windows", /Setup-[\d.]+\.exe$/i],
      ["macos", /macos\.zip$/i],
      ["macos-apple", /mac-apple\.zip$/i],
      ["macos-intel", /mac-intel\.zip$/i],
      ["linux", /linux-x86_64\.zip$/i],
      ["linux", /linux-x64\.tar\.gz$/i],
    ],
  },
  "multi-chat": {
    repo: "alejox/multi-chat",
    version: "2.0.5",
    requirements: "OBS 33 · Windows 10/11 · macOS 13+",
    matchers: [
      ["windows", /windows-x64\.zip$/i],
      ["macos", /macos\.zip$/i],
    ],
  },
};

const cleanVersion = (tag: unknown) => {
  const v = String(tag ?? "").trim().replace(/^v/i, "");
  return /^\d+(\.\d+)*/.test(v) ? v : null;
};

/** API de GitHub: versión + assets. Usa GITHUB_TOKEN si existe para evitar el límite de 60/h. */
async function fromApi(config: PluginRelease) {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${config.repo}/releases/latest`, {
    headers,
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const version = cleanVersion(data.tag_name);
  if (!version) return null;

  const urls: LatestRelease["urls"] = {};
  for (const asset of data.assets ?? []) {
    for (const [id, re] of config.matchers) {
      if (re.test(asset.name)) urls[id] = asset.browser_download_url;
    }
  }
  return { version, urls };
}

/** Respaldo sin límite de API: la redirección de releases/latest → releases/tag/vX.Y.Z (solo versión). */
async function fromRedirect(config: PluginRelease) {
  const res = await fetch(`https://github.com/${config.repo}/releases/latest`, {
    method: "HEAD",
    redirect: "manual",
    next: { revalidate: REVALIDATE },
  });
  const match = (res.headers.get("location") ?? "").match(/\/releases\/tag\/([^/?#]+)/);
  const version = match ? cleanVersion(decodeURIComponent(match[1])) : null;
  return version ? { version, urls: {} } : null;
}

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

  for (const source of [fromApi, fromRedirect]) {
    try {
      const found = await source(config);
      if (found) return { ...fallback, ...found };
    } catch {
      // probar la siguiente vía
    }
  }
  return fallback;
}
