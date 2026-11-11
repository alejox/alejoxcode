// Términos y privacidad en español e inglés. Edita aquí y actualiza `updated`.
import type { Locale } from "./content";
import { site } from "./site";

export type LegalSection = { heading: string; paragraphs: string[] };
export type LegalDoc = { title: string; description: string; updated: string; intro: string; sections: LegalSection[] };

const email = site.email;

const terms: Record<Locale, LegalDoc> = {
  es: {
    title: "Términos de servicio",
    description: "Condiciones de compra, licencia y reembolso de Speed Deck y de uso de los plugins y recursos de AlejoxCode.",
    updated: "Última actualización: 11 de noviembre de 2026",
    intro:
      "Estos términos aplican a este sitio, a la compra y uso de Speed Deck y a los plugins y recursos gratuitos que publico. Al comprar o usar cualquiera de ellos, los aceptas.",
    sections: [
      {
        heading: "1. Quién soy",
        paragraphs: [
          `Este sitio y Speed Deck los ofrece Alejandro Grajales, persona natural con residencia en Colombia, bajo la marca AlejoxCode. Puedes escribirme a ${email}.`,
        ],
      },
      {
        heading: "2. Compras y pagos",
        paragraphs: [
          "Speed Deck se vende por $12 USD en un pago único. El pago se hace a través de Lemon Squeezy, que actúa como revendedor autorizado (Merchant of Record): procesa el pago, calcula y cobra los impuestos que correspondan y emite el recibo. Al comprar también aceptas los términos de Lemon Squeezy.",
          "Puedo cambiar el precio en el futuro. Un cambio de precio no afecta las compras ya hechas.",
        ],
      },
      {
        heading: "3. Licencia",
        paragraphs: [
          "Al comprar Speed Deck recibes una licencia de por vida, personal, no exclusiva e intransferible para instalarlo y usarlo en tus propios equipos. Es un pago único, sin suscripción.",
          "No puedes revender, alquilar, redistribuir ni compartir el instalador o tu licencia con otras personas, ni descompilar o modificar la app, salvo en lo que la ley te permita expresamente.",
        ],
      },
      {
        heading: "4. Actualizaciones",
        paragraphs: [
          "Puedo publicar actualizaciones con mejoras y correcciones. La licencia no me obliga a añadir funciones concretas ni garantiza compatibilidad con todas las versiones futuras de OBS Studio o de tu sistema operativo.",
        ],
      },
      {
        heading: "5. Reembolsos",
        paragraphs: [
          `Tienes 14 días desde la compra para pedir el reembolso completo, sin necesidad de explicar el motivo. Escríbeme a ${email} desde el correo con el que compraste e indica tu número de pedido si lo tienes.`,
          "El reembolso se procesa a través de Lemon Squeezy al mismo medio de pago que usaste. Una vez reembolsada, la licencia deja de ser válida.",
        ],
      },
      {
        heading: "6. Soporte",
        paragraphs: [
          `El soporte de Speed Deck es por correo en ${email}. Respondo lo antes posible, normalmente en pocos días hábiles.`,
        ],
      },
      {
        heading: "7. Plugins y recursos gratuitos",
        paragraphs: [
          "Los plugins para OBS y los packs de alertas que publico son gratuitos. Cada uno se rige por la licencia de código abierto de su repositorio en GitHub (por ejemplo, MIT).",
        ],
      },
      {
        heading: "8. Garantía y responsabilidad",
        paragraphs: [
          "El software se ofrece «tal cual». Hago lo posible para que funcione bien, pero no garantizo que esté libre de errores ni que sirva para todos los usos.",
          "En la medida en que la ley lo permita, mi responsabilidad total frente a ti por Speed Deck se limita al monto que pagaste por él. Nada de estos términos limita los derechos que te otorgue la ley de protección al consumidor que te aplique.",
        ],
      },
      {
        heading: "9. Marcas de terceros",
        paragraphs: [
          "OBS Studio, Spotify, YouTube, Twitch, Kick, TikTok y las demás marcas mencionadas pertenecen a sus dueños. AlejoxCode no está afiliado ni patrocinado por ellos.",
        ],
      },
      {
        heading: "10. Cambios y ley aplicable",
        paragraphs: [
          "Puedo actualizar estos términos; la fecha de arriba indica la última versión. Los cambios no afectan las compras ya hechas.",
          "Estos términos se rigen por las leyes de la República de Colombia.",
        ],
      },
    ],
  },
  en: {
    title: "Terms of Service",
    description: "Purchase, license and refund terms for Speed Deck, and terms of use for AlejoxCode plugins and resources.",
    updated: "Last updated: November 11, 2026",
    intro:
      "These terms apply to this website, to buying and using Speed Deck, and to the free plugins and resources I publish. By buying or using any of them, you agree to these terms.",
    sections: [
      {
        heading: "1. Who I am",
        paragraphs: [
          `This website and Speed Deck are offered by Alejandro Grajales, an individual based in Colombia, under the AlejoxCode brand. You can reach me at ${email}.`,
        ],
      },
      {
        heading: "2. Purchases and payments",
        paragraphs: [
          "Speed Deck is sold for $12 USD as a one-time payment. Payment is handled by Lemon Squeezy, which acts as the authorized reseller (Merchant of Record): it processes the payment, calculates and collects any applicable taxes, and issues the receipt. By buying, you also agree to Lemon Squeezy's terms.",
          "I may change the price in the future. A price change does not affect purchases already made.",
        ],
      },
      {
        heading: "3. License",
        paragraphs: [
          "When you buy Speed Deck you get a lifetime, personal, non-exclusive and non-transferable license to install and use it on your own devices. It is a one-time payment with no subscription.",
          "You may not resell, rent, redistribute or share the installer or your license with others, or decompile or modify the app, except as expressly allowed by law.",
        ],
      },
      {
        heading: "4. Updates",
        paragraphs: [
          "I may release updates with improvements and fixes. The license does not oblige me to add specific features and does not guarantee compatibility with every future version of OBS Studio or your operating system.",
        ],
      },
      {
        heading: "5. Refunds",
        paragraphs: [
          `You have 14 days from purchase to request a full refund, no questions asked. Email me at ${email} from the address you used to buy, and include your order number if you have it.`,
          "Refunds are processed through Lemon Squeezy to your original payment method. Once refunded, the license is no longer valid.",
        ],
      },
      {
        heading: "6. Support",
        paragraphs: [
          `Speed Deck support is provided by email at ${email}. I reply as soon as I can, usually within a few business days.`,
        ],
      },
      {
        heading: "7. Free plugins and resources",
        paragraphs: [
          "The OBS plugins and alert packs I publish are free. Each one is governed by the open-source license in its GitHub repository (for example, MIT).",
        ],
      },
      {
        heading: "8. Warranty and liability",
        paragraphs: [
          "The software is provided \"as is\". I do my best to make it work well, but I do not guarantee it is error-free or fit for every purpose.",
          "To the extent permitted by law, my total liability to you for Speed Deck is limited to the amount you paid for it. Nothing in these terms limits the rights you have under the consumer protection laws that apply to you.",
        ],
      },
      {
        heading: "9. Third-party trademarks",
        paragraphs: [
          "OBS Studio, Spotify, YouTube, Twitch, Kick, TikTok and the other brands mentioned belong to their owners. AlejoxCode is not affiliated with or sponsored by them.",
        ],
      },
      {
        heading: "10. Changes and governing law",
        paragraphs: [
          "I may update these terms; the date above shows the latest version. Changes do not affect purchases already made.",
          "These terms are governed by the laws of the Republic of Colombia.",
        ],
      },
    ],
  },
};

