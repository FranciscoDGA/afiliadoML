import axios from "axios";
import type { Product } from "@/types/product";
import { products as mockProducts } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

export type MercadoLivreImportFilters = {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  freeShipping?: boolean;
};

const api = axios.create({
  baseURL: "https://api.mercadolivre.com",
  timeout: 15000
});

function now() {
  return new Date().toISOString();
}

function affiliateLink(productId: string, title: string) {
  const affiliateId = process.env.NEXT_PUBLIC_ML_AFFILIATE_ID ?? "YOUR_AFFILIATE_ID";
  return `https://www.mercadolivre.com.br/${productId}-${slugify(title)}/p?affiliate_id=${affiliateId}`;
}

function normalizeProduct(item: Record<string, unknown>, query = "produto"): Product {
  const title = String(item.title ?? "Produto sem título");
  const price = Number(item.price ?? 0);
  const originalPrice = Number(item.original_price ?? price);
  const shipping = item.shipping as { free_shipping?: boolean } | undefined;
  const pictures = Array.isArray(item.pictures)
    ? item.pictures
        .map((picture) => (picture as { url?: string }).url ?? "")
        .filter(Boolean)
    : [];

  return {
    id: String(item.id ?? crypto.randomUUID()),
    mlId: String(item.id ?? ""),
    title,
    description: String(item.description ?? item.subtitle ?? title),
    price,
    oldPrice: originalPrice > price ? originalPrice : undefined,
    images: pictures.length > 0 ? pictures : mockProducts[0]?.images ?? [],
    rating: Number(item.rating ?? 4.5),
    reviewCount: Number(item.review_count ?? 0),
    category: String(item.category_id ?? "Geral"),
    subcategory: undefined,
    specifications: {},
    stock: typeof item.available_quantity === "number" ? item.available_quantity : null,
    freeShipping: Boolean(shipping?.free_shipping),
    affiliateLink: affiliateLink(String(item.id ?? ""), title),
    slug: slugify(title),
    createdAt: now(),
    updatedAt: now(),
    isActive: true,
    tags: [query]
  };
}

function matchesFilters(product: Product, filters: MercadoLivreImportFilters) {
  if (filters.query) {
    const query = filters.query.toLowerCase();
    const haystack = `${product.title} ${product.description} ${product.category} ${product.tags.join(" ")}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (typeof filters.minPrice === "number" && product.price < filters.minPrice) return false;
  if (typeof filters.maxPrice === "number" && product.price > filters.maxPrice) return false;
  if (typeof filters.minRating === "number" && product.rating < filters.minRating) return false;
  if (typeof filters.freeShipping === "boolean" && product.freeShipping !== filters.freeShipping) return false;

  return true;
}

export async function searchMercadoLivreProducts(
  query: string,
  limit = 50,
  offset = 0,
  filters: MercadoLivreImportFilters = {}
): Promise<Product[]> {
  try {
    const accessToken = process.env.NEXT_PUBLIC_ML_API_ACCESS_TOKEN;
    const response = await api.get("/sites/MLB/search", {
      params: { q: query, limit, offset },
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
    });

    const results = response.data?.results ?? [];
    return results
      .map((item: Record<string, unknown>) => normalizeProduct(item, query))
      .filter((product: Product) => matchesFilters(product, { ...filters, query }));
  } catch (error) {
    console.error("Erro ao buscar produtos do Mercado Livre:", error);
    return mockProducts.filter((product) => matchesFilters(product, { ...filters, query }));
  }
}

export async function getMercadoLivreProduct(itemId: string): Promise<Product | null> {
  try {
    const accessToken = process.env.NEXT_PUBLIC_ML_API_ACCESS_TOKEN;
    const response = await api.get(`/items/${itemId}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
    });
    const item = response.data as Record<string, unknown>;
    return normalizeProduct(item, String(item.title ?? itemId));
  } catch (error) {
    console.error("Erro ao obter detalhes do produto:", error);
    return mockProducts.find((product) => product.mlId === itemId || product.id === itemId) ?? null;
  }
}
