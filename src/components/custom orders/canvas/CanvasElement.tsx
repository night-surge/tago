import React from 'react';
import Image from 'next/image';
import { CardElement, TextElement, ShapeElement, ImageElement } from '../types/CardElementTypes';

interface CanvasElementProps {
  element: CardElement;
  isSelected: boolean;
  isMobileView: boolean;
  isDragging: boolean;
  selectedElementId: string | null;
  activeTextEditing: string | null;
  handleElementSelect: (id: string, e: React.MouseEvent) => void;
  handleDragStart: (e: React.MouseEvent) => void;
  handleResizeStart: (direction: string, e: React.MouseEvent) => void;
  handleTouchStart: (id: string, e: React.TouchEvent) => void;
  finishTextEditing: () => void;
  updateElement: <T extends Partial<CardElement>>(updates: T) => void;
}

const CanvasElement: React.FC<CanvasElementProps> = ({
  element,
  isSelected,
  isMobileView,
  isDragging,
  selectedElementId,
  activeTextEditing,
  handleElementSelect,
  handleDragStart,
  handleResizeStart,
  handleTouchStart,
  finishTextEditing,
  updateElement
}) => {
  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    left: `${element.position.x}%`,
    top: `${element.position.y}%`,
    width: `${element.size.width}px`,
    height: `${element.size.height}px`,
    transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
    zIndex: element.zIndex,
    opacity: element.opacity,
    cursor: element.locked ? 'not-allowed' : isDragging && selectedElementId === element.id ? 'grabbing' : 'grab',
    boxSizing: 'border-box',
    touchAction: 'none',
  };
  
  // Selection border
  const selectionStyle: React.CSSProperties = isSelected ? {
    outline: '2px solid #ffffff',
    outlineOffset: '2px'
  } : {};

  // Render resize handles if element is selected
  const renderResizeHandles = () => {
    if (!isSelected || element.locked) return null;
    
    return (
      <div className="resize-handles">
        {['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'].map(direction => (
          <div
            key={direction}
            className={`resize-handle resize-${direction}`}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '50%',
              ...(direction.includes('n') ? { top: '-5px' } : {}),
              ...(direction.includes('s') ? { bottom: '-5px' } : {}),
              ...(direction.includes('e') ? { right: '-5px' } : {}),
              ...(direction.includes('w') ? { left: '-5px' } : {}),
              ...(direction === 'n' || direction === 's' ? { left: '50%', transform: 'translateX(-50%)' } : {}),
              ...(direction === 'e' || direction === 'w' ? { top: '50%', transform: 'translateY(-50%)' } : {}),
              ...(direction === 'ne' ? { transform: 'translate(50%, -50%)' } : {}),
              ...(direction === 'nw' ? { transform: 'translate(-50%, -50%)' } : {}),
              ...(direction === 'se' ? { transform: 'translate(50%, 50%)' } : {}),
              ...(direction === 'sw' ? { transform: 'translate(-50%, 50%)' } : {}),
              cursor: `${direction}-resize`,
              zIndex: 999,
              ...(isMobileView ? { width: '14px', height: '14px' } : {})
            }}
            onMouseDown={(e) => handleResizeStart(direction, e)}
            onTouchStart={(e) => {
              e.stopPropagation();
              // For mobile resize handling
              if (typeof handleResizeStart === 'function') {
                handleResizeStart(direction, e as any);
              }
            }}
          />
        ))}
      </div>
    );
  };
  
  switch (element.type) {
    case 'text': {
      const textElement = element as TextElement;
      const isEditing = activeTextEditing === element.id;
      
      const textStyles: React.CSSProperties = {
        ...commonStyles,
        ...(isSelected && isEditing ? selectionStyle : {}),
        fontFamily: textElement.fontFamily,
        fontSize: `${textElement.fontSize}px`,
        color: textElement.color,
        backgroundColor: isEditing ? (textElement.backgroundColor || 'rgba(0,0,0,0.3)') : textElement.backgroundColor || 'transparent',
        border: textElement.borderColor ? 
              `${textElement.borderWidth}px solid ${textElement.borderColor}` : 'none',
        borderRadius: `${textElement.borderRadius}px`,
        textAlign: textElement.textAlign,
        lineHeight: textElement.lineHeight,
        letterSpacing: `${textElement.letterSpacing}px`,
        fontWeight: textElement.fontWeight,
        fontStyle: textElement.fontStyle,
        textDecoration: textElement.textDecoration,
        padding: isEditing ? '4px' : '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: textElement.textAlign === 'center' ? 'center' : 
                        textElement.textAlign === 'right' ? 'flex-end' : 'flex-start',
        boxShadow: textElement.shadow.enabled ? 
                  `${textElement.shadow.x}px ${textElement.shadow.y}px ${textElement.shadow.blur}px ${textElement.shadow.color}` : 'none',
        wordBreak: 'break-word',
        overflow: 'hidden',
        pointerEvents: 'auto',
        userSelect: isEditing ? 'text' : 'none',
        transition: 'background-color 0.2s, border 0.2s'
      };
      
      return (
        <div
          key={element.id}
          style={textStyles}
          onClick={(e) => handleElementSelect(element.id, e)}
          onTouchStart={(e) => handleTouchStart(element.id, e)}
          onMouseDown={isEditing ? undefined : handleDragStart}
          onBlur={finishTextEditing}
          className={isEditing ? 'text-editing' : ''}
        >
          {isEditing ? (
            <textarea
              value={textElement.text}
              onChange={(e) => updateElement({ text: e.target.value })}
              autoFocus
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'transparent',
                color: 'inherit',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                textAlign: textElement.textAlign,
                resize: 'none',
                outline: 'none'
              }}
              className="text-input"
              onBlur={finishTextEditing}
            />
          ) : (
            textElement.text
          )}
          
          {renderResizeHandles()}
        </div>
      );
    }
    
    case 'shape': {
      const shapeElement = element as ShapeElement;
      const shapeStyles: React.CSSProperties = {
        ...commonStyles,
        ...selectionStyle,
        backgroundColor: shapeElement.shapeType !== 'line' ? shapeElement.fillColor : 'transparent',
        border: shapeElement.borderColor ? `${shapeElement.borderWidth}px solid ${shapeElement.borderColor}` : 'none',
        borderRadius: shapeElement.shapeType === 'circle' ? '50%' : `${shapeElement.borderRadius}px`
      };
      
      // Special handling for different shape types
      let shapeContent = null;
      if (shapeElement.shapeType === 'triangle') {
        shapeContent = (
          <div style={{
            width: '100%',
            height: '100%',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: shapeElement.fillColor
          }} />
        );
      } else if (shapeElement.shapeType === 'star') {
        shapeContent = (
          <div style={{
            width: '100%',
            height: '100%',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            backgroundColor: shapeElement.fillColor
          }} />
        );
      } else if (shapeElement.shapeType === 'line') {
        shapeStyles.height = `${shapeElement.borderWidth}px`;
        shapeStyles.backgroundColor = shapeElement.borderColor || 'black';
        shapeStyles.transform = `translate(-50%, -50%) rotate(${shapeElement.rotation}deg)`;
      }
      
      return (
        <div
          key={element.id}
          style={shapeStyles}
          onClick={(e) => handleElementSelect(element.id, e)}
          onTouchStart={(e) => handleTouchStart(element.id, e)}
          onMouseDown={handleDragStart}
        >
          {shapeContent}
          {renderResizeHandles()}
        </div>
      );
    }
    
    case 'image': {
      const imageElement = element as ImageElement;
      const imageStyles: React.CSSProperties = {
        ...commonStyles,
        ...selectionStyle,
        border: imageElement.borderColor ? `${imageElement.borderWidth}px solid ${imageElement.borderColor}` : 'none',
        borderRadius: `${imageElement.borderRadius}px`,
        overflow: 'hidden'
      };
      
      return (
        <div
          key={element.id}
          style={imageStyles}
          onClick={(e) => handleElementSelect(element.id, e)}
          onTouchStart={(e) => handleTouchStart(element.id, e)}
          onMouseDown={handleDragStart}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image 
              src={imageElement.src} 
              alt={imageElement.alt}
              fill
              style={{ objectFit: imageElement.scaleType }}
            />
          </div>
          {renderResizeHandles()}
        </div>
      );
    }
    
    default:
      return null;
  }
};

export default CanvasElement;
