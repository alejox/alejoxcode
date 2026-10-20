import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel"
    >
      {post.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_url} alt="" className="aspect-[16/9] w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-brand-cyan">
              #{t}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-brand-cyan">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>
        <span className="mt-auto pt-4 font-mono text-xs text-muted">{formatDate(post.published_at)}</span>
      </div>
    </Link>
  );
}
