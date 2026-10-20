import Image from "next/image";

type Orbit = { size: number; duration: number; reverse?: boolean; chips: string[] };

const orbits: Orbit[] = [
  { size: 46, duration: 26, chips: ["Next.js", "Vue"] },
  { size: 72, duration: 40, reverse: true, chips: ["TypeScript", "Supabase", "React"] },
  { size: 98, duration: 60, chips: ["Figma", "OBS", "Gemini", "Tailwind"] },
];

const snippets = [
  { text: "const dev = 'alejox';", x: "4%", y: "14%", delay: "0s" },
  { text: "<Stream live />", x: "68%", y: "8%", delay: "2.2s" },
  { text: "npm run build ✓", x: "70%", y: "86%", delay: "4.1s" },
  { text: "obs_register_source()", x: "2%", y: "82%", delay: "6s" },
];

/** Composición de motion graphics del hero: órbitas con el stack y el logo dibujándose. */
export function HeroMotion() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[330px] select-none sm:max-w-[520px]" aria-hidden>
      {/* halo */}
      <div className="pulse-glow absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgb(102_58_243/0.35),rgb(152_192_239/0.12)_45%,transparent_70%)] blur-2xl" />

      {/* órbitas: anillo que gira > brazo con ángulo fijo > chip que contrarresta el giro */}
      {orbits.map((o, i) => (
        <div key={i} className="absolute inset-0 grid place-items-center">
          <div
            className="orbit relative rounded-full"
            style={{
              width: `${o.size}%`,
              height: `${o.size}%`,
              ["--dur" as string]: `${o.duration}s`,
              ["--dir" as string]: o.reverse ? "reverse" : "normal",
              ["--dir-inv" as string]: o.reverse ? "normal" : "reverse",
            }}
          >
            {o.chips.map((c, j) => {
              const angle = (360 / o.chips.length) * j + i * 30;
              return (
                <div key={c} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="orbit-chip">
                      <span
                        className="glass-deep block whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] text-frost"
                        style={{ transform: `rotate(${-angle}deg)` }}
                      >
                        {c}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* núcleo: logo + triángulo que se dibuja */}
      <div className="absolute left-1/2 top-1/2 grid size-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center">
        <div className="icon-tile absolute inset-0 bg-ink" />
        <svg viewBox="0 0 100 100" className="absolute inset-[-14%] h-[128%] w-[128%] overflow-visible">
          <defs>
            <linearGradient id="draw-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#663af3" />
              <stop offset="1" stopColor="#98c0ef" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="49" fill="none" stroke="rgb(186 215 247 / .12)" strokeWidth=".5" strokeDasharray="1 3" className="spin-slow origin-center" />
          <path d="M50 8 L94 88 L6 88 Z" fill="none" stroke="url(#draw-grad)" strokeWidth="1.2" strokeLinejoin="round" className="draw-path" pathLength={100} />
        </svg>
        <Image src="/img/logo.png" alt="" width={120} height={120} priority className="logo-pop relative w-[62%]" />
      </div>

      {/* línea de escaneo */}
      <div className="scan-line absolute inset-x-[12%] h-px bg-linear-to-r from-transparent via-[rgb(186_215_247/0.5)] to-transparent" />

      {/* fragmentos de código */}
      {snippets.map((s) => (
        <span
          key={s.text}
          className="snippet absolute hidden font-mono text-[11px] text-mist sm:block"
          style={{ left: s.x, top: s.y, animationDelay: s.delay }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
