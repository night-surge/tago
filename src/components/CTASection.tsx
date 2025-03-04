import React from 'react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <div className="py-20 px-4 bg-gradient-to-r from-zinc-900 to-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-700/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-block px-3 py-1 rounded-full text-xs bg-zinc-800 text-white mb-4">
          GET STARTED
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Networking?
        </h2>
        <p className="text-zinc-400 mb-8">
          Join the future of professional connections with Tago&apos;s premium NFC cards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              Order Your Card
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105 border border-zinc-700 w-full sm:w-auto">
              Contact Sales
            </button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider"></div>
      </div>
    </div>
  );
};

export default CTASection;