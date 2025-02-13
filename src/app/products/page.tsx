"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
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

interface Design {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  rating: string;
}

const DesignCard = ({ design }: { design: Design }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ y: -4, scale: 1.01 }}
      className="relative group cursor-pointer w-full touch-manipulation"
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseEnter={() => setIsPressed(true)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl border border-white/5 w-full">
        <CardContent className="p-4 sm:p-6">
          {/* Card Display Area */}
          <div className="relative mb-4 sm:mb-6">
            <div 
              className="relative rounded-xl overflow-hidden w-full aspect-[2/3]"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                transform: 'perspective(2000px) rotateX(10deg)',
                transition: 'transform 0.4s ease',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <Image 
                src={design.imageSrc} 
                alt={design.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ objectFit: 'contain' }}
                priority={design.id <= 6}
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isPressed ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
              />
            </div>
            
            {/* Enhanced reflection effect */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 sm:h-48"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
                transform: 'perspective(2000px) rotateX(-75deg) translateY(30px)',
                opacity: '0.4',
                filter: 'blur(8px)'
              }}
            />
          </div>

          {/* Card Info */}
          <div className="text-center mb-3 sm:mb-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {design.name}
              </h3>
              <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-white/20 via-white/15 to-white/10 backdrop-blur-md border border-white/20">
                <span className="text-[10px] font-medium text-white/90 tracking-wide uppercase">Limited</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-2">{design.description}</p>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" fill="currentColor" />
              <span className="text-xs sm:text-sm font-medium text-white">{design.rating}</span>
            </div>
          </div>

          {/* Edition Number */}
          <div className="text-center">
            <span className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-wider">
              Edition {design.id} of 16
            </span>
          </div>
        </CardContent>

        {/* Hover/Press border glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPressed ? 1 : 0 }}
          className="absolute inset-0 border border-white/20 rounded-lg"
          style={{
            boxShadow: '0 0 20px rgba(255,255,255,0.1)',
          }}
        />
      </Card>
    </motion.div>
  );
};

const ExploreDesignsPage = () => {
  const designs = [
    {
      id: 1,
      name: "Genesis Collection",
      description: "First edition masterpiece with signature elements",
      imageSrc: Card1,
      rating: "4.9"
    },
    {
      id: 2,
      name: "Ethereal Series",
      description: "Premium gradient fusion with metallic finish",
      imageSrc: Card2,
      rating: "4.8"
    },
    {
      id: 3,
      name: "Noir Edition",
      description: "Exclusive black series with premium finish",
      imageSrc: Card3,
      rating: "4.7"
    },
    {
      id: 4,
      name: "Artisan's Selection",
      description: "Hand-crafted design with unique patterns",
      imageSrc: Card4,
      rating: "4.9"
    },
    {
      id: 5,
      name: "Digital Nexus",
      description: "Future-forward design with holographic elements",
      imageSrc: Card5,
      rating: "4.8"
    },
    {
      id: 6,
      name: "Royal Standard",
      description: "Elite collection with premium gold accents",
      imageSrc: Card6,
      rating: "4.9"
    },
    {
      id: 7,
      name: "Mystic Aura",
      description: "Enigmatic design with ethereal glow",
      imageSrc: Card7,
      rating: "4.8"
    },
    {
      id: 8,
      name: "Celestial Harmony",
      description: "Cosmic design with celestial patterns",
      imageSrc: Card8,
      rating: "4.7"
    },
    {
      id: 9,
      name: "Quantum Realm",
      description: "Futuristic design with quantum elements",
      imageSrc: Card9,
      rating: "4.9"
    },
    {
      id: 10,
      name: "Galactic Odyssey",
      description: "Interstellar design with galactic motifs",
      imageSrc: Card10,
      rating: "4.8"
    },
    {
      id: 11,
      name: "Aurora Borealis",
      description: "Inspired by the northern lights",
      imageSrc: Card11,
      rating: "4.9"
    },
    {
      id: 12,
      name: "Solar Flare",
      description: "Radiant design with solar elements",
      imageSrc: Card12,
      rating: "4.8"
    },
    {
      id: 13,
      name: "Lunar Eclipse",
      description: "Mystical design with lunar patterns",
      imageSrc: Card13,
      rating: "4.7"
    },
    {
      id: 14,
      name: "Stellar Nebula",
      description: "Nebula-inspired design with starry accents",
      imageSrc: Card14,
      rating: "4.9"
    },
    {
      id: 15,
      name: "Cosmic Voyage",
      description: "Journey through the cosmos with this design",
      imageSrc: Card15,
      rating: "4.8"
    },
    {
      id: 16,
      name: "Astral Projection",
      description: "Out-of-this-world design with astral elements",
      imageSrc: Card16,
      rating: "4.9"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black px-4 sm:px-6 py-16 sm:py-20 md:px-10 lg:px-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30 animate-pulse"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '2rem 2rem',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 sm:mb-16 max-w-4xl mx-auto text-center px-4"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Return to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Premium Collection
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our limited edition series of premium PVC designs. Each piece is meticulously crafted and numbered, representing the pinnacle of collectible card artistry.
          </p>
        </motion.div>

        {/* Grid of designs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * Math.min(index, 5) }}
            >
              <DesignCard design={design} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreDesignsPage;