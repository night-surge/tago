import React from "react";
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
  Sparkles,
  LucideIcon
} from "lucide-react";

type UserData = {
  name: string;
  links: string[];
};

interface LinksPageProps {
  initialData: UserData;
}

const PLATFORM_CONFIG: Record<string, { icon: LucideIcon; color: string }> = {
  github: { icon: Github, color: '#171515' },
  twitter: { icon: Twitter, color: '#1DA1F2' },
  linkedin: { icon: Linkedin, color: '#0A66C2' },
  instagram: { icon: Instagram, color: '#E4405F' },
  youtube: { icon: Youtube, color: '#FF0000' },
  facebook: { icon: Facebook, color: '#1877F2' },
  twitch: { icon: Twitch, color: '#9146FF' },
  'dev.to': { icon: Globe, color: '#333333' }
};

const getPlatformDetails = (url: string) => {
  const domain = url.toLowerCase();
  const platform = Object.keys(PLATFORM_CONFIG).find(key => domain.includes(key));
  return platform ? PLATFORM_CONFIG[platform] : { icon: Link2, color: '#6366F1' };
};

const getPlatformName = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace('www.', '').split('.')[0].charAt(0).toUpperCase() + 
           hostname.replace('www.', '').split('.')[0].slice(1);
  } catch {
    return 'Link';
  }
};

const LinkCard = ({ link }: { link: string }) => {
  const { icon: Icon, color: brandColor } = getPlatformDetails(link);
  
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block">
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
                style={{ color: brandColor, filter: 'brightness(1.2)' }} 
              />
            </div>
            <span className="text-xl font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300">
              {getPlatformName(link)}
            </span>
          </div>
          <ExternalLink 
            className="w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
            style={{ color: `${brandColor}99`, filter: 'brightness(1.2)' }}
          />
        </div>
      </div>
    </a>
  );
};

function LinksPage({ initialData }: LinksPageProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12 relative z-20">
        <header className="text-center space-y-8">
          <div className="relative inline-block">
            <Sparkles className="w-8 h-8 text-purple-400/50" />
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
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialData.links.map((link, index) => (
            <LinkCard key={index} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function getUserProfile(userName: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 
  const res = await fetch(`${baseUrl}/api/user/${userName}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProfilePage({ 
  params 
}: { 
  params: { userName: string }
}) {
  const user = await getUserProfile(params.userName);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">User not found</h1>
          <p className="text-gray-400">The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  return <LinksPage initialData={user} />;
}