const privacy: Record<Locale, LegalDoc> = {
  es: {
    title: "Política de privacidad",
    description: "Qué datos se tratan en este sitio, en las compras de Speed Deck y en la app, y cómo ejercer tus derechos.",
    updated: "Última actualización: 11 de noviembre de 2026",
    intro: "Aquí explico qué datos se tratan cuando visitas este sitio, cuando compras Speed Deck y cuando usas la app. La versión corta: este sitio no usa cookies propias ni analítica, y Speed Deck no envía tus datos a ningún servidor.",
    sections: [
      {
        heading: "1. Responsable",
        paragraphs: [
          `El responsable de tus datos es Alejandro Grajales, persona natural con residencia en Colombia (AlejoxCode). Contacto: ${email}.`,
        ],
      },
      {
        heading: "2. Este sitio web",
        paragraphs: [
          "No uso cookies propias, herramientas de analítica ni publicidad, y el sitio no tiene formularios ni cuentas de usuario. Las fuentes tipográficas se sirven desde este mismo sitio.",
          "El sitio está alojado en Vercel. Como cualquier servidor, registra datos técnicos de las visitas (dirección IP, navegador, página solicitada y fecha) para funcionar y protegerse de abusos.",
          "Las miniaturas de los videos se cargan desde los servidores de YouTube (Google). El video solo se carga cuando pulsas reproducir, desde youtube-nocookie.com; a partir de ahí aplica la política de privacidad de Google.",
          "Los enlaces a GitHub, Ko-fi, Lemon Squeezy y redes sociales llevan a sitios de terceros con sus propias políticas.",
        ],
      },
      {
        heading: "3. Compras de Speed Deck",
        paragraphs: [
          "Las compras las procesa Lemon Squeezy como revendedor autorizado (Merchant of Record). Lemon Squeezy recoge tu nombre, correo, país y datos de pago según su propia política de privacidad. Yo no recibo ni guardo los datos completos de tu tarjeta.",
          "De cada venta recibo la información necesaria para gestionarla: nombre, correo, país, producto y número de pedido. La uso para entregarte la licencia, darte soporte, procesar reembolsos y cumplir obligaciones legales y contables.",
        ],
      },
      {
        heading: "4. La app Speed Deck",
        paragraphs: [
          "Speed Deck funciona de forma local en tu computador y en tu red. Se conecta a OBS Studio y, si lo usas, a tu celular a través de tu red Wi-Fi. No envía datos a mis servidores ni a terceros, y tu configuración se guarda en tu propio equipo.",
        ],
      },
      {
        heading: "5. Si me escribes",
        paragraphs: [
          "Si me escribes por correo, uso tu dirección y tu mensaje solo para responderte y dar seguimiento a tu solicitud.",
        ],
      },
      {
        heading: "6. Conservación",
        paragraphs: [
          "Conservo los datos de compras y los correos solo el tiempo necesario para los fines descritos y para cumplir obligaciones legales y contables.",
        ],
      },
      {
        heading: "7. Tus derechos",
        paragraphs: [
          `Conforme a la Ley 1581 de 2012 de Colombia, puedes conocer, actualizar, rectificar y pedir la supresión de tus datos, y revocar tu autorización. Escríbeme a ${email} y te respondo dentro de los plazos legales. Si vives en otro país, también puedes ejercer los derechos que te dé tu ley local.`,
        ],
      },
      {
        heading: "8. Cambios",
        paragraphs: ["Puedo actualizar esta política; la fecha de arriba indica la última versión."],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    description: "What data is processed on this website, in Speed Deck purchases and in the app, and how to exercise your rights.",
    updated: "Last updated: November 11, 2026",
    intro: "This page explains what data is processed when you visit this website, buy Speed Deck and use the app. The short version: this website uses no cookies of its own or analytics, and Speed Deck does not send your data to any server.",
    sections: [
      {
        heading: "1. Data controller",
        paragraphs: [
          `Your data is controlled by Alejandro Grajales, an individual based in Colombia (AlejoxCode). Contact: ${email}.`,
        ],
      },
      {
        heading: "2. This website",
        paragraphs: [
          "I do not use cookies of my own, analytics tools or advertising, and the website has no forms or user accounts. Fonts are served from this website itself.",
          "The website is hosted on Vercel. Like any server, it logs technical visit data (IP address, browser, requested page and time) to operate and protect against abuse.",
          "Video thumbnails are loaded from YouTube (Google) servers. The video itself only loads when you press play, from youtube-nocookie.com; from then on, Google's privacy policy applies.",
          "Links to GitHub, Ko-fi, Lemon Squeezy and social networks lead to third-party sites with their own policies.",
        ],
      },
      {
        heading: "3. Speed Deck purchases",
        paragraphs: [
          "Purchases are processed by Lemon Squeezy as the authorized reseller (Merchant of Record). Lemon Squeezy collects your name, email, country and payment details under its own privacy policy. I do not receive or store your full card details.",
          "For each sale I receive the information needed to manage it: name, email, country, product and order number. I use it to deliver your license, provide support, process refunds and meet legal and accounting obligations.",
        ],
      },
      {
        heading: "4. The Speed Deck app",
        paragraphs: [
          "Speed Deck runs locally on your computer and your network. It connects to OBS Studio and, if you use it, to your phone over your Wi-Fi network. It does not send data to my servers or to third parties, and your settings are stored on your own device.",
        ],
      },
      {
        heading: "5. If you email me",
        paragraphs: ["If you email me, I use your address and message only to reply and follow up on your request."],
      },
      {
        heading: "6. Retention",
        paragraphs: [
          "I keep purchase data and emails only as long as needed for the purposes above and to meet legal and accounting obligations.",
        ],
      },
      {
        heading: "7. Your rights",
        paragraphs: [
          `Under Colombian Law 1581 of 2012, you can access, update, correct and request deletion of your data, and withdraw your consent. Email me at ${email} and I will reply within the legal time frames. If you live in another country, you can also exercise the rights your local law gives you.`,
        ],
      },
      {
        heading: "8. Changes",
        paragraphs: ["I may update this policy; the date above shows the latest version."],
      },
    ],
  },
};

export const legal = { terms, privacy };

export const legalPath: Record<Locale, { terms: string; privacy: string }> = {
  es: { terms: "/terminos", privacy: "/privacidad" },
  en: { terms: "/en/terms", privacy: "/en/privacy" },
};

export const legalLabels: Record<Locale, { title: string; terms: string; privacy: string; agree: string; and: string }> = {
  es: { title: "Legal", terms: "Términos", privacy: "Privacidad", agree: "Al comprar aceptas los", and: "y la" },
  en: { title: "Legal", terms: "Terms", privacy: "Privacy", agree: "By buying you agree to the", and: "and the" },
};
