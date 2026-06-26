export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  leatherType: string;
  dimensions: string;
  weight: string;
  colors: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  isGift?: boolean;
  giftType?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}
