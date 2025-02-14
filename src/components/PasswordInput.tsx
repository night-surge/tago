import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  id, 
  name = 'password',
  required = false,
  value,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md bg-black border border-white/20 
                 text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                 outline-none pr-10"
        placeholder="Enter password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/60 hover:text-white"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;