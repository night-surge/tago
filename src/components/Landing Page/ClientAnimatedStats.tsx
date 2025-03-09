"use client";

import React from 'react';
import dynamic from 'next/dynamic';

interface StatItem {
  number: string;
  label: string;
}

interface ClientAnimatedStatsProps {
  stats: StatItem[];
}

const AnimatedStatsSection = dynamic(() => import('./AnimatedStatsSection'), { 
  ssr: false
});

const ClientAnimatedStats = ({ stats }: ClientAnimatedStatsProps) => {
  return <AnimatedStatsSection stats={stats} />;
};

export default ClientAnimatedStats;