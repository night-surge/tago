'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import spidermanF from '../assets/spidermancardF.jpg'
import spidermanB from '../assets/spidermancardB.jpg'

interface SlideData {
  frontImage: string | StaticImageData;
  backImage: string | StaticImageData;
  title: string;
  description: string;
}

interface PhotoCarouselProps {
  scrollSpeed?: number;
  customSlides?: SlideData[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ 
  scrollSpeed = 1,
  customSlides
}) => {
  const defaultSlides: SlideData[] = [
    {
      frontImage: spidermanF,
      backImage: spidermanB,
      title: 'Nature',
      description: 'Beautiful landscapes'
    },
    {
      frontImage: spidermanF,
      backImage: spidermanB,
      title: 'City',
      description: 'Urban vibes'
    },
    {
      frontImage: spidermanF,
      backImage: spidermanB,
      title: 'Ocean',
      description: 'Sea views'
    },
    {
      frontImage: spidermanF,
      backImage: spidermanB,
      title: 'Mountains',
      description: 'Peak adventures'
    }
  ];

  const slides = customSlides || defaultSlides;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create 5 sets of slides for smoother infinite scroll
  const duplicatedSlides = [...slides, ...slides, ...slides, ...slides, ...slides];

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial scroll position to the middle
    const singleSetWidth = containerRef.current.scrollWidth / 5;
    containerRef.current.scrollLeft = singleSetWidth * 2;

    const startScroll = () => {
      if (!containerRef.current || !isScrolling) return;

      containerRef.current.scrollLeft += scrollSpeed;

      // Check if we need to reset
      if (containerRef.current.scrollLeft >= singleSetWidth * 3) {
        containerRef.current.scrollLeft = singleSetWidth * 2;
      }

      animationFrameId.current = requestAnimationFrame(startScroll);
    };

    animationFrameId.current = requestAnimationFrame(startScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isScrolling, scrollSpeed, slides.length]);

  const handleCardInteraction = (index: number, isActive: boolean) => {
    if (isMobile) {
      setFlippedCards(prev => {
        const newState = { ...prev };
        if (isActive) {
          Object.keys(newState).forEach(key => {
            newState[parseInt(key)] = false;
          });
          newState[index] = true;
        } else {
          newState[index] = false;
        }
        return newState;
      });
    } else {
      setFlippedCards(prev => ({ ...prev, [index]: isActive }));
    }
    
    setIsScrolling(!isActive);
  };

  return (
    <div  className="relative w-full bg-black overflow-hidden">
      <div className="w-full md:max-w-[900px] md:mx-auto relative">
        {!isMobile && (
          <>
            <div className="absolute left-0 top-0 w-24 h-full z-20 pointer-events-none hidden md:block"
                 style={{
                   background: 'linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)',
                 }}
            />
            <div className="absolute right-0 top-0 w-24 h-full z-20 pointer-events-none hidden md:block"
                 style={{
                   background: 'linear-gradient(-90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)',
                 }}
            />
          </>
        )}
        
        <div 
          ref={containerRef}
          className="flex gap-4 py-8 overflow-hidden relative px-4 md:px-8 no-scrollbar"
          style={{ 
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {duplicatedSlides.map((slide, index) => (
            <div
              key={index}
              className={`relative perspective min-w-[190px] h-[300px] transition-all duration-300
                ${!flippedCards[index] && 'hover:scale-105 md:hover:scale-110'}
                group`}
              onClick={() => isMobile && handleCardInteraction(index, !flippedCards[index])}
              onMouseEnter={() => !isMobile && handleCardInteraction(index, true)}
              onMouseLeave={() => !isMobile && handleCardInteraction(index, false)}
            >
              <div 
                className={`w-full h-full transition-transform duration-700 preserve-3d ${
                  flippedCards[index] ? 'rotate-y-180' : ''
                }`}
              >
                <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.frontImage}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-50" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-xl font-bold">{slide.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden rotate-y-180">
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.backImage}
                      alt={`${slide.title} - Back`}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/60">
                      <div className="flex flex-col items-center justify-center h-full text-white p-6">
                        <h2 className="text-xl font-bold mb-3">{slide.title}</h2>
                        <p className="text-center text-sm">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;