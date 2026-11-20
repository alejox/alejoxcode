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
    updated: "Última actualización: 20 de noviembre de 2026",
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
          "Si usas la integración de AC Multichat con YouTube (iniciar sesión con Google para leer el chat de tus directos), aceptas también los Términos de Servicio de YouTube (https://www.youtube.com/t/terms).",
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
    updated: "Last updated: November 20, 2026",
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
          "If you use AC Multichat's YouTube integration (signing in with Google to read your live chat), you also agree to the YouTube Terms of Service (https://www.youtube.com/t/terms).",
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
    description: "Qué datos se tratan en este sitio, en Speed Deck y en AC Multichat, y cómo ejercer tus derechos.",
    updated: "Última actualización: 20 de noviembre de 2026",
    intro: "Aquí explico qué datos se tratan cuando visitas este sitio, cuando compras o usas Speed Deck y cuando usas AC Multichat, mi plugin gratuito para OBS. La versión corta: este sitio no usa cookies propias ni analítica; Speed Deck no envía tus datos personales ni tu uso a mis servidores, y la app de Android muestra anuncios de Google AdMob; y AC Multichat funciona en tu equipo: si conectas tu cuenta de Google para leer el chat de YouTube, los tokens se quedan en tu equipo y yo no recibo esos datos.",
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
        heading: "5. AC Multichat",
        paragraphs: [
          "AC Multichat es mi plugin gratuito y de código abierto para OBS Studio (https://github.com/alejox/multi-chat). Reúne en OBS los chats de YouTube, Twitch, Kick, TikTok y Starvios. Funciona dentro de OBS en tu computador: no tiene cuentas propias, no usa telemetría ni analítica y no pasa por ningún servidor mío. Los mensajes del chat solo se guardan en la memoria mientras OBS está abierto; los canales que añades y tus ajustes se guardan en tu equipo.",
          "Inicio de sesión con Google (opcional). Para recibir el chat de YouTube al instante puedes conectar tu cuenta de Google. El plugin pide un único permiso, de solo lectura: https://www.googleapis.com/auth/youtube.readonly. Con él no puede publicar, borrar ni cambiar nada en tu canal. Puedes usar el cliente de Google de AC Multichat que viene incluido o uno propio creado en Google Cloud. Si no inicias sesión, el plugin lee el chat público de YouTube como lo hace su sitio web.",
          "Con ese permiso, el plugin usa la API de datos de YouTube solo para mostrar en OBS el chat de los directos de YouTube que tú añades: consulta el identificador del chat del directo y recibe sus mensajes. De cada mensaje usa el texto, el tipo de evento (mensaje, Super Chat, Super Sticker o membresía), el nombre visible y el identificador del canal de quien escribe y sus insignias (propietario, moderador, miembro o verificado), y los avisos de mensajes eliminados o usuarios bloqueados, para quitarlos de la pantalla. No consulta tu correo, tus suscripciones, tus videos ni otros datos de tu cuenta.",
          "Estos datos no se venden, no se comparten con terceros ni se usan para publicidad, y yo no los recibo: todo se procesa en tu equipo, y las conexiones de este proceso solo van a los servidores de Google.",
          "El inicio de sesión se hace en tu navegador con OAuth 2.0 para apps de escritorio (con PKCE), y Google devuelve la respuesta a una dirección local de tu equipo (127.0.0.1). El token de actualización se guarda en el archivo config.json de la carpeta de configuración de OBS de tu equipo, junto con el ID y el secreto del cliente de Google que uses. El token de acceso solo se guarda en la memoria y caduca en aproximadamente una hora; cuando hace falta, el plugin pide uno nuevo a Google. Los tokens no se envían a ningún sitio que no sea Google.",
          "El token de actualización se conserva hasta que cierras sesión o Google lo invalida. Para borrarlo de tu equipo, en el plugin abre los ajustes de Multichat, pestaña YouTube, y pulsa «Cerrar sesión». Desinstalar el plugin no borra ese archivo: para eliminarlo, borra también la carpeta plugin_config/obs-multichat dentro de la carpeta de configuración de OBS (en Windows, %APPDATA%\\obs-studio; en macOS, ~/Library/Application Support/obs-studio; en Linux, ~/.config/obs-studio). Cerrar sesión no revoca el permiso en Google: para revocarlo, entra a https://myaccount.google.com/permissions y quita el acceso de AC Multichat (o el de tu propia app, si usas un cliente propio).",
          "AC Multichat usa los Servicios de la API de YouTube. Al usar esta integración aceptas los Términos de Servicio de YouTube (https://www.youtube.com/t/terms), y se aplica la Política de Privacidad de Google (https://policies.google.com/privacy).",
          "El uso y la transferencia que AC Multichat hace de la información recibida de las APIs de Google cumple la Política de Datos de Usuario de los Servicios de API de Google (https://developers.google.com/terms/api-services-user-data-policy), incluidos los requisitos de uso limitado.",
          "Twitch, Kick, TikTok y Starvios no piden inicio de sesión: el plugin se conecta de forma anónima y de solo lectura para mostrar los mensajes del chat (texto, nombre de quien escribe, insignias y emotes) y saber si el canal está en directo. En Twitch usa su chat IRC y su API pública; en Kick, su conexión pública de chat; en Starvios, su punto de acceso público. En TikTok, además, el identificador de la sala del canal que añades se envía a Euler Stream (https://www.eulerstream.com), un servicio externo, para firmar la conexión al chat. Las fotos de perfil y los emotes se cargan de los servidores de imágenes de cada plataforma.",
          "Al abrir OBS, el plugin consulta la API de GitHub para saber si hay una versión nueva y, solo si aceptas, la descarga de GitHub. Si activas la lectura del chat en voz alta, se hace con las voces de tu sistema operativo, en tu equipo.",
        ],
      },
      {
        heading: "6. Si me escribes",
        paragraphs: [
          "Si me escribes por correo, uso tu dirección y tu mensaje solo para responderte y dar seguimiento a tu solicitud.",
        ],
      },
      {
        heading: "7. Conservación",
        paragraphs: [
          "Conservo los datos de compras y los correos solo el tiempo necesario para los fines descritos y para cumplir obligaciones legales y contables.",
        ],
      },
      {
        heading: "8. Tus derechos",
        paragraphs: [
          `Conforme a la Ley 1581 de 2012 de Colombia, puedes conocer, actualizar, rectificar y pedir la supresión de tus datos, y revocar tu autorización. Escríbeme a ${email} y te respondo dentro de los plazos legales. Si vives en otro país, también puedes ejercer los derechos que te dé tu ley local.`,
        ],
      },
      {
        heading: "9. Cambios",
        paragraphs: ["Puedo actualizar esta política; la fecha de arriba indica la última versión."],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    description: "What data is processed on this website, in Speed Deck and in AC Multichat, and how to exercise your rights.",
    updated: "Last updated: November 20, 2026",
    intro: "This page explains what data is processed when you visit this website, when you buy or use Speed Deck, and when you use AC Multichat, my free OBS plugin. The short version: this website uses no cookies of its own or analytics; Speed Deck does not send your personal data or usage to my servers, and the Android app shows ads from Google AdMob; and AC Multichat runs on your device: if you connect your Google account to read the YouTube chat, the tokens stay on your device and I do not receive that data.",
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
        heading: "5. AC Multichat",
        paragraphs: [
          "AC Multichat is my free, open-source plugin for OBS Studio (https://github.com/alejox/multi-chat). It brings the YouTube, Twitch, Kick, TikTok and Starvios chats together in OBS. It runs inside OBS on your computer: it has no accounts of its own, uses no telemetry or analytics, and does not go through any server of mine. Chat messages are only kept in memory while OBS is open; the channels you add and your settings are stored on your device.",
          "Sign in with Google (optional). To get the YouTube chat instantly you can connect your Google account. The plugin requests a single, read-only permission: https://www.googleapis.com/auth/youtube.readonly. With it, it cannot post, delete or change anything on your channel. You can use the AC Multichat Google client that comes built in or your own client created in Google Cloud. If you don't sign in, the plugin reads the public YouTube chat the same way the YouTube website does.",
          "With that permission, the plugin uses the YouTube Data API only to show in OBS the chat of the YouTube live streams you add: it looks up the stream's chat ID and receives its messages. From each message it uses the text, the event type (message, Super Chat, Super Sticker or membership), the display name and channel ID of the author and their badges (owner, moderator, member or verified), plus deleted-message and banned-user notices, to remove them from the screen. It does not access your email, subscriptions, videos or any other data in your account.",
          "This data is not sold, not shared with third parties and not used for advertising, and I do not receive it: everything is processed on your device, and the connections in this process only go to Google's servers.",
          "Sign-in happens in your browser using OAuth 2.0 for desktop apps (with PKCE), and Google sends its response to a local address on your device (127.0.0.1). The refresh token is stored in the config.json file in OBS's configuration folder on your device, together with the ID and secret of the Google client you use. The access token is only kept in memory and expires in about an hour; when needed, the plugin asks Google for a new one. Tokens are never sent anywhere other than Google.",
          "The refresh token is kept until you sign out or Google invalidates it. To delete it from your device, open the Multichat settings in the plugin, go to the YouTube tab and click \"Sign out\". Uninstalling the plugin does not delete that file: to remove it, also delete the plugin_config/obs-multichat folder inside OBS's configuration folder (on Windows, %APPDATA%\\obs-studio; on macOS, ~/Library/Application Support/obs-studio; on Linux, ~/.config/obs-studio). Signing out does not revoke the permission at Google: to revoke it, go to https://myaccount.google.com/permissions and remove AC Multichat's access (or your own app's, if you use your own client).",
          "AC Multichat uses the YouTube API Services. By using this integration you agree to the YouTube Terms of Service (https://www.youtube.com/t/terms), and the Google Privacy Policy applies (https://policies.google.com/privacy).",
          "AC Multichat's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.",
          "Twitch, Kick, TikTok and Starvios require no sign-in: the plugin connects anonymously and read-only to show chat messages (text, author name, badges and emotes) and to know whether the channel is live. On Twitch it uses its IRC chat and public API; on Kick, its public chat connection; on Starvios, its public endpoint. On TikTok, the room ID of the channel you add is also sent to Euler Stream (https://www.eulerstream.com), an external service, to sign the chat connection. Profile pictures and emotes are loaded from each platform's image servers.",
          "When OBS starts, the plugin checks the GitHub API for a new version and, only if you accept, downloads it from GitHub. If you turn on reading the chat aloud, it uses your operating system's voices, on your device.",
        ],
      },
      {
        heading: "6. If you email me",
        paragraphs: ["If you email me, I use your address and message only to reply and follow up on your request."],
      },
      {
        heading: "7. Retention",
        paragraphs: [
          "I keep purchase data and emails only as long as needed for the purposes above and to meet legal and accounting obligations.",
        ],
      },
      {
        heading: "8. Your rights",
        paragraphs: [
          `Under Colombian Law 1581 of 2012, you can access, update, correct and request deletion of your data, and withdraw your consent. Email me at ${email} and I will reply within the legal time frames. If you live in another country, you can also exercise the rights your local law gives you.`,
        ],
      },
      {
        heading: "9. Changes",
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
