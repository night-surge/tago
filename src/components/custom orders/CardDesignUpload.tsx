import React from 'react';
import { Upload } from 'lucide-react';

interface CardDesignUploadProps {
  onImageSelected: (image: string) => void;
  onBack: () => void;
}

const CardDesignUpload: React.FC<CardDesignUploadProps> = ({ onImageSelected, onBack }) => {
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelected(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle template selection (using dummy templates)
  const handleTemplateSelect = (type: string) => {
    // Use a local template instead of placeholder.com
    onImageSelected(`/templates/${type}-template.jpg`);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Your Card Design</h2>
      <div className="p-8 rounded-2xl bg-zinc-950 border border-white/10">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md h-64 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors">
            <input 
              type="file" 
              id="cardImageUpload" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
            <label htmlFor="cardImageUpload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-300 font-medium">Drop your card design or click to upload</p>
              <p className="text-xs text-gray-500 mt-2">Recommended size: 1050×600px (3.5×2 inches at 300dpi)</p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                Select Image
              </button>
            </label>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-400 text-center mb-4">Or choose from our templates:</p>
            <div className="grid grid-cols-3 gap-4">
              {['student', 'professional', 'business'].map((type) => (
                <div 
                  key={type}
                  className="w-32 h-20 bg-zinc-800 rounded-lg cursor-pointer hover:ring-2 hover:ring-white/30 transition-all"
                  onClick={() => handleTemplateSelect(type)}
                >
                  <div className="w-full h-full flex items-center justify-center rounded-lg bg-zinc-700 text-white text-sm">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Template
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-transparent border border-white/20 text-white hover:bg-white/5 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default CardDesignUpload;