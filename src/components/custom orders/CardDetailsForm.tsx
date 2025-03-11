import React from 'react';
import Image from 'next/image';
import { CardType, FormData } from './CustomCardOrdering';

interface CardDetailsFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  cardType: CardType | null;
  cardImage: string | null;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CardDetailsForm: React.FC<CardDetailsFormProps> = ({ 
  formData, 
  setFormData, 
  cardType, 
  cardImage, 
  onBack, 
  onSubmit 
}) => {
  // Quantity options
  const quantityOptions = [100, 200, 500, 1000];

  // Handle form data changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Enter Your Details</h2>
      <div className="p-8 rounded-2xl bg-zinc-950 border border-white/10">
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white"
                placeholder="123 Main St, City, State"
              />
            </div>
            
            {/* Conditional fields based on card type */}
            {(cardType === 'business' || cardType === 'professional') && (
              <>
                <div>
                  <label className="block text-gray-300 mb-2">Company/Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white"
                    placeholder="Acme Inc."
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white"
                    placeholder="Marketing Manager"
                  />
                </div>
              </>
            )}
            
            {/* Quantity selection */}
            <div>
              <label className="block text-gray-300 mb-2">Quantity *</label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleFormChange}
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white"
                required
              >
                {quantityOptions.map(qty => (
                  <option key={qty} value={qty}>{qty} cards</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center mr-4">
                {cardImage && (
                  <Image src={cardImage} alt="Card preview" className="w-10 h-6 object-cover rounded" width={40} height={24} />
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {cardType === 'student' ? 'Student' : 
                   cardType === 'professional' ? 'Professional' : 'Business'} Card
                </h3>
                <p className="text-sm text-gray-400">Quantity: {formData.quantity} cards</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <button 
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-lg bg-transparent border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              Back
            </button>
            
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CardDetailsForm;