'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

export default function Featured() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/products');
        const data = await res.json();

        // Transform the data so ProductCard understands it
        const mappedData = data.slice(0, 5).map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.selling_price, // Map selling_price to price
          image: `${process.env.NEXT_PUBLIC_API_URL}/storage/${item.image}`,
          oldPrice: item.wholesale_price + 500, // Optional: create a fake old price for UI
        }));

        setProducts(mappedData);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* SECTION: FEATURED PRODUCTS */}
      <section>
        <div className="flex justify-between items-end mb-6 border-b-2 border-gray-100 pb-2">
          <div>
            <h2 className="text-2xl font-black italic uppercase text-gray-800">
              Featured Deals
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Sourced directly from Nairobi Wholesalers
            </p>
          </div>
          <Link
            href="/products"
            className="text-[#f68b1e] font-black text-sm uppercase hover:underline flex items-center gap-1"
          >
            See All <span className="text-lg">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              {...product} // This spreads the mapped fields (price, title, image) as props
            />
          ))}
        </div>
      </section>

      
    </div>
  );
}
