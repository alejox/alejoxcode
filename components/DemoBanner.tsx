import { isSupabaseConfigured } from "@/lib/supabase";

export function DemoBanner() {
  if (isSupabaseConfigured) return null;
  return (
    <div className="mx-auto mb-8 max-w-[1200px] px-4 sm:px-6">
      <div className="hairline flex flex-wrap items-center gap-2 rounded-2xl bg-panel px-5 py-3 text-sm text-mist">
        <span className="rounded-md bg-panel-2 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-frost">Demo</span>
        Contenido de ejemplo. Configura <code className="font-mono text-frost">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
        <code className="font-mono text-frost">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para usar tus datos.
      </div>
    </div>
  );
}
