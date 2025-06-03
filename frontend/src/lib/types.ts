export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  stock: number;
  category: string | Category;
  brand: string;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  imageUrl?: string;
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