// src/components/LanguageList.tsx
import React from 'react';
import Section from './Section';

interface Language {
  idioma: string;
  nivel: string;
}

interface LanguageListProps {
  languages: Language[];
}

const LanguageList: React.FC<LanguageListProps> = ({ languages }) => (
  <Section title="Idiomas" icon="🌍">
    <div className="space-y-2">
      {languages.map((lang, index) => (
        <p key={index} className="text-gray-700">
          <strong>{lang.idioma}:</strong> {lang.nivel}
        </p>
      ))}
    </div>
  </Section>
);

export default LanguageList;