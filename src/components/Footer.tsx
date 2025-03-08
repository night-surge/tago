import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-zinc-800 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <span className="text-2xl font-bold text-white">Tago</span>
          <p className="text-zinc-400">Share your world with a tap.</p>
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/company/mytagotech/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/my_tago"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold">Products</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://www.mytago.tech/products" className="text-zinc-400 hover:text-white transition-colors">
                Our Products
              </a>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://www.mytago.tech/login" className="text-zinc-400 hover:text-white transition-colors">
                Login
              </a>
            </li>
            <li>
              <a href="https://www.mytago.tech/contact" className="text-zinc-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="https://www.mytago.tech/" className="text-zinc-400 hover:text-white transition-colors">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-400 text-sm">
        <div className="mb-4">
          <a href="https://www.mytago.tech/" className="text-zinc-400 hover:text-white transition-colors">www.mytago.tech</a>
        </div>
        © {new Date().getFullYear()} Tago. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;