import type { SupabaseClient } from "@supabase/supabase-js";

/** Sube un archivo a un bucket público y devuelve su URL pública. */
export async function uploadPublic(sb: SupabaseClient, bucket: "plugins" | "media", path: string, file: File) {
  const clean = path.replace(/[^a-zA-Z0-9._/-]/g, "_");
  const { error } = await sb.storage.from(bucket).upload(clean, file, { upsert: true, contentType: file.type || undefined });
  if (error) throw error;
  return sb.storage.from(bucket).getPublicUrl(clean).data.publicUrl;
}

/** Si la URL apunta a nuestro storage, borra el objeto. */
export async function removeIfStored(sb: SupabaseClient, url: string | null) {
  const m = url?.match(/\/storage\/v1\/object\/public\/(plugins|media)\/(.+)$/);
  if (m) await sb.storage.from(m[1]).remove([decodeURIComponent(m[2])]);
}
