"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from "../../store/useCartStore";
import { MessageCircle, MapPin, Phone, User, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { cart, getTotalPrice } = useCartStore();
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return null;

  const subtotal = getTotalPrice();
  const deliveryFee = 250;
  const serviceMargin = subtotal * 0.05;
  const grandTotal = subtotal + deliveryFee + serviceMargin;

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Format the Product List for WhatsApp
    const itemList = cart.map(item => `- ${item.quantity}x ${item.title} (KSh ${item.price})`).join('%0A');
    
    // 2. Build the Message
    const message = `*NEW ORDER FROM SITE*%0A%0A` +
      `*Customer:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Location:* ${location}%0A%0A` +
      `*Items:*%0A${itemList}%0A%0A` +
      `*Total to Pay:* KSh ${grandTotal.toLocaleString()}%0A%0A` +
      `_I am ready for delivery. Please confirm!_`;

    // 3. Open WhatsApp (Replace with your actual business number)
    const whatsappNumber = "254716319859"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    router.push('/order-success');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-black italic mb-8 uppercase tracking-tight">Complete Your Order</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Delivery Details Form */}
        <form onSubmit={handleWhatsAppOrder} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="text-[#f68b1e]" /> Delivery Info
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-300" size={18} />
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#f68b1e] outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">M-Pesa Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-300" size={18} />
                <input 
                  type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="07..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#f68b1e] outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Delivery Estate/Building</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-300" size={18} />
                <input 
                  type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kilimani, Yaya Centre"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#f68b1e] outline-none" 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#1ebd5b] transition shadow-lg shadow-green-100"
          >
            <MessageCircle size={24} /> ORDER VIA WHATSAPP
          </button>
        </form>

        {/* Right: Order Preview */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit">
          <h2 className="font-bold mb-4 flex items-center gap-2 text-gray-700">
            <ShoppingBag size={20} /> Order Summary
          </h2>
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.quantity}x {item.title}</span>
                <span className="font-bold italic">KSh {item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed pt-4 space-y-2">
             <div className="flex justify-between text-xs text-gray-400">
                <span>Subtotal</span>
                <span>KSh {subtotal.toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-xs text-gray-400">
                <span>Sourcing & Delivery</span>
                <span>KSh {(deliveryFee + serviceMargin).toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-xl font-black text-[#f68b1e] pt-2">
                <span>TOTAL</span>
                <span>KSh {grandTotal.toLocaleString()}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}