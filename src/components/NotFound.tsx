"use client"
import Link from 'next/link';
import { Home, RefreshCw } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        <div className="relative">
          <div className="absolute -inset-4 bg-purple-500/10 blur-2xl rounded-full animate-pulse"></div>
          <h1 className="relative text-6xl sm:text-8xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 
            hover:bg-white/20 rounded-md transition-colors duration-300 
            border border-white/20 hover:border-white/40"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 
            hover:bg-white/20 rounded-md transition-colors duration-300 
            border border-white/20 hover:border-white/40"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reload</span>
          </button>
        </div>
      </div>
    </div>
  );
}