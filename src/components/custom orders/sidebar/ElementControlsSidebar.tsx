import React from 'react';
import { ShrinkIcon } from 'lucide-react';
import { CardElement, TextElement, ShapeElement, ImageElement } from '../types/CardElementTypes';
import TextElementControls from '../controls/TextElementControls';
import ShapeElementControls from '../controls/ShapeElementControls';
import ImageElementControls from '../controls/ImageElementControls';

interface ElementControlsSidebarProps {
  isMobileView: boolean;
  sidebarVisible: 'tools' | 'controls' | 'none';
  setSidebarVisible: (value: 'tools' | 'controls' | 'none') => void;
  selectedElement: CardElement | null;
  updateElement: <T extends Partial<CardElement>>(updates: T) => void;
  fontOptions: Array<{ id: string; name: string; style: string }>;
  colorOptions: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, replaceId?: string) => void;
}

const ElementControlsSidebar: React.FC<ElementControlsSidebarProps> = ({
  isMobileView,
  sidebarVisible,
  setSidebarVisible,
  selectedElement,
  updateElement,
  fontOptions,
  colorOptions,
  handleImageUpload
}) => {
  const renderElementControls = () => {
    if (!selectedElement) return (
      <div className="p-4 text-center text-gray-400">
        No element selected. Click on an element to edit its properties.
      </div>
    );
    
    switch (selectedElement.type) {
      case 'text':
        return (
          <TextElementControls
            textElement={selectedElement as TextElement}
            updateElement={updateElement}
            fontOptions={fontOptions}
            colorOptions={colorOptions}
          />
        );
      
      case 'shape':
        return (
          <ShapeElementControls
            shapeElement={selectedElement as ShapeElement}
            updateElement={updateElement}
            colorOptions={colorOptions}
          />
        );
      
      case 'image':
        return (
          <ImageElementControls
            imageElement={selectedElement as ImageElement}
            updateElement={updateElement}
            colorOptions={colorOptions}
            handleImageUpload={handleImageUpload}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className={`lg:w-80 md:w-full bg-zinc-900 p-3 overflow-y-auto max-h-[300px] lg:max-h-none ${isMobileView && sidebarVisible !== 'controls' ? 'hidden' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium mb-3">Element Controls</h2>
        {isMobileView && (
          <button 
            onClick={() => setSidebarVisible('none')} 
            className="p-1 bg-zinc-800 rounded-md"
          >
            <ShrinkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="space-y-1">
        {renderElementControls()}
      </div>
    </div>
  );
};

export default ElementControlsSidebar;
