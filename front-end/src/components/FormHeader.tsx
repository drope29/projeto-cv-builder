// src/components/FormHeader.tsx
import React from 'react';

interface FormHeaderProps {
  isEditing: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({ isEditing }) => (
  <h1 className="text-center text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
    {isEditing ? 'Editar Currículo' : 'Adicione seu Currículo'}
  </h1>
);
export default FormHeader;