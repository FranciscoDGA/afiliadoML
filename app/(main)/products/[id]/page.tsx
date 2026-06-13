import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ReviewSection } from "@/components/ReviewSection";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductGallery } from "@/components/ProductGallery";
import { reviews, products } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = products.find((item) => item.slug === params.id);
  if (!product) return {};
  return {
    title: `${product.title} | Afiliado MLII`,
    description: product.description
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;
  const product = products.find((item) => item.slug === id);

  if (!product) {
    notFound();
  }

  const relatedReviews = reviews.filter((review) => review.productId === product.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: "Mercado Livre" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount.toString()
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability: product.stock && product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{product.category}</Badge>
            {product.freeShipping ? <Badge className="bg-emerald-100 text-emerald-700">Frete grátis</Badge> : null}
          </div>
          <h1 className="mt-4 text-4xl font-black text-slate-950">{product.title}</h1>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-end gap-4">
            <p className="text-4xl font-black text-ml-blue">{formatCurrency(product.price)}</p>
            {product.oldPrice ? (
              <p className="pb-1 text-lg text-slate-500 line-through">{formatCurrency(product.oldPrice)}</p>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-700">
            <Badge>{product.rating.toFixed(1)} ★</Badge>
            <Badge>{product.reviewCount} avaliações</Badge>
            <Badge>{product.stock ?? "Estoque sob consulta"}</Badge>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-ml-blue px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Comprar no Mercado Livre
            </a>
            <a
              href="#reviews"
              className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-ml-blue hover:text-ml-blue"
            >
              Ver avaliações
            </a>
          </div>

          <Card className="mt-6 p-5">
            <h2 className="text-lg font-bold text-slate-950">Especificações</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-sm text-slate-500">{key}</dt>
                  <dd className="mt-1 font-semibold text-slate-950">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="mt-6 p-5">
            <h2 className="text-lg font-bold text-slate-950">Resumo da oferta</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Oferta publicada em {formatDate(product.createdAt)}. Ideal para quem quer comprar rápido, com preço em destaque
              e navegação pensada para conversão.
            </p>
          </Card>
        </div>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div id="reviews">
          <h2 className="text-2xl font-bold text-slate-950">Reviews</h2>
          <p className="mt-2 text-slate-600">Avaliações simuladas para deixar a decisão mais confiável nesta etapa inicial.</p>
          <div className="mt-4">
            <ReviewSection reviews={relatedReviews} />
          </div>
        </div>
        <Card className="p-5">
          <h2 className="text-2xl font-bold text-slate-950">Produtos relacionados</h2>
          <div className="mt-4 grid gap-4">
            {products
              .filter((item) => item.id !== product.id && item.category === product.category)
              .slice(0, 3)
              .map((related) => (
                <a
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="font-semibold text-slate-950">{related.title}</p>
                  <p className="mt-1 text-sm text-ml-muted">{formatCurrency(related.price)}</p>
                </a>
              ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
