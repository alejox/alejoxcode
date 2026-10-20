// Datos generales del sitio. Las redes vacías no se muestran.
export const site = {
  name: "AlejoxCode",
  author: "Alejandro Grajales",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Correo de contacto público (opcional). Si lo dejas vacío no se muestra.
  email: "",
  socials: {
    github: "https://github.com/alejox",
    linkedin: "",
    youtube: "",
    twitch: "",
    x: "",
    instagram: "",
  } as Record<string, string>,
};
