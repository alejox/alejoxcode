"use client";

import { useEffect, useState } from "react";

/** Barra fija con píldoras para saltar entre secciones; resalta la sección visible. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      // Cuenta como "visible" la sección que cruza una franja bajo la barra.
      { rootMargin: "-25% 0px -65% 0px" }
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-16 z-40 bg-ink/70 shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)] backdrop-blur-xl">
      <ul className="mx-auto flex max-w-[1200px] justify-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {items.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              aria-current={current === id ? "true" : undefined}
              className={`block rounded-full px-4 py-1.5 text-[13px] transition ${
                current === id ? "hairline bg-[rgb(186_214_247/0.08)] text-white" : "text-mist hover:text-white"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
