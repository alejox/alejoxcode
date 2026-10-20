"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const field =
  "w-full rounded-md bg-[rgb(199_211_234/0.06)] px-3 py-2.5 text-sm text-white shadow-[inset_0_0_0_1px_rgb(186_215_247/0.12)] outline-none transition placeholder:text-mist/60 focus:shadow-[inset_0_0_0_1px_rgb(186_215_247/0.3)]";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-mist">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`${field} ${p.className ?? ""}`} />;
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea rows={6} {...p} className={`${field} font-mono ${p.className ?? ""}`} />
);
export const Select = (p: SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={`${field} ${p.className ?? ""}`} />;

export function Button({
  children,
  variant = "primary",
  ...p
}: { variant?: "primary" | "ghost" | "danger" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    danger: "btn-ghost text-live",
  }[variant];
  return (
    <button {...p} className={`rounded-full px-4 py-2.5 text-sm font-medium transition disabled:opacity-50 ${styles} ${p.className ?? ""}`}>
      {children}
    </button>
  );
}

export function Card({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="glass">
      <header className="flex items-center justify-between px-6 py-4 shadow-[inset_0_-1px_0_rgb(186_215_247/0.08)]">
        <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-mist">{title}</h2>
        {actions}
      </header>
      <div className="p-6">{children}</div>
    </section>
  );
}
