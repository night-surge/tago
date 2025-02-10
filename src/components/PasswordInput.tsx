"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput = ({ id, name, placeholder = "••••••••", required = false }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        required={required}
        className="mt-1 block w-full rounded-md bg-black border border-white/20 
                 text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                 outline-none pr-10" // Added pr-10 for icon space
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1
                 text-white/60 hover:text-white transition-colors duration-200"
        onClick={() => setShowPassword(!showPassword)}
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