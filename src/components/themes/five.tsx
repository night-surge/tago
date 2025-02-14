import React from "react";
import Image from "next/image";
import { 
  ExternalLink, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Link2, 
  Globe,
  ArrowRight,
  Music
} from "lucide-react";
import Link from "next/link";

type Props = {
  user: {
    name: string;
    tagline: string;
    links: string[];
    picture: string;
    isVerified: boolean;
  }
}

const getIconForURL = (url: string) => {
  const domain = url.toLowerCase();
  if (domain.includes('github')) return Github;
  if (domain.includes('twitter')) return Twitter;
  if (domain.includes('linkedin')) return Linkedin;
  if (domain.includes('instagram')) return Instagram;
  if (domain.includes('youtube')) return Youtube;
  if (domain.includes('dev.to')) return Globe;
  return Link2;
};

const getBrandColor = (url: string) => {
  const domain = url.toLowerCase();
  if (domain.includes('github')) return '#FF9AA2';
  if (domain.includes('twitter')) return '#86E3CE';
  if (domain.includes('linkedin')) return '#B5B8FF';
  if (domain.includes('instagram')) return '#FFB5E8';
  if (domain.includes('youtube')) return '#FFC8A2';
  if (domain.includes('dev.to')) return '#E7FFAC';
  return '#DCD3FF';
};

const getPlatformName = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
  } catch {
    return 'Link';
  }
};

const FooterCTA = () => (
  <div className="absolute bottom-8 left-0 right-0 flex justify-center">
    <Link
      href="/products"
      className="group flex items-center space-x-2 bg-[#2A2A3C] text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-500 hover:bg-[#3A3A4C] border border-[#4A4A5C] hover:border-[#FFB5E8]"
    >
      <Music className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFB5E8] animate-bounce" />
      <span className="bg-gradient-to-r from-[#FFB5E8] to-[#86E3CE] text-transparent bg-clip-text">Get your own TAGO</span>
      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-500 text-[#86E3CE]" />
    </Link>
  </div>
);

const SocialCard = ({ link }: { link: string }) => {
  const Icon = getIconForURL(link);
  const brandColor = getBrandColor(link);
  
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full"
    >
      <div className="relative p-4 sm:p-6 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-2px]">
        <div className="absolute inset-0 bg-[#2A2A3C] opacity-90" />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ 
            background: `linear-gradient(45deg, ${brandColor}30, transparent)`
          }} 
        />
        <div className="absolute inset-0 rounded-lg border border-[#4A4A5C] group-hover:border-opacity-0 transition-all duration-500">
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${brandColor}, transparent)`,
              maskImage: 'linear-gradient(to right, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black)'
            }}
          />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div 
              className="p-2 sm:p-3 rounded-md transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${brandColor}20, ${brandColor}40)`
              }}
            >
              <Icon 
                className="w-4 h-4 sm:w-6 sm:h-6 transition-all duration-300" 
                style={{ color: brandColor }} 
              />
            </div>
            <span className="text-base sm:text-xl font-medium text-white/80 group-hover:text-white transition-colors duration-300">
              {getPlatformName(link)}
            </span>
          </div>
          <ExternalLink 
            className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
            style={{ color: brandColor }}
          />
        </div>
      </div>
    </a>
  );
};

const five = ({user}: Props) => {
  return (
    <div className="min-h-screen bg-[#1A1A2B] text-white relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A3C_1px,transparent_1px),linear-gradient(to_bottom,#2A2A3C_1px,transparent_1px)] bg-[size:24px_24px] opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFB5E8]/10 via-transparent to-[#86E3CE]/10" />
        </div>
      </div>

      <div className="relative z-20">
        <div className="max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-8 sm:pb-16 space-y-8 sm:space-y-12">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="relative mx-auto w-24 h-24 sm:w-36 sm:h-36 mb-6 sm:mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB5E8] to-[#86E3CE] blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#4A4A5C] shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFB5E8] to-[#86E3CE] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <Image
                  src={user.picture}
                  alt="Profile"
                  fill
                  sizes="(max-width: 640px) 96px, 144px"
                  className="object-cover transition-all duration-500"
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#FFB5E8] via-[#86E3CE] to-[#B5B8FF] text-transparent bg-clip-text">
                  {user.name}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto">{user.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0">
            {user.links.map((link, index) => (
              <SocialCard key={index} link={link} />
            ))}
          </div>

          
        </div>
      </div>
      <FooterCTA />
    </div>
  );
};

export default five;