// src/components/Section.tsx
import React from 'react';

interface SectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <div>
    <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-blue-200 pb-2 mb-4">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h3>
    {children}
  </div>
);

export default Section;