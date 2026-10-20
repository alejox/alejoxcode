import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/data";
import { formatDate, renderMarkdown } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "No encontrado" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: { type: "article", images: post.cover_url ? [post.cover_url] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <Link href="/blog" className="btn-ghost px-4 py-2 text-xs">← Volver al blog</Link>
      <div className="mt-8 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span key={t} className="rounded-md bg-panel-2 px-2 py-1 text-xs font-medium text-frost">{t}</span>
        ))}
      </div>
      <h1 className="text-gradient mt-5 text-[36px] leading-[1.16] sm:text-[48px]">{post.title}</h1>
      {post.excerpt && <p className="mt-4 text-[17px] leading-relaxed text-mist">{post.excerpt}</p>}
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-muted">Alejo · {formatDate(post.published_at)}</p>
      {post.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_url} alt="" className="hairline mt-10 w-full rounded-2xl" />
      )}
      <div className="prose-dev mt-10" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
    </article>
  );
}
