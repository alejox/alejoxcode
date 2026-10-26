// Datos técnicos de los plugins (los textos están en lib/content.ts).
// Las URLs de descarga se resuelven desde la última release de GitHub,
// así los botones siempre descargan la versión más reciente.

export type Platform = "windows" | "macos" | "linux" | "any";

export type DownloadId = "windows" | "macos-apple" | "macos-intel" | "linux";

export type LatestDownloads = {
  version: string;
  repo: string;
  releases: string;
  requirements: string;
  urls: Partial<Record<DownloadId, string>>;
};

const REPO = "alejox/music-now-playing";

// Nombres de los assets publicados en cada release.
const matchers: [DownloadId, RegExp][] = [
  ["windows", /Setup-[\d.]+\.exe$/i],
  ["macos-apple", /mac-apple\.zip$/i],
  ["macos-intel", /mac-intel\.zip$/i],
  ["linux", /linux-x64\.tar\.gz$/i],
];

export async function getLatestDownloads(): Promise<LatestDownloads> {
  const fallback: LatestDownloads = {
    version: "2.4.25",
    repo: `https://github.com/${REPO}`,
    releases: `https://github.com/${REPO}/releases/latest`,
    requirements: "OBS 31+ · Windows 10/11 · macOS 12+ · Linux",
    urls: {},
  };

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;

    const data = await res.json();
    const urls: LatestDownloads["urls"] = {};
    for (const asset of data.assets ?? []) {
      for (const [id, re] of matchers) {
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
