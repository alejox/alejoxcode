// Contenido de la hoja de vida: edítalo libremente.

export const roles = ["Frontend developer", "Diseñador gráfico", "Músico", "Creador de herramientas para OBS"];

export const stack = [
  "Next.js", "React", "Vue", "TypeScript", "JavaScript", "Tailwind CSS", "Supabase", "Node.js",
  "Drizzle", "Zustand", "Python", "C / C++", "Figma", "DaVinci Resolve", "OBS Studio",
];

export const facts = [
  { label: "Base", value: "Colombia" },
  { label: "Formación", value: "Diseño gráfico · Música" },
  { label: "Enfoque", value: "Frontend & producto" },
  { label: "Estilo", value: "Autodidacta" },
];

export const experience = [
  {
    year: "2022",
    role: "Frontend Vue Developer",
    company: "EOS Capital",
    detail: "Desarrollo web con HTML, CSS y Vue, llevando a código los diseños de Figma.",
  },
  {
    year: "2016",
    role: "Web Graphic Designer",
    company: "VITA AG SAS",
    detail: "Diseño web en HTML y CSS, diseño vectorial, fotomontajes y campañas publicitarias.",
  },
  {
    year: "2008",
    role: "Graphic Designer",
    company: "Cuarta Dimensión",
    detail: "Diseño web en HTML y CSS, diseño vectorial, fotomontajes y campañas publicitarias.",
  },
  {
    year: "2006",
    role: "Graphic Designer",
    company: "La Tribu",
    detail: "Diseño vectorial, fotomontajes, campañas, animación 2D, edición de video e impresos.",
  },
];

export type Project = {
  name: string;
  kind: string;
  description: string;
  tags: string[];
  repo: string;
};

export const projects: Project[] = [
  {
    name: "Ventex",
    kind: "Producto · SaaS",
    description: "Plataforma multi-tenant de gestión de negocio: punto de venta, inventario, finanzas y clientes en una sola app, con datos aislados por usuario.",
    tags: ["Next.js 16", "React 19", "Supabase", "Zustand"],
    repo: "https://github.com/alejox/ventex",
  },
  {
    name: "Cotejo",
    kind: "Producto · Fintech",
    description: "Registro de cambios a USDT cotejados con la contraparte, para llevar el control de cada operación.",
    tags: ["Next.js", "Supabase", "Tailwind"],
    repo: "https://github.com/alejox/control-cambios",
  },
  {
    name: "Panel de revendedores",
    kind: "Producto · Dashboard",
    description: "Panel de administración con acceso por roles para gestionar una red de revendedores.",
    tags: ["Next.js", "Drizzle ORM", "Tailwind"],
    repo: "https://github.com/alejox/super-reseller",
  },
  {
    name: "Balance MGS",
    kind: "Producto · Finanzas",
    description: "Sistema de gestión financiera para llevar balances de forma clara, con integración a la API de Binance.",
    tags: ["Next.js", "Supabase", "Binance API"],
    repo: "https://github.com/alejox/mgs-balance",
  },
  {
    name: "ENSAMA",
    kind: "Web · E-commerce",
    description: "Tienda de muebles de fabricación propia para baño y organización, pensados para enviarse a toda Colombia y armarse en casa.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    repo: "https://github.com/alejox/ensama",
  },
  {
    name: "Devtecia",
    kind: "Web · Agencia",
    description: "Sitio de Devtecia con formulario de contacto seguro del lado del servidor y pruebas automatizadas.",
    tags: ["Next.js", "Resend", "Node test"],
    repo: "https://github.com/Devtecia/devtecia",
  },
  {
    name: "Oleada TV",
    kind: "Web · Landing",
    description: "Landing de streaming para Latinoamérica con planes, catálogo y red de distribuidores, optimizada para SEO.",
    tags: ["Next.js", "SEO", "Tailwind"],
    repo: "https://github.com/alejox/ole-tv",
  },
  {
    name: "Stella TV",
    kind: "Web · Landing",
    description: "Sitio de planes y precios con contenido estructurado y metadatos SEO por página.",
    tags: ["Next.js", "SEO", "Tailwind"],
    repo: "https://github.com/alejox/stell",
  },
];

/** Herramientas para creadores de contenido (video y audio). */
export const creatorTools: Project[] = [
  {
    name: "Silence Cutter",
    kind: "DaVinci Resolve · Python",
    description: "Corta silencios, transcribe con Whisper y genera guión y subtítulos ajustados a los recortes; arma la timeline en Resolve.",
    tags: ["Python", "ffmpeg", "faster-whisper"],
    repo: "https://github.com/alejox/resolve-silence-cutter",
  },
  {
    name: "Podvoice Enhance",
    kind: "DaVinci Resolve · Audio",
    description: "Limpia y mejora la voz al estilo podcast sin salir de Resolve: reducción de ruido, de-esser, EQ, compresión y LUFS, con vista previa A/B.",
    tags: ["Python", "FFmpeg", "DSP"],
    repo: "https://github.com/alejox/Podvoice",
  },
  {
    name: "Color DaVinci",
    kind: "LUTs · iPhone 16",
    description: "LUTs .cube para pasar material Apple Log del iPhone 16 a Rec.709: Neutral, Punchy y Bright, generadas por script.",
    tags: ["Color", "Apple Log", "Python"],
    repo: "https://github.com/alejox/Color-davinci",
  },
];
