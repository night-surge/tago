'use client';
import React from 'react';

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      @keyframes rotate3d {
        from { transform: perspective(1000px) rotateY(0deg) rotate(12deg); }
        to { transform: perspective(1000px) rotateY(360deg) rotate(12deg); }
      }
      .card-container { perspective: 1000px; }
      .rotating-card {
        transform-style: preserve-3d;
        animation: rotate3d 10s linear infinite;
        backface-visibility: visible;
      }
      .rotating-card:hover { animation-play-state: paused; }
      @media (max-width: 768px) {
        .rotating-card { 
          animation: none; 
          transform: rotate(8deg); 
          width: 200px;
          height: 300px;
        }
        .section-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 0 auto;
          width: 80%;
        }
      }
    `}</style>
  );
};

export default GlobalStyles;
