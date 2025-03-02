import React from 'react';
import dynamic from 'next/dynamic';

const AnimatedStatsSection = dynamic(() => import('./AnimatedStatsSection'), { 
  ssr: false,
  loading: () => <StatsSectionSkeleton />
});

// A skeleton loader with similar dimensions to avoid layout shift
const StatsSectionSkeleton = () => {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-black/90 to-zinc-900/20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 w-64 bg-zinc-800/30 rounded-md mx-auto mb-12"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              className="text-center bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 animate-pulse"
            >
              <div className="h-8 w-16 bg-zinc-800/50 rounded-md mx-auto"></div>
              <div className="h-4 w-24 bg-zinc-800/40 rounded-md mx-auto mt-2"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider"></div>
        <div className="h-12 w-full bg-gradient-to-b from-zinc-900/20 to-black"></div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: "100+", label: "Active Users" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "20+", label: "Countries Reached" },
    { number: "50k+", label: "Successful Taps" }
  ];

  return <AnimatedStatsSection stats={stats} />;
};

export default StatsSection;