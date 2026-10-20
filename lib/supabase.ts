import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let browserClient: SupabaseClient | null = null;

/** Cliente sin sesión persistente para lecturas públicas en el servidor. */
export function serverClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createClient(url!, anonKey!, { auth: { persistSession: false } });
}

/** Cliente del navegador (panel admin) con sesión persistente. */
export function browserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  browserClient ??= createClient(url!, anonKey!);
  return browserClient;
}
