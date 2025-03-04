import React from 'react';
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
import ScrollNavWrapper from '@/components/ScrollNavWrapper';

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Tago - Premium NFC Business Cards | Tap and Go Digital Solutions</title>
        <meta name="description" content="Transform your networking experience with Tago's premium NFC business cards. Share your digital identity with a simple tap." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <GlobalStyles />
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <ScrollNavWrapper>
          <Navbar />
        </ScrollNavWrapper>
        
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