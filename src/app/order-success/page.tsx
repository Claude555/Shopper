"use client";
import React, { useEffect } from 'react';
import { CheckCircle, ShoppingBag, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from "../../store/useCartStore";

export default function OrderSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear the cart once the user reaches this page
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full animate-bounce">
          <CheckCircle size={60} className="text-green-600" />
        </div>
      </div>
      
      <h1 className="text-3xl font-black mb-4">ORDER SENT!</h1>
      <p className="text-gray-600 mb-8">
        Your request has been sent to our WhatsApp team. Keep your phone nearby—an agent will call you to confirm delivery shortly.
      </p>

      <div className="space-y-4">
        <Link href="/">
          <button className="w-full bg-[#f68b1e] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
            <ShoppingBag size={20} /> CONTINUE SHOPPING
          </button>
        </Link>
        
        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
          Sourcing items from Nairobi wholesalers...
        </p>
      </div>
    </div>
  );
}