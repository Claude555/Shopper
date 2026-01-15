'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Correct hook for ?category=
import ProductCard from '@/components/product/ProductCard';

export const dynamic = 'force-dynamic';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

function AllProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

useEffect(() => {
  // Use the Environment Variable set in Vercel/Local
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const url = category
    ? `${API_BASE}/api/products?category=${category}`
    : `${API_BASE}/api/products`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const mapped = data.map(
        (item: {
          id: number;
          title: string;
          selling_price: number;
          image: string;
        }) => ({
          id: item.id,
          title: item.title,
          price: item.selling_price,
          // Dynamically link to the Render storage folder
          image: `${API_BASE}/storage/${item.image}`,
        })
      );
      setProducts(mapped);
    })
    .catch(err => console.error("Fetch error:", err));
}, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-black uppercase mb-8">
        All Nairobi Inventory
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((p: Product) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense
      fallback={<div className="max-w-7xl mx-auto px-4 py-10">Loading...</div>}
    >
      <AllProductsContent />
    </Suspense>
  );
}
