export interface Product {
  id: string;
  mlId: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
  subcategory?: string;
  specifications: Record<string, string>;
  stock: number | null;
  freeShipping: boolean;
  affiliateLink: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  tags: string[];
}
