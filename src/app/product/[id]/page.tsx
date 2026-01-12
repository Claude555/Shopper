"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Correct hook for [id]

export default function ProductDetail() {
    const params = useParams(); // Gets the 'id' from the URL folder name
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");
    const [allImages, setAllImages] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                
                // Logic for Multi-images
                let rawImages = [];
                try {
                    rawImages = typeof data.image === 'string' ? JSON.parse(data.image) : data.image;
                } catch (e) {
                    rawImages = [data.image];
                }

                const formattedImages = rawImages.map((img: string) => 
                    img.startsWith('http') ? img : `${process.env.NEXT_PUBLIC_API_URL}/storage/${img}`
                );

                setProduct({ ...data, price: data.selling_price });
                setAllImages(formattedImages);
                setMainImage(formattedImages[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };

        if (params.id) fetchProduct();
    }, [params.id]);

    if (loading) return <div className="text-center py-20 uppercase italic font-bold">Sourcing...</div>;
    if (!product) return <div className="text-center py-20 text-red-500 font-bold">Product not found.</div>;

    const handleOrder = () => {
        const message = `Hi! I want to order the ${product.title} for KSh ${product.price.toLocaleString()}.`;
        window.open(`https://wa.me/254716319859?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
                <div className="bg-gray-50 rounded-3xl p-4 shadow-inner">
                    <img src={mainImage} className="rounded-2xl w-full object-contain max-h-[500px]" alt={product.title} />
                </div>
                <div className="flex gap-3 overflow-x-auto">
                    {allImages.map((img, index) => (
                        <img key={index} src={img} onClick={() => setMainImage(img)} 
                             className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${mainImage === img ? 'border-[#f68b1e]' : 'border-transparent'}`} />
                    ))}
                </div>
            </div>

            {/* Product Content */}
            <div className="space-y-6">
                <span className="text-[#f68b1e] font-black uppercase text-sm tracking-widest">{product.category}</span>
                <h1 className="text-5xl font-black uppercase italic leading-none">{product.title}</h1>
                <p className="text-4xl font-bold text-gray-800">KSh {product.price.toLocaleString()}</p>
                <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
                <button onClick={handleOrder} className="w-full bg-[#f68b1e] text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 shadow-xl">
                    ORDER NOW VIA WHATSAPP
                </button>
            </div>
        </div>
    );
}