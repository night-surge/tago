'use client'; 
import React from 'react';
import { motion } from 'framer-motion';

const RotatingCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-64 h-96 md:w-64 md:h-96 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 backdrop-blur-xl border border-zinc-700 shadow-2xl rotating-card"
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 to-zinc-800/20" />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="h-8 w-12 rounded-lg bg-white/80" />
      </div>
    </motion.div>
  );
};

export default RotatingCard;