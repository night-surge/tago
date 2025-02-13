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
  Globe} from 'lucide-react';

type Props = {
  user: {
    name: string;
    tagline: string;
    links: string[];
    picture: string;
  }
}

// Type the component with the Props type
const three = ({user}: Props) => {
  

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

  const getPastelColor = (url: string) => {
    const domain = url.toLowerCase();
    // Soft pastel colors
    if (domain.includes('github')) return '#B4A7D6'; // Soft Lavender
    if (domain.includes('twitter')) return '#A2D2E2'; // Baby Blue
    if (domain.includes('linkedin')) return '#9FC6E7'; // Powder Blue
    if (domain.includes('instagram')) return '#F7CAC9'; // Rose Pink
    if (domain.includes('youtube')) return '#FFB5B5'; // Peach
    if (domain.includes('facebook')) return '#AEC6CF'; // Pastel Blue
    if (domain.includes('twitch')) return '#D4B4D9'; // Soft Purple
    if (domain.includes('dev.to')) return '#B5D8B8'; // Mint Green
    return '#E6B8B8'; // Dusty Rose
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-teal-50 text-gray-700 relative overflow-hidden">
      {/* Soft grid background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#F0EAF433_1px,transparent_1px),linear-gradient(-45deg,#F0EAF433_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10 space-y-6 relative z-20">
        <div className="text-center space-y-4">
          {/* Profile Photo Section */}
            <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-200 via-slate-200 to-teal-200 blur-lg opacity-30 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-rose-300 shadow-sm">
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
                <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-rose-200/30 via-slate-200/30 to-teal-200/30" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-slate-400 to-teal-400 animate-gradient bg-[length:200%_auto]">
                  {user.name}
                </span>
              </span>
            </h1>

            {/* <div className="flex items-center justify-center">
              <div className="px-4 py-1.5 rounded-full bg-white/70 border border-slate-200 shadow-sm">
                <p className="text-xs font-medium text-slate-600">
                  {initialData.interests}
                </p>
              </div>
            </div> */}

            <p className="text-m sm:text-2xl text-slate-600 font-light tracking-wide">
              {user.tagline}
            </p>
          </div>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.links.map((link, index) => {
            const Icon = getIconForURL(link);
            const pastelColor = getPastelColor(link);
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm shadow-sm">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ backgroundColor: `${pastelColor}15` }} 
                  />
                  
                  <div className="absolute inset-0 rounded-2xl border border-slate-200 group-hover:border-slate-300 transition-colors duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative p-2 rounded-xl bg-white/80 transition-transform duration-300 group-hover:scale-105">
                        <Icon 
                          className="w-6 h-6 transition-all duration-300" 
                          style={{ 
                            color: pastelColor,
                            filter: 'saturate(0.9)'
                          }} 
                        />
                      </div>
                      <span className="text-lg font-normal text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
                        {getPlatformName(link)}
                      </span>
                    </div>
                    <ExternalLink 
                      className="w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      style={{ 
                        color: pastelColor,
                        opacity: 0.8
                      }}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-slate-500">
            Get your own{' '}
            <span className="font-medium text-slate-600">
              TAGO
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default three;