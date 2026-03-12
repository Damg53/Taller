import { productService, orderService } from '@/infrastructure/di/container';
import Link from 'next/link';
import { DeliverButton } from './DeliverButton';

export default async function AdminPage() {
  const pendingOrders = await orderService.getPendingOrders();
  const products = await productService.getAllProducts();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-100 py-6 px-8 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Express-Bite</h1>
              <Link href="/" className="text-xs text-brand hover:underline bg-brand-light px-2 py-1 rounded-full">Ver Tienda</Link>
            </div>
            <p className="text-sm text-gray-500 font-medium">Panel de Gestión Universitaria</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-3 w-3 rounded-full bg-brand"></span>
            <span className="text-sm font-medium text-gray-600">Sistema Activo</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pedidos Entrantes */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Pedidos Entrantes</h2>
            <span className="px-3 py-1 bg-green-50 text-brand text-xs font-bold rounded-full uppercase tracking-wider">
              {pendingOrders.length} Pendientes
            </span>
          </div>
          
          <div className="space-y-4">
            {pendingOrders.map(order => (
              <div key={order.id} className="bg-gray-50 p-6 rounded-custom border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-brand/30">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold mb-1">#{order.id}</span>
                  <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.items.map(item => `${item.quantity}x ${item.productName}`).join(', ')}
                  </p>
                </div>
                <DeliverButton orderId={order.id} />
              </div>
            ))}
            {pendingOrders.length === 0 && (
              <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-custom border border-gray-100">
                No hay pedidos pendientes
              </div>
            )}
          </div>
        </section>

        {/* Gestión de Inventario */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Gestión de Inventario</h2>
          </div>
          
          <div className="bg-white rounded-custom border border-gray-100 overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Stock Actual</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{product.name}</span>
                          {product.stock === 0 && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase">Agotado</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">Categoría: {product.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-500 font-bold' : 'text-gray-700'}`}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-brand hover:text-green-700 font-semibold text-sm px-4 py-2 border border-brand/20 rounded-lg hover:bg-green-50 transition-colors">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="mt-12 py-8 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">© 2026 Express-Bite Systems. Optimizado para personal administrativo.</p>
      </footer>
    </div>
  );
}
