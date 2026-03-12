import { Product } from '../Product';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  updateStock(id: string, quantity: number): Promise<void>;
}
