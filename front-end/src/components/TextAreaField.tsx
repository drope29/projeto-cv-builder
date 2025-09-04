// src/components/TextAreaField.tsx
import React from 'react';

interface TextAreaFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
  className = 'w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-32',
}) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={className}
  />
);

export default TextAreaField;