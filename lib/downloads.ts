// Datos técnicos de los plugins (los textos están en lib/content.ts).
// Los botones de descarga abren releases/latest, así que siempre llevan al
// release más reciente sin tocar código. Aquí solo se lee la versión para
// mostrarla (se revalida cada hora).

export type Platform = "windows" | "macos" | "linux" | "any";

export type DownloadId = "windows" | "macos-apple" | "macos-intel" | "linux";

export type LatestRelease = {
  version: string;
  repo: string;
  releases: string;
  requirements: string;
};

const REPO = "alejox/music-now-playing";
const REVALIDATE = 3600;

// Solo se usa si GitHub no responde por ninguna de las dos vías.
const FALLBACK_VERSION = "2.4.29";

const clean = (tag: unknown) => {
  const v = String(tag ?? "").trim().replace(/^v/i, "");
  return /^\d+(\.\d+)*/.test(v) ? v : null;
};

/** Vía 1: API de GitHub (usa GITHUB_TOKEN si existe para evitar el límite de 60/h). */
async function fromApi(): Promise<string | null> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
    headers,
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return clean(data.tag_name);
}

/** Vía 2: la redirección de github.com/…/releases/latest → …/releases/tag/vX.Y.Z (sin límite de API). */
async function fromRedirect(): Promise<string | null> {
  const res = await fetch(`https://github.com/${REPO}/releases/latest`, {
    method: "HEAD",
    redirect: "manual",
    next: { revalidate: REVALIDATE },
  });
  const location = res.headers.get("location") ?? "";
  const match = location.match(/\/releases\/tag\/([^/?#]+)/);
  return match ? clean(decodeURIComponent(match[1])) : null;
}

export async function getLatestRelease(): Promise<LatestRelease> {
  const base = {
    repo: `https://github.com/${REPO}`,
    releases: `https://github.com/${REPO}/releases/latest`,
    requirements: "OBS 31+ · Windows 10/11 · macOS 12+ · Linux",
  };

  for (const source of [fromApi, fromRedirect]) {
    try {
      const version = await source();
      if (version) return { ...base, version };
    } catch {
      // probar la siguiente vía
    }
  }
  return { ...base, version: FALLBACK_VERSION };
}
