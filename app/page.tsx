import Image from 'next/image';
import { productService, orderService } from '@/infrastructure/di/container';
import { Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function CustomerPage() {
  const products = await productService.getAllProducts();
  const myOrders = await orderService.getMyOrders('Current User');
  const activeOrders = myOrders.filter(o => o.status !== 'delivered');

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded-custom flex items-center justify-center text-white font-bold italic">
            E
          </div>
          <h1 className="text-lg font-bold tracking-tight">Express-Bite</h1>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          <span className="text-xs font-medium text-gray-600">Espera actual: 3 pedidos</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 pb-64">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold">Menú del día</h2>
            <p className="text-sm text-gray-500">Pide ahora y ahorra tiempo</p>
          </div>
          <Link href="/admin" className="text-xs text-brand hover:underline">Ir a Admin</Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map(product => (
            <article key={product.id} className="bg-white border border-gray-100 rounded-custom shadow-sm overflow-hidden flex flex-col">
              <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                <span className="text-brand font-bold mt-auto text-sm">${product.price.toFixed(2)}</span>
                <button className="mt-2 w-full bg-brand hover:bg-opacity-90 text-white font-semibold py-2 rounded-custom transition-all text-xs">
                  Pedir
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Order Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl space-y-3 z-40">
        <h2 className="text-base font-bold px-1">Mi Pedido</h2>
        
        {activeOrders.map(order => (
          <div key={order.id} className={`flex items-center justify-between p-3 rounded-custom border ${order.status === 'ready' ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-custom flex items-center justify-center ${order.status === 'ready' ? 'bg-green-100' : 'bg-orange-100'}`}>
                {order.status === 'ready' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Clock className="w-6 h-6 text-orange-500" />
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${order.status === 'ready' ? 'text-green-900' : ''}`}>
                  {order.items[0]?.productName} {order.items.length > 1 ? `+${order.items.length - 1}` : ''}
                </p>
                <p className={`text-xs font-medium ${order.status === 'ready' ? 'text-status-ready font-bold animate-pulse' : 'text-orange-600'}`}>
                  {order.status === 'ready' ? '¡Listo para recoger!' : 'Preparando'}
                </p>
              </div>
            </div>
            <div className={`text-xs font-mono px-2 py-1 rounded ${order.status === 'ready' ? 'bg-green-200 text-green-800' : 'bg-orange-100 text-orange-700'}`}>
              #{order.id}
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
}
