import React from 'react';
import Image from 'next/image';
import { 
  ExternalLink, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  Link2, 
  Twitch,
  Globe
} from 'lucide-react';

type Props = {
  user: {
    name: string;
    tagline: string;
    links: string[];
    picture: string;
  }
}

// Type the component with the Props type
const one = ({user}: Props) => {

  const getIconForURL = (url: string) => {
    const domain = url.toLowerCase();
    if (domain.includes('github')) return Github;
    if (domain.includes('twitter')) return Twitter;
    if (domain.includes('linkedin')) return Linkedin;
    if (domain.includes('instagram')) return Instagram;
    if (domain.includes('youtube')) return Youtube;
    if (domain.includes('facebook')) return Facebook;
    if (domain.includes('twitch')) return Twitch;
    if (domain.includes('dev.to')) return Globe;
    return Link2;
  };

  const getCandyColor = (url: string) => {
    const domain = url.toLowerCase();
    // More vibrant candy colors
    if (domain.includes('github')) return '#9B6B9E'; // Lavender Purple
    if (domain.includes('twitter')) return '#87CEEB'; // Bubble Gum
    if (domain.includes('linkedin')) return '#00BFFF'; // Lollipop Blue
    if (domain.includes('instagram')) return '#FF66B2'; // Cotton Candy
    if (domain.includes('youtube')) return '#FF3333'; // Cherry Red
    if (domain.includes('facebook')) return '#1E90FF'; // Dodger Blue
    if (domain.includes('twitch')) return '#FF69FF'; // Hot Pink
    if (domain.includes('dev.to')) return '#32CD32'; // Lime Green
    return '#FF8C69'; // Salmon Pink
  };

  const getPlatformName = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch {
      return 'Link';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 text-gray-900 relative overflow-hidden">
      {/* Candy-themed background pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#FFB6C133_1px,transparent_1px),linear-gradient(-45deg,#FFB6C133_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10 space-y-6 relative z-20">
        <div className="text-center space-y-4">
          {/* Profile Photo Section */}
            <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 blur-lg opacity-40 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-pink-400 shadow-lg">
              <Image
              src={user.picture}
              alt="Profile"
              fill
              className="object-cover"
              priority
              />
            </div>
            </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-8xl font-bold tracking-tight">
              <span className="relative">
                <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-blue-500/40" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient bg-[length:200%_auto]">
                  {user.name}
                </span>
              </span>
            </h1>

            {/* <div className="flex items-center justify-center">
              <div className="px-4 py-1.5 rounded-full bg-white/80 border-2 border-pink-400 shadow-md">
                <p className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  {initialData.interests}
                </p>
              </div>
            </div> */}

            <p className="text-m sm:text-2xl text-gray-700 font-medium tracking-wide">
              {user.tagline}
            </p>
          </div>
          
          <div className="relative h-1 w-32 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.links.map((link:string, index:number) => {
            const Icon = getIconForURL(link);
            const candyColor = getCandyColor(link);
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-white shadow-lg">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ backgroundColor: `${candyColor}20` }} 
                  />
                  
                  <div className="absolute inset-0 rounded-2xl border-2 border-pink-300 group-hover:border-pink-400 transition-colors duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative p-2 rounded-xl bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        <Icon 
                          className="w-6 h-6 transition-all duration-300" 
                          style={{ 
                            color: candyColor,
                            filter: 'brightness(1.1)'
                          }} 
                        />
                      </div>
                      <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {getPlatformName(link)}
                      </span>
                    </div>
                    <ExternalLink 
                      className="w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      style={{ 
                        color: candyColor,
                        opacity: 0.9
                      }}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center pt-6">
          <p className="text-sm font-medium text-gray-600">
            Get your own{' '}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              TAGO
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default one;