'use client';
import React, { useState, useEffect } from 'react';

import { 
    Linkedin, 
    Instagram,
    Facebook,
    Mail,
    Phone,
    Download,
    Calendar,
    Users,
    Briefcase,
    ChevronRight,
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

const CABentoLinks = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  
  // Hardcoded user data
  const user = {
    name: "Riya Jain",
    tagline: "Chartered Accountant & Tax Consultant",
    qualifications: "CA, CS, B.Com",
    picture: "/images/profile.jpg",
    links: [
      "https://linkedin.com/in/riyajain-ca",
      "https://instagram.com/riyajain_ca",
      "https://facebook.com/riyajain.ca"
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "contact@riyajain.ca",
      address: "401, Prestige Tower, MG Road, Bangalore, Karnataka 560001",
      googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0168262767697!2d77.60883511482193!3d12.975978490850639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1681ff78f3c5%3A0x6f78d4c2c4c64cc!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1615307613474!5m2!1sen!2sin",
      businessHours: [
        { day: "Monday", hours: "10:00 AM - 6:00 PM" },
        { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
        { day: "Wednesday", hours: "10:00 AM - 6:00 PM" },
        { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
        { day: "Friday", hours: "10:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
        { day: "Sunday", hours: "Closed" }
      ]
    },
    services: [
      { name: "Income Tax Filing", description: "Individual & Business" },
      { name: "GST Filing & Compliance", description: "Registration, Returns & Audit" },
      { name: "Audit & Assurance", description: "Statutory & Internal Audit" },
      { name: "Company Formation", description: "Incorporation & Compliance" },
      { name: "Accounting Services", description: "Bookkeeping & Financial Statements" },
      { name: "Business Advisory", description: "Financial Planning & Analysis" }
    ],
    clientele: [
      "Startups & SMEs",
      "Salaried Professionals",
      "Self-Employed Individuals",
      "NRIs & Foreign Nationals",
      "Partnership Firms",
      "Pvt Ltd Companies"
    ],
    testimonials: [
      {
        name: "Priya Sharma",
        company: "Innova Technologies",
        text: "Riya's expertise in tax planning saved us significant amounts and kept us compliant."
      },
      {
        name: "Raj Mehta",
        company: "Individual Client",
        text: "Consistently provides excellent service with attention to detail and prompt responses."
      }
    ],
    importantDates: [
      { date: "July 31", description: "Income Tax Return (non-audit cases)" },
      { date: "September 30", description: "Tax Audit Report filing" },
      { date: "October 31", description: "Income Tax Return (audit cases)" },
      { date: "March 15", description: "Final Advance Tax Payment" }
    ]
  };
  
  const getIconForURL = (url: string) => {
    const domain = url.toLowerCase();
    if (domain.includes('linkedin')) return Linkedin;
    if (domain.includes('instagram')) return Instagram;
    if (domain.includes('facebook')) return Facebook;
    return Linkedin;
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
TITLE:${user.tagline}
NOTE:${user.qualifications}
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
    a.download = `${user.name.replace(/\s+/g, '_')}_CA_contact.vcf`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#00000008 1px,transparent 1px),linear-gradient(-45deg,#00000008 1px,transparent 1px)] bg-[size:20px_20px]" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-10 relative z-20">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-gray-900">
            <span className="relative">
              <span className="absolute -inset-2 blur-xl bg-blue-100/30" />
              <span>{user.name}</span>
            </span>
          </h1>
          
          <p className="text-m sm:text-2xl text-gray-600 font-medium tracking-wide max-w-2xl mx-auto">
            {user.tagline}
          </p>
          
          <p className="text-sm sm:text-lg text-blue-600 font-semibold">
            {user.qualifications}
          </p>
          
          <div className="relative h-px w-32 mx-auto overflow-hidden bg-gray-300" />
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Social Links */}
            <div className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Connect</h2>
              <div className="grid grid-cols-3 gap-3">
                {user.links.map((link, index) => {
                  const Icon = getIconForURL(link);
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all"
                    >
                      <Icon className="w-6 h-6 mb-2 text-blue-600" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors">
                        {getPlatformName(link)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Email Contact */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Email</h2>
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <a 
                href={`mailto:${user.contactInfo.email}`}
                className="text-gray-700 hover:text-blue-700 block transition-colors"
              >
                {user.contactInfo.email}
              </a>
            </div>
            
            {/* Phone Contact */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Call</h2>
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <a 
                href={`tel:${user.contactInfo.phone}`}
                className="text-gray-700 hover:text-blue-700 block transition-colors"
              >
                {user.contactInfo.phone}
              </a>
            </div>
            
            {/* Key Dates */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Important Dates</h2>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {user.importantDates.map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium mr-2">
                      {item.date}
                    </span>
                    <span className="text-gray-700 text-sm">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-4">
            {/* Services */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Services</h2>
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {user.services.map((service, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-all">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Schedule Appointment */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Schedule Consultation</h2>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              
              {!showAppointmentForm ? (
                <button 
                  onClick={() => setShowAppointmentForm(true)}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  Book Appointment <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Service Required</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Select a service</option>
                      {user.services.map((service, idx) => (
                        <option key={idx}>{service.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowAppointmentForm(false)}
                      className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Submit Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Testimonials */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Client Testimonials</h2>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {user.testimonials.map((testimonial, idx) => (
                  <div key={idx} className="border-t pt-3 mt-3">
                    <p className="text-sm text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <p className="font-medium text-gray-800 mt-1">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Download vCard */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Download vCard</h2>
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <button
                onClick={downloadVCard}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                Download Contact Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MyTago.tech</p>
        </div>
      </footer>
    </div>
  );
};

const CAPage = () => {
  return (
    <>
      <SplashScreen />
      <CABentoLinks />
    </>
  );
};

export default CAPage;
