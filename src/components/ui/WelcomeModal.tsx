"use client";
import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal 2 seconds after page load
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <X size={24} />
        </button>

        {/* Header Image/Icon */}
        <div className="bg-jumia-orange p-8 flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <Zap className="text-jumia-orange" size={48} fill="currentColor" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            WE SHOP, YOU RELAX! 🇰🇪
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Looking for any item in Nairobi? Save the hustle of traffic and crowded wholesalers. 
            We source it locally and deliver to your doorstep **within hours**.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-1 gap-4 text-left mb-8">
            <div className="flex items-start gap-3">
              <Clock className="text-jumia-orange shrink-0" size={20} />
              <p className="text-sm font-medium">Delivery within hours across Nairobi.</p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-jumia-orange shrink-0" size={20} />
              <p className="text-sm font-medium">Cash on Delivery - Pay after inspection.</p>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full bg-jumia-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200"
          >
            START SHOPPING
          </button>
          
          <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            The Ultimate Nairobi Personal Shopper
          </p>
        </div>
      </div>
    </div>
  );
}