"use client"; // This MUST be line 1
import React from 'react';
import Link from 'next/link';
import { useCartStore } from "../../store/useCartStore";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ id, image, title, price, oldPrice, discount }: any) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart({
      id: id,
      title: title,
      price: price,
      image: image,
      quantity: 1
    });
    alert("Added to cart!");
  };

  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded p-2 hover:shadow-lg transition-shadow cursor-pointer group w-full border border-gray-100">
        <div className="relative h-[160px] w-full mb-2">
          <img src={image} alt={title} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
          {discount && (
            <span className="absolute top-1 right-1 bg-[#feefdf] text-[#f68b1e] text-[10px] font-bold px-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm truncate text-gray-800">{title}</h3>
          <p className="font-bold text-lg text-[#282828]">
  KSh {(price || 0).toLocaleString()}
</p>
          {oldPrice && (
            <p className="text-xs text-gray-400 line-through">KSh {oldPrice.toLocaleString()}</p>
          )}
          
          <button 
            onClick={handleAddToCart}
            className="mt-2 w-full bg-[#f68b1e] text-white py-2 rounded flex items-center justify-center gap-2 text-xs font-bold hover:bg-[#e07b1a] transition"
          >
            <ShoppingCart size={14} /> ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  );
}