'use client';
import React, { useState, useEffect } from 'react';

import { 
    Mail,
    Phone,
    Download,
    MapPin,
    Briefcase,
    CheckCircle,
    Award,
    Layers,
    Shield,
    Database
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
  const [activeTab, setActiveTab] = useState('all');
  
  // Updated user data with the comprehensive information
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
    about: "A K Enterprises is a forward-thinking company dedicated to creating the ideal environment for the 21st century. We specialize in connecting decision-makers to a dynamic network of data, people, and ideas, ensuring that we deliver the best solutions to our customers worldwide. With expertise in education, government projects, government tenders, metals, and finance, our goal is to drive comprehensive growth and development that enhances the success of our clients.",
    mission: "Our mission is to establish a strong and dedicated team to pursue the main objectives of the company and pave the way toward successful establishment.",
    founderQuote: "We have come a long way. Dealing in Aluminium scrap tender of Gujarat Government presently and copper and transformer scrap, we are further looking for expanding our business. Managing skills and passion, we are constantly looking to open new frontiers for our company.",
    values: [
      {
        title: "Quality is our top priority",
        description: "We prioritize quality above all else, ensuring that we deliver cost-effective, high-quality metals by sourcing and distributing durable products with long-lasting performance."
      },
      {
        title: "Efficiency drives our growth",
        description: "We continuously seek opportunities to acquire valuable resource assets, enhancing our operational efficiency and effectiveness."
      },
      {
        title: "Looking towards the global market",
        description: "While expanding our presence in the domestic market, we are also focused on making a significant impact in the international metal trading sector."
      }
    ],
    services: [
      { name: "Metal Trading", description: "Specializing in aluminum, copper, brass and more" },
      { name: "Government Tenders", description: "Expert handling of government contracts" },
      { name: "Project Consultancy", description: "Professional consulting and legal settlements" },
      { name: "Financial Services", description: "Banking, finance and investment solutions" },
      { name: "Education Services", description: "Educational development and consultancy" }
    ],
    categories: [
      { id: "scrap" as const, name: "Scrap Services" },
      { id: "testing" as const, name: "Testing Services" },
      { id: "professional" as const, name: "Professional Services" },
      { id: "trading" as const, name: "Trading Services" }
    ],
    products: [
      { category: "scrap", name: "Aluminium Scrap" },
      { category: "scrap", name: "Copper Scrap" },
      { category: "scrap", name: "Transformer Scrap" },
      { category: "scrap", name: "Batteries Scrap" },
      { category: "scrap", name: "Iron Scrap" },
      { category: "scrap", name: "Gun Metal Scrap" },
      { category: "scrap", name: "Steel Scrap" },
      { category: "scrap", name: "Lead Metal Scrap" },
      { category: "scrap", name: "Titanium Scrap" },
      { category: "scrap", name: "Factory Scrap" },
      { category: "scrap", name: "Oil Scrap" },
      { category: "scrap", name: "Electronic Scrap" },
      { category: "scrap", name: "Aircraft Scrap" },
      { category: "scrap", name: "Ship Scrap" },
      { category: "professional", name: "Project Consultancy" },
      { category: "professional", name: "Legal Services" },
      { category: "professional", name: "Financial Consulting" },
      { category: "trading", name: "Precious Metals" },
      { category: "trading", name: "Non-Precious Metals" },
      { category: "trading", name: "Commodities" },
      { category: "trading", name: "International Properties" }
    ],
    business_areas: [
      "Brass", "Aluminium", "Copper", "Rice", "Scraps", "Government contracts", 
      "Precious and non precious metals", "Antiques", "Education", 
      "Commodities (Hard and Soft)", "International properties", 
      "Finance and Banking", "Project and Legal consultancy with settlements", 
      "Supply", "Energy and Agricultural projects", "Stock Exchange"
    ],
    certifications: [
      "Certificate 1", "Certificate 2", "Certificate 3", "Certificate 4"
    ],
    projects: [
      {
        title: "Project 1: Aluminum",
        description: "The project involves the procurement and processing of 99% purity aluminum wire from government warehouses in Gujarat. Total scrap quantity is 480,000 metric tons. The project is managed under the Energy Ministry."
      },
      {
        title: "Project 2: Copper",
        description: "This project focuses on copper scrap, including plates, pipes, and wires, sourced from Gujarat's government warehouses. It involves 55,000 metric tons of scrap and is managed under the Energy Ministry for tendering."
      },
      {
        title: "Project 3: Electric Transformers",
        description: "The electric transformer scrap project involves approximately 20,000 units. The scrap is sourced from government warehouses in Gujarat, and the project is managed under the Energy Ministry as part of a tender."
      },
      {
        title: "Project 4: Ship Scrap",
        description: "This private project focuses on ship scrap located in Gujarat State, with over 12 lakh tons of scrap. AK Enterprises is responsible for liaisoning, but no available lab reports exist."
      }
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

  const filterProducts = (category: 'all' | 'scrap' | 'testing' | 'professional' | 'trading') => {
    setActiveTab(category);
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
        
        {/* About Us Section */}
        <div className="mb-10 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-700 mb-6">{user.about}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {user.values.map((value, idx) => (
              <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Project Portfolio */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.projects.map((project, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <h3 className="font-bold text-green-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Business Areas */}
        <div className="mb-10 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Areas of Expertise</h2>
            <Layers className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex flex-wrap gap-2">
            {user.business_areas.map((area, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm border border-green-100"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        
        {/* Services and Products Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">We Deal In</h2>
          <p className="text-center text-gray-600 mb-6">Filter through our comprehensive range of services</p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button 
              onClick={() => filterProducts('all')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </button>
            {user.categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => filterProducts(category.id)} 
                className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === category.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {user.products.filter(product => activeTab === 'all' || product.category === activeTab).map((product, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 text-center hover:shadow-md transition-all">
                <span className="text-gray-800">{product.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mb-10 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Certifications</h2>
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {user.certifications.map((cert, idx) => (
              <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-100 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-gray-700">{cert}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Founder Quote */}
        <div className="mb-10 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-700">AK</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{user.name}</h3>
              <p className="text-green-700 text-sm mb-3">(Director and Founder)</p>
              <p className="text-gray-600 italic">{user.founderQuote}</p>
              <p className="text-gray-600 mt-2">{user.mission}</p>
            </div>
          </div>
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
            
            {/* Business Areas Summary */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Key Industries</h2>
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Metal Trading & Processing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Government Contracts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Energy & Agricultural Projects</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Finance & Banking Services</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Educational Services</span>
                </div>
              </div>
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
