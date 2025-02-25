'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const HeroSection = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 md:pt-5"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-zinc-800/10 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          variants={fadeInUp}
          className="text-center lg:text-left"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full text-sm bg-zinc-900/80 border border-zinc-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-400" />
              Tap and Go Technology
            </span>
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Share Your World
            <span className="block bg-gradient-to-r from-zinc-400 to-white text-transparent bg-clip-text">
              With One Tap
            </span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-zinc-400 mb-8"
          >
            Experience the future of networking with Tago&apos;s premium NFC cards. Share your complete digital identity instantly.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            {/* Link to /login */}
            <Link href="/login">
              <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                <span className="flex items-center justify-center font-medium">
                  Get Your Card
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

            {/* Link to /products */}
            <Link href="/products">
              <button className="px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105 border border-zinc-700 w-full sm:w-auto">
                See Designs
              </button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mt-8 lg:mt-0"
        >
          <div className="relative w-64 h-96 md:w-64 md:h-96 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 backdrop-blur-xl border border-zinc-700 shadow-2xl rotating-card">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 to-zinc-800/20" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-8 w-12 rounded-lg bg-white/80" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Visual section separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider"></div>
        <div className="h-12 w-full bg-gradient-to-b from-transparent to-zinc-950"></div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
