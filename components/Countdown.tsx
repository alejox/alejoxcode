"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Cuenta regresiva (horas : minutos : segundos) hasta `target`. Al llegar a cero muestra `doneLabel`. */
export function Countdown({
  target,
  label,
  doneLabel,
  units,
}: {
  target: string;
  label: string;
  doneLabel: string;
  units: [string, string, string];
}) {
  // null hasta montar: el servidor no conoce la hora del visitante.
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = Date.parse(target);
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left === 0) {
    return <p className="rounded-xl bg-panel-2 px-4 py-3 text-center text-sm font-medium text-frost">{doneLabel}</p>;
  }

  const total = left === null ? null : Math.floor(left / 1000);
  const parts = total === null ? ["--", "--", "--"] : [pad(Math.floor(total / 3600)), pad(Math.floor((total % 3600) / 60)), pad(total % 60)];

  return (
    <div className="hairline rounded-xl bg-[rgb(186_214_247/0.04)] px-4 py-3">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{label}</p>
      <div className="mt-2 flex items-start justify-center gap-2" role="timer" aria-live="off">
        {parts.map((value, i) => (
          <div key={units[i]} className="flex items-start gap-2">
            {i > 0 && <span className="font-display text-3xl leading-none text-muted">:</span>}
            <div className="text-center">
              <span className="block font-display text-3xl font-medium leading-none tabular-nums text-ice">{value}</span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{units[i]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
