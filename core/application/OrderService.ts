import { OrderRepository } from '../domain/repositories/OrderRepository';
import { OrderStatus } from '../domain/Order';

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getPendingOrders() {
    const orders = await this.orderRepository.getOrders();
    return orders.filter(o => o.status === 'pending');
  }

  async getMyOrders(customerName: string) {
    return this.orderRepository.getOrdersByCustomer(customerName);
  }

  async markOrderAsDelivered(orderId: string) {
    await this.orderRepository.updateOrderStatus(orderId, 'delivered');
  }
}
