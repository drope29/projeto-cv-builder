// src/components/ExperienceItem.tsx
import React from 'react';

interface ExperienceItemProps {
  experience: { cargo: string; empresa: string; dataInicio: string; dataFim?: string; descricao: string };
  index: number;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, index, onChange, onRemove }) => (
  <div className="space-y-3 border p-4 rounded-lg mb-4 bg-gray-50 relative">
    <input
      name="cargo"
      type="text"
      placeholder="Cargo"
      value={experience.cargo}
      onChange={(e) => onChange(index, 'cargo', e.target.value)}
      className="w-full p-2 border rounded-md"
    />
    <input
      name="empresa"
      type="text"
      placeholder="Empresa"
      value={experience.empresa}
      onChange={(e) => onChange(index, 'empresa', e.target.value)}
      className="w-full p-2 border rounded-md"
    />
    <div className="flex gap-4">
      <input
        name="dataInicio"
        type="text"
        placeholder="Data de Início"
        value={experience.dataInicio}
        onChange={(e) => onChange(index, 'dataInicio', e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        name="dataFim"
        type="text"
        placeholder="Data de Fim"
        value={experience.dataFim || ''}
        onChange={(e) => onChange(index, 'dataFim', e.target.value)}
        className="w-full p-2 border rounded-md"
      />
    </div>
    <textarea
      name="descricao"
      placeholder="Descrição das atividades"
      value={experience.descricao}
      onChange={(e) => onChange(index, 'descricao', e.target.value)}
      className="w-full p-2 border rounded-md h-24"
    />
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm hover:bg-red-600 transition-transform hover:scale-110 cursor-pointer"
    >
      X
    </button>
  </div>
);

export default ExperienceItem;