import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ml-blue/20 to-ml-yellow/30">
        <Image src={post.featuredImage} alt={post.title} fill sizes="(min-width: 1280px) 33vw, 100vw" className="object-cover" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ml-blue">{post.category}</p>
        <h3 className="mt-2 text-lg font-bold text-slate-950">{post.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-500">
          <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
          <Link href={`/blog/${post.slug}`} className="font-semibold text-slate-900 underline">
            Ler post
          </Link>
        </div>
      </div>
    </Card>
  );
}
