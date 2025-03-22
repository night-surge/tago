import React, { RefObject } from 'react';
import { CardElement } from '../types/CardElementTypes';
import CanvasElement from './CanvasElement';

interface EditorCanvasProps {
  canvasRef: RefObject<HTMLDivElement>;
  elements: CardElement[];
  selectedElementId: string | null;
  activeTool: 'select' | 'text' | 'shape' | 'image';
  cardImage: string | null;
  cardOrientation: 'portrait' | 'landscape';
  showGrid: boolean;
  gridSize: number;
  isMobileView: boolean;
  isDragging: boolean;
  isResizing: boolean;
  activeTextEditing: string | null;
  handleCanvasClick: () => void;
  handleElementSelect: (id: string, e: React.MouseEvent) => void;
  handleDragStart: (e: React.MouseEvent) => void;
  handleDrag: (e: React.MouseEvent) => void;
  handleResizeStart: (direction: string, e: React.MouseEvent) => void;
  handleResize: (e: React.MouseEvent) => void;
  handleDragEnd: () => void;
  handleTouchStart: (id: string, e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  finishTextEditing: () => void;
  updateElement: <T extends Partial<CardElement>>(updates: T) => void;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  canvasRef,
  elements,
  selectedElementId,
  activeTool,
  cardImage,
  cardOrientation,
  showGrid,
  gridSize,
  isMobileView,
  isDragging,
  isResizing,
  activeTextEditing,
  handleCanvasClick,
  handleElementSelect,
  handleDragStart,
  handleDrag,
  handleResizeStart,
  handleResize,
  handleDragEnd,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  finishTextEditing,
  updateElement
}) => {
  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-3 bg-zinc-900 border-b border-white/10">
        <h2 className="text-lg font-medium">Canvas</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-grid'))}
            className={`p-2 ${showGrid ? 'bg-white/20' : 'bg-zinc-800 hover:bg-zinc-700'} rounded-lg text-sm transition-colors`}
          >
            Grid
          </button>
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-snap'))}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors"
          >
            Snap
          </button>
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('export-image'))}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm flex items-center transition-colors shadow-xl"
          >
            Export
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-zinc-950 p-4 overflow-auto flex items-center justify-center">
        <div 
          className={`relative ${
            cardOrientation === 'portrait' 
              ? 'h-[90vh] lg:h-[80vh] md:h-[70vh] sm:h-[60vh] aspect-[9/16]' 
              : 'h-[60vh] lg:h-[50vh] md:h-[40vh] sm:h-[35vh] aspect-[16/9]'
          } bg-gradient-to-b from-black to-zinc-900 rounded-lg overflow-hidden shadow-xl`}
          style={cardImage ? { backgroundImage: `url(${cardImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={(e) => {
            if (isDragging) handleDrag(e);
            if (isResizing) handleResize(e);
          }}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Show grid if enabled */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
                backgroundSize: `${gridSize}px ${gridSize}px`
              }} />
            </div>
          )}
          
          {/* Render all elements */}
          {elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
              isMobileView={isMobileView}
              isDragging={isDragging}
              selectedElementId={selectedElementId}
              activeTextEditing={activeTextEditing}
              handleElementSelect={handleElementSelect}
              handleDragStart={handleDragStart}
              handleResizeStart={handleResizeStart}
              handleTouchStart={handleTouchStart}
              finishTextEditing={finishTextEditing}
              updateElement={updateElement}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
