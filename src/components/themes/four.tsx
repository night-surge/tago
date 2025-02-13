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
  Heart,
  Sparkles
} from "lucide-react";

type Props = {
  user: {
    name: string;
    tagline: string;
    links: string[];
    picture: string;
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
  if (domain.includes('github')) return '#FF8BA7';
  if (domain.includes('twitter')) return '#FFB3C6';
  if (domain.includes('linkedin')) return '#FFC4D6';
  if (domain.includes('instagram')) return '#FFD6E4';
  if (domain.includes('youtube')) return '#FFE8F0';
  if (domain.includes('dev.to')) return '#FFADC4';
  return '#FF99B4';
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
  <div className="flex justify-center p-3 sm:p-4 mt-8">
    <a
      href="#get-started"
      className="group flex items-center space-x-2 bg-white/10 backdrop-blur-lg text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-500 hover:bg-white/20 border border-pink-200/20"
    >
      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-300 animate-pulse" />

      <span className="text-pink-100">Get your own TAGO</span>
      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-500 text-pink-300" />
    </a>
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
      <div className="relative p-4 sm:p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:translate-y-[-2px]">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ 
            background: `linear-gradient(45deg, ${brandColor}20, transparent)`
          }} 
        />
        <div className="absolute inset-0 rounded-2xl border border-pink-200/20 group-hover:border-pink-200/40 transition-colors duration-500">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-500/10 to-transparent" />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 border border-pink-200/20">
              <Icon 
                className="w-4 h-4 sm:w-6 sm:h-6 transition-all duration-300" 
                style={{ color: brandColor }} 
              />
            </div>
            <span className="text-base sm:text-xl font-medium text-pink-100 group-hover:text-white transition-colors duration-300">
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

const four = ({user}: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px] opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 via-transparent to-rose-300/20" />
        </div>
      </div>

      <div className="relative z-20">
        <div className="max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-8 sm:pb-16 space-y-8 sm:space-y-12">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="relative mx-auto w-24 h-24 sm:w-36 sm:h-36 mb-6 sm:mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/30 shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300/30 to-rose-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={user.picture}
                alt="Profile"
                fill
                className="w-full h-full object-cover transition-all duration-500"
                priority
              />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                <span className="relative inline-block">
                  <span className="relative text-white">
                    {user.name}
                  </span>
                  <Sparkles className="absolute -top-8 -right-8 w-6 h-6 text-pink-200 animate-bounce" />
                </span>
              </h1>
              <p className="text-base sm:text-lg text-pink-100/70 max-w-2xl mx-auto">{user.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0">
            {user.links.map((link, index) => (
              <SocialCard key={index} link={link} />
            ))}
          </div>
          
          <FooterCTA />
        </div>
      </div>
    </div>
  );
};

export default four;