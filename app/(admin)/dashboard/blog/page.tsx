"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/lib/mock-data";

type DraftPost = {
  title: string;
  excerpt: string;
  category: string;
};

const initialDraft: DraftPost = {
  title: "",
  excerpt: "",
  category: "Dicas"
};

export default function AdminBlogPage() {
  const [draft, setDraft] = useState<DraftPost>(initialDraft);
  const [publishedIds, setPublishedIds] = useState<string[]>(blogPosts.filter((post) => post.isPublished).map((post) => post.id));

  const posts = useMemo(
    () =>
      blogPosts.map((post) => ({
        ...post,
        isPublished: publishedIds.includes(post.id)
      })),
    [publishedIds]
  );

  function publishDraft() {
    if (!draft.title.trim() || !draft.excerpt.trim()) return;
    setPublishedIds((current) => [...current, `draft-${current.length + 1}`]);
    setDraft(initialDraft);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Blog</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Gestão de conteúdos</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Crie posts, acompanhe status e publique guias para apoiar a decisão de compra.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Post</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-950">{post.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{post.excerpt}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{post.category}</td>
                  <td className="px-4 py-4">
                    <Badge className={post.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}>
                      {post.isPublished ? "Publicado" : "Rascunho"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Button variant="ghost" onClick={() => setPublishedIds((current) => current.filter((id) => id !== post.id))}>
                      {post.isPublished ? "Despublicar" : "Publicar"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="space-y-4 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Novo post</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">Criar conteúdo</h2>
          </div>
          <Input
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            placeholder="Título do post"
          />
          <Input
            value={draft.excerpt}
            onChange={(event) => setDraft((current) => ({ ...current, excerpt: event.target.value }))}
            placeholder="Resumo do post"
          />
          <Input
            value={draft.category}
            onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
            placeholder="Categoria"
          />
          <textarea
            className="min-h-40 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-ml-blue"
            placeholder="Conteúdo do post"
          />
          <Button onClick={publishDraft}>Salvar rascunho</Button>
        </Card>
      </div>
    </div>
  );
}
