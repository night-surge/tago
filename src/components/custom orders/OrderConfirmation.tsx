import React from 'react';
import { Check } from 'lucide-react';
import { CardType, FormData } from './CustomCardOrdering';

interface OrderConfirmationProps {
  formData: FormData;
  cardType: CardType | null;
  onNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ formData, cardType, onNewOrder }) => {
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="p-8 rounded-2xl bg-zinc-950 border border-white/10">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-400 mb-6">
          Thank you for your order. We&apos;ve received your custom card design and details.
          Your cards will be printed and shipped within 3-5 business days.
        </p>
        
        <div className="bg-zinc-900 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Order Details</h3>
          <div className="text-sm text-left">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-400">Name:</p>
              <p className="text-gray-300">{formData.name}</p>
              
              <p className="text-gray-400">Email:</p>
              <p className="text-gray-300">{formData.email}</p>
              
              <p className="text-gray-400">Card Type:</p>
              <p className="text-gray-300">{cardType}</p>
              
              <p className="text-gray-400">Quantity:</p>
              <p className="text-gray-300">{formData.quantity} cards</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onNewOrder}
          className="px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors"
        >
          Place Another Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;