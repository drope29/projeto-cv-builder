// src/components/EducationItem.tsx
import React from 'react';

interface EducationItemProps {
  education: { curso: string; instituicao: string; anoConclusao: string | number };
  index: number;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
}

const EducationItem: React.FC<EducationItemProps> = ({ education, index, onChange, onRemove }) => (
  <div className="space-y-3 border p-4 rounded-lg mb-4 bg-gray-50 relative">
    <input
      name="curso"
      type="text"
      placeholder="Curso"
      value={education.curso}
      onChange={(e) => onChange(index, 'curso', e.target.value)}
      className="w-full p-2 border rounded-md"
    />
    <input
      name="instituicao"
      type="text"
      placeholder="Instituição de Ensino"
      value={education.instituicao}
      onChange={(e) => onChange(index, 'instituicao', e.target.value)}
      className="w-full p-2 border rounded-md"
    />
    <input
      name="anoConclusao"
      type="text"
      placeholder="Ano de Conclusão"
      value={education.anoConclusao}
      onChange={(e) => onChange(index, 'anoConclusao', e.target.value)}
      className="w-full p-2 border rounded-md"
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

export default EducationItem;