// Términos y privacidad en español e inglés. Edita aquí y actualiza `updated`.
import type { Locale } from "./content";
import { site } from "./site";

export type LegalSection = { heading: string; paragraphs: string[] };
export type LegalDoc = { title: string; description: string; updated: string; intro: string; sections: LegalSection[] };

const email = site.email;

const terms: Record<Locale, LegalDoc> = {
  es: {
    title: "Términos de servicio",
    description: "Condiciones de uso de Speed Deck, la compra «Quitar publicidad» en Google Play y reembolsos, y uso de los plugins y recursos de AlejoxCode.",
    updated: "Última actualización: 12 de noviembre de 2026",
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
          "Speed Deck es gratis en Android y en escritorio (Windows, macOS y Linux) y muestra anuncios.",
          "En la app de Android puedes quitar los anuncios con «Quitar publicidad», una compra única dentro de la app. El pago lo procesa Google Play con tu cuenta de Google: Google cobra los impuestos que correspondan, emite el recibo y muestra el precio en tu moneda. Al comprar también aceptas los términos de Google Play.",
          "La app de escritorio es gratis y no tiene compras.",
          "Puedo cambiar el precio en el futuro. Un cambio de precio no afecta las compras ya hechas.",
        ],
      },
      {
        heading: "3. Licencia",
        paragraphs: [
          "Puedes instalar y usar Speed Deck gratis, con anuncios, en tus propios dispositivos. La licencia es personal, no exclusiva e intransferible.",
          "Al comprar «Quitar publicidad» en Android, la app deja de mostrar anuncios para siempre en tu cuenta de Google, sin suscripción. La compra se restaura si reinstalas la app o cambias de celular con la misma cuenta.",
          "Los anuncios pueden ser de Google AdMob, de mis propios productos o de patrocinadores. Si haces clic en uno, se abre el sitio del anunciante, que tiene sus propias condiciones.",
          "No puedes revender, alquilar, redistribuir ni descompilar o modificar la app, salvo en lo que la ley te permita expresamente.",
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
          "Los reembolsos de «Quitar publicidad» siguen la política de Google Play: en las primeras 48 horas después de la compra puedes pedirlo directamente en Google Play.",
          "Pasado ese plazo, escríbeme a alejoxcode@gmail.com con el número de pedido de Google Play (empieza por GPA) y reviso tu caso. Si se reembolsa, la app vuelve a mostrar anuncios.",
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
    description: "Terms for using Speed Deck, the \"Remove ads\" purchase on Google Play and refunds, and terms of use for AlejoxCode plugins and resources.",
    updated: "Last updated: November 12, 2026",
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
          "Speed Deck is free on Android and desktop (Windows, macOS and Linux) and shows ads.",
          "In the Android app you can remove ads with \"Remove ads\", a one-time in-app purchase. Payment is processed by Google Play with your Google account: Google collects any applicable taxes, issues the receipt and shows the price in your currency. By buying, you also agree to Google Play's terms.",
          "The desktop app is free and has no purchases.",
          "I may change the price in the future. A price change does not affect purchases already made.",
        ],
      },
      {
        heading: "3. License",
        paragraphs: [
          "You can install and use Speed Deck for free, with ads, on your own devices. The license is personal, non-exclusive and non-transferable.",
          "When you buy \"Remove ads\" on Android, the app stops showing ads for good on your Google account, with no subscription. The purchase is restored if you reinstall the app or switch phones with the same account.",
          "Ads may come from Google AdMob, my own products or sponsors. If you click one, the advertiser's site opens, with its own terms.",
          "You may not resell, rent, redistribute, decompile or modify the app, except as expressly allowed by law.",
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
          "Refunds for \"Remove ads\" follow Google Play's policy: within the first 48 hours after purchase you can request one directly on Google Play.",
          "After that, email me at alejoxcode@gmail.com with your Google Play order number (it starts with GPA) and I'll review your case. If it is refunded, the app shows ads again.",
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
    updated: "Última actualización: 12 de noviembre de 2026",
    intro: "Aquí explico qué datos se tratan cuando visitas este sitio, cuando compras Speed Deck y cuando usas la app. La versión corta: este sitio no usa cookies propias ni analítica, y Speed Deck no envía tus datos personales ni tu uso a mis servidores; la app de Android muestra anuncios de Google AdMob.",
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
          "Los enlaces a GitHub, Ko-fi, Google Play y redes sociales llevan a sitios de terceros con sus propias políticas.",
        ],
      },
      {
        heading: "3. Compras de Speed Deck",
        paragraphs: [
          "La compra de «Quitar publicidad» en la app de Android la procesa Google Play. Google recoge tus datos de pago según su propia política de privacidad; yo no los recibo.",
          "Google me comparte los datos necesarios de cada pedido, como el número de pedido, el producto, la fecha y el país. Los uso para darte soporte, gestionar reembolsos y cumplir obligaciones legales y contables. La app consulta a Google Play si ya compraste, para no mostrarte anuncios.",
        ],
      },
      {
        heading: "4. La app Speed Deck",
        paragraphs: [
          "Speed Deck se conecta a OBS Studio y, si lo usas, a tu celular a través de tu red Wi-Fi. Tu configuración se guarda en tus propios dispositivos, y la app no envía tus datos personales ni tu uso a mis servidores.",
          "La app de Android muestra anuncios de Google AdMob. Para mostrarlos y medirlos, Google puede recoger el identificador de publicidad de tu dispositivo, tu dirección IP y datos técnicos del dispositivo y de tu interacción con los anuncios. Si vives en una región que lo exige, la app te pide tu consentimiento antes de mostrar anuncios personalizados. Puedes restablecer o eliminar el ID de publicidad en los ajustes de Android. Más información en policies.google.com/technologies/partner-sites.",
          "La app de escritorio descarga al iniciar y cada pocas horas un pequeño archivo con el anuncio desde www.alejoxcode.com (y su imagen, si tiene). Como cualquier visita, esa descarga deja datos técnicos, como la dirección IP y la hora, en los registros de Vercel.",
          "Si haces clic en un anuncio, se abre el sitio del anunciante, con su propia política de privacidad.",
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
    updated: "Last updated: November 12, 2026",
    intro: "This page explains what data is processed when you visit this website, buy Speed Deck and use the app. The short version: this website uses no cookies of its own or analytics, and Speed Deck does not send your personal data or usage to my servers; the Android app shows ads from Google AdMob.",
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
          "Links to GitHub, Ko-fi, Google Play and social networks lead to third-party sites with their own policies.",
        ],
      },
      {
        heading: "3. Speed Deck purchases",
        paragraphs: [
          "The \"Remove ads\" purchase in the Android app is processed by Google Play. Google collects your payment details under its own privacy policy; I do not receive them.",
          "Google shares with me the details needed for each order, such as the order number, product, date and country. I use them to provide support, handle refunds and meet legal and accounting obligations. The app checks with Google Play whether you have already bought it, so it doesn't show you ads.",
        ],
      },
      {
        heading: "4. The Speed Deck app",
        paragraphs: [
          "Speed Deck connects to OBS Studio and, if you use it, to your phone over your Wi-Fi network. Your settings are stored on your own devices, and the app does not send your personal data or usage to my servers.",
          "The Android app shows ads from Google AdMob. To show and measure them, Google may collect your device's advertising ID, your IP address and technical data about your device and your interaction with ads. If you live in a region that requires it, the app asks for your consent before showing personalized ads. You can reset or delete your advertising ID in Android settings. More information at policies.google.com/technologies/partner-sites.",
          "The desktop app downloads a small file with the ad from www.alejoxcode.com when it starts and every few hours (plus its image, if any). Like any visit, that download leaves technical data, such as IP address and time, in Vercel's logs.",
          "If you click an ad, the advertiser's site opens, with its own privacy policy.",
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
  es: { title: "Legal", terms: "Términos", privacy: "Privacidad", agree: "Al usar Speed Deck aceptas los", and: "y la" },
  en: { title: "Legal", terms: "Terms", privacy: "Privacy", agree: "By using Speed Deck you agree to the", and: "and the" },
};
