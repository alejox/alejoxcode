import type { Locale } from "./content";
import type { LegalDoc } from "./legal";
import { site } from "./site";

// Página propia de AC Multichat y su política de privacidad: son las URL que Google revisa en la
// pantalla de consentimiento de OAuth (página principal y política de la app "AC Multichat").

const email = site.email;
export const MULTICHAT_REPO = "https://github.com/alejox/multi-chat";
export const MULTICHAT_RELEASES = "https://github.com/alejox/multi-chat/releases/latest";

export const multichatPath: Record<Locale, { home: string; privacy: string }> = {
  es: { home: "/ac-multichat", privacy: "/ac-multichat/privacidad" },
  en: { home: "/en/ac-multichat", privacy: "/en/ac-multichat/privacy" },
};

export const multichatHome = {
  es: {
    metaTitle: "AC Multichat — Plugin de chat múltiple para OBS Studio",
    metaDescription:
      "AC Multichat reúne en OBS Studio los chats de YouTube, Twitch, Kick, TikTok y Starvios. Gratis y de código abierto. Inicio de sesión con Google opcional, de solo lectura.",
    eyebrow: "Plugin para OBS Studio",
    title: "AC Multichat",
    lead: "AC Multichat es un plugin gratuito y de código abierto para OBS Studio que reúne en un solo lugar los chats de tus directos en YouTube, Twitch, Kick, TikTok y Starvios: en un panel (dock) de OBS y como fuente para tu escena.",
    by: "Desarrollado por Alejandro Grajales (AlejoxCode).",
    download: "Descargar (GitHub)",
    source: "Código fuente",
    featuresTitle: "Qué hace",
    features: [
      { title: "Todos los chats juntos", text: "Los mensajes de cada plataforma en un dock de OBS, con el logo de la plataforma, insignias, emotes, Super Chats, bits y regalos." },
      { title: "Chat en tu escena", text: "Una fuente con fondo transparente, vertical u horizontal, con varios estilos." },
      { title: "Multistream automático", text: "Detecta en qué plataformas estás en directo y conecta solo esos chats." },
      { title: "Lectura en voz alta", text: "Opcional: lee los mensajes con las voces de tu sistema operativo, en tu equipo." },
    ],
    googleTitle: "Inicio de sesión con Google (opcional)",
    google: [
      "Para recibir el chat de YouTube al instante, puedes iniciar sesión con tu cuenta de Google desde los ajustes del plugin (pestaña YouTube). Es opcional: sin iniciar sesión, el plugin lee el chat público de YouTube igual que el sitio web de YouTube.",
      "AC Multichat pide un único permiso, de solo lectura: https://www.googleapis.com/auth/youtube.readonly. Lo usa solo para leer el chat de los directos de YouTube que tú añades y mostrarlo en OBS. No puede publicar, borrar ni cambiar nada en tu canal, y no consulta tu correo ni otros datos de tu cuenta.",
      "Los datos se procesan en tu equipo: los tokens de Google se guardan en tu computador y nunca se envían a servidores del desarrollador. Los datos no se venden, no se comparten con terceros ni se usan para publicidad.",
    ],
    privacyCta: "Política de privacidad de AC Multichat",
    termsCta: "Términos de servicio",
    contactTitle: "Contacto y soporte",
    contact: `¿Dudas o problemas? Escríbeme a ${email} o abre un issue en GitHub.`,
  },
  en: {
    metaTitle: "AC Multichat — Multi-platform chat plugin for OBS Studio",
    metaDescription:
      "AC Multichat brings the YouTube, Twitch, Kick, TikTok and Starvios chats together in OBS Studio. Free and open source. Optional, read-only Google sign-in.",
    eyebrow: "OBS Studio plugin",
    title: "AC Multichat",
    lead: "AC Multichat is a free, open-source plugin for OBS Studio that brings your live chats from YouTube, Twitch, Kick, TikTok and Starvios together in one place: in an OBS dock and as a source for your scene.",
    by: "Developed by Alejandro Grajales (AlejoxCode).",
    download: "Download (GitHub)",
    source: "Source code",
    featuresTitle: "What it does",
    features: [
      { title: "Every chat together", text: "Messages from every platform in an OBS dock, with the platform logo, badges, emotes, Super Chats, bits and gifts." },
      { title: "Chat in your scene", text: "A source with a transparent background, vertical or horizontal, in several styles." },
      { title: "Automatic multistream", text: "Detects which platforms you are live on and connects only those chats." },
      { title: "Read aloud", text: "Optional: reads messages with your operating system's voices, on your device." },
    ],
    googleTitle: "Sign in with Google (optional)",
    google: [
      "To get the YouTube chat instantly, you can sign in with your Google account from the plugin settings (YouTube tab). It is optional: without signing in, the plugin reads the public YouTube chat the same way the YouTube website does.",
      "AC Multichat requests a single, read-only permission: https://www.googleapis.com/auth/youtube.readonly. It only uses it to read the chat of the YouTube live streams you add and show it in OBS. It cannot post, delete or change anything on your channel, and it does not access your email or other account data.",
      "Data is processed on your device: Google tokens are stored on your computer and are never sent to the developer's servers. The data is not sold, not shared with third parties and not used for advertising.",
    ],
    privacyCta: "AC Multichat Privacy Policy",
    termsCta: "Terms of Service",
    contactTitle: "Contact and support",
    contact: `Questions or problems? Email me at ${email} or open an issue on GitHub.`,
  },
} as const;

