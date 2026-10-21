import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Product } from './types';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import { useCartStore } from './store/cartStore';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  //  State to open/close the cart
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const cartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" /> TS Shop
          </h1>
          
          {/* Make the Cart button clickable */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg font-medium transition"
          >
            Cart: {cartItems.length} items | ${totalPrice.toFixed(2)}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20 text-xl text-slate-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Add the Sidebar at the bottom */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}