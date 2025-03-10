import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import RotatingCard from '@/components/Landing Page/RotatingCard';
import Head from 'next/head';

const HeroSection = () => {
  return (
    <>
      <Head>
        <title>Tago - Premium NFC Business Cards for Instant Digital Identity Sharing</title>
        <meta name="description" content="Experience the future of networking with Tago's premium NFC cards. Share your complete digital identity with a single tap." />
        <meta name="keywords" content="NFC cards, digital business cards, networking, tap and go, digital identity" />
        <meta property="og:title" content="Tago - Share Your World With One Tap" />
        <meta property="og:description" content="Premium NFC cards for seamless digital identity sharing. The future of networking is here." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/tago-card-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tago - Premium NFC Business Cards" />
        <meta name="twitter:description" content="Share your complete digital identity instantly with Tago's premium NFC cards." />
        <link rel="canonical" href="https://tagocard.com" />
      </Head>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8 md:py-12" aria-label="Tago NFC Card Hero Section">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-800/10 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        {/* Main content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:gap-12 items-center">
            {/* Text content */}
            <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
              <div className="inline-block mb-4">
                <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm bg-zinc-900/80 border border-zinc-700 flex items-center gap-1.5 md:gap-2">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-zinc-400" aria-hidden="true" />
                  <span>Tap and Go Technology</span>
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Share Your World
                <span className="block bg-gradient-to-r from-zinc-400 to-white text-transparent bg-clip-text">
                  With One Tap
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-zinc-400 mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
                Experience the future of networking with Tago&apos;s premium NFC cards. Share your complete digital identity instantly.
              </p>
              
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                <Link href="/login" className="w-full md:w-auto" aria-label="Get your Tago NFC card">
                  <button className="w-full md:w-auto px-6 py-3.5 md:px-8 md:py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center font-medium">
                      Get Your Card
                      <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>
                </Link>
                
                <Link href="/products" className="w-full md:w-auto" aria-label="View Tago card designs">
                  <button className="w-full md:w-auto px-6 py-3.5 md:px-8 md:py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105 border border-zinc-700">
                    See Designs
                  </button>
                </Link>
              </div>
              
              <div className="mt-6 md:mt-8 text-sm text-zinc-500 hidden md:block">
                <p>Trusted by professionals worldwide. Join thousands of networkers enhancing their digital presence.</p>
                <ul className="flex gap-4 mt-2">
                  <li>✓ One-tap sharing</li>
                  <li>✓ Premium design</li>
                  <li>✓ Unlimited contacts</li>
                </ul>
              </div>
            </div>
            
            {/* Rotating card component */}
            <div className="flex justify-center items-center md:w-1/2 scale-90 md:scale-110">
              <RotatingCard />
            </div>
          </div>
        </div>
        
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 w-full bg-zinc-800"></div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;