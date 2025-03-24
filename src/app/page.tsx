'use client';
import React, { useState, useEffect } from 'react';

import { 
    Linkedin, 
    Instagram,
    Facebook,
    Mail,
    Phone,
    Download,
    Building,
    MapPin,
    Hammer,
    CheckCircle,
    Star
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

const PropertyBentoLinks = () => {
  // Hardcoded user data for S.R. Builders and Properties
  const user = {
    name: "Rajesh Budhiraja",
    companyName: "S.R. Builders and Properties",
    tagline: "Quality Construction & Real Estate Services",
    picture: "/images/profile.jpg",
    links: [
      "https://instagram.com/s.r_builders_"
    ],
    contactInfo: {
      phone: "+91 9810343072",
      email: "rajeshbudhiraja1008@gmail.com",
      address: "A-1 Extension, Krishna Nagar, Delhi - 110031",
      googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.1243594771847!2d77.28967231508328!3d28.65137808240863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb4a94a9b871%3A0xa2d30ba3b94f73eb!2sKrishna%20Nagar%2C%20Delhi%2C%20110051!5e0!3m2!1sen!2sin!4v1655278356789!5m2!1sen!2sin"
    },
    services: [
      { name: "Residential Construction", description: "Custom homes and residential buildings" },
      { name: "Commercial Projects", description: "Office spaces and retail constructions" },
      { name: "Property Buying & Selling", description: "Real estate transactions and consultancy" },
      { name: "Renovation Services", description: "Modernization and upgrades of existing properties" },
      { name: "Interior Solutions", description: "Complete interior design and execution" }
    ],
    projectTypes: [
      "Residential Apartments",
      "Individual Houses",
      "Commercial Complexes",
      "Office Buildings",
      "Retail Spaces"
    ],
    keyValues: [
      "Quality Construction",
      "Timely Delivery",
      "Transparent Dealings",
      "Customer Satisfaction",
      "Affordable Pricing"
    ]
  };
  
  const getIconForURL = (url: string) => {
    const domain = url.toLowerCase();
    if (domain.includes('instagram')) return Instagram;
    if (domain.includes('facebook')) return Facebook;
    if (domain.includes('linkedin')) return Linkedin;
    return Instagram;
  };

  const getPlatformName = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch {
      return 'Link';
    }
  };

  const downloadVCard = () => {
    // Create vCard format
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${user.name}
ORG:${user.companyName}
TITLE:${user.tagline}
TEL:${user.contactInfo.phone}
EMAIL:${user.contactInfo.email}
ADR:;;${user.contactInfo.address};;;
${user.links.map(link => `URL:${link}`).join('\n')}
END:VCARD`;
    
    // Create download link
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name.replace(/\s+/g, '_')}_SR_Builders.vcf`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#00000005 1px,transparent 1px),linear-gradient(-45deg,#00000005 1px,transparent 1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50 to-blue-50/30 opacity-80" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-10 relative z-20">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-10">
          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 tracking-tight">
              {user.companyName}
            </h2>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
            <span className="relative">
              <span className="absolute -inset-2 blur-xl bg-blue-100/30" />
              <span>{user.name}</span>
            </span>
          </h1>
          
          <p className="text-m sm:text-2xl text-gray-600 font-medium tracking-wide max-w-2xl mx-auto">
            {user.tagline}
          </p>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden bg-blue-300" />
          
          {/* Download vCard Button at top */}
          <div className="max-w-xs mx-auto pt-3">
            <button
              onClick={downloadVCard}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Save Contact
            </button>
          </div>
        </div>
        
        {/* Mobile-First Contact Info - Visible only on mobile */}
        <div className="md:hidden mb-6 space-y-4">
          {/* Contact Info Card for Mobile */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Contact Details</h2>
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a 
                    href={`tel:${user.contactInfo.phone}`}
                    className="text-gray-900 hover:text-blue-700 font-medium transition-colors"
                  >
                    {user.contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href={`mailto:${user.contactInfo.email}`}
                    className="text-gray-900 hover:text-blue-700 font-medium transition-colors break-all"
                  >
                    {user.contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Office Address</p>
                  <p className="text-gray-900 font-medium">
                    {user.contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Link for Mobile */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Connect With Us</h2>
            <div className="grid grid-cols-1 gap-3">
              {user.links.map((link, index) => {
                const Icon = getIconForURL(link);
                const platform = getPlatformName(link);
                const handle = link.split('/').pop() || 's.r_builders_';
                
                return (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all"
                  >
                    <Icon className="w-6 h-6 mr-3 text-blue-600" />
                    <div>
                      <span className="block font-medium text-gray-900">{platform}</span>
                      <span className="text-sm text-blue-600">@{handle}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Bento Grid Layout - Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Services */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Our Services</h2>
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {user.services.map((service, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 transition-all">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social Links - Hidden on mobile */}
            <div className="hidden md:block p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Connect With Us</h2>
              <div className="grid grid-cols-1 gap-3">
                {user.links.map((link, index) => {
                  const Icon = getIconForURL(link);
                  const platform = getPlatformName(link);
                  const handle = link.split('/').pop() || 's.r_builders_';
                  
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all"
                    >
                      <Icon className="w-6 h-6 mr-3 text-blue-600" />
                      <div>
                        <span className="block font-medium text-gray-900">{platform}</span>
                        <span className="text-sm text-blue-600">@{handle}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-4">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden md:block p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Contact Details</h2>
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href={`tel:${user.contactInfo.phone}`}
                      className="text-gray-900 hover:text-blue-700 font-medium transition-colors"
                    >
                      {user.contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href={`mailto:${user.contactInfo.email}`}
                      className="text-gray-900 hover:text-blue-700 font-medium transition-colors break-all"
                    >
                      {user.contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Office Address</p>
                    <p className="text-gray-900 font-medium">
                      {user.contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Google Maps */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Location</h2>
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-200 h-56">
                <iframe
                  src={user.contactInfo.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            {/* Project Types - Move here for better mobile flow */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Project Types</h2>
                <Hammer className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex flex-wrap gap-2">
                {user.projectTypes.map((type, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Key Values */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Our Values</h2>
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {user.keyValues.map((value, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Types moved to middle column */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} S.R. Builders and Properties | Created with MyTago.tech</p>
        </div>
      </footer>
    </div>
  );
};

const CAPage = () => {
  return (
    <>
      <SplashScreen />
      <PropertyBentoLinks />
    </>
  );
};

export default CAPage;
