import React from 'react';
import { TextElement } from '../types/CardElementTypes';
import { 
  Bold, Italic, Underline, Plus, Minus, 
  AlignLeft, AlignCenter, AlignRight, PenTool 
} from 'lucide-react';

interface TextElementControlsProps {
  textElement: TextElement;
  updateElement: <T extends Partial<TextElement>>(updates: T) => void;
  fontOptions: Array<{ id: string; name: string; style: string }>;
  colorOptions: string[];
}

const TextElementControls: React.FC<TextElementControlsProps> = ({
  textElement,
  updateElement,
  fontOptions,
  colorOptions
}) => {
  return (
    <div className="space-y-4">
      {/* Text content */}
      <div>
        <label className="block text-gray-300 mb-2">Text Content</label>
        <textarea
          className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white resize-none h-24"
          placeholder="Enter text to display on your card..."
          value={textElement.text}
          onChange={(e) => updateElement({ text: e.target.value })}
          disabled={textElement.locked}
        />
      </div>
      
      {/* Font family selection */}
      <div>
        <label className="block text-gray-300 mb-2">Font Family</label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {fontOptions.map(font => (
            <button 
              key={font.id}
              onClick={() => updateElement({ fontFamily: font.id })}
              className={`p-2 ${textElement.fontFamily === font.id ? 'bg-white/20' : 'bg-zinc-900'} border ${textElement.fontFamily === font.id ? 'border-white/30' : 'border-white/10'} rounded-lg text-sm ${font.style} truncate`}
              disabled={textElement.locked}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Font size and style */}
      <div>
        <label className="block text-gray-300 mb-2">Font Size & Style</label>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateElement({ fontSize: Math.max(8, textElement.fontSize - 2) })}
              className="p-1 rounded-lg bg-zinc-900 border border-white/10 text-white"
              disabled={textElement.fontSize <= 8 || textElement.locked}
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <div className="px-3 py-1 bg-zinc-900 rounded-lg text-white">
              {textElement.fontSize}px
            </div>
            
            <button
              onClick={() => updateElement({ fontSize: Math.min(72, textElement.fontSize + 2) })}
              className="p-1 rounded-lg bg-zinc-900 border border-white/10 text-white"
              disabled={textElement.fontSize >= 72 || textElement.locked}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => updateElement({ 
              fontWeight: textElement.fontWeight === 'bold' ? 'normal' : 'bold' 
            })}
            className={`p-2 rounded-lg ${textElement.fontWeight === 'bold' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 text-white`}
            disabled={textElement.locked}
          >
            <Bold className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => updateElement({ 
              fontStyle: textElement.fontStyle === 'italic' ? 'normal' : 'italic' 
            })}
            className={`p-2 rounded-lg ${textElement.fontStyle === 'italic' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 text-white`}
            disabled={textElement.locked}
          >
            <Italic className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => updateElement({ 
              textDecoration: textElement.textDecoration === 'underline' ? 'none' : 'underline' 
            })}
            className={`p-2 rounded-lg ${textElement.textDecoration === 'underline' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 text-white`}
            disabled={textElement.locked}
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Text alignment */}
      <div>
        <label className="block text-gray-300 mb-2">Text Alignment</label>
        <div className="flex space-x-2">
          <button
            onClick={() => updateElement({ textAlign: 'left' })}
            className={`p-2 rounded-lg ${textElement.textAlign === 'left' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 text-white`}
            disabled={textElement.locked}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => updateElement({ textAlign: 'center' })}
            className={`p-2 rounded-lg ${textElement.textAlign === 'center' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 text-white`}
            disabled={textElement.locked}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => updateElement({ textAlign: 'right' })}
            className={`p-2 rounded-lg ${textElement.textAlign === 'right' ? 'bg-white/20' : 'bg-zinc-900'} border border-white/10 text-white`}
            disabled={textElement.locked}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Advanced text options */}
      <div>
        <label className="block text-gray-300 mb-2">Advanced Text Options</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400">Line Height</label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={textElement.lineHeight}
              onChange={(e) => updateElement({ lineHeight: parseFloat(e.target.value) })}
              className="w-full"
              disabled={textElement.locked}
            />
            <div className="text-xs text-gray-400 text-right">{textElement.lineHeight.toFixed(1)}</div>
          </div>
          
          <div>
            <label className="text-xs text-gray-400">Letter Spacing</label>
            <input
              type="range"
              min="-2"
              max="10"
              step="0.5"
              value={textElement.letterSpacing}
              onChange={(e) => updateElement({ letterSpacing: parseFloat(e.target.value) })}
              className="w-full"
              disabled={textElement.locked}
            />
            <div className="text-xs text-gray-400 text-right">{textElement.letterSpacing}px</div>
          </div>
        </div>
      </div>
      
      {/* Text background */}
      <div>
        <label className="flex items-center text-gray-300 mb-2">
          <input
            type="checkbox"
            checked={!!textElement.backgroundColor}
            onChange={(e) => updateElement({ 
              backgroundColor: e.target.checked ? '#ffffff' : null 
            })}
            className="mr-2"
            disabled={textElement.locked}
          />
          Text Background
        </label>
        
        {textElement.backgroundColor && (
          <div className="flex flex-wrap gap-2 mt-2">
            {colorOptions.map(color => (
              <button 
                key={color}
                onClick={() => updateElement({ backgroundColor: color })}
                className={`w-6 h-6 rounded-md ${textElement.backgroundColor === color ? 'ring-2 ring-white' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={`Background color ${color}`}
                disabled={textElement.locked}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Text shadow */}
      <div>
        <label className="flex items-center text-gray-300 mb-2">
          <input
            type="checkbox"
            checked={textElement.shadow.enabled}
            onChange={(e) => {
              const shadow = { ...textElement.shadow, enabled: e.target.checked };
              updateElement({ shadow });
            }}
            className="mr-2"
            disabled={textElement.locked}
          />
          Text Shadow
        </label>
        
        {textElement.shadow.enabled && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="text-xs text-gray-400">Blur</label>
              <input
                type="range"
                min="0"
                max="20"
                value={textElement.shadow.blur}
                onChange={(e) => {
                  const shadow = { ...textElement.shadow, blur: parseInt(e.target.value) };
                  updateElement({ shadow });
                }}
                className="w-full"
                disabled={textElement.locked}
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-400">Offset</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="-20"
                  max="20"
                  value={textElement.shadow.x}
                  onChange={(e) => {
                    const shadow = { ...textElement.shadow, x: parseInt(e.target.value) };
                    updateElement({ shadow });
                  }}
                  className="w-full p-1 bg-zinc-900 border border-white/10 rounded-lg text-white text-xs"
                  disabled={textElement.locked}
                />
                <input
                  type="number"
                  min="-20"
                  max="20"
                  value={textElement.shadow.y}
                  onChange={(e) => {
                    const shadow = { ...textElement.shadow, y: parseInt(e.target.value) };
                    updateElement({ shadow });
                  }}
                  className="w-full p-1 bg-zinc-900 border border-white/10 rounded-lg text-white text-xs"
                  disabled={textElement.locked}
                />
              </div>
            </div>
            
            <div className="col-span-2">
              <label className="text-xs text-gray-400">Shadow Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={textElement.shadow.color}
                  onChange={(e) => {
                    const shadow = { ...textElement.shadow, color: e.target.value };
                    updateElement({ shadow });
                  }}
                  className="w-12 h-8 bg-transparent border-none"
                  disabled={textElement.locked}
                />
                <input
                  type="text"
                  value={textElement.shadow.color}
                  onChange={(e) => {
                    const shadow = { ...textElement.shadow, color: e.target.value };
                    updateElement({ shadow });
                  }}
                  className="flex-1 p-1 bg-zinc-900 border border-white/10 rounded-lg text-white text-xs"
                  disabled={textElement.locked}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextElementControls;
