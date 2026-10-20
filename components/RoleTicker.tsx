"use client";

import { useEffect, useState } from "react";

/** Rota los roles con una transición vertical. */
export function RoleTicker({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-grid h-[1.3em] justify-items-center overflow-hidden align-bottom lg:justify-items-start">
      {roles.map((r, n) => (
        <span
          key={r}
          className="col-start-1 row-start-1 whitespace-nowrap text-frost transition-all duration-500 ease-out"
          style={{
            transform: `translateY(${n === i ? 0 : n === (i - 1 + roles.length) % roles.length ? -110 : 110}%)`,
            opacity: n === i ? 1 : 0,
          }}
        >
          {r}
        </span>
      ))}
    </span>
  );
}
