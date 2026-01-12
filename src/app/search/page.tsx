"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${query}`);
        
        const data = await res.json();
        
        // Map data as we did before
        interface Product {
          id: number;
          selling_price: number;
          image: string | string[];
          // Add other properties as needed
        }
        
                const mapped = data.map((item: Product) => ({
          ...item,
          price: item.selling_price,
          image: Array.isArray(item.image) ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${item.image[0]}` : `${process.env.NEXT_PUBLIC_API_URL}/storage/${item.image}`
        }));
        setResults(mapped);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };

    if (query) fetchResults();
  }, [query]);

  if (loading) return <div className="p-20 text-center font-bold animate-pulse">SEARCHING NAIROBI MARKETS...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-black mb-8 italic uppercase">Results for: "{query}"</h1>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {results.map((p: any) => <ProductCard key={p.id} {...p} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <h2 className="text-4xl font-black mb-4 italic uppercase">Item Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">We don't have "{query}" in stock right now, but we can source it for you from the wholesale market today!</p>
          <button 
            onClick={() => router.push('/request')}
            className="bg-[#f68b1e] text-white px-10 py-4 rounded-xl font-bold uppercase hover:bg-orange-600 transition"
          >
            Place Custom Request
          </button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<div>Loading...</div>}><SearchContent /></Suspense>;
}