import Image from "next/image";
import { DownloadIcon, PlatformIcon } from "./Icons";

const scenes = ["Intro", "Live coding", "Vuelvo enseguida", "Outro"];
const sources = ["Cámara · Alejo", "Captura · VS Code", "Chat overlay", "Alertas"];
const channels = [
  { name: "Mic/Aux", d: "0.9s" },
  { name: "Escritorio", d: "1.4s" },
  { name: "Música", d: "1.1s" },
];

/** Ventana estilo OBS Studio (tarjeta central de vidrio) con la foto de Alejo en el preview. */
export function ObsWindow() {
  return (
    <div className="glass-deep overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)]">
        <span className="size-2.5 rounded-full bg-steel" />
        <span className="size-2.5 rounded-full bg-steel" />
        <span className="size-2.5 rounded-full bg-steel" />
        <span className="ml-3 truncate font-mono text-[11px] text-muted">OBS 31.0 — Escena: Live coding</span>
      </div>

      <div className="scanlines relative aspect-video overflow-hidden bg-[radial-gradient(ellipse_at_60%_20%,rgb(152_192_239/0.18),transparent_60%),#070914]">
        <div className="bg-grid absolute inset-0 opacity-70 [mask-image:none]" />
        <pre className="absolute left-4 top-4 hidden font-mono text-[10px] leading-relaxed text-muted/80 sm:block">
{`obs_register_source(&alejox_filter);
// v2.1.0 — build ok
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
          className="absolute bottom-0 right-[10%] h-[94%] w-auto object-contain object-bottom drop-shadow-[0_0_40px_rgba(152,192,239,.18)]"
        />
        <div className="bg-brand absolute right-3 top-3 flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-semibold tracking-wider text-white">
          <span className="rec-dot size-1.5 rounded-full bg-white" /> EN VIVO
        </div>
        <div className="absolute bottom-4 left-4 max-w-[55%] overflow-hidden rounded-md shadow-[inset_0_0_0_1px_rgb(186_215_247/0.16)] backdrop-blur-md">
          <div className="bg-[rgb(5_6_15/0.75)] px-3 py-1.5 text-sm font-medium text-ice">Alejo</div>
          <div className="bg-[rgb(186_214_247/0.08)] px-3 py-1 font-mono text-[10px] text-mist">dev · creador de plugins OBS</div>
        </div>
      </div>

      <div className="grid grid-cols-3 text-[11px] shadow-[inset_0_1px_0_rgb(186_215_247/0.08)]">
        <Dock title="Escenas">
          {scenes.map((s, i) => (
            <li key={s} className={`truncate rounded px-1.5 py-1 ${i === 1 ? "bg-panel-2 text-white" : "text-muted"}`}>{s}</li>
          ))}
        </Dock>
        <Dock title="Fuentes">
          {sources.map((s) => (
            <li key={s} className="truncate px-1.5 py-1 text-muted">{s}</li>
          ))}
        </Dock>
        <Dock title="Mezclador" last>
          {channels.map((c) => (
            <li key={c.name} className="px-1.5 py-1">
              <div className="mb-1 text-muted">{c.name}</div>
              <div className="meter h-1 overflow-hidden rounded-full bg-[rgb(186_214_247/0.08)]">
                <span style={{ ["--d" as string]: c.d }} />
              </div>
            </li>
          ))}
        </Dock>
      </div>
    </div>
  );
}

function Dock({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`p-2.5 ${last ? "" : "shadow-[inset_-1px_0_0_rgb(186_215_247/0.08)]"}`}>
      <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted/70">{title}</div>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

/** Tarjeta flotante izquierda: descarga por plataforma (estilo botones de proveedor). */
function DownloadMock() {
  return (
    <div className="glass-deep w-64 p-5">
      <p className="text-[15px] font-medium text-ice">Scene Autopilot</p>
      <p className="mt-1 text-xs text-muted">v1.4.2 · OBS 30+</p>
      <div className="mt-4 space-y-2">
        {(["windows", "macos", "linux"] as const).map((p) => (
          <div key={p} className="btn-ghost w-full justify-start px-4 py-2.5 text-[13px]">
            <PlatformIcon platform={p} width={14} height={14} />
            <span className="flex-1 text-left">{p === "macos" ? "macOS" : p[0].toUpperCase() + p.slice(1)}</span>
            <DownloadIcon width={14} height={14} className="text-muted" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.1em] text-muted">
        <span className="h-px flex-1 bg-line" />o<span className="h-px flex-1 bg-line" />
      </div>
      <div className="btn-primary mt-4 w-full py-2.5 text-[13px]">Descargar todo</div>
    </div>
  );
}

/** Tarjeta flotante derecha: ajustes de un overlay. */
function SettingsMock() {
  return (
    <div className="glass-deep w-64 p-5">
      <p className="text-[15px] font-medium text-ice">Neon Chat Overlay</p>
      <p className="mt-1 text-xs text-muted">Propiedades de la fuente</p>
      <div className="mt-4 space-y-3 text-xs">
        {[
          ["URL", "localhost:8080/chat"],
          ["Ancho", "1920"],
        ].map(([l, v]) => (
          <div key={l}>
            <div className="mb-1 text-mist">{l}</div>
            <div className="rounded-md bg-[rgb(199_211_234/0.06)] px-2.5 py-2 font-mono text-white shadow-[inset_0_0_0_1px_rgb(186_215_247/0.12)]">{v}</div>
          </div>
        ))}
        <div>
          <div className="mb-1.5 text-mist">Tema</div>
          <div className="flex gap-1">
            {["#663af3", "#98c0ef", "#d8ecf8", "#2f343e"].map((c, i) => (
              <span key={c} className={`size-5 rounded-md ${i === 0 ? "ring-1 ring-white/60 ring-offset-2 ring-offset-ink" : ""}`} style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Composición en abanico: dos tarjetas inclinadas detrás de la ventana central. */
export function ObsHero() {
  return (
    <div className="relative mx-auto w-full max-w-[1100px]">
      <div className="absolute left-1/2 top-1/2 -z-10 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(152_192_239/0.12)] blur-[100px]" />
      <div className="absolute left-0 top-16 hidden -rotate-6 opacity-80 lg:block">
        <DownloadMock />
      </div>
      <div className="absolute right-0 top-24 hidden rotate-6 opacity-80 lg:block">
        <SettingsMock />
      </div>
      <div className="float relative z-10 mx-auto max-w-[620px]">
        <ObsWindow />
      </div>
    </div>
  );
}
