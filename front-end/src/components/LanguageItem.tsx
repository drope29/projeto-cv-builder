// src/components/LanguageItem.tsx
import React from 'react';

interface LanguageItemProps {
  language: { idioma: string; nivel: string };
  index: number;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ language, index, onChange, onRemove }) => (
  <div className="flex items-center gap-4 border p-4 rounded-lg mb-4 bg-gray-50 relative">
    <input
      name="idioma"
      type="text"
      placeholder="Idioma"
      value={language.idioma}
      onChange={(e) => onChange(index, 'idioma', e.target.value)}
      className="w-full p-2 border rounded-md"
    />
    <select
      name="nivel"
      value={language.nivel}
      onChange={(e) => onChange(index, 'nivel', e.target.value)}
      className="w-full p-2 border rounded-md bg-white"
    >
      <option>Básico</option>
      <option>Intermediário</option>
      <option>Avançado</option>
      <option>Fluente</option>
    </select>
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm hover:bg-red-600 flex-shrink-0 cursor-pointer"
    >
      X
    </button>
  </div>
);

export default LanguageItem;