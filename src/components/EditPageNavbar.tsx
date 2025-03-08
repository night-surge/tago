"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    logoText?: string;
}

const Navbar = ({ logoText = "TAGO" }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        const { userName } = JSON.parse(localStorage.getItem('user') || '{}');
        router.push(`/${userName}`);
    };

    const handleRedirect = () =>{
        const { userName } = JSON.parse(localStorage.getItem('user') || '{}');
        router.push(`/${userName}`);
    }

    return (
        <nav className="relative z-50 bg-black backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <span className="text-white font-bold text-2xl font-[MighaMedium]">{logoText}</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/products">Products</NavLink>
                        <button
                            onClick={handleRedirect}
                            className="text-gray-300 hover:text-white hover:bg-white/10 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                        >
                            Profile
                        </button>
                        
                        <button
                            onClick={handleLogout}
                            className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-lg font-semibold transition-colors flex items-center gap-2"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
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
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-black/50 backdrop-blur-sm">
                        <MobileNavLink href="/">Home</MobileNavLink>
                        <MobileNavLink href="">Products</MobileNavLink>
                        <button
                            onClick={handleRedirect}
                            className="text-gray-300 hover:text-white hover:bg-white/10 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                        >
                            Profile
                        </button>

                        <button
                            onClick={handleLogout}
                            className="text-gray-300 hover:text-white hover:bg-white/10 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Desktop NavLink component
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-lg font-semibold transition-colors"
    >
        {children}
    </a>
);

// Mobile NavLink component
const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors"
    >
        {children}
    </a>
);

export default Navbar;