import React from 'react';
import Image from 'next/image';
import { 
    Linkedin, 
    Mail,
    Download,
    BookOpen,
    GraduationCap,
    Briefcase,
    Globe,
    ExternalLink,
    Phone,
    Instagram,
    Quote,
    School
} from 'lucide-react';

const AcademicCard = () => {
  // Static data for server-side rendering
  const user = {
    name: "Dr. Vinod Shastri",
    title: "Head, Centre for Innovation & Entrepreneurship",
    organization: "Bennett University",
    image: "https://www.bennett.edu.in/wp-content/uploads/2018/03/Vinod-Shastri.jpg",
    bio: "An academician who practices all that he preaches and an entrepreneur who preaches only what he practices, with over three decades of experience.",
    quote: "Entrepreneurship is not just a career choice, it's a mindset that transforms ideas into impactful realities.",
    contactInfo: {
      phone: "+91 98222 62373",
      email: "vinod_shastri@yahoo.com",
      workEmail: "vinod.shastri@bennett.edu.in",
      linkedin: "linkedin.com/in/drvinodshastri",
      website: "timesofindia.indiatimes.com/blogs/vinnovative-thoughts/",
      instagram: "instagram.com/yolkshire"
    },
    experience: [
      {
        role: "Head (Centre for Innovation & Entrepreneurship)",
        organization: "Bennett University",
        duration: "Nov 2016 - Present · 8 yrs 5 mos",
        location: "New Delhi Area, India",
        description: "Integrate entrepreneurship education in all academic streams of the University and support student and other start-ups through incubation."
      },
      {
        role: "Dean (Student Affairs) & Head (CIE)",
        organization: "Bennett University",
        duration: "Jun 2021 - Jun 2023 · 2 yrs 1 mo",
        location: "Greater Delhi Area",
        description: ""
      },
      {
        role: "Co-founder & Director",
        organization: "Yolkshire Restaurant",
        duration: "Apr 2010 - Present · 15 yrs",
        location: "Pune Area, India",
        description: "Conceived and co-founded 'Yolkshire', Pune's 1st Egg Specialty Restaurant with partners."
      },
      {
        role: "Assistant Professor",
        organization: "Symbiosis Institute of Business Management (SIBM)",
        duration: "2010-2016",
        location: "Pune, India",
        description: ""
      }
    ],
    education: [
      { degree: "Ph.D.", institution: "Symbiosis International University", year: "2015", field: "Intrapreneurship" },
      { degree: "NET", institution: "University Grants Commission", year: "1996" },
      { degree: "M. Com.", institution: "University of Poona, Ganeshkhind, Pune", year: "1987" },
      { degree: "MBA", institution: "University of Poona, Ganeshkhind, Pune", year: "1985" },
      { degree: "B. Com.", institution: "University of Poona, Ganeshkhind, Pune", year: "1982" }
    ],
    researchAreas: ["Entrepreneurship", "Corporate Entrepreneurship", "Intrapreneurship", "Business Innovation", "Educational Leadership"],
    publications: [
      "'NetworKING KHAN' Published in 'SAMVAD' ISSN 2249-1880",
      "'A Study of the Learners' Perspective on Entrepreneurship' Published in 'SAMVAD' ISSN 2249-1880",
      "'Factors Contributing to Intrapreneurial Growth: An Exploratory Study of Companies in Pune' Published in 'International Journal of Decision Making in Management (IJDMM)' July-Sep 2015 ISSN 2319-6793"
    ],
    achievements: [
      "Led the development of Bennett University's entrepreneurship ecosystem",
      "Co-founded successful restaurant chain 'Yolkshire' in Pune",
      "Expert consultant for entrepreneurship education across India",
      "Mentored over 100+ student startups to success"
    ]
  };

  // Configure domains for Next.js Image component
  const imageProps = {
    src: user.image,
    alt: user.name,
    width: 128,
    height: 128,
    priority: true,
    unoptimized: true, // This bypasses the need for domains config
  };

  // Generate vCard data URL for download
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${user.name}
TITLE:${user.title}
ORG:${user.organization}
TEL:${user.contactInfo.phone}
EMAIL;TYPE=WORK:${user.contactInfo.workEmail}
EMAIL:${user.contactInfo.email}
URL;TYPE=LinkedIn:https://${user.contactInfo.linkedin}
URL;TYPE=Blog:https://${user.contactInfo.website}
URL;TYPE=Instagram:https://${user.contactInfo.instagram}
END:VCARD`;
  
  // Encode for href download
  const vCardDataUri = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Enhanced Header Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-200 relative">
          {/* Top decorative gradient */}
          <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white_0%,transparent_60%)]"></div>
              <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
            </div>
          </div>
          
          <div className="px-8 pb-8 -mt-16 relative">
            {/* Profile Image - Now overlaid on the gradient background */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto md:mx-0 relative z-10 bg-white">
              <Image 
                {...imageProps}
                alt={`Profile photo of ${user.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center md:text-left mt-4 md:mt-6">
              {/* Status badge */}
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-2 shadow-sm">
                Academic Leader & Entrepreneur
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{user.name}</h1>
              <p className="text-xl text-blue-700 font-medium mb-2">{user.title}</p>
              <p className="text-lg text-gray-500 mb-4">{user.organization}</p>
              <p className="text-gray-700 mb-5 max-w-2xl">{user.bio}</p>
              
              {/* Enhanced Social Media Connection Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <a 
                  href={`https://${user.contactInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full transition-transform hover:scale-110 hover:shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={`mailto:${user.contactInfo.email}`}
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full transition-transform hover:scale-110 hover:shadow-md"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href={`tel:${user.contactInfo.phone}`}
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full transition-transform hover:scale-110 hover:shadow-md"
                  aria-label="Phone"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a 
                  href={`https://${user.contactInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full transition-transform hover:scale-110 hover:shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={`https://${user.contactInfo.website}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full transition-transform hover:scale-110 hover:shadow-md"
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={vCardDataUri}
                  download={`${user.name.replace(/\s+/g, '_')}.vcf`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:from-blue-700 hover:to-blue-800"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Save Contact
                </a>
                <a 
                  href={`tel:${user.contactInfo.phone}`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-700 border border-blue-200 rounded-lg font-medium hover:bg-blue-50 transition-all hover:shadow-md"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quote Card - Slightly enhanced */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute top-4 left-4 opacity-10">
            <Quote className="w-24 h-24" />
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 rounded-full -mb-20 -mr-20 opacity-20"></div>
          <div className="relative z-10">
            <p className="text-lg md:text-2xl italic font-light">{user.quote}</p>
            <p className="text-right text-sm mt-4 font-medium">— Dr. Vinod Shastri</p>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a href={`tel:${user.contactInfo.phone}`} className="text-gray-900 hover:text-blue-700">
                  {user.contactInfo.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${user.contactInfo.email}`} className="text-gray-900 hover:text-blue-700">
                  {user.contactInfo.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Work Email</p>
                <a href={`mailto:${user.contactInfo.workEmail}`} className="text-gray-900 hover:text-blue-700">
                  {user.contactInfo.workEmail}
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Linkedin className="w-5 h-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a href={`https://${user.contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-700">
                  {user.contactInfo.linkedin}
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Globe className="w-5 h-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Personal Blog</p>
                <a href={`https://${user.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-700">
                  Times of India Blog
                  <ExternalLink className="w-3 h-3 inline ml-1" />
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Instagram className="w-5 h-5 text-blue-700 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Instagram</p>
                <a href={`https://${user.contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-700">
                  Yolkshire Restaurant
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Two-column layout for tablet and desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div>
            {/* Experience */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
                <Briefcase className="w-5 h-5 text-blue-700" />
              </div>
              
              <div className="space-y-5">
                {user.experience.map((exp, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-900">{exp.role}</p>
                    <p className="text-blue-700">{exp.organization}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                    {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Education */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                <GraduationCap className="w-5 h-5 text-blue-700" />
              </div>
              
              <div className="space-y-4">
                {user.education.map((edu, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div>
            {/* Key Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Key Achievements</h2>
                <School className="w-5 h-5 text-blue-700" />
              </div>
              
              <div className="space-y-3">
                {user.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-2"></div>
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Research Areas */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Research Areas</h2>
                <BookOpen className="w-5 h-5 text-blue-700" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {user.researchAreas.map((area, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Publications */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Publications</h2>
                <BookOpen className="w-5 h-5 text-blue-700" />
              </div>
              
              <div className="space-y-3">
                {user.publications.map((pub, idx) => (
                  <p key={idx} className="text-gray-700 text-sm mb-2">{pub}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 border-t border-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-2">Dr. Vinod Shastri</div>
          <p className="text-blue-200 mb-4">Connecting ideas, inspiring innovation, and nurturing entrepreneurs.</p>
          <div className="flex justify-center gap-4">
            <a href={`tel:${user.contactInfo.phone}`} className="text-white hover:text-blue-300" aria-label="Phone">
              <Phone className="w-5 h-5" />
            </a>
            <a href={`mailto:${user.contactInfo.email}`} className="text-white hover:text-blue-300" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href={`https://${user.contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`https://${user.contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-blue-300 mt-6">
            &copy; {new Date().getFullYear()} • Created with MyTago.tech
          </p>
        </div>
      </footer>
    </div>
  );
};

// Use a simplified version without client-side functionality
export default function DrVinodShastri() {
  return <AcademicCard />;
}
