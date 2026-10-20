import { isSupabaseConfigured } from "@/lib/supabase";

export function DemoBanner() {
  if (isSupabaseConfigured) return null;
  return (
    <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6">
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
        <strong>Modo demo:</strong> estás viendo contenido de ejemplo. Configura{" "}
        <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
        <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para usar tus datos reales.
      </div>
    </div>
  );
}
