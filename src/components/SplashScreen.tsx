'use client';
import React, { useState, useEffect } from 'react';

const SplashScreen = () => {
    const [showSplash, setShowSplash] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, []);
    
    if (!showSplash) return null;
    
    return (
        <div className="fixed inset-0 bg-black z-[100000] flex items-center justify-center animate-splash-slide">
            <div className="text-white text-4xl font-bold tracking-widest">TAGO</div>
        </div>
    );
};

export default SplashScreen;