const configDirs = {
  es: "en Windows, %APPDATA%\\obs-studio; en macOS, ~/Library/Application Support/obs-studio; en Linux, ~/.config/obs-studio",
  en: "on Windows, %APPDATA%\\obs-studio; on macOS, ~/Library/Application Support/obs-studio; on Linux, ~/.config/obs-studio",
};

export const multichatPrivacy: Record<Locale, LegalDoc> = {
  es: {
    title: "Política de privacidad de AC Multichat",
    description: "Qué datos usa AC Multichat, el plugin para OBS Studio, incluidos los datos de usuario de Google, cómo se guardan y cómo eliminarlos.",
    updated: "Actualizada: 20 de noviembre de 2026",
    intro:
      "Esta política explica cómo AC Multichat, el plugin gratuito y de código abierto para OBS Studio, accede, usa, guarda, comparte y elimina datos, incluidos los datos de usuario de Google cuando inicias sesión con Google. En resumen: AC Multichat solo pide permiso de lectura de YouTube, usa esos datos únicamente para mostrar en OBS el chat de tus directos, todo se procesa en tu equipo y los datos nunca llegan a servidores del desarrollador.",
    sections: [
      {
        heading: "1. Quién desarrolla AC Multichat",
        paragraphs: [
          `AC Multichat lo desarrolla Alejandro Grajales (AlejoxCode), persona natural con residencia en Colombia, responsable de esta política. Página de la app: https://www.alejoxcode.com/ac-multichat. Código fuente: ${MULTICHAT_REPO}. Contacto: ${email}.`,
        ],
      },
      {
        heading: "2. Cómo funciona",
        paragraphs: [
          "AC Multichat se instala en OBS Studio y funciona dentro de OBS, en tu computador. Muestra los chats de YouTube, Twitch, Kick, TikTok y Starvios en un panel de OBS y en fuentes para tu escena. No tiene cuentas propias, no usa telemetría ni analítica y no tiene servidores propios: el desarrollador no recibe ningún dato de su uso.",
        ],
      },
      {
        heading: "3. Datos de Google a los que accede",
        paragraphs: [
          "Iniciar sesión con Google es opcional y solo sirve para recibir el chat de YouTube al instante. Si inicias sesión, AC Multichat pide un único permiso (scope), de solo lectura: https://www.googleapis.com/auth/youtube.readonly. No pide acceso a tu correo, tu perfil, tus contactos ni ningún otro servicio de Google.",
          "Con ese permiso, AC Multichat usa la API de datos de YouTube para: (a) consultar el identificador del chat en vivo de los directos de YouTube que tú añades al plugin, y (b) recibir los mensajes de ese chat. De cada mensaje usa el texto, el tipo de evento (mensaje, Super Chat, Super Sticker o membresía), el nombre visible y el identificador del canal de quien escribe, sus insignias (propietario, moderador, miembro o verificado) y los avisos de mensajes eliminados o usuarios bloqueados.",
          "AC Multichat no consulta tus suscripciones, tus videos, tu historial ni otros datos de tu cuenta de YouTube.",
        ],
      },
      {
        heading: "4. Cómo usa los datos de Google",
        paragraphs: [
          "Los datos de Google se usan únicamente para la función que ves en el plugin: mostrar en OBS los mensajes del chat de tus directos de YouTube (en el panel y en las fuentes de tu escena), quitar de la pantalla los mensajes eliminados y los de usuarios bloqueados y, si activas la lectura en voz alta, leer los mensajes con las voces de tu sistema operativo, en tu equipo.",
          "Los datos de Google no se usan para publicidad, no se venden, no se usan para crear perfiles de usuarios, no se usan para entrenar modelos de inteligencia artificial y ninguna persona los lee o revisa.",
        ],
      },
      {
        heading: "5. Con quién se comparten",
        paragraphs: [
          "Con nadie. AC Multichat no transfiere ni comparte datos de usuario de Google con el desarrollador ni con terceros. Las únicas conexiones que hace con tu sesión de Google van a los servidores de Google (accounts.google.com, oauth2.googleapis.com y youtube.googleapis.com).",
          "Ten en cuenta que, si añades la fuente de chat a tu escena, los mensajes se verán en tu transmisión: eso lo decides tú, igual que cuando muestras el chat de YouTube en pantalla.",
        ],
      },
      {
        heading: "6. Dónde se guardan y cómo se protegen",
        paragraphs: [
          "El inicio de sesión se hace en tu navegador con OAuth 2.0 para apps de escritorio, con PKCE, y Google devuelve la respuesta a una dirección local de tu propio equipo (127.0.0.1). AC Multichat nunca ve tu contraseña de Google.",
          "El token de acceso solo se guarda en la memoria mientras OBS está abierto y caduca en aproximadamente una hora. El token de actualización (que permite pedir nuevos tokens de acceso) se guarda en tu equipo, en el archivo config.json de la carpeta plugin_config/obs-multichat dentro de la carpeta de configuración de OBS de tu usuario. Ningún token se envía a otro sitio que no sea Google, y todas las conexiones con Google usan HTTPS (cifradas con TLS).",
          "Los mensajes del chat solo se guardan en la memoria mientras OBS está abierto; no se escriben en el disco ni se envían a ningún servidor.",
        ],
      },
      {
        heading: "7. Conservación y eliminación",
        paragraphs: [
          "El token de actualización se conserva en tu equipo hasta que cierras sesión o Google lo invalida. Los mensajes del chat se borran al cerrar OBS.",
          `Para borrar tus datos de Google del equipo, abre los ajustes de Multichat en OBS, pestaña YouTube, y pulsa «Cerrar sesión»: el token de actualización se elimina del archivo de configuración. Desinstalar el plugin no borra ese archivo; para eliminarlo por completo, borra también la carpeta plugin_config/obs-multichat dentro de la carpeta de configuración de OBS (${configDirs.es}).`,
          `Como el desarrollador no recibe ni guarda datos de Google, no hay datos tuyos en servidores del desarrollador que eliminar. Si tienes dudas, escribe a ${email}.`,
        ],
      },
      {
        heading: "8. Cómo revocar el acceso",
        paragraphs: [
          "Puedes quitarle el permiso a AC Multichat en cualquier momento desde la configuración de tu cuenta de Google: https://myaccount.google.com/permissions. Al revocarlo, Google invalida el token y el plugin vuelve a leer el chat público de YouTube sin iniciar sesión.",
        ],
      },
      {
        heading: "9. Uso limitado de los datos de Google",
        paragraphs: [
          "El uso y la transferencia que AC Multichat hace de la información recibida de las APIs de Google cumple la Política de Datos de Usuario de los Servicios de API de Google (https://developers.google.com/terms/api-services-user-data-policy), incluidos los requisitos de uso limitado.",
          "AC Multichat usa los Servicios de la API de YouTube. Al usar esta integración aceptas los Términos de Servicio de YouTube (https://www.youtube.com/t/terms), y se aplica la Política de Privacidad de Google (https://policies.google.com/privacy).",
        ],
      },
      {
        heading: "10. Otras plataformas y servicios",
        paragraphs: [
          "Twitch, Kick, TikTok y Starvios no piden inicio de sesión: el plugin se conecta de forma anónima y de solo lectura para mostrar los mensajes del chat (texto, nombre de quien escribe, insignias y emotes) y saber si el canal está en directo. En TikTok, el identificador de la sala del canal que añades se envía a Euler Stream (https://www.eulerstream.com) para firmar la conexión al chat. Las fotos de perfil y los emotes se cargan de los servidores de imágenes de cada plataforma.",
          "Al abrir OBS, el plugin consulta la API de GitHub para saber si hay una versión nueva y, solo si aceptas, la descarga de GitHub.",
        ],
      },
      {
        heading: "11. Menores de edad",
        paragraphs: ["AC Multichat no está dirigido a menores de 13 años y no recopila a sabiendas datos de menores."],
      },
      {
        heading: "12. Cambios",
        paragraphs: ["Si esta política cambia, publicaré la nueva versión en esta página con su fecha de actualización."],
      },
      {
        heading: "13. Contacto",
        paragraphs: [`Para cualquier pregunta sobre esta política o sobre tus datos, escribe a ${email}.`],
      },
    ],
  },
  en: {
    title: "AC Multichat Privacy Policy",
    description: "What data AC Multichat, the OBS Studio plugin, uses, including Google user data, how it is stored and how to delete it.",
    updated: "Updated: November 20, 2026",
    intro:
      "This policy explains how AC Multichat, the free, open-source plugin for OBS Studio, accesses, uses, stores, shares and deletes data, including Google user data when you sign in with Google. In short: AC Multichat only requests read-only YouTube access, uses that data solely to show your live chat in OBS, everything is processed on your device, and the data never reaches the developer's servers.",
    sections: [
      {
        heading: "1. Who develops AC Multichat",
        paragraphs: [
          `AC Multichat is developed by Alejandro Grajales (AlejoxCode), an individual based in Colombia, who is responsible for this policy. App page: https://www.alejoxcode.com/en/ac-multichat. Source code: ${MULTICHAT_REPO}. Contact: ${email}.`,
        ],
      },
      {
        heading: "2. How it works",
        paragraphs: [
          "AC Multichat is installed in OBS Studio and runs inside OBS, on your computer. It shows the YouTube, Twitch, Kick, TikTok and Starvios chats in an OBS dock and in sources for your scene. It has no accounts of its own, uses no telemetry or analytics and has no servers of its own: the developer receives no data about its use.",
        ],
      },
      {
        heading: "3. Google data accessed",
        paragraphs: [
          "Signing in with Google is optional and only serves to get the YouTube chat instantly. If you sign in, AC Multichat requests a single, read-only permission (scope): https://www.googleapis.com/auth/youtube.readonly. It does not request access to your email, profile, contacts or any other Google service.",
          "With that permission, AC Multichat uses the YouTube Data API to: (a) look up the live chat ID of the YouTube live streams you add to the plugin, and (b) receive the messages of that chat. From each message it uses the text, the event type (message, Super Chat, Super Sticker or membership), the display name and channel ID of the author, their badges (owner, moderator, member or verified) and notices of deleted messages or banned users.",
          "AC Multichat does not access your subscriptions, videos, history or any other data in your YouTube account.",
        ],
      },
      {
        heading: "4. How Google data is used",
        paragraphs: [
          "Google data is used only for the feature you see in the plugin: showing the chat messages of your YouTube live streams in OBS (in the dock and in your scene sources), removing deleted messages and those of banned users from the screen and, if you turn on read-aloud, reading messages with your operating system's voices, on your device.",
          "Google data is not used for advertising, is not sold, is not used to build user profiles, is not used to train artificial intelligence models, and no person reads or reviews it.",
        ],
      },
      {
        heading: "5. Who it is shared with",
        paragraphs: [
          "No one. AC Multichat does not transfer or share Google user data with the developer or with third parties. The only connections it makes with your Google session go to Google's servers (accounts.google.com, oauth2.googleapis.com and youtube.googleapis.com).",
          "Note that if you add the chat source to your scene, the messages will appear on your broadcast: that is your choice, just like showing the YouTube chat on screen.",
        ],
      },
      {
        heading: "6. Where it is stored and how it is protected",
        paragraphs: [
          "Sign-in happens in your browser using OAuth 2.0 for desktop apps, with PKCE, and Google returns the response to a local address on your own device (127.0.0.1). AC Multichat never sees your Google password.",
          "The access token is only kept in memory while OBS is open and expires in about one hour. The refresh token (which lets the plugin request new access tokens) is stored on your device, in the config.json file of the plugin_config/obs-multichat folder inside your user's OBS configuration folder. No token is sent anywhere other than Google, and all connections to Google use HTTPS (encrypted with TLS).",
          "Chat messages are only kept in memory while OBS is open; they are not written to disk or sent to any server.",
        ],
      },
      {
        heading: "7. Retention and deletion",
        paragraphs: [
          "The refresh token is kept on your device until you sign out or Google invalidates it. Chat messages are cleared when you close OBS.",
          `To delete your Google data from your device, open the Multichat settings in OBS, go to the YouTube tab and click "Sign out": the refresh token is removed from the configuration file. Uninstalling the plugin does not delete that file; to remove it completely, also delete the plugin_config/obs-multichat folder inside OBS's configuration folder (${configDirs.en}).`,
          `Since the developer does not receive or store Google data, there is no data of yours on the developer's servers to delete. If you have questions, email ${email}.`,
        ],
      },
      {
        heading: "8. How to revoke access",
        paragraphs: [
          "You can remove AC Multichat's permission at any time from your Google Account settings: https://myaccount.google.com/permissions. When you revoke it, Google invalidates the token and the plugin goes back to reading the public YouTube chat without signing in.",
        ],
      },
      {
        heading: "9. Limited Use of Google data",
        paragraphs: [
          "AC Multichat's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.",
          "AC Multichat uses the YouTube API Services. By using this integration you agree to the YouTube Terms of Service (https://www.youtube.com/t/terms), and the Google Privacy Policy applies (https://policies.google.com/privacy).",
        ],
      },
      {
        heading: "10. Other platforms and services",
        paragraphs: [
          "Twitch, Kick, TikTok and Starvios require no sign-in: the plugin connects anonymously and read-only to show chat messages (text, author name, badges and emotes) and to know whether the channel is live. On TikTok, the room ID of the channel you add is sent to Euler Stream (https://www.eulerstream.com) to sign the chat connection. Profile pictures and emotes are loaded from each platform's image servers.",
          "When OBS opens, the plugin asks the GitHub API whether there is a new version and, only if you accept, downloads it from GitHub.",
        ],
      },
      {
        heading: "11. Children",
        paragraphs: ["AC Multichat is not directed at children under 13 and does not knowingly collect data from children."],
      },
      {
        heading: "12. Changes",
        paragraphs: ["If this policy changes, I will publish the new version on this page with its update date."],
      },
      {
        heading: "13. Contact",
        paragraphs: [`For any question about this policy or your data, email ${email}.`],
      },
    ],
  },
};
