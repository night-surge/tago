'use client';
import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const StatsSection = () => {
  const stats = [
    { number: "100+", label: "Active Users" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "20+", label: "Countries Reached" },
    { number: "50k+", label: "Successful Taps" }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="py-20 px-4 bg-gradient-to-b from-black/90 to-zinc-900/20 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          variants={fadeInUp} 
          className="text-2xl font-bold mb-12 text-center"
        >
          Trusted by Professionals Worldwide
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="text-center bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white"
              >
                {stat.number}
              </motion.div>
              <div className="text-zinc-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Visual section separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider"></div>
        <div className="h-12 w-full bg-gradient-to-b from-zinc-900/20 to-black"></div>
      </div>
    </motion.div>
  );
};

export default StatsSection;