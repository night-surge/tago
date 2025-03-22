import React from 'react';

interface ProgressIndicatorProps {
  step: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ step }) => {
  const steps = [
    { number: 1, label: 'Type' },
    { number: 2, label: 'Design' },
    { number: 3, label: 'Text' },
    { number: 4, label: 'Details' },
    { number: 5, label: 'Done' }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between max-w-lg mx-auto">
        {steps.map((item) => (
          <div key={item.number} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= item.number ? 'bg-white text-black' : 'bg-zinc-800 text-gray-400'}`}>
              {item.number}
            </div>
            <span className="text-xs mt-1 text-gray-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="max-w-lg mx-auto mt-2 h-1 bg-zinc-800 rounded-full">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300" 
          style={{ width: `${(step - 1) * 25}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;