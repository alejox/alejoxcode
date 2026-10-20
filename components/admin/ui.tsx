"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const field =
  "w-full rounded-xl border border-line bg-ink px-3 py-2.5 text-sm outline-none transition focus:border-brand-violet";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
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
    primary: "bg-brand text-white hover:brightness-110",
    ghost: "border border-line bg-panel hover:border-brand-violet",
    danger: "border border-live/40 text-live hover:bg-live/10",
  }[variant];
  return (
    <button {...p} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${styles} ${p.className ?? ""}`}>
      {children}
    </button>
  );
}

export function Card({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-panel">
      <header className="flex items-center justify-between border-b border-line px-5 py-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{title}</h2>
        {actions}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
