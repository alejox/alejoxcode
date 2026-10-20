import type { Metadata } from "next";
import { DemoBanner } from "@/components/DemoBanner";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog dev",
  description: "Tutoriales de OBS, desarrollo de plugins, overlays y contenido general de programación.",
};

export default async function Blog() {
  const posts = await getPosts();
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <span className="font-mono text-sm text-brand-violet">// contenido dev</span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Blog <span className="text-gradient">dev</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Tutoriales, notas de desarrollo, trucos de OBS y lo que voy aprendiendo construyendo herramientas.
          </p>
        </div>
      </section>
      <div className="pt-8">
        <DemoBanner />
      </div>
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        {posts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-16 text-center text-muted">Pronto habrá posts por aquí ✍️</p>
        )}
      </section>
    </>
  );
}
