import React from 'react';
import Image from 'next/image';
import { Edit, Check } from 'lucide-react';
import { FontType } from './CustomCardOrdering';

interface CardTextCustomizationProps {
  cardImage: string | null;
  customText: string;
  setCustomText: (text: string) => void;
  isEditingText: boolean;
  setIsEditingText: (isEditing: boolean) => void;
  textPosition: { x: number; y: number };
  setTextPosition: (position: { x: number; y: number }) => void;
  selectedFont: FontType;
  setSelectedFont: (font: FontType) => void;
  onBack: () => void;
  onContinue: () => void;
}

const CardTextCustomization: React.FC<CardTextCustomizationProps> = ({
  cardImage,
  customText,
  setCustomText,
  isEditingText,
  setIsEditingText,
  textPosition,
  setTextPosition,
  selectedFont,
  setSelectedFont,
  onBack,
  onContinue
}) => {
  // Font options
  const fontOptions = [
    { id: 'sans-serif' as FontType, name: 'Sans Serif', style: 'font-sans' },
    { id: 'serif' as FontType, name: 'Serif', style: 'font-serif' },
    { id: 'monospace' as FontType, name: 'Monospace', style: 'font-mono' }
  ];

  // Handle text position change
  const handleTextDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditingText) {
      const container = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - container.left) / container.width) * 100;
      const y = ((e.clientY - container.top) / container.height) * 100;
      
      setTextPosition({
        x: Math.min(Math.max(x, 0), 100),
        y: Math.min(Math.max(y, 0), 100)
      });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Your Text</h2>
      <div className="p-8 rounded-2xl bg-zinc-950 border border-white/10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-64 bg-zinc-900 rounded-lg overflow-hidden" onClick={handleTextDrag}>
              {cardImage && (
                <Image 
                  src={cardImage} 
                  alt="Card design" 
                  className="w-full h-full object-cover"
                  width={500}
                  height={300}
                />
              )}
              
              {customText && (
                <div 
                  className={`absolute pointer-events-none p-1 bg-white/10 backdrop-blur-sm rounded ${fontOptions.find(f => f.id === selectedFont)?.style}`}
                  style={{ 
                    left: `${textPosition.x}%`, 
                    top: `${textPosition.y}%`, 
                    transform: 'translate(-50%, -50%)' 
                  }}
                >
                  {customText}
                </div>
              )}
              
              {isEditingText && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm">
                  <p>Click anywhere to position text</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              {isEditingText ? 
                <button 
                  onClick={() => setIsEditingText(false)}
                  className="flex items-center text-white"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Done positioning
                </button> : 
                <button 
                  onClick={() => setIsEditingText(true)}
                  className="flex items-center text-gray-400 hover:text-white"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Click to position text
                </button>
              }
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <label className="block text-gray-300 mb-2">Custom Text</label>
            <textarea
              className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white resize-none h-32"
              placeholder="Enter text to display on your card..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
            
            <div className="mt-4">
              <label className="block text-gray-300 mb-2">Text Style</label>
              <div className="grid grid-cols-3 gap-2">
                {fontOptions.map(font => (
                  <button 
                    key={font.id}
                    onClick={() => setSelectedFont(font.id)}
                    className={`p-2 ${selectedFont === font.id ? 'bg-white/20' : 'bg-zinc-900'} border ${selectedFont === font.id ? 'border-white/30' : 'border-white/10'} rounded-lg text-sm ${font.style}`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-transparent border border-white/20 text-white hover:bg-white/5 transition-colors"
          >
            Back
          </button>
          
          <button 
            onClick={onContinue}
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default CardTextCustomization;