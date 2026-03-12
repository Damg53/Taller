import { MockProductRepository } from '../repositories/MockProductRepository';
import { MockOrderRepository } from '../repositories/MockOrderRepository';
import { ProductService } from '@/core/application/ProductService';
import { OrderService } from '@/core/application/OrderService';

// Singleton instances
const productRepository = new MockProductRepository();
const orderRepository = new MockOrderRepository();

export const productService = new ProductService(productRepository);
export const orderService = new OrderService(orderRepository);
