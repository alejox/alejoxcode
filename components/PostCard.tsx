import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="glass card-hover group flex flex-col overflow-hidden">
      {post.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_url} alt="" className="aspect-[16/9] w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-panel-2 px-2 py-1 text-[11px] font-medium text-frost">{t}</span>
          ))}
        </div>
        <h3 className="text-lg leading-snug text-ice">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{formatDate(post.published_at)}</span>
      </div>
    </Link>
  );
}
