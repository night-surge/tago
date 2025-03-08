"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Card1 from "@/assets/cards/1.svg";
import Card2 from "@/assets/cards/2.svg";
import Card3 from "@/assets/cards/3.svg";
import Card4 from "@/assets/cards/4.svg";
import Card5 from "@/assets/cards/5.svg";
import Card6 from "@/assets/cards/6.svg";
import Card7 from "@/assets/cards/7.svg";
import Card8 from "@/assets/cards/8.svg";
import Card9 from "@/assets/cards/9.svg";
import Card10 from "@/assets/cards/10.svg";
import Card11 from "@/assets/cards/11.svg";
import Card12 from "@/assets/cards/12.svg";
import Card13 from "@/assets/cards/13.svg";
import Card14 from "@/assets/cards/14.svg";
import Card15 from "@/assets/cards/15.svg";
import Card16 from "@/assets/cards/16.svg";

interface Design {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  backimg: string;
  rating: string;
}

const DesignCard = ({ design }: { design: Design }) => {
  // const [isPressed, setIsPressed] = useState(false);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl border border-white/5 w-full">
      <CardContent className="p-4 sm:p-6">
        {/* Card Display Area */}
        <div className="relative mb-4 sm:mb-6">
          <div className="relative w-full aspect-[2/3]">
            <div className="relative rounded-xl overflow-hidden w-full h-full group">
              {/* Image Container with flip effect */}
              <div 
                className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              >
                {/* Front Image */}
                <div className="absolute w-full h-full [backface-visibility:hidden]">
                  <Image
                    src={design.imageSrc}
                    alt={design.name}
                    fill
                    className="w-full h-full object-cover"
                    style={{ objectFit: "contain" }}
                    priority={design.id <= 6}
                  />
                </div>

                {/* Back Image */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <Image
                    src={design.backimg}
                    alt={`${design.name} back`}
                    fill
                    className="w-full h-full object-cover"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Card Info */}
          <div className= "pt-7 text-center mb-3 sm:mb-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {design.name}
              </h3>
              <div className="flex align-middle px-2 py-0.5 rounded-full bg-gradient-to-r from-white/20 via-white/15 to-white/10 backdrop-blur-md border border-white/20">
                <span className="text-[10px] font-medium text-white/90 tracking-wide uppercase">
                  Limited
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-2">
              {design.description}
            </p>
            <div className="flex items-center justify-center gap-2">
              <Star
                className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500"
                fill="currentColor"
              />
              <span className="text-xs sm:text-sm font-medium text-white">
                {design.rating}
              </span>
            </div>
          </div>

          {/* Edition Number */}
          <div className="text-center">
            <span className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-wider">
              Edition {design.id} of 16
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ExploreDesignsPage = () => {
  const designs = [
    {
      id: 1,
      name: "1989 Wonderland",
      description: "A dreamy tribute to 1989 (Taylor’s Version)",
      imageSrc: Card1,
      backimg: Card2,
      rating: "4.9",
    },
    {
      id: 2,
      name: "Marvel Mayhem",
      description: "A bold and chaotic fusion of Marvel's classic comic action",
      imageSrc: Card2,
      backimg: Card3,
      rating: "4.8",
    },
    {
      id: 3,
      name: "Chibi Naruto",
      description: "A cute and cheerful chibi version of Naruto",
      imageSrc: Card3,
      backimg: Card4,
      rating: "4.7",
    },
    {
      id: 4,
      name: "Abstract Edge",
      description: "Geometric design with unique patterns",
      imageSrc: Card4,
      backimg: Card5,
      rating: "4.9",
    },
    {
      id: 5,
      name: "Shadow Crewmate",
      description: "Silent. Stealthy. Sus.",
      imageSrc: Card5,
      backimg: Card6,
      rating: "4.8",
    },
    {
      id: 6,
      name: "Lunar Gold",
      description: "A luminous golden moon over silent peaks",
      imageSrc: Card6,
      backimg: Card7,
      rating: "4.9",
    },
    {
      id: 7,
      name: "Shadow Persona",
      description: "A masked enigma lost in the echoes of the night",
      imageSrc: Card7,
      backimg: Card8,
      rating: "4.8",
    },
    {
      id: 8,
      name: "Shadow Hustler",
      description: "Moving in silence, chasing dreams in the shadows",
      imageSrc: Card8,
      backimg: Card9,
      rating: "4.7",
    },
    {
      id: 9,
      name: "Silver Stallion",
      description: "A masterpiece of speed and elegance",
      imageSrc: Card9,
      backimg: Card10,
      rating: "4.9",
    },
    {
      id: 10,
      name: "Speeding Lights",
      description: "A sleek symphony of shadow and speed",
      imageSrc: Card10,
      backimg: Card11,
      rating: "4.8",
    },
    {
      id: 11,
      name: "Neon Drift",
      description: "A lone machine hums under the city’s neon glow",
      imageSrc: Card11,
      backimg: Card12,
      rating: "4.9",
    },
    {
      id: 12,
      name: "Urban Horizon",
      description: "The city awakens, engines roar, and dreams race with the dawn",
      imageSrc: Card12,
      backimg: Card13,
      rating: "4.8",
    },
    {
      id: 13,
      name: "Pika Hustle",
      description: "Pikachu with urban styles and electric vibes",
      imageSrc: Card13,
      backimg: Card14,
      rating: "4.7",
    },
    {
      id: 14,
      name: "Spidey Skies",
      description: "Weaving webs between the stars and the city lights",
      imageSrc: Card14,
      backimg: Card15,
      rating: "4.9",
    },
    {
      id: 15,
      name: "Skybound",
      description: "Elevating the game with every soaring jump",
      imageSrc: Card15,
      backimg: Card16,
      rating: "4.8",
    },
    {
      id: 16,
      name: "Reputation",
      description: "A bold statement of strength, mystery, and transformation. ",
      imageSrc: Card16,
      backimg: Card1,
      rating: "4.9",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black px-4 sm:px-6 py-16 sm:py-20 md:px-10 lg:px-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30 animate-pulse"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "2rem 2rem",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 sm:mb-16 max-w-4xl mx-auto text-center px-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Return to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Premium Collection
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our limited edition series of premium PVC designs. Each
            piece is meticulously crafted and numbered, representing the
            pinnacle of collectible card artistry.
          </p>
        </motion.div>

        {/* Grid of designs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {designs.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * Math.min(index, 5) }}
            >
              <DesignCard design={design} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreDesignsPage;