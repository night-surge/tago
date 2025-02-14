import React from 'react';
import Image from 'next/image';
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
  Globe} from 'lucide-react';

type Props = {
  user: {
    name: string;
    tagline: string;
    links: string[];
    picture: string;
  }
}

const two = ({user}: Props) => {

  const getIconForURL = (url:string) => {
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

  const getBrandColor = (url: string) => {
    const domain = url.toLowerCase();
    if (domain.includes('github')) return '#171515';
    if (domain.includes('twitter')) return '#1DA1F2';
    if (domain.includes('linkedin')) return '#0A66C2';
    if (domain.includes('instagram')) return '#E4405F';
    if (domain.includes('youtube')) return '#FF0000';
    if (domain.includes('facebook')) return '#1877F2';
    if (domain.includes('twitch')) return '#9146FF';
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb33_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb33_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)]" />
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10 space-y-6 relative z-20">
        <div className="text-center space-y-4">
          {/* Profile Photo Section */}
            <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-20 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-200/50 shadow-lg">
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
                <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF0080] via-[#7928CA] to-[#FF0080] animate-gradient bg-[length:200%_auto]">
                  {user.name}
                </span>
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-m sm:text-2xl text-gray-600 font-light tracking-wide">
              {user.tagline}
            </p>
          </div>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.links.map((link, index) => {
            const Icon = getIconForURL(link);
            const brandColor = getBrandColor(link);
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white">
                  <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-xl" />
                  
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ backgroundColor: `${brandColor}05` }} 
                  />
                  
                  <div className="absolute inset-0 rounded-2xl border border-gray-200 group-hover:border-gray-300 transition-colors duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative p-1 rounded-xl transition-transform duration-300 group-hover:scale-110">
                        <Icon 
                          className="w-6 h-6 transition-all duration-300" 
                          style={{ 
                            color: brandColor,
                            filter: 'brightness(1)'
                          }} 
                        />
                      </div>
                      <span className="text-lg font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {getPlatformName(link)}
                      </span>
                    </div>
                    <ExternalLink 
                      className="w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      style={{ 
                        color: `${brandColor}`,
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

      {/* Absolute positioned footer */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-6">
        <Link href="/products">
          <p className="text-sm text-gray-500">
            Get your own{' '}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              TAGO
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default two;