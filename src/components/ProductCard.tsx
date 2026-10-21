import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

// If we pass the wrong data, TypeScript will highlight it in red.
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
      <div className="h-48 bg-white p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain mix-blend-multiply"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-800 line-clamp-2 text-sm flex-1">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-slate-500">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition active:scale-90"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}