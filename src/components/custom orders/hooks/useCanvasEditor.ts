import { useState, useRef, useEffect, useCallback } from 'react';
import { CardElement, TextElement, ShapeElement, ImageElement } from '../types/CardElementTypes';

export const useCanvasEditor = (initialElements: CardElement[] = []) => {
  // Canvas ref for measuring
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // State for all elements
  const [elements, setElements] = useState<CardElement[]>(initialElements);
  
  // Currently selected element
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    initialElements.length > 0 ? initialElements[0].id : null
  );
  
  // Active tool states
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'shape' | 'image'>('select');
  const [activeShapeType, setActiveShapeType] = useState<'rectangle' | 'circle' | 'triangle' | 'line' | 'star'>('rectangle');
  
  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  
  // History states for undo/redo
  const [history, setHistory] = useState<CardElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Grid and alignment settings
  const [showGrid, setShowGrid] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [gridSize, setGridSize] = useState(10);
  
  // Text editing state
  const [activeTextEditing, setActiveTextEditing] = useState<string | null>(null);
  
  // Card orientation state
  const [cardOrientation, setCardOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  // Get currently selected element
  const selectedElement = elements.find(el => el.id === selectedElementId) || null;
  
  // Initialize history
  useEffect(() => {
    if (history.length === 0) {
      setHistory([[...elements]]);
      setHistoryIndex(0);
    }
  }, []);
  
  // Track history changes
  useEffect(() => {
    if (history.length === 0 || historyIndex < 0) return;

    const currentHistoryState = JSON.stringify(history[historyIndex]);
    const elementsState = JSON.stringify(elements);
    
    if (currentHistoryState !== elementsState) {
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, [...elements]]);
      setHistoryIndex(newHistory.length);
    }
  }, [elements]);
  
  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
    }
  };
  
  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
    }
  };
  
  // Toggle card orientation
  const toggleCardOrientation = () => {
    setCardOrientation(cardOrientation === 'portrait' ? 'landscape' : 'portrait');
  };
  
  // Update element
  const updateElement = <T extends Partial<CardElement>>(updates: T) => {
    if (!selectedElementId) return;
    
    setElements(elements.map(el => 
      el.id === selectedElementId ? { ...el, ...updates } : el
    ));
  };
  
  // Add new text element
  const addNewTextElement = () => {
    const newId = `text-${Date.now()}`;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    let centerX = 50;
    let centerY = 50;
    let textWidth = 160;
    
    if (canvasRect) {
      textWidth = Math.min(100, canvasRect.width * 0.6);
    }
    
    const newElement: TextElement = {
      id: newId,
      type: 'text',
      text: 'New Text',
      fontFamily: 'Inter',
      fontSize: 18,
      color: '#ffffff',
      position: { x: centerX, y: centerY },
      size: { width: textWidth, height: 40 },
      rotation: 0,
      zIndex: Math.max(...elements.map(e => e.zIndex), 0) + 1,
      backgroundColor: null,
      borderColor: null,
      borderWidth: 0,
      borderRadius: 0,
      textAlign: 'center',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 'normal',
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
    };
    
    setElements([...elements, newElement]);
    setSelectedElementId(newId);
    setActiveTextEditing(newId);
    setActiveTool('select');
  };
  
  // Add new shape element
  const addNewShapeElement = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'line' | 'star') => {
    const newId = `shape-${Date.now()}`;
    const newElement: ShapeElement = {
      id: newId,
      type: 'shape',
      shapeType,
      position: { x: 50, y: 50 + (elements.length * 5) % 40 },
      size: { width: 50, height: 50 },
      rotation: 0,
      zIndex: Math.max(...elements.map(e => e.zIndex), 0) + 1,
      fillColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: shapeType === 'rectangle' ? 0 : 0,
      opacity: 1,
      locked: false
    };
    
    setElements([...elements, newElement]);
    setSelectedElementId(newId);
    setActiveTool('select');
  };
  
  // Add new image element from URL
  const addNewImageElement = (src: string) => {
    const newId = `image-${Date.now()}`;
    const newElement: ImageElement = {
      id: newId,
      type: 'image',
      src,
      alt: 'Inserted image',
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
      rotation: 0,
      zIndex: Math.max(...elements.map(e => e.zIndex), 0) + 1,
      opacity: 1,
      borderColor: null,
      borderWidth: 0,
      borderRadius: 0,
      scaleType: 'cover',
      locked: false
    };
    
    setElements([...elements, newElement]);
    setSelectedElementId(newId);
    setActiveTool('select');
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, replaceId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large. Please select an image under 5MB.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;
      
      if (replaceId && selectedElementId) {
        setElements(elements.map(el => 
          el.id === selectedElementId ? 
          { ...el, src: result } as ImageElement : 
          el
        ));
      } else {
        addNewImageElement(result);
      }
    };
    
    reader.onerror = () => {
      alert("Failed to read the image. Please try again.");
    };
    
    reader.readAsDataURL(file);
  };
  
  // Delete selected element
  const deleteSelectedElement = () => {
    if (!selectedElementId) return;
    
    const filteredElements = elements.filter(el => el.id !== selectedElementId);
    if (filteredElements.length === 0) {
      return;
    }
    
    setElements(filteredElements);
    setSelectedElementId(filteredElements[0]?.id || null);
  };
  
  // Handle element selection
  const handleElementSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTool === 'select') {
      const element = elements.find(el => el.id === id);
      if (element && !element.locked) {
        setSelectedElementId(id);
        
        if (element.type === 'text') {
          setActiveTextEditing(id);
        } else {
          setActiveTextEditing(null);
        }
        
        if (canvasRef.current) {
          const canvas = canvasRef.current.getBoundingClientRect();
          const xPercent = ((e.clientX - canvas.left) / canvas.width) * 100;
          const yPercent = ((e.clientY - canvas.top) / canvas.height) * 100;
          const element = elements.find(el => el.id === id);
          if (element) {
            setDragOffset({ 
              x: xPercent - element.position.x, 
              y: yPercent - element.position.y 
            });
          }
        }
      }
    }
  };
  
  // Handle drag start
  const handleDragStart = (e: React.MouseEvent) => {
    if (!selectedElementId || activeTool !== 'select') return;
    
    const element = elements.find(el => el.id === selectedElementId);
    if (element && !element.locked) {
      setIsDragging(true);
      
      updateElement({ 
        zIndex: Math.max(...elements.map(e => e.zIndex), 0) + 1 
      });
      
      e.preventDefault();
    }
  };
  
  // Handle drag movement
  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElementId || !canvasRef.current) return;
    
    const canvas = canvasRef.current.getBoundingClientRect();
    const element = elements.find(el => el.id === selectedElementId);
    if (!element) return;
    
    let x = ((e.clientX - canvas.left) / canvas.width) * 100 - dragOffset.x;
    let y = ((e.clientY - canvas.top) / canvas.height) * 100 - dragOffset.y;
    
    if (snapToGrid) {
      const snapSize = gridSize / 10;
      x = Math.round(x / snapSize) * snapSize;
      y = Math.round(y / snapSize) * snapSize;
    }
    
    const elementWidthPercent = (element.size.width / canvas.width) * 100;
    const elementHeightPercent = (element.size.height / canvas.height) * 100;
    
    x = Math.max(-elementWidthPercent/2, Math.min(100 + elementWidthPercent/2, x));
    y = Math.max(-elementHeightPercent/2, Math.min(100 + elementHeightPercent/2, y));
    
    updateElement({ position: { x, y } });
  };
  
  // Handle element resize start
  const handleResizeStart = (direction: string, e: React.MouseEvent) => {
    if (!selectedElementId || !selectedElement) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };
  
  // Handle resize movement
  const handleResize = (e: React.MouseEvent) => {
    if (!isResizing || !selectedElementId || !canvasRef.current || !resizeDirection) return;
    
    const canvas = canvasRef.current.getBoundingClientRect();
    const element = elements.find(el => el.id === selectedElementId);
    if (!element) return;
    
    const mouseX = ((e.clientX - canvas.left) / canvas.width) * 100;
    const mouseY = ((e.clientY - canvas.top) / canvas.height) * 100;
    
    let newSize = { ...element.size };
    let newPosition = { ...element.position };
    
    if (resizeDirection.includes('e')) {
      newSize.width = mouseX - element.position.x;
    }
    if (resizeDirection.includes('w')) {
      const diff = element.position.x - mouseX;
      newSize.width = element.size.width + diff;
      newPosition.x = mouseX;
    }
    if (resizeDirection.includes('s')) {
      newSize.height = mouseY - element.position.y;
    }
    if (resizeDirection.includes('n')) {
      const diff = element.position.y - mouseY;
      newSize.height = element.size.height + diff;
      newPosition.y = mouseY;
    }
    
    newSize.width = Math.max(10, newSize.width);
    newSize.height = Math.max(10, newSize.height);
    
    updateElement({ 
      size: newSize,
      position: newPosition
    });
  };
  
  // Handle drag/resize end
  const handleDragEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };
  
  // Handle touch start for mobile
  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    e.stopPropagation();
    const element = elements.find(el => el.id === id);
    
    if (element && !element.locked) {
      setSelectedElementId(id);
      
      if (element.type === 'text') {
        setActiveTextEditing(id);
      }
      
      if (canvasRef.current && e.touches[0]) {
        const canvas = canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const xPercent = ((touch.clientX - canvas.left) / canvas.width) * 100;
        const yPercent = ((touch.clientY - canvas.top) / canvas.height) * 100;
        
        setDragOffset({ 
          x: xPercent - element.position.x, 
          y: yPercent - element.position.y 
        });
      }
    }
  };
  
  // Handle touch move for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canvasRef.current || !e.touches[0]) return;
    
    if (isDragging && selectedElementId) {
      const canvas = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const element = elements.find(el => el.id === selectedElementId);
      if (!element) return;
      
      let x = ((touch.clientX - canvas.left) / canvas.width) * 100 - dragOffset.x;
      let y = ((touch.clientY - canvas.top) / canvas.height) * 100 - dragOffset.y;
      
      if (snapToGrid) {
        const snapSize = gridSize / 10;
        x = Math.round(x / snapSize) * snapSize;
        y = Math.round(y / snapSize) * snapSize;
      }
      
      const elementWidthPercent = (element.size.width / canvas.width) * 100;
      const elementHeightPercent = (element.size.height / canvas.height) * 100;
      
      x = Math.max(-elementWidthPercent/2, Math.min(100 + elementWidthPercent/2, x));
      y = Math.max(-elementHeightPercent/2, Math.min(100 + elementHeightPercent/2, y));
      
      updateElement({ position: { x, y } });
    } else if (isResizing && selectedElementId && resizeDirection) {
      const canvas = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const element = elements.find(el => el.id === selectedElementId);
      if (!element) return;
      
      const mouseX = ((touch.clientX - canvas.left) / canvas.width) * 100;
      const mouseY = ((touch.clientY - canvas.top) / canvas.height) * 100;
      
      let newSize = { ...element.size };
      let newPosition = { ...element.position };
      
      if (resizeDirection.includes('e')) {
        newSize.width = mouseX - element.position.x;
      }
      if (resizeDirection.includes('w')) {
        const diff = element.position.x - mouseX;
        newSize.width = element.size.width + diff;
        newPosition.x = mouseX;
      }
      if (resizeDirection.includes('s')) {
        newSize.height = mouseY - element.position.y;
      }
      if (resizeDirection.includes('n')) {
        const diff = element.position.y - mouseY;
        newSize.height = element.size.height + diff;
        newPosition.y = mouseY;
      }
      
      newSize.width = Math.max(10, newSize.width);
      newSize.height = Math.max(10, newSize.height);
      
      updateElement({ 
        size: newSize,
        position: newPosition
      });
    }
    
    e.preventDefault();
  };
  
  // Handle touch end for mobile
  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
    
    if (activeTextEditing && !selectedElement?.type === 'text') {
      finishTextEditing();
    }
  };
  
  // Finish text editing
  const finishTextEditing = useCallback(() => {
    setActiveTextEditing(null);
  }, []);
  
  // Canvas click handler
  const handleCanvasClick = () => {
    if (activeTool === 'select') {
      setSelectedElementId(null);
      setActiveTextEditing(null);
    } else if (activeTool === 'text') {
      addNewTextElement();
    } else if (activeTool === 'shape') {
      addNewShapeElement(activeShapeType);
    }
  };
  
  // Save design to localStorage
  const saveDesign = () => {
    try {
      localStorage.setItem('savedCardDesign', JSON.stringify(elements));
      const saveButton = document.getElementById('save-button');
      if (saveButton) {
        saveButton.classList.add('bg-green-600');
        setTimeout(() => {
          saveButton.classList.remove('bg-green-600');
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design. Please try again.');
    }
  };
  
  // Load saved design from localStorage
  const loadSavedDesign = useCallback(() => {
    const savedDesign = localStorage.getItem('savedCardDesign');
    if (savedDesign) {
      try {
        const parsedDesign = JSON.parse(savedDesign);
        if (Array.isArray(parsedDesign) && parsedDesign.length > 0) {
          setElements(parsedDesign);
        }
      } catch (e) {
        console.error('Error loading saved design:', e);
      }
    }
  }, []);
  
  // Load design on mount
  useEffect(() => {
    loadSavedDesign();
  }, [loadSavedDesign]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedElementId) return;
      
      // Delete element with Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelectedElement();
      }
      
      // Copy element with Ctrl+C
      if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
        // Clone element logic would go here
      }
      
      // Arrow keys for fine-tuned movement
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const element = elements.find(el => el.id === selectedElementId);
        if (!element || element.locked) return;
        
        const step = e.shiftKey ? 10 : 1;
        const newPos = { ...element.position };
        
        if (e.key === 'ArrowUp') newPos.y -= step * 0.5;
        if (e.key === 'ArrowDown') newPos.y += step * 0.5;
        if (e.key === 'ArrowLeft') newPos.x -= step * 0.5;
        if (e.key === 'ArrowRight') newPos.x += step * 0.5;
        
        updateElement({ position: newPos });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, elements]);

  return {
    // Refs
    canvasRef,
    
    // State
    elements,
    selectedElementId,
    activeTool,
    activeShapeType,
    isDragging,
    isResizing,
    dragOffset,
    resizeDirection,
    history,
    historyIndex,
    showGrid,
    snapToGrid,
    gridSize,
    activeTextEditing,
    cardOrientation,
    selectedElement,
    
    // State setters
    setElements,
    setSelectedElementId,
    setActiveTool,
    setActiveShapeType,
    setIsDragging,
    setIsResizing,
    setDragOffset,
    setResizeDirection,
    setShowGrid,
    setSnapToGrid,
    setGridSize,
    setActiveTextEditing,
    
    // Actions
    handleUndo,
    handleRedo,
    toggleCardOrientation,
    updateElement,
    addNewTextElement,
    addNewShapeElement,
    addNewImageElement,
    handleImageUpload,
    deleteSelectedElement,
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
    handleCanvasClick,
    saveDesign,
    loadSavedDesign
  };
};
