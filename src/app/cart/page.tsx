'use client';
import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import OrderSummary from '../../components/cart/OrderSummary';

export default function CartPage() {
  const [isClient, setIsClient] = React.useState(false);
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Only render the content after the component has mounted on the client
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // This prevents the mismatch error

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-full mb-6">
          <ShoppingBag size={80} className="text-gray-200" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty!</h2>
        <p className="text-gray-500 mb-8 text-center">
          Found something you like? We'll source and deliver it to you in hours.
        </p>
        <Link href="/">
          <button className="bg-[#f68b1e] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-[#e07b1a]">
            START SHOPPING
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-black italic uppercase">
          Your Shopping Cart ({cart.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center border border-gray-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded-lg border"
              />

              <div className="flex-1">
                <h3 className="font-bold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[#f68b1e] font-black text-lg">
                  KSh {(item.price || 0).toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-400 uppercase">
                  Sourced Locally
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                <button className="p-1 hover:text-[#f68b1e]">
                  <Minus size={18} />
                </button>
                <span className="font-bold w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="p-1 hover:text-[#f68b1e]"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-300 hover:text-red-500 transition p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest mt-4"
          >
            Clear Cart
          </button>
        </div>

        {/* Right: Summary Box */}
        <div className="lg:col-span-4">
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
