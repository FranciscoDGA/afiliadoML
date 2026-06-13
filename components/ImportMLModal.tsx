"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type ImportMLModalProps = {
  open: boolean;
  onClose: () => void;
};

type ImportFilters = {
  query: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  freeShipping: "all" | "yes" | "no";
};

const initialFilters: ImportFilters = {
  query: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  freeShipping: "all"
};

export function ImportMLModal({ open, onClose }: ImportMLModalProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [results, setResults] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("Use os filtros para buscar produtos prontos para importar.");

  useEffect(() => {
    if (!open) {
      setFilters(initialFilters);
      setResults([]);
      setSelectedIds([]);
      setLoading(false);
      setMessage("Use os filtros para buscar produtos prontos para importar.");
    }
  }, [open]);

  async function handleSearch() {
    setLoading(true);
    setMessage("Buscando produtos no Mercado Livre...");

    try {
      const response = await fetch("/api/import-ml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: filters.query,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
          minRating: filters.minRating ? Number(filters.minRating) : undefined,
          freeShipping:
            filters.freeShipping === "all" ? undefined : filters.freeShipping === "yes"
        })
      });

      const data = (await response.json()) as { ok: boolean; products?: Product[]; message?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "Falha ao buscar produtos");
      }

      setResults(data.products ?? []);
      setSelectedIds((data.products ?? []).slice(0, 3).map((product) => product.id));
      setMessage(
        data.products?.length ? `${data.products.length} produto(s) prontos para importar.` : "Nenhum produto encontrado com esses filtros."
      );
    } catch (error) {
      setResults([]);
      setSelectedIds([]);
      setMessage(error instanceof Error ? error.message : "Falha ao importar produtos");
    } finally {
      setLoading(false);
    }
  }

  const selectedCount = selectedIds.length;

  return (
    <Dialog open={open} title="Importar do Mercado Livre" onClose={onClose}>
      <div className="grid gap-5">
        <div className="grid gap-3 md:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-3">
            <Input
              value={filters.query}
              onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
              placeholder="Buscar por palavra-chave ou URL"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                value={filters.minPrice}
                onChange={(event) => setFilters((current) => ({ ...current, minPrice: event.target.value }))}
                placeholder="Preço mínimo"
                inputMode="numeric"
              />
              <Input
                value={filters.maxPrice}
                onChange={(event) => setFilters((current) => ({ ...current, maxPrice: event.target.value }))}
                placeholder="Preço máximo"
                inputMode="numeric"
              />
              <Input
                value={filters.minRating}
                onChange={(event) => setFilters((current) => ({ ...current, minRating: event.target.value }))}
                placeholder="Avaliação mínima"
                inputMode="decimal"
              />
              <select
                value={filters.freeShipping}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    freeShipping: event.target.value as ImportFilters["freeShipping"]
                  }))
                }
                className="h-11 rounded-full border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-ml-blue"
              >
                <option value="all">Frete grátis: todos</option>
                <option value="yes">Frete grátis: sim</option>
                <option value="no">Frete grátis: não</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-3">
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Buscando..." : "Buscar produtos"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedIds(results.map((product) => product.id));
                setMessage(`${results.length} produto(s) selecionado(s).`);
              }}
              disabled={!results.length}
            >
              Selecionar todos
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="bg-slate-100 text-slate-700">{selectedCount} selecionados</Badge>
          <Badge className="bg-emerald-100 text-emerald-700">Importação simulada</Badge>
          <Badge className="bg-ml-yellow text-slate-900">Pronto para integrar</Badge>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">{message}</div>

        {results.length > 0 ? (
          <div className="max-h-[320px] space-y-3 overflow-auto pr-1">
            {results.map((product) => {
              const checked = selectedIds.includes(product.id);
              return (
                <label
                  key={product.id}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-ml-blue"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) =>
                      setSelectedIds((current) =>
                        event.target.checked
                          ? [...current, product.id]
                          : current.filter((id) => id !== product.id)
                      )
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-950">{product.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-ml-blue">R$ {product.price.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">{product.freeShipping ? "Frete grátis" : "Frete pago"}</p>
                  </div>
                </label>
              );
            })}
          </div>
        ) : null}
      </div>
    </Dialog>
  );
}
