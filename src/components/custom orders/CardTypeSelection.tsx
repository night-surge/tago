import React from 'react';
import { User, Briefcase, GraduationCap } from 'lucide-react';
import { CardType } from './CustomCardOrdering';

interface CardTypeSelectionProps {
  onCardTypeSelect: (type: CardType) => void;
}

const CardTypeSelection: React.FC<CardTypeSelectionProps> = ({ onCardTypeSelect }) => {
  const cardTypes = [
    { id: 'student' as CardType, name: 'Student', icon: GraduationCap, color: 'bg-blue-500', description: 'Perfect for students and graduates' },
    { id: 'professional' as CardType, name: 'Professional', icon: User, color: 'bg-purple-500', description: 'Perfect for consultants and freelancers' },
    { id: 'business' as CardType, name: 'Business', icon: Briefcase, color: 'bg-amber-500', description: 'Perfect for companies and organizations' }
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Card Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onCardTypeSelect(type.id)}
            className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-white/20 transition-all flex flex-col items-center"
          >
            <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mb-4`}>
              <type.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-medium">{type.name}</h3>
            <p className="text-sm text-gray-400 mt-2 text-center">
              {type.description}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};

export default CardTypeSelection;