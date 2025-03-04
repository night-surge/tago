"use client";
import React, { useState, useMemo, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Search, SlidersHorizontal, X, RotateCw, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Card1 from '@/assets/cards/1.svg';
import Card2 from '@/assets/cards/2.svg';
import Card3 from '@/assets/cards/3.svg';
import Card4 from '@/assets/cards/4.svg';
import Card5 from '@/assets/cards/5.svg';
import Card6 from '@/assets/cards/6.svg';
import Card7 from '@/assets/cards/7.svg';
import Card8 from '@/assets/cards/8.svg';
import Card9 from '@/assets/cards/9.svg';
import Card10 from '@/assets/cards/10.svg';
import Card11 from '@/assets/cards/11.svg';
import Card12 from '@/assets/cards/12.svg';
import Card13 from '@/assets/cards/13.svg';
import Card14 from '@/assets/cards/14.svg';
import Card15 from '@/assets/cards/15.svg';
import Card16 from '@/assets/cards/16.svg';

type AspectRatio = '3/4' | '4/5' | '5/6' | '1/1' | '9/16';

const aspectRatios: AspectRatio[] = ['3/4', '4/5', '5/6', '1/1', '9/16'];

interface Design {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  rating: string;
  aspectRatio: AspectRatio;
}

const QuickLookModal = ({ design, isOpen, onClose }: { design: Design; isOpen: boolean; onClose: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Card Container */}
            <div className="relative perspective-1000 w-full aspect-[3/4]">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full relative [transform-style:preserve-3d]"
              >
                {/* Front */}
                <div className={`absolute inset-0 w-full h-full backface-hidden ${isFlipped ? 'invisible' : ''}`}>
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black border border-white/10">
                    <Image
                      src={design.imageSrc}
                      alt={design.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Back */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] ${!isFlipped ? 'invisible' : ''}`}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black border border-white/10">
                    <Image
                      src={design.imageSrc}
                      alt={design.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Rotate button */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="absolute bottom-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MasonryGrid = ({ children, isExpanded }: { children: React.ReactNode, isExpanded: boolean }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState('auto');

  useLayoutEffect(() => {
    if (gridRef.current) {
      // Get height of first 8 items when not expanded
      const items = Array.from(gridRef.current.children);
      if (!isExpanded && items.length > 8) {
        let maxHeight = 0;
        for (let i = 0; i < 8; i++) {
          const item = items[i] as HTMLElement;
          const rect = item.getBoundingClientRect();
          maxHeight = Math.max(maxHeight, rect.top + rect.height);
        }
        setGridHeight(`${maxHeight}px`);
      } else {
        setGridHeight('auto');
      }
    }
  }, [isExpanded]);

  return (
    <div className="relative w-full">
      <div 
        ref={gridRef}
        className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-1 space-y-1 w-full"
        style={{ 
          height: isExpanded ? 'auto' : gridHeight,
          columnWidth: 'auto'
        }}
      >
        {children}
      </div>
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      )}
    </div>
  );
};

const DesignCard = ({ design, index, isExpanded }: { design: Design; index: number; isExpanded: boolean }) => {
  const [showQuickLook, setShowQuickLook] = useState(false);
  const isVisible = isExpanded || index < 8;

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="break-inside-avoid mb-1 w-full transition-all duration-500"
        style={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          position: isVisible ? 'relative' : 'absolute',
          transform: isVisible ? 'none' : 'translateY(20px)',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <div 
          className="group relative cursor-pointer overflow-hidden rounded-lg bg-white/5"
          onClick={() => setShowQuickLook(true)}
        >
          <div className={`relative w-full`} style={{ aspectRatio: design.aspectRatio }}>
            <Image 
              src={design.imageSrc} 
              alt={design.name}
              fill
              className="object-cover w-full h-full"
              priority={design.id <= 6}
            />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <h3 className="text-white font-medium mb-0.5 line-clamp-1 text-sm">{design.name}</h3>
              <p className="text-xs text-gray-300 line-clamp-2 mb-1">{design.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                  <span className="text-xs text-white/90">{design.rating}</span>
                </div>
                <span className="text-[10px] text-white/60 px-1.5 py-0.5 rounded-full bg-white/10 border border-white/20">
                  {design.id}/16
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <QuickLookModal
        design={design}
        isOpen={showQuickLook}
        onClose={() => setShowQuickLook(false)}
      />
    </>
  );
};

const ExploreDesignsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const designs = [
    {
      id: 1,
      name: "Genesis Collection",
      description: "First edition masterpiece with signature elements",
      imageSrc: Card1,
      rating: "4.9",
      aspectRatio: aspectRatios[0] as AspectRatio
    },
    {
      id: 2,
      name: "Ethereal Series",
      description: "Premium gradient fusion with metallic finish",
      imageSrc: Card2,
      rating: "4.8",
      aspectRatio: aspectRatios[2] as AspectRatio
    },
    {
      id: 3,
      name: "Noir Edition",
      description: "Exclusive black series with premium finish",
      imageSrc: Card3,
      rating: "4.7",
      aspectRatio: aspectRatios[0] as AspectRatio
    },
    {
      id: 4,
      name: "Artisan's Selection",
      description: "Hand-crafted design with unique patterns",
      imageSrc: Card4,
      rating: "4.9",
      aspectRatio: aspectRatios[1] as AspectRatio
    },
    {
      id: 5,
      name: "Digital Nexus",
      description: "Future-forward design with holographic elements",
      imageSrc: Card5,
      rating: "4.8",
      aspectRatio: aspectRatios[3] as AspectRatio
    },
    {
      id: 6,
      name: "Royal Standard",
      description: "Elite collection with premium gold accents",
      imageSrc: Card6,
      rating: "4.9",
      aspectRatio: aspectRatios[4] as AspectRatio
    },
    {
      id: 7,
      name: "Mystic Aura",
      description: "Enigmatic design with ethereal glow",
      imageSrc: Card7,
      rating: "4.8",
      aspectRatio: aspectRatios[0] as AspectRatio
    },
    {
      id: 8,
      name: "Celestial Harmony",
      description: "Cosmic design with celestial patterns",
      imageSrc: Card8,
      rating: "4.7",
      aspectRatio: aspectRatios[1] as AspectRatio
    },
    {
      id: 9,
      name: "Quantum Realm",
      description: "Futuristic design with quantum elements",
      imageSrc: Card9,
      rating: "4.9",
      aspectRatio: aspectRatios[2] as AspectRatio
    },
    {
      id: 10,
      name: "Galactic Odyssey",
      description: "Interstellar design with galactic motifs",
      imageSrc: Card10,
      rating: "4.8",
      aspectRatio: aspectRatios[3] as AspectRatio
    },
    {
      id: 11,
      name: "Aurora Borealis",
      description: "Inspired by the northern lights",
      imageSrc: Card11,
      rating: "4.9",
      aspectRatio: aspectRatios[4] as AspectRatio
    },
    {
      id: 12,
      name: "Solar Flare",
      description: "Radiant design with solar elements",
      imageSrc: Card12,
      rating: "4.8",
      aspectRatio: aspectRatios[0] as AspectRatio
    },
    {
      id: 13,
      name: "Lunar Eclipse",
      description: "Mystical design with lunar patterns",
      imageSrc: Card13,
      rating: "4.7",
      aspectRatio: aspectRatios[1] as AspectRatio
    },
    {
      id: 14,
      name: "Stellar Nebula",
      description: "Nebula-inspired design with starry accents",
      imageSrc: Card14,
      rating: "4.9",
      aspectRatio: aspectRatios[2] as AspectRatio
    },
    {
      id: 15,
      name: "Cosmic Voyage",
      description: "Journey through the cosmos with this design",
      imageSrc: Card15,
      rating: "4.8",
      aspectRatio: aspectRatios[3] as AspectRatio
    },
    {
      id: 16,
      name: "Astral Projection",
      description: "Out-of-this-world design with astral elements",
      imageSrc: Card16,
      rating: "4.9",
      aspectRatio: aspectRatios[4] as AspectRatio
    }
  ];

  const filteredDesigns = useMemo(() => {
    return designs.filter(design =>
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />

      <div className="relative flex-grow">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Home</span>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Premium Collection</h1>
            <p className="text-gray-400">
              Explore our curated selection of limited edition premium designs
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                >
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
                
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors">
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid section */}
          <div className="w-full overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="px-0 sm:px-0"
            >
              <MasonryGrid isExpanded={isExpanded}>
                {filteredDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * Math.min(index, 5) }}
                  >
                    <DesignCard 
                      design={design} 
                      index={index}
                      isExpanded={isExpanded}
                    />
                  </motion.div>
                ))}
              </MasonryGrid>
            </motion.div>

            {/* Show More Button */}
            {filteredDesigns.length > 8 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-8"
              >
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all duration-300"
                >
                  <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-16 border-t border-white/10">
        <div className="max-w-[1920px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">About Us</h3>
              <p className="text-gray-400 text-sm">
                Discover our exclusive collection of premium designs, 
                crafted with precision and artistic excellence.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Newsletter</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                />
                <button className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Premium Collection. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExploreDesignsPage;