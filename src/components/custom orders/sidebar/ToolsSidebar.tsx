import React from 'react';
import { 
  MoveHorizontal, Type, Square, ImagePlus, ShrinkIcon 
} from 'lucide-react';

interface ToolsSidebarProps {
  isMobileView: boolean;
  sidebarVisible: 'tools' | 'controls' | 'none';
  activeTool: 'select' | 'text' | 'shape' | 'image';
  setSidebarVisible: (value: 'tools' | 'controls' | 'none') => void;
  setActiveTool: (tool: 'select' | 'text' | 'shape' | 'image') => void;
  setActiveShapeType: (type: 'rectangle' | 'circle' | 'triangle' | 'line' | 'star') => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToolsSidebar: React.FC<ToolsSidebarProps> = ({
  isMobileView,
  sidebarVisible,
  activeTool,
  setSidebarVisible,
  setActiveTool,
  setActiveShapeType,
  handleImageUpload
}) => {
  return (
    <div className={`lg:w-64 md:w-full bg-zinc-900 p-3 overflow-y-auto max-h-[300px] lg:max-h-none ${isMobileView && sidebarVisible !== 'tools' ? 'hidden' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium mb-3">Tools</h2>
        {isMobileView && (
          <button 
            onClick={() => setSidebarVisible('none')} 
            className="p-1 bg-zinc-800 rounded-md"
          >
            <ShrinkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Tool selection */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
          <button
            onClick={() => setActiveTool('select')}
            className={`p-3 ${activeTool === 'select' ? 'bg-white/20' : 'bg-zinc-800 hover:bg-zinc-700'} rounded-lg flex flex-col items-center justify-center transition-colors`}
          >
            <MoveHorizontal className="w-5 h-5 mb-1" />
            <span className="text-xs">Select</span>
          </button>
          
          <button
            onClick={() => setActiveTool('text')}
            className={`p-3 ${activeTool === 'text' ? 'bg-white/20' : 'bg-zinc-800 hover:bg-zinc-700'} rounded-lg flex flex-col items-center justify-center transition-colors`}
          >
            <Type className="w-5 h-5 mb-1" />
            <span className="text-xs">Text</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTool('shape');
              setActiveShapeType('rectangle');
            }}
            className={`p-3 ${activeTool === 'shape' ? 'bg-white/20' : 'bg-zinc-800 hover:bg-zinc-700'} rounded-lg flex flex-col items-center justify-center transition-colors`}
          >
            <Square className="w-5 h-5 mb-1" />
            <span className="text-xs">Shape</span>
          </button>
          
          <button
            onClick={() => document.getElementById('image-upload')?.click()}
            className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <ImagePlus className="w-5 h-5 mb-1" />
            <span className="text-xs">Image</span>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={handleImageUpload}
            />
          </button>
        </div>
        
        {/* Tool options could be added here in the future */}
      </div>
    </div>
  );
};

export default ToolsSidebar;
