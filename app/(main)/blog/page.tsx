import type { Metadata } from "next";
import { BlogCatalog } from "@/components/BlogCatalog";
import { blogPosts } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Guias | Afiliado MLII",
  description: "Conteúdo para comparar produtos, entender ofertas e comprar melhor."
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Guias de compra</p>
      <h1 className="mt-2 text-4xl font-black text-slate-950">Conteúdo para comparar e decidir melhor</h1>
      <p className="mt-4 max-w-3xl text-slate-600">
        Textos pensados para apoiar a compra, destacar vantagens e levar o visitante do guia até a oferta certa.
      </p>
      <div className="mt-8">
        <BlogCatalog posts={blogPosts} />
      </div>
    </div>
  );
}
