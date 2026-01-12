"use client";   

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from "../../store/useCartStore";
import { Search, ShoppingCart, User, HelpCircle, Menu, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';



const Header = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`); // Redirects to search page
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Thin Bar (Desktop Only) */}
      <div className="bg-[#f1f1f2] py-1 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between text-[12px] text-gray-600">
          <div className="flex gap-4">
            <span className="text-jumia-orange cursor-pointer hover:underline">You buy, We deliver</span>
          </div>
          <div className="flex gap-6 uppercase">
            <span>FIND </span>
            <span>ORDER</span>
            <span>DELIVERED</span>
            <span>PAY</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-2">
          <Menu className="md:hidden cursor-pointer" size={28} />
          <a href=""></a>
          <Link href='/' className="text-2xl md:text-3xl font-extrabold tracking-tighter text-black cursor-pointer">
            SHOPPER <span className="text-jumia-orange font-black">★</span>
          </Link>
        </div>

        

        {/* Search Bar (Centered) */}
        <div className="flex-1 hidden md:flex items-center">
          <form onSubmit={handleSearch} className="flex-1 max-w-xl flex items-center bg-gray-100 rounded-lg px-4 py-2 border focus-within:border-[#f68b1e]">
      <Search className="text-gray-400" size={20} />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you need? Get it delivered today..." 
        className="bg-transparent border-none outline-none w-full px-3 text-sm"
      />
      <button type="submit" className="font-bold text-xs uppercase hover:text-[#f68b1e]">Search</button>
    </form>
        </div>
            <Link href="/request">
    <button className="hidden lg:flex items-center gap-2 border-2 border-jumia-orange text-jumia-orange px-4 py-2 rounded-md font-bold hover:bg-orange-50 transition ml-4 whitespace-nowrap">
      REQUEST ANY ITEM
    </button>
  </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6 font-medium text-[16px]">
          <div className="hidden md:flex flex-col text-[11px] border-l pl-4 border-gray-300 ml-4">
  <span className="text-gray-500 uppercase font-bold">Deliver to</span>
  <select className="bg-transparent font-bold text-black outline-none cursor-pointer">
    <option>Nairobi - CBD</option>
    <option>Nairobi - Westlands</option>
    <option>Nairobi - Kilimani</option>
    <option>Nairobi - Kasarani</option>
  </select>
</div>

          {/* <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-jumia-orange">
            <HelpCircle size={24} />
            <span>Help</span>
            <ChevronDown size={16} />
          </div> */}

          <Link href="/cart" className="flex items-center gap-2 hover:text-[#f68b1e] transition cursor-pointer">
  <div className="relative">
    <ShoppingCart size={26} />
    {/* Dynamic Badge */}
    <span className="absolute -top-2 -right-2 bg-[#f68b1e] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
      {useCartStore((state) => state.cart.length)}
    </span>
  </div>
  <span className="hidden md:block font-bold">Cart</span>
</Link>
        </div>
      </div>

      {/* Mobile Search (Visible only on mobile) */}
      <div className="md:hidden px-4 pb-3">
         <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 py-2 border border-gray-300 rounded-full bg-[#f1f1f2] text-sm focus:outline-none"
              placeholder="Search Shopper"
            />
          </div>
      </div>
    </nav>
  );
};

export default Header;