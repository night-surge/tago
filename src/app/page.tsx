import React from 'react';
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
  Globe,
  Sparkles
} from 'lucide-react';

const LinksPageDemo = () => {
  // Sample user data
  const initialData = {
    name: "Sarah Parker",
    links: [
      "https://github.com/sarahp",
      "https://twitter.com/sarahcodes",
      "https://linkedin.com/in/sarahparker",
      "https://instagram.com/sarah.creates",
      "https://dev.to/sarahp"
    ]
  };

  const getIconForURL = (url) => {
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

  const getBrandColor = (url) => {
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

  const getPlatformName = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch {
      return 'Link';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12 relative z-20">
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <Sparkles className="w-8 h-8 text-purple-400/50" />
          </div>

          {/* Profile Photo Section */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 blur-lg opacity-50 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10">
              <img
                src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-7xl sm:text-8xl font-bold tracking-tight">
            <span className="relative">
              <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
              <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text">
                {initialData.name}
              </span>
            </span>
          </h1>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialData.links.map((link, index) => {
            const Icon = getIconForURL(link);
            const brandColor = getBrandColor(link);
            return (
              <div
                key={index}
                className="group block"
              >
                <div className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />
                  
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ backgroundColor: `${brandColor}10` }} 
                  />
                  
                  <div className="absolute inset-0 rounded-2xl border border-white/[0.05] group-hover:border-white/[0.1] transition-colors duration-500" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="relative p-3 rounded-xl transition-transform duration-300 group-hover:scale-110">
                        <Icon 
                          className="w-6 h-6 transition-all duration-300" 
                          style={{ 
                            color: brandColor,
                            filter: 'brightness(1.2)'
                          }} 
                        />
                      </div>
                      <span className="text-xl font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        {getPlatformName(link)}
                      </span>
                    </div>
                    <ExternalLink 
                      className="w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      style={{ 
                        color: `${brandColor}99`,
                        filter: 'brightness(1.2)'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinksPageDemo;