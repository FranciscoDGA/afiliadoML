"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ImportMLModal } from "@/components/ImportMLModal";
import { products } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => {
      return [product.title, product.category, product.tags.join(" "), product.description]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Produtos</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Gerenciamento do catálogo</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Aqui você acompanha produtos, aplica edições em lote e puxa novas ofertas direto do Mercado Livre.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Importar do Mercado Livre
          </Button>
          <Button>Sincronizar catálogo</Button>
        </div>
      </div>

      <ImportMLModal open={open} onClose={() => setOpen(false)} />

      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Busca rápida</p>
            <p className="mt-1 text-sm text-slate-600">Filtre por nome, categoria, tags ou descrição.</p>
          </div>
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produto..." />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-slate-500">Produtos ativos</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{products.filter((item) => item.isActive).length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Com frete grátis</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{products.filter((item) => item.freeShipping).length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Estoque total</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {products.reduce((total, product) => total + (product.stock ?? 0), 0).toLocaleString("pt-BR")}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-slate-500">Ticket médio</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {formatCurrency(products.reduce((total, product) => total + product.price, 0) / products.length)}
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Estoque</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-4">
                  <div className="font-medium text-slate-950">{product.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{product.category}</div>
                </td>
                <td className="px-4 py-4 text-slate-700">{formatCurrency(product.price)}</td>
                <td className="px-4 py-4 text-slate-700">{product.stock ?? "-"}</td>
                <td className="px-4 py-4">
                  <Badge className={product.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}>
                    {product.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-slate-700">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost">Editar</Button>
                    <Button variant="ghost">Sincronizar</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
