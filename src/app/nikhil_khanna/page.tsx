'use client';
import React, { useState, useEffect } from 'react';

import { 
    Instagram,
    Mail,
    Phone,
    Download,
   
} from 'lucide-react';

const SplashScreen = () => {
    const [showSplash, setShowSplash] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, []);
    
    if (!showSplash) return null;
    
    return (
        <div className="fixed inset-0 bg-black z-[100000] flex items-center justify-center animate-splash-slide">
            <div className="text-white text-4xl font-bold tracking-widest">TAGO</div>
        </div>
    );
};

const PersonalBentoLinks = () => {
  const user = {
    name: "Nikhil Khanna",
    tagline: "Content Creator & Photographer",
    contactInfo: {
      phone: "+91 8076853532",
      instagram: "why.not.nikhil"
    }
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${user.name}
TITLE:${user.tagline}
TEL:${user.contactInfo.phone}
URL:https://instagram.com/${user.contactInfo.instagram}
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#222222 1px,transparent 1px),linear-gradient(-45deg,#222222 1px,transparent 1px)] bg-[size:20px_20px]" />
      </div>
      
      <div className="max-w-lg mx-auto px-4 py-10 relative z-20">
        <div className="text-center space-y-6 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full mx-auto flex items-center justify-center border border-zinc-700">
            <span className="text-3xl font-bold text-zinc-400">NK</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {user.name}
          </h1>
          
          <p className="text-xl text-zinc-400 font-medium">
            {user.tagline}
          </p>
          
          <div className="max-w-xs mx-auto">
            <button
              onClick={downloadVCard}
              className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center border border-zinc-700"
            >
              <Download className="w-5 h-5 mr-2" />
              Save Contact
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                <Phone className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Phone</p>
                <a 
                  href={`tel:${user.contactInfo.phone}`}
                  className="text-zinc-300 font-medium hover:text-white transition-colors"
                >
                  {user.contactInfo.phone}
                </a>
              </div>
            </div>
          </div>
          
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center mr-4 border border-zinc-700">
                <Instagram className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Instagram</p>
                <a 
                  href={`https://instagram.com/${user.contactInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 font-medium hover:text-white transition-colors"
                >
                  @{user.contactInfo.instagram}
                </a>
              </div>
            </div>
          </div>
          
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                <Mail className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex-grow">
                <a 
                  href={`https://instagram.com/direct/t/${user.contactInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-all border border-zinc-700"
                >
                  Message Me on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-4 text-zinc-500 text-sm">
        <div className="max-w-lg mx-auto">
          <p>&copy; {new Date().getFullYear()} • Created with MyTago.tech</p>
        </div>
      </footer>
    </div>
  );
};

const NikhilKhannaPage = () => {
  return (
    <>
      <SplashScreen />
      <PersonalBentoLinks />
    </>
  );
};

export default NikhilKhannaPage;
