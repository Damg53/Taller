'use client'

import { useState, useTransition } from 'react';
import { markAsDelivered } from '../actions';

export function DeliverButton({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition();
  const [delivered, setDelivered] = useState(false);

  const handleDeliver = () => {
    setDelivered(true);
    startTransition(() => {
      markAsDelivered(orderId);
    });
  };

  if (delivered) {
    return (
      <button disabled className="bg-gray-400 text-white font-semibold py-3 px-6 rounded-custom text-sm whitespace-nowrap opacity-50 cursor-not-allowed">
        Entregado ✓
      </button>
    );
  }

  return (
    <button 
      onClick={handleDeliver}
      disabled={isPending}
      className="bg-brand hover:opacity-90 text-white font-semibold py-3 px-6 rounded-custom text-sm transition-all active:scale-95 whitespace-nowrap"
    >
      {isPending ? 'Procesando...' : 'Marcar como Entregado'}
    </button>
  );
}
