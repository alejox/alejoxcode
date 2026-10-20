// Edita aquí tus datos y redes. Las redes vacías no se muestran.
export const site = {
  name: "AlejoxCode",
  author: "Alejo",
  title: "AlejoxCode — Plugins para OBS y contenido dev",
  description:
    "Plugins, scripts y overlays para OBS Studio, más tutoriales y contenido de desarrollo por Alejo.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  socials: {
    github: "https://github.com/alejox",
    youtube: "",
    twitch: "",
    x: "",
    instagram: "",
    tiktok: "",
  } as Record<string, string>,
};
