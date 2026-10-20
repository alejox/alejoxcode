"use client";

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { browserSupabase } from "@/lib/supabase";
import { PluginsAdmin } from "./PluginsAdmin";
import { PostsAdmin } from "./PostsAdmin";
import { ReleasesAdmin } from "./ReleasesAdmin";
import { Button, Card, Field, Input } from "./ui";

type Tab = "plugins" | "releases" | "posts";

export function AdminPanel() {
  const sb = browserSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("releases");

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [sb]);

  useEffect(() => {
    if (!sb || !session) return setIsAdmin(null);
    sb.from("admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [sb, session]);

  if (!sb) {
    return (
      <Shell>
        <Card title="Configuración requerida">
          <p className="text-sm text-muted">
            Agrega <code className="font-mono text-white">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code className="font-mono text-white">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en Vercel (o en{" "}
            <code className="font-mono text-white">.env.local</code>) y vuelve a desplegar. Revisa el README.
          </p>
        </Card>
      </Shell>
    );
  }

  if (!session) return <Shell><Login sb={sb} /></Shell>;

  if (isAdmin === false) {
    return (
      <Shell>
        <Card title="Sin permisos">
          <p className="text-sm text-muted">
            Tu usuario (<span className="text-white">{session.user.email}</span>) no es administrador. Ejecuta en el SQL
            Editor de Supabase:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-ink p-3 font-mono text-xs text-brand-cyan">
            {`insert into public.admins (user_id) values ('${session.user.id}');`}
          </pre>
          <Button variant="ghost" className="mt-4" onClick={() => sb.auth.signOut()}>Cerrar sesión</Button>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell
      right={
        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="hidden sm:inline">{session.user.email}</span>
          <Button variant="ghost" onClick={() => sb.auth.signOut()}>Salir</Button>
        </div>
      }
    >
      <div className="mb-6 flex gap-1 rounded-xl border border-line bg-panel p-1">
        {([
          ["releases", "⬆ Subir versión"],
          ["plugins", "⚙ Plugins"],
          ["posts", "✎ Posts"],
        ] as [Tab, string][]).map(([t, l]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm ${tab === t ? "bg-brand text-white" : "text-muted hover:text-white"}`}
          >
            {l}
          </button>
        ))}
      </div>
      {isAdmin === null ? (
        <p className="text-muted">Cargando…</p>
      ) : tab === "plugins" ? (
        <PluginsAdmin sb={sb} />
      ) : tab === "releases" ? (
        <ReleasesAdmin sb={sb} />
      ) : (
        <PostsAdmin sb={sb} />
      )}
    </Shell>
  );
}

function Shell({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="rounded-md bg-panel-2 px-2 py-0.5 font-mono text-xs text-brand-cyan">admin</span>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Login({ sb }: { sb: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto max-w-sm">
      <Card title="Iniciar sesión">
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            const { error } = await sb.auth.signInWithPassword({ email, password });
            if (error) setError(error.message);
            setLoading(false);
          }}
        >
          <Field label="Email">
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Contraseña">
            <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          {error && <p className="text-sm text-live">{error}</p>}
          <Button className="w-full" disabled={loading}>{loading ? "Entrando…" : "Entrar"}</Button>
        </form>
      </Card>
    </div>
  );
}
