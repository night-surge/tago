import React from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "David Park",
      role: "Marketing Director",
      content: "Tago has simplified our networking process. One tap and our entire team's contact info is shared professionally.",
      image: "https://avatar.iran.liara.run/username?username=David+Park"
    },
    {
      name: "Emma Watson",
      role: "Tech Entrepreneur",
      content: "The premium feel of Tago cards perfectly matches our brand image. The seamless sharing experience is incredible.",
      image: "https://avatar.iran.liara.run/username?username=Emma+Watson"
    }
  ];

  return (
    <div className="py-20 px-4 bg-zinc-900/20 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/api/placeholder/20/20')] bg-repeat opacity-5"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-zinc-800 text-white mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Join thousands of professionals who&apos;ve transformed their networking with Tago
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:scale-105 transition-transform duration-300"
            >
              <p className="text-zinc-300 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative overflow-hidden rounded-full">
                  <Image 
                    src={testimonial.image}
                    alt={`${testimonial.name}'s avatar`}
                    width={48}
                    height={48}
                    style={{ width: '100%', height: 'auto' }}
                    unoptimized
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-zinc-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider"></div>
        <div className="h-12 w-full bg-gradient-to-b from-zinc-900/20 to-black"></div>
      </div>
    </div>
  );
};

export default TestimonialsSection;