"use client";

import { useEffect, useState } from "react";

/**
 * Muestra `before` hasta la fecha `at` y `after` desde ese momento, sin recargar la página.
 * La página es estática, así que el cambio se decide en el navegador del visitante.
 */
export function UnlockAt({ at, before, after }: { at: string; before: React.ReactNode; after: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const ms = Date.parse(at) - Date.now();
    if (ms <= 0) {
      setUnlocked(true);
      return;
    }
    const id = setTimeout(() => setUnlocked(true), ms);
    return () => clearTimeout(id);
  }, [at]);

  return <>{unlocked ? after : before}</>;
}
