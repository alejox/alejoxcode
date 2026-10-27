// Datos técnicos de los plugins (los textos están en lib/content.ts).
// Los botones de descarga abren la página de releases; aquí solo se lee
// la versión más reciente para mostrarla.

export type Platform = "windows" | "macos" | "linux" | "any";

export type DownloadId = "windows" | "macos-apple" | "macos-intel" | "linux";

export type LatestRelease = {
  version: string;
  repo: string;
  releases: string;
  requirements: string;
};

const REPO = "alejox/music-now-playing";

export async function getLatestRelease(): Promise<LatestRelease> {
  const fallback: LatestRelease = {
    version: "2.4.25",
    repo: `https://github.com/${REPO}`,
    releases: `https://github.com/${REPO}/releases/latest`,
    requirements: "OBS 31+ · Windows 10/11 · macOS 12+ · Linux",
  };

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
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
