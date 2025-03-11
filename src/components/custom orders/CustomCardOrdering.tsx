'use client';
import React, { useState } from 'react';
import CardTypeSelection from './CardTypeSelection';
import CardDesignUpload from './CardDesignUpload';
import CardTextCustomization from './CardTextCustomization';
import CardDetailsForm from './CardDetailsForm';
import OrderConfirmation from './OrderConfirmation';
import ProgressIndicator from './ProgressIndicator';
import PageHeader from './PageHeader';

// Types shared across components
export type CardType = 'student' | 'professional' | 'business';
export type FontType = 'sans-serif' | 'serif' | 'monospace';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  title: string;
  quantity: number;
}

const CustomCardOrdering: React.FC = () => {
  // State management
  const [cardType, setCardType] = useState<CardType | null>(null);
  const [cardImage, setCardImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>('');
  const [isEditingText, setIsEditingText] = useState<boolean>(false);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [selectedFont, setSelectedFont] = useState<FontType>('sans-serif');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    title: '',
    quantity: 100
  });
  const [step, setStep] = useState<number>(1);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      cardType,
      cardImage,
      customText,
      textPosition,
      selectedFont,
      formData
    });
    setStep(5); // Move to confirmation step
  };

  // Reset all state to initial values
  const resetForm = () => {
    setCardType(null);
    setCardImage(null);
    setCustomText('');
    setIsEditingText(false);
    setTextPosition({ x: 50, y: 50 });
    setSelectedFont('sans-serif');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      title: '',
      quantity: 100
    });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px),linear-gradient(-45deg,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-10 relative z-20">
        {/* Header Section */}
        <PageHeader />
        
        {/* Progress Indicator */}
        <ProgressIndicator step={step} />
        
        {/* Current step content */}
        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <CardTypeSelection 
              onCardTypeSelect={(type) => {
                setCardType(type);
                setStep(2);
              }}
            />
          )}
          
          {step === 2 && (
            <CardDesignUpload 
              onImageSelected={(image) => {
                setCardImage(image);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          
          {step === 3 && (
            <CardTextCustomization 
              cardImage={cardImage}
              customText={customText}
              setCustomText={setCustomText}
              isEditingText={isEditingText}
              setIsEditingText={setIsEditingText}
              textPosition={textPosition}
              setTextPosition={setTextPosition}
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
              onBack={() => setStep(2)}
              onContinue={() => setStep(4)}
            />
          )}
          
          {step === 4 && (
            <CardDetailsForm 
              formData={formData}
              setFormData={setFormData}
              cardType={cardType}
              cardImage={cardImage}
              onBack={() => setStep(3)}
              onSubmit={handleSubmit}
            />
          )}
          
          {step === 5 && (
            <OrderConfirmation 
              formData={formData}
              cardType={cardType}
              onNewOrder={resetForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCardOrdering;