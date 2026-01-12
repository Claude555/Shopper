import React from 'react';
import ProductCard from "../../../components/product/ProductCard";
import { MessageCircle, Filter, ChevronDown } from 'lucide-react';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Logic to fetch products based on params.slug from Laravel will go here later
  const products = [
    { id: 1, title: "Samsung Galaxy A15", price: 18500, oldPrice: 22000, discount: 16, image: "https://via.placeholder.com/200" },
    { id: 2, title: "iPhone 13 128GB", price: 85000, oldPrice: 95000, discount: 10, image: "https://via.placeholder.com/200" },
    // ... more items
  ];

  return (
    <div className="container mx-auto py-4">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 mb-4 px-2">
        Home {'>'} Mobile Phones {'>'} <span className="text-black capitalize">{params.slug}</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block col-span-3 space-y-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-bold text-sm uppercase border-b pb-2 mb-3">Category</h3>
            <ul className="text-sm space-y-2">
              <li className="text-jumia-orange font-medium cursor-pointer">All Smart Phones</li>
              <li className="hover:text-jumia-orange cursor-pointer">Feature Phones</li>
              <li className="hover:text-jumia-orange cursor-pointer">Refurbished Phones</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-bold text-sm uppercase border-b pb-2 mb-3">Price (KSh)</h3>
            <input type="range" className="w-full accent-jumia-orange" />
            <div className="flex justify-between text-xs mt-2">
              <span>0</span>
              <span>100k+</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 lg:col-span-9">
          {/* Header & Sort */}
          <div className="bg-white p-3 rounded shadow-sm mb-4 flex justify-between items-center">
            <h1 className="font-bold text-lg capitalize">{params.slug} Store</h1>
            <div className="flex items-center gap-2 text-sm border p-1 rounded cursor-pointer">
              Sort by: <span className="font-bold">Popularity</span> <ChevronDown size={16} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {products.map((p) => (
              <div key={p.id} className="relative group">
                <ProductCard {...p} />
                
                {/* WhatsApp Order Button overlay */}
                <a 
                  href={`https://wa.me/254700000000?text=I'm interested in ${p.title}`}
                  target="_blank"
                  className="absolute bottom-24 right-4 bg-[#25D366] text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold"
                >
                  <MessageCircle size={16} /> Order
                </a>
              </div>
            ))}
          </div>

          {/* Fully Description Section (SEO) */}
          <article className="mt-10 bg-white p-6 rounded shadow-sm">
            <h2 className="font-bold text-xl mb-4 uppercase">Shop {params.slug} online on Jumia</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Explore a wide range of {params.slug} at the best prices. Whether you are looking for high-end flagship devices or budget-friendly options, our collection has it all. Enjoy fast delivery and secure payment options across the country.
            </p>
          </article>

          {/* Suggested Products (Recommendations) */}
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-4">You May Also Like</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {/* Reuse ProductCard for suggestions */}
              {products.slice(0, 5).map((p) => (
                <ProductCard key={`suggest-${p.id}`} {...p} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}