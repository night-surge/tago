import React from 'react';
import { 
  Link as LinkIcon, Shield, Share2,
  Globe, Users, Award
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    { 
      icon: LinkIcon, 
      title: "Tap & Connect",
      description: "Share your entire digital presence instantly with a simple tap. Perfect for networking events, meetings, and social gatherings."
    },
    { 
      icon: Shield, 
      title: "Premium NFC Cards",
      description: "Luxury metal and PVC cards with advanced NFC technology, designed for durability and sophisticated connectivity."
    },
    { 
      icon: Share2, 
      title: "Smart Sharing",
      description: "Instantly share contact info, social profiles, portfolios, and payment details - all customizable through your digital dashboard."
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Compatible with all modern smartphones and NFC devices. No app required for basic contact sharing."
    },
    {
      icon: Users,
      title: "Business Solutions",
      description: "Custom branding, bulk orders, and team management features for businesses of all sizes."
    },
    {
      icon: Award,
      title: "Elite Design",
      description: "Choose from premium materials and elegant designs, or create your own custom card that reflects your personal brand."
    }
  ];

  return (
    <div className="py-20 px-4 bg-black relative overflow-hidden">
    <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-zinc-800/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-zinc-800 text-white mb-4">
            KEY BENEFITS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Tago
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Premium features designed for seamless networking
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-zinc-900/20 hover:bg-zinc-800/20 transition-all duration-500 border border-zinc-800 relative overflow-hidden transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/10 to-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <feature.icon className="w-8 h-8 mb-4 text-white group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-zinc-400 relative z-10">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
     <div className="absolute bottom-0 left-0 right-0">
            <div className="h-1 w-full bg-zinc-800"></div>
          </div>
    </div>
  );
};

export default FeaturesSection;