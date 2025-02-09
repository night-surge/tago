"use client";
import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";

type UserData = {
  name: string;
  links: string[];
};

interface LinksPageClientProps {
  initialData: UserData;
}

async function getUserProfile(user_name: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 
  const res = await fetch(`${baseUrl}/api/user/${user_name}`, { cache: "no-store" });
  if (!res.ok) return null;
  
  return res.json();
}

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

const getBrandColor = (url: string): string => {
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

const getPlatformName = (url: string): string => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
  } catch {
    return 'Link';
  }
};

function LinksPageClient({ initialData }: LinksPageClientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Animated background patterns */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div 
        className="pointer-events-none fixed inset-0 z-10 transition duration-300"
        style={{
          background: `
            radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(124,58,237,0.1), 
            transparent 40%),
            radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(236,72,153,0.05), 
            transparent 40%)
          `
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12 relative z-20">
        <div className="text-center space-y-8">
          <div className="relative inline-block animate-bounce-slow">
            <div className="absolute inset-0 animate-spin-slow">
              <Sparkles className="w-8 h-8 text-purple-400/50" />
            </div>
          </div>

          <h1 className="text-7xl sm:text-8xl font-bold tracking-tight">
            <span className="relative">
              <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse" />
              <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text animate-gradient-x">
                {initialData.name}
              </span>
            </span>
          </h1>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 perspective-1000">
          {initialData.links.map((link, index) => {
            const Icon = getIconForURL(link);
            const brandColor = getBrandColor(link);
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block transform-gpu transition-all duration-700"
                style={{
                  animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`,
                  transform: `translateZ(${scrollPosition * 0.1}px) rotateX(${scrollPosition * 0.02}deg)`
                }}
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
              </a>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes gradient-shift {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .animate-gradient-x {
          animation: gradient-x 15s linear infinite;
          background-size: 200% auto;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .animate-float {
          animation: float 15s ease infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Main page component (Server Component)
// app/[user_name]/page.tsx
export default async function ProfilePage({ 
  params 
}: { 
  params: { user_name: string } 
}) {
  const user = await getUserProfile(params.user_name);
  
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

  return <LinksPageClient initialData={user} />;
}