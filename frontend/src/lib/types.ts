export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  stock: number;
  category: string;
  brand: string;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  ingredients?: ProductIngredient[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  order: number;
}

export interface ProductIngredient {
  id: string;
  product_id: string;
  name: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  user?: {
    [x: string]: any;
    raw_user_meta_data: any;
    id: string;
    email: string;
    avatar_url?: string;
  };
}