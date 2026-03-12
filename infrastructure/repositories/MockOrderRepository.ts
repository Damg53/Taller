import { Order, OrderStatus } from '@/core/domain/Order';
import { OrderRepository } from '@/core/domain/repositories/OrderRepository';

let mockOrders: Order[] = [
  {
    id: 'ORD-2045',
    customerName: 'Alejandro García',
    items: [
      { productId: 'p5', productName: 'Hamburguesa Clásica', quantity: 1 },
      { productId: 'p3', productName: 'Refresco Mediano', quantity: 1 }
    ],
    status: 'pending',
    createdAt: new Date()
  },
  {
    id: 'ORD-2046',
    customerName: 'María Rodríguez',
    items: [
      { productId: 'p7', productName: 'Tacos de Pollo', quantity: 2 },
      { productId: 'p8', productName: 'Agua Mineral', quantity: 1 }
    ],
    status: 'pending',
    createdAt: new Date()
  },
  {
    id: 'ORD-2047',
    customerName: 'Carlos Méndez',
    items: [
      { productId: 'p6', productName: 'Ensalada César', quantity: 1 },
      { productId: 'p9', productName: 'Té Helado', quantity: 1 }
    ],
    status: 'pending',
    createdAt: new Date()
  },
  {
    id: 'A24',
    customerName: 'Current User',
    items: [
      { productId: 'p1', productName: 'Café Americano', quantity: 1 }
    ],
    status: 'preparing',
    createdAt: new Date()
  },
  {
    id: 'A21',
    customerName: 'Current User',
    items: [
      { productId: 'p2', productName: 'Empanada de Carne', quantity: 1 }
    ],
    status: 'ready',
    createdAt: new Date()
  }
];

export class MockOrderRepository implements OrderRepository {
  async getOrders(): Promise<Order[]> {
    return [...mockOrders];
  }

  async getOrdersByCustomer(customerName: string): Promise<Order[]> {
    return mockOrders.filter(o => o.customerName === customerName);
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date()
    };
    mockOrders.push(newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    const order = mockOrders.find(o => o.id === id);
    if (order) {
      order.status = status;
    }
  }
}
