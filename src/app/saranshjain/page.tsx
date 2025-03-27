'use client';
import React, { useState, useEffect } from 'react';

import { 
    Linkedin, 
    Instagram,
    Github,
    Twitter,
    Mail,
    Phone,
    Download,

    Briefcase,
    ChevronRight,
    Globe,
    Star,
    Terminal,
    Cpu,
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

const FounderBentoLinks = () => {
  const [githubStats, setGithubStats] = useState({
    repos: '...',
    stars: '...',
    contributions: '...',
    topLanguages: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch GitHub stats when component mounts
    const fetchGitHubStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user repositories
        const reposResponse = await fetch('https://api.github.com/users/Saransh-Jainbu/repos');
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const repos = await reposResponse.json();
        
        interface GitHubRepo {
          stargazers_count: number;
          language: string | null;
        }

        // Calculate stats
        const repoCount = repos.length;
        const starCount = repos.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);
        
        // Extract languages from repos
        const languagesMap: Record<string, number> = {};
        for (const repo of repos) {
          if (repo.language && repo.language !== 'null') {
            languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
          }
        }
        
        // Sort languages by usage count
        const topLanguages = Object.entries(languagesMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([language]) => language);
          
        // Update state with fetched data
        setGithubStats({
          repos: repoCount.toString(),
          stars: starCount.toString(),
          contributions: '500+', // GitHub doesn't provide this via public API
          topLanguages: topLanguages.length > 0 ? topLanguages : ["TypeScript", "JavaScript", "React", "Python"]
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fallback to default values if API fails
        setGithubStats({
          repos: '15',
          stars: '50+',
          contributions: '500+',
          topLanguages: ["TypeScript", "JavaScript", "React", "Python"]
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGitHubStats();
  }, []);
  
  // Hardcoded user data for Saransh Jain with updated links and contact info
  const user = {
    name: "Saransh Jain",
    tagline: "Founder & CEO of Tago",
    qualifications: "Tech Entrepreneur | Full Stack & Cloud Developer",
    picture: "/images/profile.jpg",
    links: [
      "https://www.linkedin.com/in/saransh-jain-558276281/",
      "https://github.com/Saransh-Jainbu",
      "https://x.com/SaranshxJain"
    ],
    contactInfo: {
      phone: "+91 7838075004",
      email: "saranshj647@gmail.com",
    },
    positions: [
      {
        organization: "GDG On Campus, Bennett University",
        role: "Marketing & Collaboration Lead",
        duration: "1 yr 6 mos",
        type: "Full-time",
        location: "India"
      },
      {
        organization: "Bennett Cloud Computing Club",
        role: "Tech Lead",
        duration: "1 yr 4 mos",
        type: "Full-time",
        location: "India"
      },
      {
        organization: "Spark Ecell, Bennett University",
        role: "Collaboration Lead",
        duration: "1 yr",
        type: "Full-time",
        location: "India"
      }
    ],
    projects: [
      { name: "Tago", description: "Digital Business Card Platform", link: "https://mytago.tech" },
      { name: "Unitask", description: "Freelancing Platform for College Students", link: "https://unitask-black.vercel.app/" },
      { name: "Dhwaniyog", description: "Speech Therapy Digitization Platform", link: "https://dhwaniyog.vercel.app/" }
    ],
    achievements: [
      "Smart India Hackathon Semi finalist",
      "Productathon AI Finalist",
      "GPT 4.0 Winner",
      "Best Performer SCSET"
    ],
    githubStats: githubStats,
    education: {
      institution: "Bennett University",
      degree: "B.Tech in Computer Science",
      period: "2023 - 2027",
      gpa: "9.04",
      relevantCourses: [
        "Data Structures & Algorithms",
        "Web Development",
        "Cloud Computing",
        "Machine Learning"
      ]
    },
    certifications: [
      { name: "AWS Academy Graduate - AWS Academy Cloud Foundations", issuer: "Amazon Web Services", date: "2023" },
      { name: "AWS Academy Cloud Security Foundations", issuer: "Amazon Web Services", date: "2023" },
      { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2023" },
      { name: "Introduction to Front-End Development", issuer: "Meta", date: "2022" }
    ]
  };
  
  const getIconForURL = (url: string) => {
    const domain = url.toLowerCase();
    if (domain.includes('linkedin')) return Linkedin;
    if (domain.includes('github')) return Github;
    if (domain.includes('x.com') || domain.includes('twitter')) return Twitter;
    if (domain.includes('instagram')) return Instagram;
    return Globe;
  };

  const getPlatformName = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      if (domain.includes('x.com')) return 'Twitter';
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
${user.links.map(link => `URL:${link}`).join('\n')}
END:VCARD`;
    
    // Create download link
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name.replace(/\s+/g, '_')}_Tago_Founder.vcf`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Premium background with gradient and subtle grid */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#111]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#222222 1px,transparent 1px),linear-gradient(-45deg,#222222 1px,transparent 1px)] bg-[size:20px_20px]" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-zinc-700 rounded-full filter blur-[100px]" />
          <div className="absolute top-60 -right-20 w-80 h-80 bg-zinc-800 rounded-full filter blur-[100px]" />
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-zinc-900 rounded-full filter blur-[100px]" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-20">
        {/* Header Section with Animated Gradient */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 animate-gradient-x">
            {user.name}
          </h1>
          
          <p className="text-xl sm:text-3xl text-gray-300 font-medium tracking-wide max-w-2xl mx-auto">
            {user.tagline}
          </p>
          
          <p className="text-sm sm:text-lg text-gray-400 font-semibold">
            {user.qualifications}
          </p>
          
          <div className="relative h-px w-40 mx-auto overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
          </div>
          
          {/* Download vCard Button (Moved to top) */}
          <div className="max-w-xs mx-auto">
            <button
              onClick={downloadVCard}
              className="w-full py-3 px-4 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Contact Card
            </button>
          </div>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Connect</h2>
              <div className="grid grid-cols-3 gap-3">
                {user.links.map((link, index) => {
                  const Icon = getIconForURL(link);
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center p-3 rounded-xl bg-black/70 border border-zinc-800 hover:border-gray-600 hover:bg-black transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 mb-2 text-gray-400 group-hover:text-white" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {getPlatformName(link)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Education Card - Add this */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Education</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.328.996.002 1.069c0 .528.213 1.028.593 1.393l3.464 3.32a1 1 0 001.414-.001l3.463-3.32c.38-.364.593-.865.593-1.393l.002-1.066 3.544-1.521a1 1 0 000-1.842l-7-3zM5 13.668v-2.53a.5.5 0 01.272-.445L9.5 9.155v3.993l-4.055 1.938a.5.5 0 01-.445-.892zM15 10.5a.5.5 0 01-.272.445L11 12.155V8.162l4.055-1.938a.5.5 0 01.445.892z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-white">{user.education.institution}</h3>
                <p className="text-gray-300">{user.education.degree}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{user.education.period}</span>
                  <span className="text-gray-400">GPA: {user.education.gpa}</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Relevant Coursework:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.education.relevantCourses.map((course, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-zinc-900 text-gray-300 rounded-full">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Email Contact */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Email</h2>
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <a 
                href={`mailto:${user.contactInfo.email}`}
                className="text-gray-300 hover:text-white block transition-colors"
              >
                {user.contactInfo.email}
              </a>
            </div>
            
            {/* Phone Contact */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Call</h2>
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
              <a 
                href={`tel:${user.contactInfo.phone}`}
                className="text-gray-300 hover:text-white block transition-colors"
              >
                {user.contactInfo.phone}
              </a>
            </div>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-6">
            {/* Positions/Experience */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Experience</h2>
                <Briefcase className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {user.positions.map((position, idx) => (
                  <div key={idx} className="p-3 bg-black/70 rounded-lg border border-zinc-800">
                    <h3 className="font-medium text-white text-base">{position.organization}</h3>
                    <p className="text-gray-300 font-medium mt-1">{position.role}</p>
                    <div className="flex flex-wrap items-center mt-1 text-xs text-gray-400">
                      <span>{position.type}</span>
                      <span className="mx-1.5">•</span>
                      <span>{position.duration}</span>
                      <span className="mx-1.5">•</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* GitHub Stats */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">GitHub</h2>
                <Github className="w-5 h-5 text-gray-400" />
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-black/70 rounded-lg border border-zinc-800">
                      <p className="text-xs text-gray-400">Repositories</p>
                      <p className="text-lg font-semibold text-white">{user.githubStats.repos}</p>
                    </div>
                    <div className="p-3 bg-black/70 rounded-lg border border-zinc-800">
                      <p className="text-xs text-gray-400">Stars</p>
                      <p className="text-lg font-semibold text-white">{user.githubStats.stars}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/70 rounded-lg border border-zinc-800">
                    <p className="text-xs text-gray-400">Contributions</p>
                    <p className="text-lg font-semibold text-white">{user.githubStats.contributions}</p>
                  </div>
                  
                  <div className="p-3 bg-black/70 rounded-lg border border-zinc-800">
                    <p className="text-xs text-gray-400">Top Languages</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.githubStats.topLanguages.map((lang, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-zinc-900 text-gray-300 rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Projects */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Projects</h2>
                <Terminal className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {user.projects.map((project, idx) => (
                  <a
                    key={idx}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-black/70 rounded-lg border border-zinc-800 hover:border-gray-600 transition-all duration-300"
                  >
                    <h3 className="font-medium text-white">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Achievements</h2>
                <Star className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {user.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-gray-500 mr-2"></div>
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card - Add this */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Certifications</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="space-y-3">
                {user.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3 bg-black/70 rounded-lg border border-zinc-800">
                    <h3 className="font-medium text-white">{cert.name}</h3>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">{cert.issuer}</span>
                      <span className="text-gray-500">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Expertise */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Tech Stack</h2>
                <Cpu className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Tailwind', 'GraphQL'].map((tech, idx) => (
                  <div key={idx} className="flex items-center justify-center p-2 bg-black/70 rounded-lg border border-zinc-800">
                    <span className="text-sm text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* LinkedIn Showcase */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg backdrop-blur-sm hover:shadow-zinc-900/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100">LinkedIn</h2>
                <Linkedin className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-black/70 rounded-lg border border-zinc-800">
                  <p className="text-sm text-gray-300">
                    Connect with me on LinkedIn to follow my professional journey and stay updated with my latest ventures.
                  </p>
                </div>
                <a
                  href={user.links.find(link => link.includes('linkedin')) || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  View LinkedIn Profile <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 text-white py-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">TAGO</div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} MyTago.tech | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

const CAPage = () => {
  return (
    <>
      <SplashScreen />
      <FounderBentoLinks />
    </>
  );
};

export default CAPage;
