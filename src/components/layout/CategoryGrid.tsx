import React from 'react';

const subCategories = [
  { id: 1, title: "Phones", img: "/pics/blue.jpg", color: "bg-blue-50" },
  { id: 2, title: "Laptops", img: "/pics/1.jpg", color: "bg-orange-50" },
  { id: 3, title: "Watches", img: "/pics/main_image_5 (2).jpg", color: "bg-green-50" },
  { id: 4, title: "Audio", img: "/pics/main_image_5 (3).jpg", color: "bg-purple-50" },
  { id: 5, title: "Gaming", img: "/pics/pexels-mnzoutfits-1670768.jpg", color: "bg-red-50" },
  { id: 6, title: "Accessories", img: "/pics/5.jpg", color: "bg-yellow-50" },
];

export default function CategoryGrid() {
  return (
    <section className="mt-6">
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-bold text-center mb-4 text-lg">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {subCategories.map((item) => (
            <div key={item.id} className="flex flex-col items-center group cursor-pointer">
              <div className={`${item.color} w-full aspect-square rounded flex items-center justify-center mb-2 group-hover:shadow-md transition`}>
                <img src={item.img} alt={item.title} className="w-2/3 h-2/3 object-contain" />
              </div>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}