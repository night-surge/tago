'use client';
import React, { useState, useEffect } from 'react';

import { 
    Mail,
    Phone,
    Download,
    MapPin,
    Briefcase,
    CheckCircle,
    Building,
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

const BusinessBentoLinks = () => {
  // Simplified user data focusing on essential business card info
  const user = {
    name: "Apurv Khanna",
    companyName: "A K Enterprises",
    tagline: "Creating Ideal Environments for the 21st Century",
    contactInfo: {
      phone: "+91 9660162221",
      email: "enterprisesak773@gmail.com",
      address: "902, Mondeal Square, Beside Sapath-5, Prahlad Nagar, SG Highway, Ahmedabad - 380015",
      googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9013457905147!2d72.50279591492232!3d23.01290288495553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b2b7efb94a5%3A0x6387ed3a1656d490!2sMondeal%20Square!5e0!3m2!1sen!2sin!4v1655278356789!5m2!1sen!2sin"
    },
    about: "A K Enterprises is a forward-thinking company dedicated to creating the ideal environment for the 21st century. We specialize in connecting decision-makers to a dynamic network of data, people, and ideas, ensuring that we deliver the best solutions to our customers worldwide.",
    services: [
      { name: "Metal Trading", description: "Specializing in aluminum, copper, brass and more" },
      { name: "Government Tenders", description: "Expert handling of government contracts" },
      { name: "Project Consultancy", description: "Professional consulting services" },
      { name: "Financial Services", description: "Banking and finance solutions" }
    ],
    keyAreas: [
      "Metal Trading & Processing",
      "Government Contracts",
      "Energy Projects",
      "Finance & Banking",
      "Educational Services"
    ]
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
END:VCARD`;
    
    // Create download link
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name.replace(/\s+/g, '_')}_AK_Enterprises.vcf`;
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50 to-green-50/30 opacity-80" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-10 relative z-20">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-10">
          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 tracking-tight">
              {user.companyName}
            </h2>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
            <span className="relative">
              <span className="absolute -inset-2 blur-xl bg-green-100/30" />
              <span>{user.name}</span>
            </span>
          </h1>
          
          <p className="text-m sm:text-2xl text-gray-600 font-medium tracking-wide max-w-2xl mx-auto">
            {user.tagline}
          </p>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden bg-green-300" />
          
          {/* Download vCard Button at top */}
          <div className="max-w-xs mx-auto pt-3">
            <button
              onClick={downloadVCard}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
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
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a 
                    href={`tel:${user.contactInfo.phone}`}
                    className="text-gray-900 hover:text-green-700 font-medium transition-colors"
                  >
                    {user.contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href={`mailto:${user.contactInfo.email}`}
                    className="text-gray-900 hover:text-green-700 font-medium transition-colors break-all"
                  >
                    {user.contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Office Address</p>
                  <p className="text-gray-900 font-medium">
                    {user.contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Brief About */}
        <div className="mb-8 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">About Us</h2>
          <p className="text-gray-700">{user.about}</p>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Services */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Our Services</h2>
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-3">
                {user.services.map((service, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-green-200 transition-all">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-4">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden md:block p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Contact Details</h2>
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href={`tel:${user.contactInfo.phone}`}
                      className="text-gray-900 hover:text-green-700 font-medium transition-colors"
                    >
                      {user.contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href={`mailto:${user.contactInfo.email}`}
                      className="text-gray-900 hover:text-green-700 font-medium transition-colors break-all"
                    >
                      {user.contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
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
                <MapPin className="w-5 h-5 text-green-600" />
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
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Business Areas Summary */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Key Industries</h2>
                <Building className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-2">
                {user.keyAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Download vCard */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Download Contact</h2>
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <button
                onClick={downloadVCard}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Save Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} A K Enterprises | Created with MyTago.tech</p>
        </div>
      </footer>
    </div>
  );
};

const AKEnterprisesPage = () => {
  return (
    <>
      <SplashScreen />
      <BusinessBentoLinks />
    </>
  );
};

export default AKEnterprisesPage;
