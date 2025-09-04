// src/components/InputField.tsx
import React from 'react';

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  maxLength?: number;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  maxLength,
  className = 'w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
}) => (
  <div>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={className}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;