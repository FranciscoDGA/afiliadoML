import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <Card className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.freeShipping ? <Badge className="bg-emerald-100 text-emerald-700">Frete grátis</Badge> : null}
            {discount ? <Badge className="bg-slate-900 text-white">-{discount}%</Badge> : null}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-sm text-ml-muted">
          <span>{product.category}</span>
          <span>{product.rating.toFixed(1)} ★</span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-slate-950">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            {product.oldPrice ? (
              <p className="text-xs text-slate-500 line-through">{formatCurrency(product.oldPrice)}</p>
            ) : null}
            <p className="text-2xl font-black text-ml-blue">{formatCurrency(product.price)}</p>
          </div>
          <div className="text-right text-sm text-slate-600">
            <p>{product.reviewCount} avaliações</p>
            <p>Estoque {product.stock ?? "sob consulta"}</p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-ml-blue px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Ver oferta
          </Link>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-ml-blue hover:text-ml-blue"
          >
            Comprar
          </a>
        </div>
      </div>
    </Card>
  );
}
