import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
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

const DarkGlassLinks = ({user}: Props) => {
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

  const getGlowColor = (url: string) => {
    const domain = url.toLowerCase();
    // Neon glow colors
    if (domain.includes('github')) return '#BD63C7'; // Neon Purple
    if (domain.includes('twitter')) return '#00FFFF'; // Cyan
    if (domain.includes('linkedin')) return '#4DA6FF'; // Electric Blue
    if (domain.includes('instagram')) return '#FF1493'; // Deep Pink
    if (domain.includes('youtube')) return '#FF0000'; // Bright Red
    if (domain.includes('facebook')) return '#1E90FF'; // Dodger Blue
    if (domain.includes('twitch')) return '#A020F0'; // Purple
    if (domain.includes('dev.to')) return '#00FF00'; // Neon Green
    return '#FF4500'; // Neon Orange
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 relative overflow-hidden">
      {/* Glass pattern background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px),linear-gradient(-45deg,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10 space-y-6 relative z-20">
        <div className="text-center space-y-4">
          {/* Profile Photo Section */}
          {/* <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-lg opacity-40 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-700 shadow-lg backdrop-blur-sm bg-black/30">
              <Image
                src={user.picture}
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div> */}

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-8xl font-bold tracking-tight">
              <span className="relative">
                <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient bg-[length:200%_auto]">
                  {user.name}
                </span>
              </span>
            </h1>

            <p className="text-m sm:text-2xl text-gray-300 font-medium tracking-wide">
              {user.tagline}
            </p>
          </div>
          
          <div className="relative h-1 w-32 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.links.map((link: string, index: number) => {
            const Icon = getIconForURL(link);
            const glowColor = getGlowColor(link);
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-lg bg-white/5 border border-white/10">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500"
                    style={{ backgroundColor: glowColor }} 
                  />
                  
                  <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/30 transition-colors duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative p-2 rounded-xl bg-black/30 shadow-lg transition-transform duration-300 group-hover:scale-110 backdrop-blur-sm">
                        <Icon 
                          className="w-6 h-6 transition-all duration-300" 
                          style={{ 
                            color: glowColor,
                            filter: 'brightness(1.2)'
                          }} 
                        />
                      </div>
                      <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                        {getPlatformName(link)}
                      </span>
                    </div>
                    <ExternalLink 
                      className="w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      style={{ 
                        color: glowColor,
                        opacity: 0.9
                      }}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Absolutely positioned footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p className="text-sm font-medium text-gray-400">
          Get your own{' '}
          <Link href="/products" className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:opacity-80 transition-opacity">
            TAGO
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DarkGlassLinks;