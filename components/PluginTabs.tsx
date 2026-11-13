"use client";

import { Children, useEffect, useState } from "react";

type Tab = {
  id: string;
  label: string;
  count?: number;
  /** Ids de elementos dentro de la pestaña: un enlace #id abre la pestaña y baja hasta él. */
  anchors?: string[];
};

/**
 * Pestañas principales de la página (Plugins / Próximamente).
 * Los paneles se renderizan todos (ocultos) para que el contenido exista en el HTML.
 */
export function PageTabs({ tabs, label, children }: { tabs: Tab[]; label: string; children: React.ReactNode }) {
  const panels = Children.toArray(children);
  const [active, setActive] = useState(0);
  // Al salir de una pestaña se remonta su panel: así se detiene un video que estuviera sonando.
  const [epochs, setEpochs] = useState(() => tabs.map(() => 0));

  const show = (i: number) => {
    setActive((prev) => {
      if (prev !== i) setEpochs((e) => e.map((n, idx) => (idx === prev ? n + 1 : n)));
      return i;
    });
  };

  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const i = tabs.findIndex((t) => t.id === id || t.anchors?.includes(id));
      if (i < 0) return;
      show(i);
      // Espera a que el panel sea visible antes de bajar hasta el elemento.
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView()));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="sticky top-16 z-40 bg-ink/70 shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)] backdrop-blur-xl">
        <div role="tablist" aria-label={label} className="mx-auto flex max-w-[1200px] gap-1 px-4 py-2 sm:px-6">
          {tabs.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.id}
                role="tab"
                type="button"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                onClick={() => {
                  show(i);
                  history.replaceState(null, "", `#${t.id}`);
                }}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
                  on
                    ? "bg-brand-purple text-white shadow-[inset_0_1px_1px_rgb(255_255_255/0.25),0_8px_24px_-8px_rgb(102_58_243/0.7)]"
                    : "text-mist hover:bg-[rgb(186_214_247/0.06)] hover:text-white"
                }`}
              >
                {t.label}
                {t.count !== undefined && (
                  <span className={`rounded-full px-1.5 font-mono text-[10px] ${on ? "bg-white/20" : "bg-panel-2 text-muted"}`}>{t.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {panels.map((panel, i) => (
        <div
          key={`${tabs[i].id}-${epochs[i]}`}
          role="tabpanel"
          id={`panel-${tabs[i].id}`}
          aria-labelledby={`tab-${tabs[i].id}`}
          hidden={i !== active}
        >
          {panel}
        </div>
      ))}
    </>
  );
}
