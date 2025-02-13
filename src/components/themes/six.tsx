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
  Star
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
  if (domain.includes('github')) return '#171515';
  if (domain.includes('twitter')) return '#1DA1F2';
  if (domain.includes('linkedin')) return '#0A66C2';
  if (domain.includes('instagram')) return '#E4405F';
  if (domain.includes('youtube')) return '#FF0000';
  if (domain.includes('dev.to')) return '#333333';
  return '#6366F1';
};

const getPlatformName = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
  } catch {
    return 'Link';
  }
};

// Updated BottomCTA component
const BottomCTA = () => (
  <div className="flex justify-center w-full py-8 sm:py-12">
    <a
      href="#get-started"
      className="group flex items-center space-x-2 relative overflow-hidden bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl text-white px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 border border-white/10 shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-50" />
      <Star className="w-3 h-3 sm:w-4 sm:h-4 relative animate-pulse" />
      <span className="relative">Get your Tago card</span>
      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 relative group-hover:translate-x-1 transition-transform" />
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
      <div className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl" />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ 
            background: `linear-gradient(45deg, ${brandColor}15, ${brandColor}05)`
          }} 
        />
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/[0.05] group-hover:border-white/[0.1] transition-colors duration-500">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg sm:rounded-xl blur-xl group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-2 sm:p-3 rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 bg-black/20 backdrop-blur-sm">
                <Icon 
                  className="w-4 h-4 sm:w-6 sm:h-6 transition-all duration-300" 
                  style={{ 
                    color: brandColor,
                    filter: 'brightness(1.2)'
                  }} 
                />
              </div>
            </div>
            <span className="text-base sm:text-xl font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300">
              {getPlatformName(link)}
            </span>
          </div>
          <ExternalLink 
            className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
            style={{ 
              color: `${brandColor}99`,
              filter: 'brightness(1.2)'
            }}
          />
        </div>
      </div>
    </a>
  );
};

const six = ({user}: Props) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        </div>
      </div>

      <div className="relative z-20">
        <div className="max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-8 sm:pb-16 space-y-8 sm:space-y-12">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Profile Photo Section */}
            <div className="relative mx-auto w-24 h-24 sm:w-36 sm:h-36 mb-6 sm:mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-200/50 shadow-lg">
                <Image
                  src={user.picture}
                  alt="Profile"
                  fill
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                <span className="relative">
                  <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
                  <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text animate-gradient">
                    {user.name}
                  </span>
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

          {/* Bottom CTA */}
          <BottomCTA />
        </div>
      </div>
    </div>
  );
};

export default six;