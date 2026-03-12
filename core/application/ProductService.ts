import { ProductRepository } from '../domain/repositories/ProductRepository';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts() {
    return this.productRepository.getProducts();
  }
}
