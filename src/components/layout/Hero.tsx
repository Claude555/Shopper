'use client';
import {
  Apple,
  Smartphone,
  Home,
  Tv,
  Shirt,
  Baby,
  Ghost,
  MessageCircle,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const categories = [
  { name: 'Supermarket', icon: <Apple size={18} /> },
  { name: 'Phones & Tablets', icon: <Smartphone size={18} /> },
  { name: 'Home & Office', icon: <Home size={18} /> },
  { name: 'Appliances', icon: <Tv size={18} /> },
  { name: 'Fashion', icon: <Shirt size={18} /> },
  { name: 'Baby Products', icon: <Baby size={18} /> },
  { name: 'Gaming', icon: <Ghost size={18} /> },
];

export default function Hero() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const sliderImages = [
    '/pics/1.jpg', // Replace with your image paths
    '/pics/black.jpg',
    '/pics/blue.jpg',
    '/pics/bright black.jpg',
    '/pics/5.jpg',
    '/pics/pexels-mnzoutfits-1670768.jpg', // Replace with your image paths
    '/pics/pexels-knownasovan-62689.jpg',
    '/pics/KITCHEN (1).jpg',
    '/pics/KITCHEN (3).jpg',
    '/pics/main_image_2 (3).jpg',
  ];

  return (
    <section className="grid grid-cols-12 gap-4 h-[380px]">
      {/* 1. Side Navigation (Left) */}
      <div className="hidden lg:block col-span-3 bg-white rounded shadow-sm overflow-hidden py-2">
        {categories.map((cat, index) => (
          <Link
            key={index}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 hover:text-[#f68b1e] cursor-pointer text-[13px] transition-colors"
          >
            {cat.icon}
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* 2. Main Slider (Middle) */}
      <div className="col-span-12 lg:col-span-7 bg-blue-200 rounded shadow-sm relative overflow-hidden">
        <div className="embla overflow-hidden h-full" ref={emblaRef}>
          <div className="embla__container flex h-full">
            {sliderImages.map((src, index) => (
              <div
                className="embla__slide flex-[0_0_100%] min-w-0 h-full"
                key={index}
              >
                <Image
                  src={src}
                  alt={`Promo ${index + 1}`}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Right Promo Cards (Right) */}
      <div className="hidden lg:flex col-span-2 flex-col gap-4">
        {/* Call Card */}
        <div className="h-1/2 bg-white rounded shadow-sm p-2 flex flex-col items-center justify-center text-center">
          <div className="bg-orange-100 p-2 rounded-full mb-2">
            <Smartphone className="text-orange-500" size={24} />
          </div>
          <p className="text-xs font-bold">CALL TO ORDER</p>
          <p className="text-[10px]">0716-319-854</p>
        </div>
        <div className="h-1/2 bg-white rounded shadow-sm p-2 flex flex-col items-center justify-center text-center">
          <div className="bg-green-100 p-2 rounded-full mb-2">
            <MessageCircle className="text-green-600" size={24} />
          </div>
          <p className="text-xs font-bold uppercase">WhatsApp Us</p>
          <p className="text-[10px]">Click to chat</p>
        </div>
      </div>
    </section>
  );
}
