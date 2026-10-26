// Datos generales del sitio. Las redes vacías no se muestran.
export const site = {
  name: "AlejoxCode",
  author: "Alejandro Grajales",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Correo de contacto público. Si lo dejas vacío no se muestra.
  email: "alejoxcode@gmail.com",
  // Usuario de las redes sociales (se muestra en Contacto).
  handle: "@alejoxcode",
  // El orden aquí es el orden en que aparecen los íconos.
  socials: {
    linkedin: "https://www.linkedin.com/in/alejoxcode",
    github: "https://github.com/alejox",
    instagram: "https://www.instagram.com/alejoxcode",
    facebook: "https://www.facebook.com/alejoxcode",
    tiktok: "https://www.tiktok.com/@alejoxcode",
  } as Record<string, string>,
};

export const SOCIAL_LABEL: Record<string, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  twitch: "Twitch",
  x: "X",
};
