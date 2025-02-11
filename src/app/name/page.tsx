"use client"

import React from 'react';
import LightMode from '@/components/themes/two';
import PastelMode from '@/components/themes/three';
import CandyMode from '@/components/themes/one';

// Available themes map
const themes: { [key: string]: React.ComponentType } = {
  candy: CandyMode,
  pastel: PastelMode,
  light: LightMode
};//1,2,3


// Page component
const Page = () => {
  // Hard-coded theme selection - change this value to switch themes
  const selectedTheme: string = 'light'; 

  // Get the selected theme component
  const CurrentTheme = themes[selectedTheme];

  return (
    <CurrentTheme />
  );
};

export default Page;