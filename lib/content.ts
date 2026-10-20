// Todo el texto del sitio en español e inglés. Edita aquí.

export type Locale = "es" | "en";

export type Project = {
  name: string;
  kind: string;
  summary: string;
  highlights: string[];
  tags: string[];
  href: string;
  linkLabel: string;
  external: boolean;
};

export type Experience = { period: string; role: string; company: string; detail: string; current?: boolean };

const stack = [
  "Vue", "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Supabase", "PostgreSQL",
  "Node.js", "Zustand", "Gemini API", "Telegram Bot API", "Figma", "C++", "Git", "Vercel",
];

const es = {
  meta: {
    title: "Alejandro Grajales — Frontend Developer",
    description:
      "Frontend Developer Semi-Senior en Linktic, trabajando con Vue. Construyo productos web con Vue, React, Next.js y Supabase, con integraciones e IA. Más de 15 años de experiencia previa en diseño gráfico.",
  },
  nav: { about: "Sobre mí", projects: "Proyectos", experience: "Experiencia", obs: "OBS", contact: "Contacto" },
  hero: {
    eyebrow: "Frontend Developer Semi-Senior · Linktic",
    roles: ["Frontend Developer", "Vue · React · Next.js", "Productos web de punta a punta", "Diseño + código"],
    summary:
      "Estudié desarrollo de software y vengo de más de 15 años en diseño gráfico. Construyo interfaces cuidadas y productos completos: del diseño en Figma a la base de datos, con integraciones e IA.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Contacto",
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Del diseño al desarrollo de producto.",
    body: [
      "Desde septiembre de 2025 soy Frontend Developer Semi-Senior en Linktic, donde trabajo con Vue; en mis proyectos uso también React, Next.js y TypeScript. Estudié desarrollo de software y, antes, trabajé más de 15 años como diseñador gráfico y web. Esa base me permite llevar un diseño de Figma a una interfaz precisa y consistente, y proponer mejoras de experiencia de usuario.",
      "Más allá de la interfaz, construyo productos completos: bases de datos y autenticación con Supabase, integraciones con APIs externas, bots y procesos con IA. También soy graduado en música, y esa combinación de música y código terminó en un plugin para OBS.",
    ],
    facts: [
      { label: "Rol actual", value: "Frontend Developer Semi-Senior · Linktic" },
      { label: "Formación", value: "Desarrollo de software · Música" },
      { label: "Experiencia previa", value: "Diseño gráfico y web desde 2006" },
      { label: "Ubicación", value: "Colombia" },
    ],
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Proyectos destacados",
    intro: "Productos que diseñé y desarrollé, de la interfaz a la base de datos.",
    code: "Ver código",
    items: [
      {
        name: "Ventex",
        kind: "SaaS · Punto de venta",
        summary: "Plataforma multi-tenant de gestión de negocio que reúne punto de venta, inventario, finanzas y clientes en una sola app.",
        highlights: [
          "Turnos de caja con base inicial, arqueo y diferencias por método de pago",
          "Equipos con invitaciones y roles, con datos aislados por negocio",
          "Módulos según el tipo de negocio e instalable como PWA",
        ],
        tags: ["Next.js 16", "React 19", "Supabase", "Zustand", "Tailwind v4"],
        href: "https://github.com/alejox/ventex",
        linkLabel: "Ver código",
        external: true,
      },
      {
        name: "Cotejo",
        kind: "Fintech · Cambios de USDT",
        summary: "Control de operaciones de cambio de USDT, cotejadas con la contraparte, con comisiones y liquidaciones.",
        highlights: [
          "Precio de Binance P2P y TRM del día de la Superintendencia Financiera (datos.gov.co)",
          "Bot de Telegram: envías la foto del comprobante y se registra el movimiento",
          "IA (Gemini) que lee los recibos y extrae los datos para su revisión",
        ],
        tags: ["Next.js", "Supabase", "Gemini", "Telegram Bot API", "Binance P2P"],
        href: "https://github.com/alejox/control-cambios",
        linkLabel: "Ver código",
        external: true,
      },
      {
        name: "Devtecia",
        kind: "Web · Estudio de software",
        summary: "Sitio de Devtecia, estudio de software a la medida, con contenido en español e inglés.",
        highlights: [
          "Rutas por idioma (ES/EN) e imágenes Open Graph por página",
          "Panel de administración propio",
          "Formulario de contacto del lado del servidor con Resend y pruebas automatizadas",
        ],
        tags: ["Next.js", "i18n", "Supabase", "Resend"],
        href: "https://github.com/Devtecia/devtecia",
        linkLabel: "Ver código",
        external: true,
      },
      {
        name: "ENSAMA",
        kind: "E-commerce · Muebles",
        summary: "Tienda de muebles de fabricación propia para baño y organización, pensados para enviarse a toda Colombia y armarse en casa.",
        highlights: [
          "Catálogo por categorías, búsqueda y ficha de producto",
          "Carrito y checkout, con contacto por WhatsApp",
          "Páginas de envíos, cambios y preguntas frecuentes",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        href: "https://github.com/alejox/ensama",
        linkLabel: "Ver código",
        external: true,
      },
      {
        name: "OBS Now Playing",
        kind: "Plugin para OBS · C++",
        summary: "Plugin nativo para OBS Studio que muestra en el stream la canción que suena, con su carátula y controles.",
        highlights: [
          "Plugin en C++ con dock de control, overlay web y servidor en Node.js",
          "Windows y macOS, con releases automatizados en GitHub Actions",
          "Se actualiza solo desde OBS",
        ],
        tags: ["C++", "OBS API", "Node.js", "GitHub Actions"],
        href: "#obs",
        linkLabel: "Ver plugin",
        external: false,
      },
    ] satisfies Project[],
  },
  experience: {
    eyebrow: "Experiencia",
    title: "Trayectoria",
    now: "Actualidad",
    items: [
      { period: "Sep 2025 – Actualidad", role: "Frontend Developer Semi-Senior", company: "Linktic", detail: "Desarrollo frontend de productos web con Vue.", current: true },
      { period: "2022", role: "Frontend Vue Developer", company: "EOS Capital", detail: "Desarrollo web con Vue, HTML y CSS, implementando los diseños de Figma." },
      { period: "Formación", role: "Desarrollo de software", company: "Estudios", detail: "Formación en desarrollo de software, base de mi paso del diseño a la programación." },
      { period: "2006 – 2022", role: "Diseñador gráfico y web", company: "VITA AG SAS · Cuarta Dimensión · La Tribu", detail: "Diseño web en HTML y CSS, diseño vectorial, campañas publicitarias, animación 2D y edición de video." },
    ] satisfies Experience[],
  },
  obs: {
    eyebrow: "Proyecto personal · OBS & streaming",
    title: "Plugin para OBS Studio",
    intro: "Fuera del trabajo uno la música y el código en herramientas para streamers.",
    tagline: "Muestra en tu stream la canción que estás escuchando, con su carátula, sus colores y botones para controlarla.",
    players: "Spotify, YouTube Music, Apple Music y cualquier reproductor que reconozca tu sistema. Sin cuentas ni API keys.",
    free: "Gratis · MIT",
    repoLink: "Código, instalación y FAQ",
    imageAlt: "Overlay de OBS Now Playing mostrando la canción actual",
    downloads: [
      { label: "Windows", hint: "Instalador .exe (app + plugin)", platform: "windows" as const },
      { label: "macOS · Apple Silicon", hint: "App .zip", platform: "macos" as const },
      { label: "macOS · Intel", hint: "App .zip", platform: "macos" as const },
    ],
    features: [
      { title: "Colores de la carátula", text: "La tarjeta toma los colores de cada canción con una transición suave." },
      { title: "Sólida o glass", text: "Tarjeta sólida o translúcida, tema claro u oscuro, horizontal o vertical." },
      { title: "Modo video", text: "Con YouTube Music muestra el videoclip en lugar de la carátula, sincronizado." },
      { title: "Dock de control", text: "Anterior, pausa, siguiente y búsqueda de canciones dentro de OBS." },
    ],
    builtTitle: "Cómo está hecho",
    built: [
      "Plugin nativo en C++ sobre la API de OBS, con dock en Qt",
      "Servidor local en Node.js que detecta el reproductor del sistema",
      "Overlay en HTML/CSS como fuente de navegador",
      "Builds y releases para Windows y macOS con GitHub Actions",
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Hablamos?",
    text: "Con gusto converso sobre oportunidades, proyectos de producto o colaboraciones.",
    email: "Escríbeme",
  },
  footer: { site: "Sitio", built: "hecho con Next.js · desplegado en Vercel" },
  langLabel: "English",
  stack,
};

export type Content = typeof es;

const en: Content = {
  meta: {
    title: "Alejandro Grajales — Frontend Developer",
    description:
      "Mid-Level Frontend Developer at Linktic, working with Vue. I build web products with Vue, React, Next.js and Supabase, including integrations and AI. 15+ years of prior experience in graphic design.",
  },
  nav: { about: "About", projects: "Projects", experience: "Experience", obs: "OBS", contact: "Contact" },
  hero: {
    eyebrow: "Mid-Level Frontend Developer · Linktic",
    roles: ["Frontend Developer", "Vue · React · Next.js", "End-to-end web products", "Design + code"],
    summary:
      "I studied software development and bring 15+ years of graphic design experience. I build polished interfaces and complete products: from the Figma design to the database, with integrations and AI.",
    ctaProjects: "View projects",
    ctaContact: "Contact",
  },
  about: {
    eyebrow: "About",
    title: "From design to product development.",
    body: [
      "Since September 2025 I've been a Mid-Level Frontend Developer at Linktic, where I work with Vue; in my own projects I also use React, Next.js and TypeScript. I studied software development, and before that I spent 15+ years as a graphic and web designer. That background lets me turn a Figma design into a precise, consistent interface and suggest user experience improvements.",
      "Beyond the interface, I build complete products: databases and authentication with Supabase, integrations with external APIs, bots and AI-powered workflows. I also hold a degree in music, and mixing music with code led to a plugin for OBS.",
    ],
    facts: [
      { label: "Current role", value: "Mid-Level Frontend Developer · Linktic" },
      { label: "Education", value: "Software development · Music" },
      { label: "Prior experience", value: "Graphic & web design since 2006" },
      { label: "Location", value: "Colombia" },
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "Featured projects",
    intro: "Products I designed and built, from the interface to the database.",
    code: "View code",
    items: [
      {
        name: "Ventex",
        kind: "SaaS · Point of sale",
        summary: "Multi-tenant business management platform that brings point of sale, inventory, finance and customers into a single app.",
        highlights: [
          "Cash register shifts with opening float, cash count and differences by payment method",
          "Teams with invitations and roles, with data isolated per business",
          "Modules by business type, installable as a PWA",
        ],
        tags: ["Next.js 16", "React 19", "Supabase", "Zustand", "Tailwind v4"],
        href: "https://github.com/alejox/ventex",
        linkLabel: "View code",
        external: true,
      },
      {
        name: "Cotejo",
        kind: "Fintech · USDT exchange",
        summary: "Tracks USDT exchange operations, reconciled with the counterparty, including fees and settlements.",
        highlights: [
          "Binance P2P prices and the daily official COP rate (TRM) from Colombia's Financial Superintendence (datos.gov.co)",
          "Telegram bot: send a photo of the receipt and the transaction is recorded",
          "AI (Gemini) reads receipts and extracts the data for review",
        ],
        tags: ["Next.js", "Supabase", "Gemini", "Telegram Bot API", "Binance P2P"],
        href: "https://github.com/alejox/control-cambios",
        linkLabel: "View code",
        external: true,
      },
      {
        name: "Devtecia",
        kind: "Web · Software studio",
        summary: "Website for Devtecia, a custom software studio, with content in Spanish and English.",
        highlights: [
          "Per-language routes (ES/EN) and Open Graph images per page",
          "Custom admin panel",
          "Server-side contact form with Resend and automated tests",
        ],
        tags: ["Next.js", "i18n", "Supabase", "Resend"],
        href: "https://github.com/Devtecia/devtecia",
        linkLabel: "View code",
        external: true,
      },
      {
        name: "ENSAMA",
        kind: "E-commerce · Furniture",
        summary: "Online store for in-house bathroom and storage furniture, designed to ship anywhere in Colombia and be assembled at home.",
        highlights: [
          "Catalog by category, search and product pages",
          "Cart and checkout, with WhatsApp contact",
          "Shipping, returns and FAQ pages",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        href: "https://github.com/alejox/ensama",
        linkLabel: "View code",
        external: true,
      },
      {
        name: "OBS Now Playing",
        kind: "OBS plugin · C++",
        summary: "Native OBS Studio plugin that shows the song currently playing on stream, with cover art and controls.",
        highlights: [
          "C++ plugin with a control dock, web overlay and Node.js server",
          "Windows and macOS, with releases automated in GitHub Actions",
          "Updates itself from inside OBS",
        ],
        tags: ["C++", "OBS API", "Node.js", "GitHub Actions"],
        href: "#obs",
        linkLabel: "View plugin",
        external: false,
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "Career",
    now: "Present",
    items: [
      { period: "Sep 2025 – Present", role: "Mid-Level Frontend Developer", company: "Linktic", detail: "Frontend development of web products with Vue.", current: true },
      { period: "2022", role: "Frontend Vue Developer", company: "EOS Capital", detail: "Web development with Vue, HTML and CSS, implementing Figma designs." },
      { period: "Education", role: "Software development", company: "Studies", detail: "Software development studies, the foundation of my move from design to programming." },
      { period: "2006 – 2022", role: "Graphic & web designer", company: "VITA AG SAS · Cuarta Dimensión · La Tribu", detail: "Web design in HTML and CSS, vector design, advertising campaigns, 2D animation and video editing." },
    ],
  },
  obs: {
    eyebrow: "Side project · OBS & streaming",
    title: "A plugin for OBS Studio",
    intro: "Outside of work I combine music and code into tools for streamers.",
    tagline: "Shows the song you're listening to on your stream, with its cover art, its colors and buttons to control it.",
    players: "Spotify, YouTube Music, Apple Music and any player your system recognizes. No accounts, no API keys.",
    free: "Free · MIT",
    repoLink: "Code, install guide and FAQ",
    imageAlt: "OBS Now Playing overlay showing the current song",
    downloads: [
      { label: "Windows", hint: ".exe installer (app + plugin)", platform: "windows" as const },
      { label: "macOS · Apple Silicon", hint: "App .zip", platform: "macos" as const },
      { label: "macOS · Intel", hint: "App .zip", platform: "macos" as const },
    ],
    features: [
      { title: "Cover art colors", text: "The card takes the colors of each song's cover, with a smooth transition." },
      { title: "Solid or glass", text: "Solid or translucent card, light or dark theme, horizontal or vertical." },
      { title: "Video mode", text: "With YouTube Music it shows the music video instead of the cover, in sync." },
      { title: "Control dock", text: "Previous, pause, next and song search inside OBS." },
    ],
    builtTitle: "How it's built",
    built: [
      "Native C++ plugin on the OBS API, with a Qt dock",
      "Local Node.js server that detects the system's media player",
      "HTML/CSS overlay as a browser source",
      "Windows and macOS builds and releases with GitHub Actions",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    text: "Happy to chat about opportunities, product projects or collaborations.",
    email: "Email me",
  },
  footer: { site: "Site", built: "built with Next.js · deployed on Vercel" },
  langLabel: "Español",
  stack,
};

export const content: Record<Locale, Content> = { es, en };

export const localePath: Record<Locale, string> = { es: "/", en: "/en" };
