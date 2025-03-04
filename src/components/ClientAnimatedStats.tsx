// ClientAnimatedStats.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Define an interface for the stats item
interface StatItem {
  number: string;
  label: string;
}

// Define props interface
interface ClientAnimatedStatsProps {
  stats: StatItem[];
}

// Now we can use ssr:false in a client component
const AnimatedStatsSection = dynamic(() => import('./AnimatedStatsSection'), { 
  ssr: false
});

const ClientAnimatedStats = ({ stats }: ClientAnimatedStatsProps) => {
  return <AnimatedStatsSection stats={stats} />;
};

export default ClientAnimatedStats;