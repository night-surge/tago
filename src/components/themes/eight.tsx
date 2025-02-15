import React from 'react';
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

const BlackThemeLinks = ({user}: Props) => {
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

  const getAccentColor = (url: string) => {
    const domain = url.toLowerCase();
    // White with slight tints
    if (domain.includes('github')) return '#ffffff'; 
    if (domain.includes('twitter')) return '#ffffff';
    if (domain.includes('linkedin')) return '#ffffff';
    if (domain.includes('instagram')) return '#ffffff';
    if (domain.includes('youtube')) return '#ffffff';
    if (domain.includes('facebook')) return '#ffffff';
    if (domain.includes('twitch')) return '#ffffff';
    if (domain.includes('dev.to')) return '#ffffff';
    return '#ffffff';
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px),linear-gradient(-45deg,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10 space-y-6 relative z-20">
        <div className="text-center space-y-4">
          {/* Profile Photo Section */}
          {/* <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-lg opacity-20" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
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
                <span className="absolute -inset-2 blur-2xl bg-white/5" />
                <span className="text-white">
                  {user.name}
                </span>
              </span>
            </h1>

            <p className="text-m sm:text-2xl text-gray-400 font-medium tracking-wide">
              {user.tagline}
            </p>
          </div>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden bg-white/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.links.map((link: string, index: number) => {
            const Icon = getIconForURL(link);
            const accentColor = getAccentColor(link);
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-zinc-950 border border-white/10">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-500 bg-white" 
                  />
                  
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative p-2 rounded-xl bg-black shadow-2xl transition-transform duration-300 group-hover:scale-110 border border-white/10">
                        <Icon 
                          className="w-6 h-6 transition-all duration-300" 
                          style={{ 
                            color: accentColor,
                            opacity: 0.9
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
                        color: accentColor,
                        opacity: 0.7
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
        <p className="text-sm font-medium text-gray-500">
          Get your own{' '}
          <Link href="/products" className="font-bold text-white">
            TAGO
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BlackThemeLinks;