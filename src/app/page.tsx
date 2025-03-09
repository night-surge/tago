import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/Landing Page/HeroSection';
import FeaturedDesigns from '@/components/Landing Page/FeaturedDesigns';
import FeaturesSection from '@/components/Landing Page/FeaturesSection';
import TestimonialsSection from '@/components/Landing Page/TestimonialsSection';
import CTASection from '@/components/Landing Page/CTASection';
import Footer from '@/components/Footer';
import GlobalStyles from '@/components/Landing Page/GlobalStyles';
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
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;