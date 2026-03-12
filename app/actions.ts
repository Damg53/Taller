'use server'

import { orderService } from '@/infrastructure/di/container';
import { revalidatePath } from 'next/cache';

export async function markAsDelivered(orderId: string) {
  await orderService.markOrderAsDelivered(orderId);
  revalidatePath('/admin');
}
