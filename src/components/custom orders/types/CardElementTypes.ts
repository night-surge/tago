// Element Types
export type ElementType = 'text' | 'shape' | 'image';

// Base Element Interface
export interface BaseElement {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  zIndex: number;
  locked: boolean;
}

// Text Element Interface
export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor: string | null;
  borderColor: string | null;
  borderWidth: number;
  borderRadius: number;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
  letterSpacing: number;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  opacity: number;
  shadow: {
    enabled: boolean;
    color: string;
    blur: number;
    x: number;
    y: number;
  };
}

// Shape Element Interface
export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'line' | 'star';
  fillColor: string;
  borderColor: string | null;
  borderWidth: number;
  borderRadius: number;
  opacity: number;
}

// Image Element Interface
export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  alt: string;
  opacity: number;
  borderColor: string | null;
  borderWidth: number;
  borderRadius: number;
  scaleType: 'cover' | 'contain' | 'fill';
}

// Union Type for any Element
export type CardElement = TextElement | ShapeElement | ImageElement;
