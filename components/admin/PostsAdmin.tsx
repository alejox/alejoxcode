"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import type { Post } from "@/lib/types";
import { formatDate, slugify } from "@/lib/utils";
import { removeIfStored, uploadPublic } from "./storage";
import { Button, Card, Field, Input, Textarea } from "./ui";

type Form = { id?: string; title: string; slug: string; excerpt: string; content: string; tags: string; cover_url: string; published: boolean };
const empty: Form = { title: "", slug: "", excerpt: "", content: "", tags: "", cover_url: "", published: true };

export function PostsAdmin({ sb }: { sb: SupabaseClient }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Form>(empty);
  const [cover, setCover] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const { data } = await sb.from("posts").select("*").order("published_at", { ascending: false });
    setPosts((data ?? []) as Post[]);
  }, [sb]);

  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  /** Sube una imagen y la inserta en el contenido como Markdown. */
  async function insertImage(file: File) {
    setStatus("Subiendo imagen…");
    try {
      const url = await uploadPublic(sb, "media", `posts/${Date.now()}-${file.name}`, file);
      setForm((f) => ({ ...f, content: `${f.content}\n\n![${file.name}](${url})\n` }));
      setStatus("✓ Imagen insertada");
    } catch (err) {
      setStatus(`✗ ${(err as Error).message}`);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const slug = form.slug || slugify(form.title);
      let cover_url = form.cover_url || null;
      if (cover) cover_url = await uploadPublic(sb, "media", `posts/${slug}-${Date.now()}-${cover.name}`, cover);
      const row = {
        title: form.title,
        slug,
        excerpt: form.excerpt || null,
        content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        cover_url,
        published: form.published,
      };
      const { error } = form.id ? await sb.from("posts").update(row).eq("id", form.id) : await sb.from("posts").insert(row);
      if (error) throw error;
      setStatus(form.id ? "✓ Post actualizado" : "✓ Post publicado");
      setForm(empty);
      setCover(null);
      load();
    } catch (err) {
      setStatus(`✗ ${(err as Error).message}`);
    }
    setBusy(false);
  }

  async function remove(p: Post) {
    if (!confirm(`¿Eliminar "${p.title}"?`)) return;
    await removeIfStored(sb, p.cover_url);
    await sb.from("posts").delete().eq("id", p.id);
    load();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Card
        title={form.id ? "Editar post" : "Nuevo post"}
        actions={form.id && <button className="text-xs text-muted hover:text-white" onClick={() => setForm(empty)}>+ nuevo</button>}
      >
        <form onSubmit={save} className="space-y-4">
          <Field label="Título">
            <Input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.id ? f.slug : slugify(e.target.value) }))} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug" hint={`/blog/${form.slug || "mi-post"}`}>
              <Input required value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
            </Field>
            <Field label="Tags" hint="Separados por comas">
              <Input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="obs, tutorial" />
            </Field>
          </div>
          <Field label="Resumen">
            <Input value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </Field>
          <Field label="Portada (opcional)">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
              <Input type="url" value={form.cover_url} onChange={(e) => set("cover_url", e.target.value)} placeholder="https://…" />
            </div>
          </Field>
          <Field label="Contenido (Markdown)">
            <Textarea rows={16} required value={form.content} onChange={(e) => set("content", e.target.value)} />
          </Field>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-brand-cyan">
            🖼 Insertar imagen en el contenido
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && insertImage(e.target.files[0])} />
          </label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} /> Publicado</label>
          <div className="flex items-center gap-4">
            <Button disabled={busy}>{busy ? "Guardando…" : form.id ? "Guardar" : "Publicar"}</Button>
            {status && <span className="text-sm text-muted">{status}</span>}
          </div>
        </form>
      </Card>

      <Card title={`Posts (${posts.length})`}>
        <ul className="divide-y divide-line">
          {posts.map((p) => (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.title} {!p.published && <span className="text-xs text-yellow-300">(borrador)</span>}</p>
                <p className="font-mono text-xs text-muted">{formatDate(p.published_at)}</p>
              </div>
              <button
                className="text-xs text-brand-cyan hover:underline"
                onClick={() =>
                  setForm({
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    excerpt: p.excerpt ?? "",
                    content: p.content ?? "",
                    tags: p.tags.join(", "),
                    cover_url: p.cover_url ?? "",
                    published: p.published,
                  })
                }
              >
                editar
              </button>
              <button className="text-xs text-live hover:underline" onClick={() => remove(p)}>borrar</button>
            </li>
          ))}
          {!posts.length && <li className="py-3 text-sm text-muted">Aún no hay posts.</li>}
        </ul>
      </Card>
    </div>
  );
}
