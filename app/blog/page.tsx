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
      <section className="spotlight relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-20 text-center sm:px-6">
          <p className="eyebrow">Contenido dev</p>
          <h1 className="text-gradient glow-text mt-6 text-[48px] leading-[1.1] sm:text-[72px]">Blog dev</h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-mist">
            Tutoriales, notas de desarrollo, trucos de OBS y lo que voy aprendiendo construyendo herramientas.
          </p>
        </div>
      </section>
      <div className="pt-8">
        <DemoBanner />
      </div>
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <p className="glass p-16 text-center text-muted">Pronto habrá posts por aquí ✍️</p>
        )}
      </section>
    </>
  );
}
