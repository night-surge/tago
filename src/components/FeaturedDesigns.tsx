'use client';
import React from 'react';
import { motion } from 'framer-motion';
import PhotoCarousel from '@/components/Carousel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const FeaturedDesigns = () => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-20 px-4 bg-black relative" // Changed from bg-zinc-950 to bg-black
    >
      {/* Section background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            variants={fadeInUp} 
            className="inline-block px-3 py-1 rounded-full text-xs bg-zinc-800 text-white mb-4"
          >
            PREMIUM COLLECTION
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4 text-white">Featured Designs</motion.h2>
          <motion.p variants={fadeInUp} className="text-zinc-400">Explore our collection of premium NFC cards</motion.p>
        </div>
        <motion.div variants={fadeInUp}>
          <PhotoCarousel scrollSpeed={0.3} />
        </motion.div>
      </div>
      
      {/* Visual section separator - improved for smoother transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider"></div>
        <div className="h-12 w-full bg-gradient-to-b from-black to-black/90"></div> {/* Changed from from-zinc-950 to from-black */}
      </div>
    </motion.div>
  );
};

export default FeaturedDesigns;