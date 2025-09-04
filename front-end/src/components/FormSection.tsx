// src/components/FormSection.tsx
import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <fieldset className="space-y-4">
    <legend className="text-xl font-extrabold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">
      {title}
    </legend>
    {children}
  </fieldset>
);

export default FormSection;