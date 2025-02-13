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

const LightCheerfulLinks = ({user}: Props) => {
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
    // Soft, cheerful pastel colors
    if (domain.includes('github')) return '#B8A7D9'; // Soft Lavender
    if (domain.includes('twitter')) return '#A7D9D9'; // Soft Mint
    if (domain.includes('linkedin')) return '#A7C1D9'; // Soft Sky Blue
    if (domain.includes('instagram')) return '#D9A7C7'; // Soft Pink
    if (domain.includes('youtube')) return '#D9B3A7'; // Soft Coral
    if (domain.includes('facebook')) return '#A7B8D9'; // Soft Periwinkle
    if (domain.includes('twitch')) return '#C7A7D9'; // Soft Lilac
    if (domain.includes('dev.to')) return '#A7D9B8'; // Soft Sage
    return '#D9C7A7'; // Soft Peach
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-700 relative overflow-hidden">
      {/* Soft pattern background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#f0f0f0_1px,transparent_1px),linear-gradient(-45deg,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10 space-y-6 relative z-20">
        <div className="text-center space-y-4">
          {/* Profile Photo Section */}
          <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 blur-lg opacity-70" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
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
                <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-blue-100/40 via-purple-100/40 to-pink-100/40" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  {user.name}
                </span>
              </span>
            </h1>

            <p className="text-m sm:text-2xl text-gray-600 font-medium tracking-wide">
              {user.tagline}
            </p>
          </div>
          
          <div className="relative h-1 w-32 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.links.map((link: string, index: number) => {
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
                <div className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-500"
                    style={{ backgroundColor: pastelColor }} 
                  />
                  
                  <div className="absolute inset-0 rounded-2xl border border-gray-100 group-hover:border-gray-200 transition-colors duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative p-2 rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 border border-gray-100">
                        <Icon 
                          className="w-6 h-6 transition-all duration-300" 
                          style={{ 
                            color: pastelColor,
                          }} 
                        />
                      </div>
                      <span className="text-lg font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
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
          <p className="text-sm font-medium text-gray-500">
            Get your own{' '}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              TAGO
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LightCheerfulLinks;