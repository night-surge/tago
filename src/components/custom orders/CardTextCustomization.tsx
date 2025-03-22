import React, { useState, useEffect } from 'react';
import { useCanvasEditor } from './hooks/useCanvasEditor';
import { CardElement} from './types/CardElementTypes';
import EditorHeader from './header/EditorHeader';
import ToolsSidebar from './sidebar/ToolsSidebar';
import ElementControlsSidebar from './sidebar/ElementControlsSidebar';
import EditorCanvas from './canvas/EditorCanvas';
import MobileToolbar from './toolbar/MobileToolbar';

interface CardTextCustomizationProps {
  cardImage: string | null;
  onBack: () => void;
  onContinue: () => void;
}

const CardTextCustomization: React.FC<CardTextCustomizationProps> = ({
  cardImage,
  onBack,
  onContinue
}) => {
  // Default initial elements
  const initialElements: CardElement[] = [
    {
      id: 'text-1',
      type: 'text',
      text: 'Your Name',
      fontFamily: 'Inter',
      fontSize: 22,
      color: '#ffffff',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 40 },
      rotation: 0,
      zIndex: 10,
      backgroundColor: null,
      borderColor: null,
      borderWidth: 0,
      borderRadius: 0,
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 'bold',
      fontStyle: 'normal',
      textDecoration: 'none',
      opacity: 1,
      locked: false,
      shadow: {
        enabled: false,
        color: 'rgba(0,0,0,0.5)',
        blur: 4,
        x: 2,
        y: 2
      }
    }
  ];
  
  // Mobile view state
  const [isMobileView, setIsMobileView] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState<'tools' | 'controls' | 'none'>('none');
  
  // Font options
  const fontOptions = [
    { id: 'Inter', name: 'Inter', style: 'font-sans' },
    { id: 'Georgia', name: 'Georgia', style: 'font-serif' },
    { id: 'Consolas', name: 'Consolas', style: 'font-mono' },
    { id: 'Roboto', name: 'Roboto', style: 'font-sans' },
    { id: 'Playfair', name: 'Playfair', style: 'font-serif' },
    { id: 'Poppins', name: 'Poppins', style: 'font-sans' },
    { id: 'Montserrat', name: 'Montserrat', style: 'font-sans' },
    { id: 'OpenSans', name: 'Open Sans', style: 'font-sans' },
    { id: 'Merriweather', name: 'Merriweather', style: 'font-serif' },
    { id: 'Lato', name: 'Lato', style: 'font-sans' },
    { id: 'Oswald', name: 'Oswald', style: 'font-sans' },
    { id: 'Raleway', name: 'Raleway', style: 'font-sans' },
    { id: 'FiraCode', name: 'Fira Code', style: 'font-mono' },
    { id: 'CourierNew', name: 'Courier New', style: 'font-mono' },
    { id: 'TimesNewRoman', name: 'Times New Roman', style: 'font-serif' },
    { id: 'Arial', name: 'Arial', style: 'font-sans' }
  ];
  
  // Color options
  const colorOptions = [
    '#ffffff', '#000000', '#f43f5e', '#3b82f6', 
    '#22c55e', '#eab308', '#8b5cf6', '#ec4899',
    '#06b6d4', '#10b981', '#6366f1', '#f97316',
    '#e11d48', '#0ea5e9', '#f59e0b', '#d946ef'
  ];
  
  // Initialize canvas editor with all the logic
  const editor = useCanvasEditor(initialElements);
  
  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Listen for custom events from other components
  useEffect(() => {
    const handleToggleGrid = () => {
      editor.setShowGrid(!editor.showGrid);
    };
    
    const handleToggleSnap = () => {
      editor.setSnapToGrid(!editor.snapToGrid);
    };
    
    const handleExportImage = () => {
      alert('Export functionality would be implemented here');
    };
    
    window.addEventListener('toggle-grid', handleToggleGrid);
    window.addEventListener('toggle-snap', handleToggleSnap);
    window.addEventListener('export-image', handleExportImage);
    
    return () => {
      window.removeEventListener('toggle-grid', handleToggleGrid);
      window.removeEventListener('toggle-snap', handleToggleSnap);
      window.removeEventListener('export-image', handleExportImage);
    };
  }, [editor]);
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Header */}
      <EditorHeader
        cardOrientation={editor.cardOrientation}
        toggleCardOrientation={editor.toggleCardOrientation}
        onBack={onBack}
        onContinue={onContinue}
        saveDesign={editor.saveDesign}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left sidebar - tools */}
        <ToolsSidebar
          isMobileView={isMobileView}
          sidebarVisible={sidebarVisible}
          activeTool={editor.activeTool}
          setSidebarVisible={setSidebarVisible}
          setActiveTool={editor.setActiveTool}
          setActiveShapeType={editor.setActiveShapeType}
          handleImageUpload={editor.handleImageUpload}
        />
        
        {/* Center - canvas */}
        <EditorCanvas
          canvasRef={editor.canvasRef}
          elements={editor.elements}
          selectedElementId={editor.selectedElementId}
          activeTool={editor.activeTool}
          cardImage={cardImage}
          cardOrientation={editor.cardOrientation}
          showGrid={editor.showGrid}
          gridSize={editor.gridSize}
          isMobileView={isMobileView}
          isDragging={editor.isDragging}
          isResizing={editor.isResizing}
          activeTextEditing={editor.activeTextEditing}
          handleCanvasClick={editor.handleCanvasClick}
          handleElementSelect={editor.handleElementSelect}
          handleDragStart={editor.handleDragStart}
          handleDrag={editor.handleDrag}
          handleResizeStart={editor.handleResizeStart}
          handleResize={editor.handleResize}
          handleDragEnd={editor.handleDragEnd}
          handleTouchStart={editor.handleTouchStart}
          handleTouchMove={editor.handleTouchMove}
          handleTouchEnd={editor.handleTouchEnd}
          finishTextEditing={editor.finishTextEditing}
          updateElement={editor.updateElement}
        />
        
        {/* Right sidebar - element controls */}
        <ElementControlsSidebar
          isMobileView={isMobileView}
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          selectedElement={editor.selectedElement}
          updateElement={editor.updateElement}
          fontOptions={fontOptions}
          colorOptions={colorOptions}
          handleImageUpload={editor.handleImageUpload}
        />
      </div>

      {/* Mobile toolbar */}
      <MobileToolbar
        activeTool={editor.activeTool}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setActiveTool={editor.setActiveTool}
        setActiveShapeType={editor.setActiveShapeType}
        saveDesign={editor.saveDesign}
        handleImageUpload={editor.handleImageUpload}
      />
      
      {/* Global styles for better mobile experience */}
      <style jsx global>{`
        .text-editing {
          z-index: 1000;
        }
        
        .text-input {
          caret-color: white;
        }
        
        @media (max-width: 768px) {
          .resize-handle {
            width: 14px !important;
            height: 14px !important;
          }
        }
        
        /* Prevent scroll when editing */
        body.editing-element {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CardTextCustomization;