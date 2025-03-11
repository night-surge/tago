import React from 'react';

const PageHeader: React.FC = () => {
  return (
    <div className="text-center space-y-4 mb-10">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
        <span className="relative">
          <span className="absolute -inset-2 blur-2xl bg-white/5" />
          <span className="text-white">Custom Card Ordering</span>
        </span>
      </h1>
      
      <p className="text-md sm:text-xl text-gray-400 font-medium tracking-wide max-w-2xl mx-auto">
        Design your perfect cards in just a few simple steps
      </p>
      
      <div className="relative h-px w-32 mx-auto overflow-hidden bg-white/20" />
    </div>
  );
};

export default PageHeader;