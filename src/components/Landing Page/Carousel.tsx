'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Button from "@/components/ui/button";
import Card1 from "@/assets/cards/1.svg";
import Card2 from "@/assets/cards/2.svg";
import Card4 from "@/assets/cards/4.svg";
import Card5 from "@/assets/cards/5.svg";
import Card6 from "@/assets/cards/6.svg";
import Card7 from "@/assets/cards/7.svg";
import Card8 from "@/assets/cards/8.svg";
import Card9 from "@/assets/cards/9.svg";
import Card10 from "@/assets/cards/10.svg";
import Card11 from "@/assets/cards/11.svg";
import Card101 from "@/assets/cards/101.svg";
import Card102 from "@/assets/cards/102.svg";
import Card104 from "@/assets/cards/104.svg";
import Card105 from "@/assets/cards/105.svg";
import Card106 from "@/assets/cards/106.svg";
import Card107 from "@/assets/cards/107.svg";
import Card108 from "@/assets/cards/108.svg";
import Card109 from "@/assets/cards/109.svg";
import Card110 from "@/assets/cards/110.svg";
import Card111 from "@/assets/cards/111.svg";



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
  scrollSpeed = 0.5,
  customSlides
}) => {
  const router = useRouter();
  const defaultSlides: SlideData[] = [
    {
      frontImage: Card1,
      backImage: Card101,
      title: '1989 Wonderland',
      description: "A dreamy tribute to 1989 (Taylor's Version)"
    },
    {
      frontImage: Card2,
      backImage: Card102,
      title: 'Marvel Mayhem',
      description: "A bold and chaotic fusion of Marvel's classic comic action"
    },
    {
      frontImage: Card11,
      backImage: Card111,
      title: 'Neon Drift',
      description: "A lone machine hums under the city's neon glow"
    },
    {
      frontImage: Card4,
      backImage: Card104,
      title: "Abstract Edge",
      description: "Geometric design with unique patterns"
    },
    {
      frontImage: Card5,
      backImage: Card105,
      title: "Shadow Crewmate", 
      description: "Silent. Stealthy. Sus."
    },
    {
      frontImage: Card6,
      backImage: Card106,
      title: "Lunar Gold",
      description: "A luminous golden moon over silent peaks"
    },
    {
      frontImage: Card7,
      backImage: Card107,
      title: "Shadow Persona",
      description: "A masked enigma lost in the echoes of the night"
    },
    {
      frontImage: Card8,
      backImage: Card108,
      title: "Shadow Hustler",
      description: "Moving in silence, chasing dreams in the shadows"
    },
    {
      frontImage: Card9,
      backImage: Card109,
      title: "Silver Stallion",
      description: "A masterpiece of speed and elegance"
    },
    {
      frontImage: Card10,
      backImage: Card110,
      title: "Speeding Lights",
      description: "A sleek symphony of shadow and speed"
    }
  ];

  const slides = customSlides || defaultSlides;
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollPosition = useRef(0);
  const touchStartX = useRef(0);
  const lastScrollLeft = useRef(0);
  const touchStartScrollPos = useRef(0);
  const animationFrameId = useRef<number>(0);
  const hasFlippedCardRef = useRef(false);

  const duplicatedSlides = [...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides];

  const handleShowMore = () => {
    router.push('/products');
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const totalWidth = container.scrollWidth;
    const viewportWidth = container.clientWidth;
    const resetThreshold = (totalWidth - viewportWidth) / 2;

    if (scrollPosition.current === 0) {
      scrollPosition.current = resetThreshold / 2;
      container.scrollLeft = scrollPosition.current;
    }

    const startAutoScroll = () => {
      if (!container || !isAutoScrolling || (isMobile && hasFlippedCardRef.current)) return;

      scrollPosition.current += scrollSpeed;
      container.scrollLeft = scrollPosition.current;

      if (scrollPosition.current >= resetThreshold) {
        scrollPosition.current = resetThreshold / 2;
        container.scrollLeft = scrollPosition.current;
      }

      animationFrameId.current = requestAnimationFrame(startAutoScroll);
    };

    if (isAutoScrolling && !(isMobile && hasFlippedCardRef.current)) {
      animationFrameId.current = requestAnimationFrame(startAutoScroll);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isAutoScrolling, scrollSpeed, isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || hasFlippedCardRef.current) return;
    
    setIsAutoScrolling(false);
    touchStartX.current = e.touches[0].clientX;
    lastScrollLeft.current = containerRef.current.scrollLeft;
    touchStartScrollPos.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || hasFlippedCardRef.current) return;
    
    const touchDelta = touchStartX.current - e.touches[0].clientX;
    containerRef.current.scrollLeft = lastScrollLeft.current + touchDelta;
  };

  const handleTouchEnd = () => {
    if (!containerRef.current || hasFlippedCardRef.current) return;
    
    scrollPosition.current = containerRef.current.scrollLeft;
    
    setTimeout(() => {
      if (!hasFlippedCardRef.current) {
        setIsAutoScrolling(true);
      }
    }, 100);
  };

  const handleCardInteraction = (index: number, isActive: boolean) => {
    if (isMobile) {
      setFlippedCards(prev => {
        const newState = { ...prev };
        if (isActive) {
          Object.keys(newState).forEach(key => {
            newState[parseInt(key)] = false;
          });
          newState[index] = true;
          hasFlippedCardRef.current = true;
          setIsAutoScrolling(false);
        } else {
          newState[index] = false;
          hasFlippedCardRef.current = false;
          setIsAutoScrolling(true);
        }
        return newState;
      });
    } else {
      setFlippedCards(prev => ({ ...prev, [index]: isActive }));
      setIsAutoScrolling(!isActive);
    }
  };

  return (
    <div className="relative">
      <div className="mt-6 relative w-full bg-black/0 overflow-hidden">
        <div className="w-full md:max-w-[900px] md:mx-auto relative">
          {!isMobile && (
            <>
              <div 
                className="absolute left-0 top-0 w-24 h-full z-20 pointer-events-none hidden md:block"
                style={{
                  background: 'linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)',
                }}
              />
              <div 
                className="absolute right-0 top-0 w-24 h-full z-20 pointer-events-none hidden md:block"
                style={{
                  background: 'linear-gradient(-90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 40%, transparent 100%)',
                }}
              />
            </>
          )}
          
          <div 
            ref={containerRef}
            className="flex gap-4 py-8 px-4 md:px-8 relative overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x"
            style={{ 
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {duplicatedSlides.map((slide, index) => (
              <div
                key={index}
                className={`relative perspective min-w-[190px] h-[300px] transition-all duration-300
                  ${!flippedCards[index] ? 'hover:scale-105 md:hover:scale-110' : ''}
                  group`}
                onClick={() => handleCardInteraction(index, !flippedCards[index])}
                onMouseEnter={() => !isMobile && handleCardInteraction(index, true)}
                onMouseLeave={() => !isMobile && handleCardInteraction(index, false)}
              >
                <div 
                  className={`w-full h-full transition-transform duration-500 preserve-3d will-change-transform
                    ${flippedCards[index] ? 'rotate-y-180' : ''}`}
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
      
      {/* Show More Products Button */}
      <div className="flex justify-center mt-8 mb-12">
        <Button 
          onClick={handleShowMore}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          Show More Products
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhotoCarousel;