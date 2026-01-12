import React from 'react';
import { Zap } from 'lucide-react';
import ProductCard from './ProductCard';

export default function FlashSale() {
const dummyProducts = [
    { 
      id: 1, 
      title: "Samsung/IPhone silicon case", 
      price: 850, 
      oldPrice: 1850, 
      discount: 52, 
      image: "/pics/1.jpg" // Points to public/pics/1.jpg
    },
    { 
      id: 2, 
      title: "TWS Earbuds Bluetooth 5.0", 
      price: 900, 
      oldPrice: 1250, 
      discount: 30, 
      image: "/pics/black.jpg" // Points to public/pics/black.jpg
    },
    { 
      id: 3, 
      title: "Oppo/Techno Phone Case", 
      price: 800, 
      oldPrice: 1000, 
      discount: 48, 
      image: "/pics/blue.jpg" 
    },
    { 
      id: 4, 
      title: "AXK Helmet Quality Material", 
      price: 6100, 
      oldPrice: 9000, 
      discount: 30, 
      image: "/pics/bright black.jpg" 
    },
    { 
      id: 5, 
      title: "Samsung Original 25w Fast Charger", 
      price: 800, 
      oldPrice: 1500, 
      discount: 47, 
      image: "/pics/Fast-charger.jpg" 
    },
    { 
      id: 6, 
      title: "10Pcs Cookware Set Non-Stick", 
      price: 5500, 
      oldPrice: 7200, 
      discount: 32, 
      image: "/pics/KITCHEN (1).jpg" 
    },
  ];

  return (
    <section className="bg-white rounded shadow-sm mt-6 overflow-hidden">
      {/* Header */}
      <div className="bg-[#e61601] text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold uppercase">
          <Zap fill="white" size={20} />
          <span>Flash Sales</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block font-medium">Time Left: 08h : 22m : 10s</span>
          <button className="text-sm font-bold hover:underline">SEE ALL {'>'}</button>
        </div>
      </div>

      {/* Product List (Horizontal Scroll) */}
      <div className="p-4 flex gap-4 overflow-x-auto scrollbar-hide">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}