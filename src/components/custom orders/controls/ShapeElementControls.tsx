import React from 'react';
import { ShapeElement } from '../types/CardElementTypes';
import { Square, Circle, Triangle, PenTool } from 'lucide-react';

interface ShapeElementControlsProps {
  shapeElement: ShapeElement;
  updateElement: <T extends Partial<ShapeElement>>(updates: T) => void;
  colorOptions: string[];
}

const ShapeElementControls: React.FC<ShapeElementControlsProps> = ({
  shapeElement,
  updateElement,
  colorOptions
}) => {
  return (
    <div className="space-y-4">
      {/* Shape type selector */}
      <div>
        <label className="block text-gray-300 mb-2">Shape Type</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => updateElement({ shapeType: 'rectangle' })}
            className={`p-2 ${shapeElement.shapeType === 'rectangle' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg flex items-center justify-center`}
            disabled={shapeElement.locked}
          >
            <Square className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => updateElement({ shapeType: 'circle' })}
            className={`p-2 ${shapeElement.shapeType === 'circle' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg flex items-center justify-center`}
            disabled={shapeElement.locked}
          >
            <Circle className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => updateElement({ shapeType: 'triangle' })}
            className={`p-2 ${shapeElement.shapeType === 'triangle' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg flex items-center justify-center`}
            disabled={shapeElement.locked}
          >
            <Triangle className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => updateElement({ shapeType: 'line' })}
            className={`p-2 ${shapeElement.shapeType === 'line' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg flex items-center justify-center`}
            disabled={shapeElement.locked}
          >
            <div className="w-5 h-0.5 bg-current" />
          </button>
          
          <button
            onClick={() => updateElement({ shapeType: 'star' })}
            className={`p-2 ${shapeElement.shapeType === 'star' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 rounded-lg flex items-center justify-center`}
            disabled={shapeElement.locked}
          >
            ★
          </button>
        </div>
      </div>
      
      {/* Fill color */}
      <div>
        <label className="block text-gray-300 mb-2">Fill Color</label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map(color => (
            <button 
              key={color}
              onClick={() => updateElement({ fillColor: color })}
              className={`w-8 h-8 rounded-full ${shapeElement.fillColor === color ? 'ring-2 ring-white' : ''}`}
              style={{ backgroundColor: color }}
              aria-label={`Fill color ${color}`}
              disabled={shapeElement.locked}
            />
          ))}
          
          {/* Custom color input */}
          <div className="relative w-8 h-8">
            <input
              type="color"
              value={shapeElement.fillColor}
              onChange={(e) => updateElement({ fillColor: e.target.value })}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={shapeElement.locked}
            />
            <div className="absolute inset-0 rounded-full bg-zinc-800 flex items-center justify-center">
              <PenTool className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Border settings */}
      <div>
        <label className="flex items-center text-gray-300 mb-2">
          <input
            type="checkbox"
            checked={!!shapeElement.borderColor}
            onChange={(e) => updateElement({ 
              borderColor: e.target.checked ? '#ffffff' : null 
            })}
            className="mr-2"
            disabled={shapeElement.locked}
          />
          Border
        </label>
        
        {shapeElement.borderColor && (
          <div className="space-y-3 mt-2">
            <div>
              <label className="text-xs text-gray-400">Border Width</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={shapeElement.borderWidth}
                  onChange={(e) => updateElement({ borderWidth: parseInt(e.target.value) })}
                  className="flex-1"
                  disabled={shapeElement.locked}
                />
                <div className="text-sm text-white">{shapeElement.borderWidth}px</div>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-400">Border Color</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {colorOptions.slice(0, 8).map(color => (
                  <button 
                    key={color}
                    onClick={() => updateElement({ borderColor: color })}
                    className={`w-6 h-6 rounded-md ${shapeElement.borderColor === color ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Border color ${color}`}
                    disabled={shapeElement.locked}
                  />
                ))}
                
                {/* Custom color input */}
                <div className="relative w-6 h-6">
                  <input
                    type="color"
                    value={shapeElement.borderColor || '#ffffff'}
                    onChange={(e) => updateElement({ borderColor: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={shapeElement.locked}
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
      
      {/* Opacity */}
      <div>
        <label className="block text-gray-300 mb-2">Opacity</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={shapeElement.opacity}
            onChange={(e) => updateElement({ opacity: parseFloat(e.target.value) })}
            className="flex-1"
            disabled={shapeElement.locked}
          />
          <div className="text-sm text-white">{Math.round(shapeElement.opacity * 100)}%</div>
        </div>
      </div>
      
      {/* Shape radius (for rectangle) */}
      {shapeElement.shapeType === 'rectangle' && (
        <div>
          <label className="block text-gray-300 mb-2">Corner Radius</label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="50"
              value={shapeElement.borderRadius}
              onChange={(e) => updateElement({ borderRadius: parseInt(e.target.value) })}
              className="flex-1"
              disabled={shapeElement.locked}
            />
            <div className="text-sm text-white">{shapeElement.borderRadius}px</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeElementControls;
