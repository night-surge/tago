"use client"

import React from 'react';
import one from '@/components/themes/one';
import two from '@/components/themes/two';
import three from '@/components/themes/three';

const Page = () => {
  
  const CurrentTheme = one; 
  // call user
  const user = {
    name: "Ayush Katare",
    // interests: "ML Enthusiast | Coder | Swiftie",
    tagline: "Full-stack developer & creative coder",
    links: [
      "https://github.com/sarahparker",
      "https://twitter.com/sarahcodes",
      "https://linkedin.com/in/sarahparker",
      "https://instagram.com/sarah.creates",
      "https://dev.to/sarahp"
    ],
    picture:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  return (
    <CurrentTheme user = {user}/>
  );
};

export default Page;