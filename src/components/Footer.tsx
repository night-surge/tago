import React from 'react';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-zinc-800 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <span className="text-2xl font-bold text-white">Tago</span>
          <p className="text-zinc-400">Share your world with a tap.</p>
          <div className="flex gap-4">
            {[Twitter, Github, Linkedin, Instagram].map((Icon, index) => (
              <a 
                key={index}
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        {[
          {
            title: 'Products',
            links: ['Personal Cards', 'Business Cards', 'Enterprise', 'Accessories']
          },
          {
            title: 'Company',
            links: ['About Us', 'Careers', 'Press', 'Blog']
          },
          {
            title: 'Support',
            links: ['Help Center', 'Contact', 'Privacy', 'Terms']
          }
        ].map((section) => (
          <div 
            key={section.title}
            className="space-y-4"
          >
            <h3 className="font-semibold">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-400 text-sm">
        © {new Date().getFullYear()} Tago. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;