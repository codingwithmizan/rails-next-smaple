import { PaginationMeta } from "@/lib/models/meta";

export interface ProductsResponse {
  products: Product[];
  meta: PaginationMeta;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
}
