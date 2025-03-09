'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const stagger = {
  visible: { 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    } 
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.2
    }
  }
};

// Number counter animation component
const AnimatedCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    const endValue = parseInt(value) || 0;
    const duration = 1500;
    const startTime = Date.now();
    
    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        // Easing function for smooth counting
        const progress = 1 - Math.pow(1 - elapsedTime / duration, 3);
        const currentValue = Math.floor(progress * endValue);
        
        if (value.includes('+')) {
          setDisplayValue(`${currentValue}+`);
        } else if (value.includes('%')) {
          setDisplayValue(`${currentValue}%`);
        } else {
          setDisplayValue(`${currentValue}`);
        }
        
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, [value]);
  
  return <span>{displayValue}</span>;
};

interface Stat {
  number: string;
  label: string;
}

const AnimatedStatsSection = ({ stats }: { stats: Stat[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={stagger}
          className="py-20 px-4 bg-gradient-to-b from-black/90 to-zinc-900/20 relative"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              variants={fadeInUp} 
              className="text-2xl font-bold mb-12 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
            >
              Trusted by Professionals Worldwide
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="text-center bg-zinc-900/30 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    variants={scaleIn}
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent"
                  >
                    <AnimatedCounter value={stat.number} />
                  </motion.div>
                  <motion.div 
                    variants={fadeInUp}
                    className="text-zinc-400 mt-2 font-medium"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <div className="section-divider"></div>
            <div className="h-12 w-full bg-gradient-to-b from-zinc-900/20 to-black"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedStatsSection;