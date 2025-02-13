import React from 'react';
import dynamic from 'next/dynamic';

const Page = () => {
  // Assuming you get themeId from API (1-9)
  const themeId = 3; // Replace with your API value

  // Dynamic import based on themeId
  const themes = {
    1: dynamic(() => import('@/components/themes/one')),
    2: dynamic(() => import('@/components/themes/two')),
    3: dynamic(() => import('@/components/themes/three')),
    4: dynamic(() => import('@/components/themes/four')),
    5: dynamic(() => import('@/components/themes/five')),
    6: dynamic(() => import('@/components/themes/six')),
    7: dynamic(() => import('@/components/themes/seven')),
    8: dynamic(() => import('@/components/themes/eight')),
    9: dynamic(() => import('@/components/themes/nine'))
  };

  const CurrentTheme = themes[themeId];
  
  const user = {
    name: "Ayush Katare",
    tagline: "Full-stack developer & creative coder",
    links: [
      "https://github.com/sarahparker",
      "https://twitter.com/sarahcodes",
      "https://linkedin.com/in/sarahparker",
      "https://instagram.com/sarah.creates",
      "https://dev.to/sarahp"
    ],
    picture: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  return (
    <CurrentTheme user={user} />
  );
};

export default Page;