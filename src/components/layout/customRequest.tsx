'use client';
import React, { useState } from 'react';

export default function CustomRequestForm() {
  // 1. Create state to hold form data
  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    item_description: '',
  });

  // 2. Handle the submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // This stops the localhost:3000/? refresh

    try {
      const response = await fetch('http://127.0.0.1:8000/api/custom-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Request sent to our Nairobi shoppers!');
        setFormData({
          customer_name: '',
          phone_number: '',
          item_description: '',
        }); // Clear form
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <section className="bg-gray-900 rounded-3xl p-8 text-white">
        <div className="">       

      <h2 className="text-3xl font-black italic uppercase mb-2">
        Can't find what you're looking for?
      </h2>
      <p className="text-gray-400 mb-6">
        Tell us what you need and we'll
        source it for you at wholesale prices.
      </p>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          required
          value={formData.customer_name}
          onChange={(e) =>
            setFormData({ ...formData, customer_name: e.target.value })
          }
          className="bg-gray-800 border-none rounded-xl p-4"
        />
        <input
          type="text"
          placeholder="WhatsApp Number"
          required
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          className="bg-gray-800 border-none rounded-xl p-4"
        />
        <textarea
          placeholder="Describe the item..."
          required
          value={formData.item_description}
          onChange={(e) =>
            setFormData({ ...formData, item_description: e.target.value })
          }
          className="md:col-span-2 bg-gray-800 border-none rounded-xl p-4 h-32"
        ></textarea>
        <button
          type="submit"
          className="md:col-span-2 bg-[#f68b1e] text-white font-black py-4 rounded-xl uppercase"
        >
          Send Request to Shoppers
        </button>
      </form>
        </div>
    </section>
  );
}
