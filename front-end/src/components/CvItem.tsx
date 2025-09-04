// src/components/CvItem.tsx
import React from 'react';

interface CvItemProps {
  id: string;
  nomeCompleto: string;
  email: string;
  onDelete: () => void;
  onClick: () => void;
}

const getPlaceholderImage = (nome: string) => {
  const initials = nome
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return `https://placehold.co/100x100/E2E8F0/4A5568?text=${initials}`;
};

const CvItem: React.FC<CvItemProps> = ({ nomeCompleto, email, onDelete, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-all duration-300"
    >
      {/* Clique no card abre detalhes */}
      <div
        onClick={onClick}
        className="flex items-center space-x-6 cursor-pointer flex-1"
      >
        <img
          src={getPlaceholderImage(nomeCompleto)}
          alt={`Foto de ${nomeCompleto}`}
          className="w-16 h-16 rounded-full border-2 border-blue-200"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{nomeCompleto}</h2>
          <p className="text-gray-500 text-sm">{email}</p>
          <p className="text-gray-400 text-sm">Clique para ver detalhes</p>
        </div>
      </div>

      {/* Botão de Excluir */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-red-500 hover:text-red-700 ml-4 p-2 rounded-full hover:bg-red-50 transition-colors duration-200 focus:outline-none"
        aria-label="Excluir currículo"
      >
        🗑️
      </button>
    </div>
  );
};

export default CvItem;