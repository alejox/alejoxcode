"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import type { Category, Plugin } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { removeIfStored, uploadPublic } from "./storage";
import { Button, Card, Field, Input, Select, Textarea } from "./ui";

type Form = {
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  category: Category;
  tags: string;
  repo_url: string;
  cover_url: string;
  description: string;
  featured: boolean;
  published: boolean;
};

const empty: Form = {
  name: "",
  slug: "",
  tagline: "",
  category: "plugin",
  tags: "",
  repo_url: "",
  cover_url: "",
  description: "",
  featured: false,
  published: true,
};

export function PluginsAdmin({ sb }: { sb: SupabaseClient }) {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [form, setForm] = useState<Form>(empty);
  const [cover, setCover] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data } = await sb.from("plugins").select("*, releases(*)").order("created_at", { ascending: false });
    setPlugins((data ?? []) as Plugin[]);
  }, [sb]);

  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const slug = form.slug || slugify(form.name);
      let cover_url = form.cover_url || null;
      if (cover) cover_url = await uploadPublic(sb, "media", `plugins/${slug}/${Date.now()}-${cover.name}`, cover);
      const row = {
        name: form.name,
        slug,
        tagline: form.tagline || null,
        category: form.category,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        repo_url: form.repo_url || null,
        cover_url,
        description: form.description || null,
        featured: form.featured,
        published: form.published,
      };
      const { error } = form.id
        ? await sb.from("plugins").update(row).eq("id", form.id)
        : await sb.from("plugins").insert(row);
      if (error) throw error;
      setStatus(form.id ? "✓ Plugin actualizado" : "✓ Plugin creado. Ahora sube su primera versión.");
      setForm(empty);
      setCover(null);
      load();
    } catch (err) {
      setStatus(`✗ ${(err as Error).message}`);
    }
    setBusy(false);
  }

  async function remove(p: Plugin) {
    if (!confirm(`¿Eliminar "${p.name}" y todas sus versiones?`)) return;
    for (const r of p.releases) await removeIfStored(sb, r.file_url);
    await removeIfStored(sb, p.cover_url);
    const { error } = await sb.from("plugins").delete().eq("id", p.id);
    setStatus(error ? `✗ ${error.message}` : "✓ Eliminado");
    load();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <Card
        title={form.id ? `Editar · ${form.name}` : "Nuevo plugin / recurso"}
        actions={form.id && <button className="text-xs text-muted hover:text-white" onClick={() => setForm(empty)}>+ nuevo</button>}
      >
        <form onSubmit={save} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre">
              <Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: f.id ? f.slug : slugify(e.target.value) }))} />
            </Field>
            <Field label="Slug (URL)" hint={`/obs/${form.slug || "mi-plugin"}`}>
              <Input required value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
            </Field>
          </div>
          <Field label="Descripción corta">
            <Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} maxLength={160} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Categoría">
              <Select value={form.category} onChange={(e) => set("category", e.target.value as Category)}>
                {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </Select>
            </Field>
            <Field label="Tags" hint="Separados por comas">
              <Input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="chat, twitch" />
            </Field>
          </div>
          <Field label="Repositorio (opcional)">
            <Input type="url" value={form.repo_url} onChange={(e) => set("repo_url", e.target.value)} placeholder="https://github.com/…" />
          </Field>
          <Field label="Portada" hint="Sube una imagen o pega una URL. 16:9 recomendado.">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
              <Input type="url" value={form.cover_url} onChange={(e) => set("cover_url", e.target.value)} placeholder="https://…" />
            </div>
          </Field>
          <Field label="Descripción (Markdown)">
            <Textarea rows={10} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> Destacado</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} /> Publicado</label>
          </div>
          <div className="flex items-center gap-4">
            <Button disabled={busy}>{busy ? "Guardando…" : form.id ? "Guardar cambios" : "Crear plugin"}</Button>
            {status && <span className="text-sm text-muted">{status}</span>}
          </div>
        </form>
      </Card>

      <Card title={`Tus recursos (${plugins.length})`}>
        <ul className="divide-y divide-line">
          {plugins.map((p) => (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {p.name} {!p.published && <span className="text-xs text-yellow-300">(borrador)</span>}
                </p>
                <p className="font-mono text-xs text-muted">{CATEGORY_LABEL[p.category]} · {p.releases.length} archivos</p>
              </div>
              <button
                className="text-xs text-brand-cyan hover:underline"
                onClick={() =>
                  setForm({
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    tagline: p.tagline ?? "",
                    category: p.category,
                    tags: p.tags.join(", "),
                    repo_url: p.repo_url ?? "",
                    cover_url: p.cover_url ?? "",
                    description: p.description ?? "",
                    featured: p.featured,
                    published: p.published,
                  })
                }
              >
                editar
              </button>
              <button className="text-xs text-live hover:underline" onClick={() => remove(p)}>borrar</button>
            </li>
          ))}
          {!plugins.length && <li className="py-3 text-sm text-muted">Aún no hay plugins.</li>}
        </ul>
      </Card>
    </div>
  );
}
