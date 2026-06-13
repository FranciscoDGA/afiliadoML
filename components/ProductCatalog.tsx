"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { productCategories } from "@/lib/constants";

type ProductCatalogProps = {
  products: Product[];
};

const ratingOptions = [
  { label: "Todas", value: 0 },
  { label: "4.0+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "4.8+", value: 4.8 }
];

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [minRating, setMinRating] = useState(4.5);
  const [freeShipping, setFreeShipping] = useState(false);
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesQuery = !term
        ? true
        : [product.title, product.category, product.tags.join(" "), product.description]
            .join(" ")
            .toLowerCase()
            .includes(term);
      const matchesCategory = category === "Todas" ? true : product.category === category;
      const matchesRating = product.rating >= minRating;
      const matchesShipping = freeShipping ? product.freeShipping : true;

      return matchesQuery && matchesCategory && matchesRating && matchesShipping;
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [products, query, category, minRating, freeShipping, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <Card className="p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Filtros</p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Buscar</label>
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, marca ou categoria" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Categoria</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 w-full rounded-full border border-slate-300 bg-white px-4 text-sm outline-none focus:border-ml-blue"
              >
                <option>Todas</option>
                {productCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Avaliação mínima</label>
              <div className="grid gap-2">
                {ratingOptions.map((option) => (
                  <Button
                    key={option.label}
                    variant={minRating === option.value ? "primary" : "ghost"}
                    onClick={() => setMinRating(option.value)}
                    className="justify-start rounded-2xl"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant={freeShipping ? "primary" : "secondary"}
              className="w-full"
              onClick={() => setFreeShipping((current) => !current)}
            >
              {freeShipping ? "Frete grátis ligado" : "Filtrar por frete grátis"}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Ordenação</p>
          <div className="mt-4 grid gap-2">
            {[
              ["relevance", "Relevância"],
              ["price-asc", "Menor preço"],
              ["price-desc", "Maior preço"],
              ["rating", "Melhor avaliação"]
            ].map(([value, label]) => (
              <Button
                key={value}
                variant={sort === value ? "primary" : "ghost"}
                onClick={() => setSort(value as typeof sort)}
                className="justify-start rounded-2xl"
              >
                {label}
              </Button>
            ))}
          </div>
        </Card>
      </aside>

      <section className="space-y-4">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Catálogo</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Resultados encontrados</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-slate-100 text-slate-700">{filteredProducts.length} produtos</Badge>
              <Badge className="bg-emerald-100 text-emerald-700">Atualização em tempo real</Badge>
            </div>
          </div>
        </Card>
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-950">Nenhum produto encontrado</h3>
            <p className="mt-2 text-slate-600">Tente mudar a busca, categoria ou avaliação mínima.</p>
          </Card>
        )}
      </section>
    </div>
  );
}
