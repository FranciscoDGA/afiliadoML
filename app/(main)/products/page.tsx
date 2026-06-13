import type { Metadata } from "next";
import { ProductCatalog } from "@/components/ProductCatalog";
import { products } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Produtos | Afiliado MLII",
  description: "Catálogo de produtos com filtros, busca e ofertas em destaque."
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Produtos</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Catálogo completo de ofertas</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Use a busca e os filtros para encontrar os produtos com melhor preço, avaliação e vantagem para compra.
        </p>
      </div>
      <ProductCatalog products={products} />
    </div>
  );
}
