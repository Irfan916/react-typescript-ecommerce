import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: Props) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  // If the sidebar is closed, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark overlay background */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity" 
        onClick={onClose} 
      />

      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition">
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-20 h-20 object-contain mix-blend-multiply bg-white rounded-lg p-2" 
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.title}</h3>
                    <p className="text-blue-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-slate-500 hover:text-blue-600 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-slate-500 hover:text-blue-600 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-1 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        <div className="p-4 border-t bg-slate-50">
          <div className="flex justify-between items-center mb-4 text-lg font-bold text-slate-800">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}