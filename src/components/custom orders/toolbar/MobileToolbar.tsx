import React from 'react';
import { PenTool, Type, Square, ImagePlus, Palette, Save } from 'lucide-react';

interface MobileToolbarProps {
  activeTool: 'select' | 'text' | 'shape' | 'image';
  sidebarVisible: 'tools' | 'controls' | 'none';
  setSidebarVisible: (value: 'tools' | 'controls' | 'none') => void;
  setActiveTool: (tool: 'select' | 'text' | 'shape' | 'image') => void;
  setActiveShapeType: (type: 'rectangle' | 'circle' | 'triangle' | 'line' | 'star') => void;
  saveDesign: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MobileToolbar: React.FC<MobileToolbarProps> = ({
  activeTool,
  sidebarVisible,
  setSidebarVisible,
  setActiveTool,
  setActiveShapeType,
  saveDesign,
  handleImageUpload
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-white/10 p-2 flex justify-around z-10">
      <button
        onClick={() => setSidebarVisible(sidebarVisible === 'tools' ? 'none' : 'tools')}
        className={`p-2 ${sidebarVisible === 'tools' ? 'bg-white/20' : 'bg-zinc-800'} rounded-full`}
        title="Toggle Tools"
      >
        <PenTool className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          setActiveTool('text');
          setSidebarVisible('none');
        }}
        className={`p-2 ${activeTool === 'text' ? 'bg-white/20' : 'bg-zinc-800'} rounded-full`}
        title="Add Text"
      >
        <Type className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          setActiveTool('shape');
          setActiveShapeType('rectangle');
          setSidebarVisible('none');
        }}
        className={`p-2 ${activeTool === 'shape' ? 'bg-white/20' : 'bg-zinc-800'} rounded-full`}
        title="Add Shape"
      >
        <Square className="w-5 h-5" />
      </button>
      <button
        onClick={() => document.getElementById('image-upload-mobile')?.click()}
        className="p-2 bg-zinc-800 rounded-full"
        title="Add Image"
      >
        <ImagePlus className="w-5 h-5" />
        <input 
          id="image-upload-mobile"
          type="file" 
          accept="image/*" 
          className="hidden"
          onChange={handleImageUpload}
        />
      </button>
      <button
        onClick={() => setSidebarVisible(sidebarVisible === 'controls' ? 'none' : 'controls')}
        className={`p-2 ${sidebarVisible === 'controls' ? 'bg-white/20' : 'bg-zinc-800'} rounded-full`}
        title="Toggle Properties"
      >
        <Palette className="w-5 h-5" />
      </button>
      <button
        onClick={saveDesign}
        className="p-2 bg-zinc-800 rounded-full"
        title="Save Design"
      >
        <Save className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MobileToolbar;
