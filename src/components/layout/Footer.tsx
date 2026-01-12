import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#313433] text-white mt-10">
      {/* Top section: Newsletter */}
      

      {/* Bottom section: Links */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-gray-400">
        <div>
          <h4 className="text-white font-bold mb-3 uppercase">Let Us Help You</h4>
          <ul className="space-y-2">
            <li>Help Center</li>
            <li>How to shop on Shopper</li>
            <li>Delivery options and timelines</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 uppercase">About Shopper</h4>
          <ul className="space-y-2">
            <li>About us</li>
            <li>Shopper Options</li>
            <li>Terms and Conditions</li>
          </ul>
        </div> 
        <div>
          <h4 className="text-white font-bold mb-3 uppercase">Make Money with Shopper</h4>
          <ul className="space-y-2">
            <li>Order with Us</li>
            <li>Become a Sales Consultant</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3 uppercase">Delivery Counties</h4>
          <ul className="space-y-2 flex flex-wrap gap-x-4">
            <li>Nairobi</li><li>Mombasa</li><li>Kisumu</li><li>Nakuru</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}