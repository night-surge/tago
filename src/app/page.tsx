'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedDesigns from '@/components/FeaturedDesigns';
import StatsSection from '@/components/StatsSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import GlobalStyles from '@/components/GlobalStyles';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Tago - Premium NFC Business Cards | Tap and Go Digital Solutions</title>
        <meta name="description" content="Transform your networking experience with Tago's premium NFC business cards. Share your digital identity with a simple tap." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <GlobalStyles />
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-zinc-800' : ''}`}>
          <Navbar />
        </nav>
        
        <HeroSection />
        <FeaturedDesigns />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;