// components/Navbar/MobileMenuButton.tsx
'use client'

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-white p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/50 backdrop-blur-sm">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/products">Products</MobileNavLink>
            <MobileNavLink href="/contact">Book a Call</MobileNavLink>
            <MobileNavLink href="/login">Manage your Tago</MobileNavLink>
          </div>
        </div>
      )}
    </>
  );
};

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
  >
    {children}
  </Link>
);

export default MobileMenuButton;