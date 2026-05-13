export type ProductItem = {
  id: number;
  title: string;
  image: string [];
  brand: string;
  price: string;
  description: string;
  thumbnail: string;
  images: string [];
  category: string;
}

export type FetchProductsResponse ={
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
}

export type ShopState = {
  products: ProductItem [];
  categories: string [],
  catalogItem: ProductItem | null;
  total: number, 
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | string,
}

export type FetchProductsParams = {
  activeCategory: string | null;
  skip: number;
  limit: number;
  signal?: AbortSignal; 
  search: string | null;
}

export type FetchProductByIdParams = {
  id: number;
  signal?: AbortSignal;
}

export type CartItemParams = {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

export type CartState = {
  items: CartItemParams [];
  totalCount: number;
  totalPrice: number;
}