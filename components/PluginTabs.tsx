"use client";

import { Children, useEffect, useState } from "react";

type Tab = { slug: string; name: string; version: string };

const TAB_ICON: Record<string, React.ReactNode> = {
  "obs-now-playing": (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </>
  ),
  "multi-chat": <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  "goal-bar": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
};

const FALLBACK_ICON = <path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5" />;

/**
 * Selector de plugins: una pestaña por plugin y un solo panel visible.
 * Todos los paneles se renderizan (ocultos) para que el contenido exista en el HTML.
 * `#slug` en la URL abre la pestaña de ese plugin.
 */
export function PluginTabs({ tabs, label, children }: { tabs: Tab[]; label: string; children: React.ReactNode }) {
  const panels = Children.toArray(children);
  const [active, setActive] = useState(0);
  // Al salir de una pestaña se remonta su panel: así se detiene un video que estuviera sonando.
  const [epochs, setEpochs] = useState(() => tabs.map(() => 0));

  const select = (i: number, updateHash = true) => {
    if (i === active) return;
    setEpochs((e) => e.map((n, idx) => (idx === active ? n + 1 : n)));
    setActive(i);
    if (updateHash) history.replaceState(null, "", `#${tabs[i].slug}`);
  };

  useEffect(() => {
    const fromHash = () => {
      const i = tabs.findIndex((t) => `#${t.slug}` === location.hash);
      if (i >= 0) {
        setActive(i);
        document.getElementById("plugins")?.scrollIntoView();
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  return (
    <div>
      <div role="tablist" aria-label={label} className="hairline grid grid-cols-3 gap-1 rounded-2xl bg-[rgb(186_214_247/0.03)] p-1 sm:rounded-full">
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.slug}
              role="tab"
              type="button"
              id={`tab-${t.slug}`}
              aria-selected={on}
              aria-controls={`panel-${t.slug}`}
              onClick={() => select(i)}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center transition sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-4 ${
                on
                  ? "bg-brand-purple text-white shadow-[inset_0_1px_1px_rgb(255_255_255/0.25),0_8px_24px_-8px_rgb(102_58_243/0.7)]"
                  : "text-mist hover:bg-[rgb(186_214_247/0.06)] hover:text-white"
              }`}
            >
              <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
                {TAB_ICON[t.slug] ?? FALLBACK_ICON}
              </svg>
              <span className="text-[12px] font-medium leading-tight sm:text-sm">{t.name}</span>
              <span className={`hidden font-mono text-[10px] sm:inline ${on ? "text-white/70" : "text-muted"}`}>v{t.version}</span>
            </button>
          );
        })}
      </div>

      {panels.map((panel, i) => (
        <div
          key={`${tabs[i].slug}-${epochs[i]}`}
          role="tabpanel"
          id={`panel-${tabs[i].slug}`}
          aria-labelledby={`tab-${tabs[i].slug}`}
          hidden={i !== active}
          className="mt-4"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
