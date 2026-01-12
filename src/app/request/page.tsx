"use client";
import React, { useState } from 'react';
import { Camera, Send, MapPin, Info, Loader2 } from 'lucide-react';

export default function RequestProduct() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    item_description: '',
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/customer-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Request Sent! An agent will contact you shortly.");
        setFormData({ customer_name: '', phone_number: '', item_description: '', location: '' });
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2 italic">CAN'T FIND IT?</h1>
          <p className="text-gray-500 text-sm">We'll find it in the wholesale markets and deliver it to your door.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">What are you looking for?</label>
            <textarea 
              rows={3}
              value={formData.item_description}
              onChange={(e) => setFormData({...formData, item_description: e.target.value})}
              placeholder="E.g. Size 42 Blue Nike Airforce 1..."
              className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-[#f68b1e] outline-none"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Your Name</label>
              <input 
                type="text" 
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-[#f68b1e] outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone_number}
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                placeholder="07..." 
                className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-[#f68b1e] outline-none" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Delivery Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="E.g. CBD, Nairobi" 
                className="w-full border-2 border-gray-100 rounded-xl p-3 pl-10 focus:border-[#f68b1e] outline-none" 
                required 
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#f68b1e] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />} 
            {loading ? "SENDING..." : "SEND REQUEST"}
          </button>
        </form>
      </div>
    </div>
  );
}