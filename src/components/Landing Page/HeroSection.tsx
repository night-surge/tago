import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
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
        <link rel="canonical" href="https://mytago.tech/" />
      </Head>

      {/* Desktop version */}
      <div className="relative min-h-screen hidden md:flex items-center justify-center px-4 pt-5 overflow-hidden" aria-label="Tago NFC Card Hero Section">
      
      <div className="absolute inset-0">
      
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-800/10 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <Link href="/working" className=" absolute mt-7 top-12 right-4 cursor-pointer" aria-label="Learn how Tago cards work">
        <button className="flex  items-center justify-center gap-2 text-sm text-white w-25 px-4 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105 border border-zinc-700">
          How It Works
          <Sparkles className="w-4 h-4 text-zinc-400" aria-hidden="true" />
        </button>
      </Link>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center py-12">
          <div className="text-left">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full text-sm bg-zinc-900/80 border border-zinc-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                <span>Tap and Go Technology</span>
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
              <Link href="/login" aria-label="Get your Tago NFC card">
                <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center font-medium">
                    Get Your Card
                  </span>
                </button>
              </Link>
              <Link href="/products" aria-label="View Tago card designs">
                <button className="px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105 border border-zinc-700">
                  See Designs
                </button>
              </Link>
            </div>
            <div className="mt-8 text-sm text-zinc-500">
              <p>Trusted by professionals worldwide. Join thousands of networkers enhancing their digital presence.</p>
              <ul className="flex gap-4 mt-2">
                <li>✓ One-tap sharing</li>
                <li>✓ Premium design</li>
                <li>✓ Unlimited contacts</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center scale-110">
            
            <RotatingCard />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 w-full bg-zinc-800"></div>
        </div>
      </div>
      
      {/* Mobile version */}
      <div className="relative min-h-screen flex md:hidden flex-col justify-center px-6 py-8 overflow-hidden" aria-label="Tago NFC Card Mobile Hero Section">
      <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-800/10 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center space-y-6 mt-8 mb-4">
          <div>
            <span className="px-3 py-1.5 rounded-full text-xs bg-zinc-900/80 border border-zinc-700 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-zinc-400" aria-hidden="true" />
              <span>Tap and Go Technology</span>
            </span>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Share Your World
              <span className="block bg-gradient-to-r from-zinc-400 to-white text-transparent bg-clip-text">
                With One Tap
              </span>
            </h1>
            <p className="text-zinc-400 mt-4 max-w-xs mx-auto">
              Experience the future of networking with Tago&apos;s premium NFC cards.
            </p>
          </div>

          
        </div>
          
          
        <div className="relative z-10 w-full flex justify-center items-center py-4">
          
          <RotatingCard />
          
        </div>
        
        <div className="relative z-10 w-full space-y-4 px-4 mt-4">
          <Link href="/login" className="block w-full" aria-label="Get your Tago NFC card">
            <button className="w-full py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center">
              <span className="font-medium flex items-center">
                Get Your Card
              </span>
            </button>
          </Link>
          
          <Link href="/products" className="block w-full" aria-label="View Tago card designs">
            <button className="w-full py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 border border-zinc-700">
              See Designs
            </button>
          </Link>
        </div>
        
        <div className="relative z-10 text-center mt-4 text-xs text-zinc-500">
          <ul className="flex justify-center gap-4">
            <li>✓ One-tap</li>
            <li>✓ Premium</li>
            <li>✓ Unlimited</li>
          </ul>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 w-full bg-zinc-800"></div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;