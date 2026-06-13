import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { blogPosts, products } from "@/lib/mock-data";
import { productCategories } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Afiliado MLII | Loja de ofertas Mercado Livre",
  description: "Loja com ofertas selecionadas, categorias em destaque, avaliações e guias de compra."
};

const featuredProducts = products.slice(0, 4);

const storeBenefits = [
  {
    title: "Ofertas selecionadas",
    text: "Só produtos com boa avaliação, preço competitivo e apelo de compra."
  },
  {
    title: "Categorias populares",
    text: "A navegação é pensada para entrar rápido nas áreas mais procuradas."
  },
  {
    title: "Compra confiável",
    text: "Preço, frete e reputação aparecem no mesmo lugar para facilitar a decisão."
  }
];

const shopStats = [
  { label: "Categorias", value: "12" },
  { label: "Produtos em destaque", value: "48" },
  { label: "Avaliação média", value: "4.8/5" },
  { label: "Frete grátis", value: "Selecionados" }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="ml-card relative overflow-hidden px-6 py-8 sm:px-10 lg:px-12">
        <div className="absolute inset-0 bg-hero-grid bg-[size:34px_34px] opacity-30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-ml-yellow px-4 py-1 text-xs font-black uppercase tracking-[0.24em] text-slate-900">
                Loja oficial de ofertas
              </span>
              <Badge className="bg-emerald-100 text-emerald-700">Frete grátis em selecionados</Badge>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Tudo o que você quer comprar no Mercado Livre, em uma vitrine feita para vender.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ml-muted sm:text-lg">
              Descubra ofertas, compare preços e encontre produtos bem avaliados sem perder tempo. A loja já
              nasce com cara de ecommerce, pronta para navegação e conversão.
            </p>
            <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <SearchBar placeholder="Buscar panela, air fryer, cafeteira..." />
              </div>
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-ml-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Ver ofertas
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {shopStats.map((stat) => (
                <Card key={stat.label} className="bg-white/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ml-muted">{stat.label}</p>
                  <p className="mt-2 text-lg font-black text-slate-950">{stat.value}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden p-5 shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Destaque do dia</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">Ofertas que chamam clique</h2>
              </div>
              <Badge className="bg-ml-yellow text-slate-900">Atualizado agora</Badge>
            </div>
            <div className="mt-5 space-y-3">
              {featuredProducts.slice(0, 3).map((product) => (
                <a
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3 transition hover:bg-slate-100"
                >
                  <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-950">{product.title}</p>
                    <p className="mt-1 text-sm text-ml-muted">{product.category}</p>
                  </div>
                  <div className="text-right">
                    {product.oldPrice ? (
                      <p className="text-sm text-ml-muted line-through">{formatCurrency(product.oldPrice)}</p>
                    ) : null}
                    <p className="text-lg font-black text-ml-blue">{formatCurrency(product.price)}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-slate-950 px-5 py-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Compra em destaque</p>
              <p className="mt-2 text-xl font-black">Até 35% OFF em produtos selecionados</p>
              <p className="mt-2 text-sm text-white/70">Preço, avaliação e benefício aparecem juntos para facilitar a decisão.</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Categorias</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Explore por tipo de produto</h2>
          </div>
          <p className="hidden text-sm text-ml-muted md:block">Atalho visual para entrar rápido nas áreas mais compradas.</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {productCategories.map((category) => (
            <Card key={category} className="p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
              <p className="text-sm font-semibold text-slate-950">{category}</p>
              <p className="mt-2 text-sm text-ml-muted">Ver produtos em oferta</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="produtos" className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Ofertas em destaque</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Produtos que parecem vitrine de ecommerce</h2>
          </div>
          <a href="/products" className="hidden text-sm font-semibold text-ml-blue hover:underline md:block">
            Ver catálogo completo
          </a>
        </div>
        <div className="mt-6">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {storeBenefits.map((item) => (
          <Card key={item.title} className="p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Benefício</p>
            <h3 className="mt-2 text-xl font-bold text-slate-950">{item.title}</h3>
            <p className="mt-3 leading-7 text-ml-muted">{item.text}</p>
          </Card>
        ))}
      </section>

      <section id="blog" className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="ml-card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Guias de compra</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Conteúdo útil para decidir melhor</h2>
          <div className="mt-6 space-y-4">
            {blogPosts.map((post) => (
              <div key={post.title} className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="font-semibold text-slate-900">{post.title}</p>
                <p className="mt-1 text-sm text-ml-muted">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="reviews" className="ml-card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">Avaliações</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Prova social para aumentar confiança</h2>
          <div className="mt-6 space-y-4">
            {[
              {
                name: "Marina S.",
                text: "Achei a loja muito clara para comparar preço e benefício."
              },
              {
                name: "Carlos T.",
                text: "Os produtos em destaque parecem realmente uma vitrine pronta para comprar."
              },
              {
                name: "Ana P.",
                text: "Passei a encontrar o que queria sem ficar perdida em menus."
              }
            ].map((review) => (
              <blockquote key={review.name} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-slate-700">&ldquo;{review.text}&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-slate-900">{review.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
