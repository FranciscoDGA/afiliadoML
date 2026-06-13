import type { BlogPost } from "@/types/blog";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";
import { slugify } from "@/lib/utils";

const now = new Date().toISOString();

export const products: Product[] = [
  {
    id: "prod-1",
    mlId: "MLB1001",
    title: "Panela Antiaderente Premium 32cm",
    description: "Panela de alta performance para uso diário, com revestimento antiaderente reforçado.",
    price: 199.9,
    oldPrice: 249.9,
    images: [
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Panela+32cm",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Antiaderente",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Frete+gr%C3%A1tis"
    ],
    rating: 4.8,
    reviewCount: 128,
    category: "Cozinha",
    subcategory: "Panelas",
    specifications: { Cor: "Preto", Material: "Alumínio", Tamanho: "32cm" },
    stock: 42,
    freeShipping: true,
    affiliateLink: `https://www.mercadolivre.com.br/MLB1001-${slugify("panela antiaderente premium 32cm")}/p?affiliate_id=YOUR_AFFILIATE_ID`,
    slug: "panela-antiaderente-premium-32cm",
    createdAt: now,
    updatedAt: now,
    isActive: true,
    tags: ["panela", "cozinha", "antiaderente"]
  },
  {
    id: "prod-2",
    mlId: "MLB1002",
    title: "Air Fryer 4L Digital",
    description: "Air fryer compacta e potente para receitas rápidas e saudáveis.",
    price: 349.9,
    oldPrice: 399.9,
    images: [
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Air+Fryer",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Digital",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=4L"
    ],
    rating: 4.7,
    reviewCount: 210,
    category: "Eletrodomésticos",
    subcategory: "Fritadeiras",
    specifications: { Voltagem: "220V", Capacidade: "4L", Cor: "Preto" },
    stock: 18,
    freeShipping: true,
    affiliateLink: `https://www.mercadolivre.com.br/MLB1002-${slugify("air fryer 4l digital")}/p?affiliate_id=YOUR_AFFILIATE_ID`,
    slug: "air-fryer-4l-digital",
    createdAt: now,
    updatedAt: now,
    isActive: true,
    tags: ["air fryer", "cozinha", "eletrodomesticos"]
  },
  {
    id: "prod-3",
    mlId: "MLB1003",
    title: "Aspirador Robô Smart",
    description: "Limpeza automatizada com app, sensores e ótima autonomia de bateria.",
    price: 1299,
    oldPrice: 1599,
    images: [
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Aspirador+Rob%C3%B4",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Smart",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Limpeza"
    ],
    rating: 4.6,
    reviewCount: 82,
    category: "Casa e Utilidades",
    subcategory: "Limpeza",
    specifications: { Bateria: "120min", Cor: "Cinza", Conectividade: "Wi-Fi" },
    stock: 9,
    freeShipping: false,
    affiliateLink: `https://www.mercadolivre.com.br/MLB1003-${slugify("aspirador robo smart")}/p?affiliate_id=YOUR_AFFILIATE_ID`,
    slug: "aspirador-robo-smart",
    createdAt: now,
    updatedAt: now,
    isActive: true,
    tags: ["aspirador", "robot", "limpeza"]
  },
  {
    id: "prod-4",
    mlId: "MLB1004",
    title: "Cafeteira Espresso Compacta",
    description: "Café espresso com acabamento premium e preparo rápido.",
    price: 459.9,
    oldPrice: 499.9,
    images: [
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Cafeteira",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Espresso",
      "https://placehold.co/800x800.png/f8fafc/0f172a?text=Compacta"
    ],
    rating: 4.9,
    reviewCount: 56,
    category: "Eletrodomésticos",
    subcategory: "Cafeteiras",
    specifications: { Pressão: "15 bar", Cor: "Preto", Reservatório: "1L" },
    stock: 25,
    freeShipping: true,
    affiliateLink: `https://www.mercadolivre.com.br/MLB1004-${slugify("cafeteira espresso compacta")}/p?affiliate_id=YOUR_AFFILIATE_ID`,
    slug: "cafeteira-espresso-compacta",
    createdAt: now,
    updatedAt: now,
    isActive: true,
    tags: ["cafe", "espresso", "cozinha"]
  }
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    userName: "Marina S.",
    rating: 5,
    comment: "Produto excelente e o destaque de preço ficou muito bom.",
    isApproved: true,
    createdAt: now
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userName: "Carlos T.",
    rating: 4,
    comment: "Boa compra, entrega rápida e a página ajudou na decisão.",
    isApproved: true,
    createdAt: now
  },
  {
    id: "rev-3",
    productId: "prod-2",
    userName: "Ana P.",
    rating: 5,
    comment: "A seção de reviews dá bastante confiança ao usuário.",
    isApproved: true,
    createdAt: now
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Melhores eletrodomésticos para comprar em 2026",
    slug: "melhores-eletrodomesticos-para-comprar-em-2026",
    excerpt: "Uma seleção prática para quem quer transformar visitantes em compradores.",
    content:
      "## Guia rápido\n\nAqui entra o conteúdo em Markdown. A ideia é publicar posts com foco em SEO, comparação e intenção de compra.",
    featuredImage: "https://placehold.co/1200x800.png/f8fafc/0f172a?text=Guia+2026",
    author: "Equipe Afiliado MLII",
    category: "Comparativos",
    tags: ["eletrodomésticos", "2026", "comparativo"],
    isPublished: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    metaTitle: "Melhores eletrodomésticos para comprar em 2026",
    metaDescription: "Veja os melhores eletrodomésticos para 2026 com foco em conversão e SEO."
  },
  {
    id: "post-2",
    title: "Como escolher produtos com frete grátis",
    slug: "como-escolher-produtos-com-frete-gratis",
    excerpt: "Uma análise simples para maximizar conversão nas páginas de afiliado.",
    content:
      "## Frete grátis converte\n\nQuando o frete é comunicado com clareza, a chance de clique e compra aumenta.",
    featuredImage: "https://placehold.co/1200x800.png/f8fafc/0f172a?text=Frete+Gr%C3%A1tis",
    author: "Equipe Afiliado MLII",
    category: "Dicas",
    tags: ["frete grátis", "conversão"],
    isPublished: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    metaTitle: "Como escolher produtos com frete grátis",
    metaDescription: "Dicas para destacar frete grátis e melhorar a taxa de conversão."
  }
];
