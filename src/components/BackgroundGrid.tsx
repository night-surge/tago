import React from 'react';

interface BackgroundGridProps {
  className?: string;
  children?: React.ReactNode;
}

const BackgroundGrid = ({ className, children }: BackgroundGridProps) => {
  return (
    <div className={`relative min-h-screen bg-black ${className || ''}`}>
      <div className="absolute inset-0">
        {/* Large grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '6rem 6rem',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />
        
        {/* Small grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '1rem 1rem',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default BackgroundGrid;