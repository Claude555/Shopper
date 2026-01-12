"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import Hero from "../components/layout/Hero";
import Featured from "@/components/layout/featured";
import FlashSale from "../components/product/FlashSale"; // Add this
import CustomRequestForm from '@/components/layout/customRequest';  

export default function Home() {
  return (
    
    <div className="pb-10">
      <Hero />
      <FlashSale />
      <Featured />
      <CustomRequestForm /> 
      {/* You can add more categories or banners here */}
    </div>
  );
}