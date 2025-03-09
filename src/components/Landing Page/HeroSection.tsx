'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import RotatingCard from '@/components/Landing Page/RotatingCard';

const HeroSection = () => {
  // Client-side media query detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth <= 768);
    
    // Add event listener for resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Desktop Hero Section */}
      {!isMobile && (
        <div className="relative min-h-screen flex items-center justify-center px-4 pt-5">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-800/10 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center py-12">
            <div className="text-left">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 rounded-full text-sm bg-zinc-900/80 border border-zinc-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-zinc-400" />
                  Tap and Go Technology
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Share Your World
                <span className="block bg-gradient-to-r from-zinc-400 to-white text-transparent bg-clip-text">
                  With One Tap
                </span>
              </h1>
              <p className="text-lg text-zinc-400 mb-8 max-w-md">
                Experience the future of networking with Tago&apos;s premium NFC cards. Share your complete digital identity instantly.
              </p>
              <div className="flex flex-row gap-4 justify-start">
                <Link href="/login">
                  <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center font-medium">
                      Get Your Card
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link href="/products">
                  <button className="px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105 border border-zinc-700">
                    See Designs
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center scale-110">
              <RotatingCard />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            {/* Clear separator line */}
            <div className="h-1 w-full bg-zinc-800"></div>
          </div>
        </div>
      )}
      
      {/* Mobile Hero Section */}
      {isMobile && (
        <div className="relative h-screen w-screen flex flex-col justify-between px-4 pt-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-800/10 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full py-8">
            {/* Top section with text content */}
            <div className="text-center mt-4">
              <div className="inline-block mb-4">
                <span className="px-3 py-1.5 rounded-full text-xs bg-zinc-900/80 border border-zinc-700 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-zinc-400" />
                  Tap and Go Technology
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Share Your World
                <span className="block bg-gradient-to-r from-zinc-400 to-white text-transparent bg-clip-text">
                  With One Tap
                </span>
              </h1>
              <p className="text-base text-zinc-400 mb-6 max-w-xs mx-auto">
                Experience the future of networking with Tago&apos;s premium NFC cards.
              </p>
            </div>
            
            {/* Middle section with card */}
            <div className="flex justify-center items-center my-4 scale-90">
              <RotatingCard />
            </div>
            
            {/* Bottom section with CTA buttons */}
            <div className="flex flex-col gap-3 mt-auto mb-8">
              <Link href="/login" className="w-full">
                <button className="w-full px-6 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300">
                  <span className="flex items-center justify-center font-medium">
                    Get Your Card
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </button>
              </Link>
              <Link href="/products" className="w-full">
                <button className="w-full px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 border border-zinc-700">
                  See Designs
                </button>
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            {/* Clear separator line */}
            <div className="h-1 w-full bg-zinc-800"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;