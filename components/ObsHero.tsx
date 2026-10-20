import Image from "next/image";

const scenes = ["🎙 Intro", "💻 Live coding", "☕ Vuelvo enseguida", "👋 Outro"];
const sources = ["Cámara · Alejo", "Captura · VS Code", "Chat overlay", "Alertas"];
const channels = [
  { name: "Mic/Aux", d: "0.9s" },
  { name: "Escritorio", d: "1.4s" },
  { name: "Música", d: "1.1s" },
];

/** Ventana estilo OBS Studio con la foto de Alejo en el canvas de preview. */
export function ObsHero() {
  return (
    <div className="float relative w-full max-w-xl">
      <div className="absolute -inset-10 -z-10 rounded-full bg-brand-purple/30 blur-3xl" />
      <div className="glow overflow-hidden rounded-2xl border border-line bg-panel">
        {/* Barra de título */}
        <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted">OBS 31.0 · Perfil: AlejoxCode · Escena: Live coding</span>
        </div>

        {/* Preview */}
        <div className="scanlines relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_70%_30%,#3f7bc455,transparent_55%),radial-gradient(circle_at_20%_80%,#652d9088,transparent_60%),#0b0616]">
          <div className="bg-grid absolute inset-0" />
          {/* Código de fondo */}
          <pre className="absolute left-4 top-4 hidden font-mono text-[10px] leading-relaxed text-brand-cyan/60 sm:block">
{`obs_register_source(&alejox_filter);
// v2.1.0 — build ok ✓
const plugin = await obs.load(
  "neon-chat-overlay"
);`}
          </pre>
          <Image
            src="/img/alejo-front.webp"
            alt="Alejo"
            width={900}
            height={1578}
            priority
            className="absolute bottom-0 right-6 h-[115%] w-auto object-contain object-bottom drop-shadow-[0_0_30px_rgba(79,209,255,.25)]"
          />
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-live px-2 py-1 text-[11px] font-bold tracking-wider sm:left-auto sm:right-3">
            <span className="rec-dot size-2 rounded-full bg-white" /> EN VIVO
          </div>
          {/* Lower third */}
          <div className="absolute bottom-4 left-4 max-w-[55%]">
            <div className="bg-brand rounded-t-md px-3 py-1 text-sm font-bold">Alejo</div>
            <div className="rounded-b-md bg-ink/85 px-3 py-1 font-mono text-[11px] text-brand-cyan backdrop-blur">
              dev · creador de plugins OBS
            </div>
          </div>
        </div>

        {/* Docks */}
        <div className="grid grid-cols-3 gap-px bg-line text-[11px]">
          <Dock title="Escenas">
            {scenes.map((s, i) => (
              <li key={s} className={`truncate rounded px-1.5 py-1 ${i === 1 ? "bg-brand-purple/50 text-white" : "text-muted"}`}>
                {s}
              </li>
            ))}
          </Dock>
          <Dock title="Fuentes">
            {sources.map((s) => (
              <li key={s} className="flex items-center gap-1 truncate px-1.5 py-1 text-muted">
                <span className="text-brand-cyan">👁</span> {s}
              </li>
            ))}
          </Dock>
          <Dock title="Mezclador">
            {channels.map((c) => (
              <li key={c.name} className="px-1.5 py-1">
                <div className="mb-1 text-muted">{c.name}</div>
                <div className="meter h-1.5 overflow-hidden rounded bg-ink">
                  <span style={{ ["--d" as string]: c.d }} />
                </div>
              </li>
            ))}
          </Dock>
        </div>
      </div>
    </div>
  );
}

function Dock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-panel p-2">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted/70">{title}</div>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}
