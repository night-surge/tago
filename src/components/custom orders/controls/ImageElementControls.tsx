import React from 'react';
import { ImageElement } from '../types/CardElementTypes';
import { Upload, PenTool } from 'lucide-react';

interface ImageElementControlsProps {
  imageElement: ImageElement;
  updateElement: <T extends Partial<ImageElement>>(updates: T) => void;
  colorOptions: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, replaceId?: string) => void;
}

const ImageElementControls: React.FC<ImageElementControlsProps> = ({
  imageElement,
  updateElement,
  colorOptions,
  handleImageUpload
}) => {
  return (
    <div className="space-y-4">
      {/* Image scaling options */}
      <div>
        <label className="block text-gray-300 mb-2">Scaling</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => updateElement({ scaleType: 'cover' })}
            className={`p-2 ${imageElement.scaleType === 'cover' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg text-sm text-center`}
            disabled={imageElement.locked}
          >
            Cover
          </button>
          
          <button
            onClick={() => updateElement({ scaleType: 'contain' })}
            className={`p-2 ${imageElement.scaleType === 'contain' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg text-sm text-center`}
            disabled={imageElement.locked}
          >
            Contain
          </button>
          
          <button
            onClick={() => updateElement({ scaleType: 'fill' })}
            className={`p-2 ${imageElement.scaleType === 'fill' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg text-sm text-center`}
            disabled={imageElement.locked}
          >
            Fill
          </button>
        </div>
      </div>
      
      {/* Border settings */}
      <div>
        <label className="flex items-center text-gray-300 mb-2">
          <input
            type="checkbox"
            checked={!!imageElement.borderColor}
            onChange={(e) => updateElement({ 
              borderColor: e.target.checked ? '#ffffff' : null 
            })}
            className="mr-2"
            disabled={imageElement.locked}
          />
          Border
        </label>
        
        {imageElement.borderColor && (
          <div className="space-y-3 mt-2">
            <div>
              <label className="text-xs text-gray-400">Border Width</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={imageElement.borderWidth}
                  onChange={(e) => updateElement({ borderWidth: parseInt(e.target.value) })}
                  className="flex-1"
                  disabled={imageElement.locked}
                />
                <div className="text-sm text-white">{imageElement.borderWidth}px</div>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-400">Border Color</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {colorOptions.slice(0, 8).map(color => (
                  <button 
                    key={color}
                    onClick={() => updateElement({ borderColor: color })}
                    className={`w-6 h-6 rounded-md ${imageElement.borderColor === color ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Border color ${color}`}
                    disabled={imageElement.locked}
                  />
                ))}
                
                <div className="relative w-6 h-6">
                  <input
                    type="color"
                    value={imageElement.borderColor || '#ffffff'}
                    onChange={(e) => updateElement({ borderColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={imageElement.locked}
                  />
                  <div className="absolute inset-0 rounded-md bg-zinc-800 flex items-center justify-center">
                    <PenTool className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Border radius */}
      <div>
        <label className="block text-gray-300 mb-2">Border Radius</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="50"
            value={imageElement.borderRadius}
            onChange={(e) => updateElement({ borderRadius: parseInt(e.target.value) })}
            className="flex-1"
            disabled={imageElement.locked}
          />
          <div className="text-sm text-white">{imageElement.borderRadius}px</div>
        </div>
      </div>
      
      {/* Opacity */}
      <div>
        <label className="block text-gray-300 mb-2">Opacity</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={imageElement.opacity}
            onChange={(e) => updateElement({ opacity: parseFloat(e.target.value) })}
            className="flex-1"
            disabled={imageElement.locked}
          />
          <div className="text-sm text-white">{Math.round(imageElement.opacity * 100)}%</div>
        </div>
      </div>
      
      {/* Replace image button */}
      <div>
        <button
          onClick={() => document.getElementById('image-upload-replace')?.click()}
          className="w-full p-2 bg-zinc-900 border border-white/10 rounded-lg text-white flex items-center justify-center"
          disabled={imageElement.locked}
        >
          <Upload className="w-4 h-4 mr-2" />
          Replace Image
        </button>
        <input 
          id="image-upload-replace"
          type="file" 
          accept="image/*" 
          className="hidden"
          onChange={handleImageUpload}
          disabled={imageElement.locked}
        />
      </div>
    </div>
  );
};

export default ImageElementControls;
