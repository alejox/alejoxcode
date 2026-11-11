// Datos generales del sitio. Las redes vacías no se muestran.
export const site = {
  name: "AlejoxCode",
  author: "Alejandro Grajales",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Correo de contacto público. Si lo dejas vacío no se muestra.
  email: "alejoxcode@gmail.com",
  // Usuario de las redes sociales (se muestra en Contacto).
  handle: "@alejoxcode",
  // Ko-fi (botón de apoyo en la página de plugins; pagos por PayPal).
  kofi: "https://ko-fi.com/alejoxcode",
  // Checkout de Speed Deck en Lemon Squeezy (preventa).
  speedDeckCheckout: "https://speeddeck.lemonsqueezy.com/checkout/buy/a38c9fa0-39f6-43c4-97a5-dc82c8635b90?embed=1",
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
