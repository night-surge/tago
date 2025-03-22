import React from 'react';
import { Save, Smartphone, Monitor } from 'lucide-react';

interface EditorHeaderProps {
  cardOrientation: 'portrait' | 'landscape';
  toggleCardOrientation: () => void;
  onBack: () => void;
  onContinue: () => void;
  saveDesign: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  cardOrientation,
  toggleCardOrientation,
  onBack,
  onContinue,
  saveDesign
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
      <h1 className="text-xl font-bold md:block hidden">Card Customization</h1>
      <h1 className="text-lg font-bold md:hidden block">Card Editor</h1>
      <div className="flex space-x-2 md:space-x-3">
        {/* Orientation toggle button */}
        <button
          onClick={toggleCardOrientation}
          className="p-2 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-white transition-colors"
          title={`Switch to ${cardOrientation === 'portrait' ? 'landscape' : 'portrait'} mode`}
        >
          {cardOrientation === 'portrait' ? 
            <Smartphone className="w-5 h-5" /> : 
            <Monitor className="w-5 h-5" />
          }
        </button>
        
        <button
          onClick={onBack}
          className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg text-white transition-colors"
        >
          Back
        </button>
        <button
          id="save-button"
          onClick={saveDesign}
          className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg text-white flex items-center transition-colors md:flex hidden"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>
        <button
          onClick={onContinue}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
