"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/BlogPostCard";
import { blogCategories } from "@/lib/constants";

type BlogCatalogProps = {
  posts: BlogPost[];
};

export function BlogCatalog({ posts }: BlogCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery = !term
        ? true
        : [post.title, post.excerpt, post.tags.join(" "), post.category].join(" ").toLowerCase().includes(term);
      const matchesCategory = category === "Todas" ? true : post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <Card className="p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Busca</p>
          <div className="mt-4 space-y-4">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar post ou tag" />
            <div className="grid gap-2">
              {["Todas", ...blogCategories].map((item) => (
                <Button
                  key={item}
                  variant={category === item ? "primary" : "ghost"}
                  className="justify-start rounded-2xl"
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </aside>

      <section className="space-y-4">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Blog</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Guias e comparativos</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-slate-100 text-slate-700">{filteredPosts.length} posts</Badge>
              <Badge className="bg-emerald-100 text-emerald-700">Conteúdo para conversão</Badge>
            </div>
          </div>
        </Card>
        {filteredPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-950">Nenhum post encontrado</h3>
            <p className="mt-2 text-slate-600">Tente mudar a busca ou a categoria selecionada.</p>
          </Card>
        )}
      </section>
    </div>
  );
}
