'use client';
import { dynamic } from 'next/dynamic';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Correct hook for ?category=
import ProductCard from '@/components/product/ProductCard';

export const dynamic = 'force-dynamic';

function AllProductsContent() {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const url = category
      ? `http://127.0.0.1:8000/api/products?category=${category}`
      : 'http://127.0.0.1:8000/api/products';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.selling_price,
          image: `http://127.0.0.1:8000/storage/${item.image}`,
        }));
        setProducts(mapped);
      });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-black uppercase mb-8">
        All Nairobi Inventory
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((p: any) => (
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
