'use client';
import React from 'react';
import Link from 'next/link';

export default function OrderSummary({ subtotal }: { subtotal: number }) {
  const deliveryFee = 250; // Standard Nairobi Rate
  const serviceMargin = subtotal * 0.05; // 5% your profit for sourcing
  const total = subtotal + deliveryFee + serviceMargin;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
      <h2 className="font-black text-lg mb-6 border-b pb-4 italic">
        TOTAL SUMMARY
      </h2>

      <div className="space-y-4 text-sm mb-6">
        <div className="flex justify-between text-gray-500">
          <span>Items Total</span>
          <span className="font-bold text-gray-900">
            KSh {subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Sourcing Fee (5%)</span>
          <span className="font-bold text-gray-900">
            KSh {serviceMargin.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Delivery (Nairobi)</span>
          <span className="font-bold text-gray-900">
            KSh {deliveryFee.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="border-t border-dashed pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-bold">TOTAL TO PAY</span>
          <span className="text-2xl font-black text-[#f68b1e]">
            KSh {total.toLocaleString()}
          </span>
        </div>
        <p className="text-[10px] text-green-600 font-bold mt-2 italic text-center uppercase tracking-tighter">
          Pay with M-Pesa or Cash on Delivery
        </p>
      </div>

      <Link href="/checkout">
        <button className="w-full bg-[#f68b1e] text-white py-4 rounded-xl font-black text-lg hover:shadow-lg transition-transform hover:-translate-y-1 active:scale-95 shadow-orange-200 shadow-xl">
          PROCEED TO CHECKOUT
        </button>
      </Link>
    </div>
  );
}
