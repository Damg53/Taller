import { Order, OrderStatus } from '../Order';

export interface OrderRepository {
  getOrders(): Promise<Order[]>;
  getOrdersByCustomer(customerName: string): Promise<Order[]>;
  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<void>;
}
