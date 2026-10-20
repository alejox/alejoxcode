"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import type { Platform, Plugin } from "@/lib/types";
import { PLATFORM_LABEL } from "@/lib/types";
import { formatBytes, formatDate, groupByVersion } from "@/lib/utils";
import { removeIfStored, uploadPublic } from "./storage";
import { Button, Card, Field, Input, Select, Textarea } from "./ui";

export function ReleasesAdmin({ sb }: { sb: SupabaseClient }) {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [pluginId, setPluginId] = useState("");
  const [version, setVersion] = useState("");
  const [platform, setPlatform] = useState<Platform>("windows");
  const [obsMin, setObsMin] = useState("30.0");
  const [changelog, setChangelog] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const { data } = await sb.from("plugins").select("*, releases(*)").order("name");
    const list = (data ?? []) as Plugin[];
    setPlugins(list);
    setPluginId((id) => id || list[0]?.id || "");
  }, [sb]);

  useEffect(() => {
    load();
  }, [load]);

  const plugin = plugins.find((p) => p.id === pluginId);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!plugin) return;
    if (!file && !externalUrl) return setStatus("✗ Sube un archivo o pega una URL externa");
    setBusy(true);
    setStatus(file ? `Subiendo ${file.name} (${formatBytes(file.size)})…` : "Guardando…");
    try {
      const v = version.replace(/^v/, "");
      const file_url = file
        ? await uploadPublic(sb, "plugins", `${plugin.slug}/${v}/${platform}-${file.name}`, file)
        : externalUrl;
      const { error } = await sb.from("releases").insert({
        plugin_id: plugin.id,
        version: v,
        platform,
        file_url,
        file_name: file?.name ?? externalUrl.split("/").pop() ?? null,
        file_size: file?.size ?? null,
        obs_min_version: obsMin || null,
        changelog: changelog || null,
      });
      if (error) throw error;
      await sb.from("plugins").update({ updated_at: new Date().toISOString() }).eq("id", plugin.id);
      setStatus(`✓ v${v} (${PLATFORM_LABEL[platform]}) publicada. Visible en el sitio en ~1 min.`);
      setFile(null);
      setExternalUrl("");
      (e.target as HTMLFormElement).querySelector<HTMLInputElement>("input[type=file]")!.value = "";
      load();
    } catch (err) {
      setStatus(`✗ ${(err as Error).message}`);
    }
    setBusy(false);
  }

  async function remove(id: string, url: string) {
    if (!confirm("¿Eliminar este archivo?")) return;
    await removeIfStored(sb, url);
    await sb.from("releases").delete().eq("id", id);
    load();
  }

  if (!plugins.length) {
    return (
      <Card title="Subir versión">
        <p className="text-sm text-muted">Primero crea un plugin en la pestaña “Plugins”.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <Card title="Subir nueva versión">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Plugin">
            <Select value={pluginId} onChange={(e) => setPluginId(e.target.value)}>
              {plugins.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Versión">
              <Input required value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.0.0" />
            </Field>
            <Field label="Plataforma">
              <Select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
                {Object.entries(PLATFORM_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </Select>
            </Field>
            <Field label="OBS mínimo">
              <Input value={obsMin} onChange={(e) => setObsMin(e.target.value)} placeholder="30.0" />
            </Field>
          </div>
          <Field label="Archivo" hint="ZIP, EXE, PKG, DEB, LUA, PY… (límite del plan de Supabase: 50 MB en Free).">
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </Field>
          <Field label="…o URL externa" hint="Ej. un asset de GitHub Releases. Se ignora si subes archivo.">
            <Input type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://github.com/…/releases/download/…" />
          </Field>
          <Field label="Changelog (Markdown)" hint="Solo hace falta en uno de los archivos de la versión.">
            <Textarea rows={5} value={changelog} onChange={(e) => setChangelog(e.target.value)} placeholder={"- Nueva función\n- Corrección de errores"} />
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <Button disabled={busy}>{busy ? "Subiendo…" : "Publicar versión"}</Button>
            {status && <span className="text-sm text-muted">{status}</span>}
          </div>
        </form>
      </Card>

      <Card title={`Archivos de ${plugin?.name ?? ""}`}>
        {plugin && plugin.releases.length ? (
          <div className="space-y-5">
            {groupByVersion(plugin.releases).map((v) => (
              <div key={v.version}>
                <p className="mb-2 font-mono text-sm font-semibold">v{v.version} <span className="text-xs font-normal text-muted">· {formatDate(v.date)}</span></p>
                <ul className="space-y-1.5">
                  {v.files.map((f) => (
                    <li key={f.id} className="flex items-center gap-3 rounded-lg bg-ink px-3 py-2 text-xs">
                      <span className="flex-1 truncate">{PLATFORM_LABEL[f.platform]} · {f.file_name}</span>
                      <span className="text-muted">{f.downloads}↓</span>
                      <button className="text-live hover:underline" onClick={() => remove(f.id, f.file_url)}>borrar</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Sin archivos todavía.</p>
        )}
      </Card>
    </div>
  );
}
