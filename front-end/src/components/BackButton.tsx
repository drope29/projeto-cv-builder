// src/components/BackButton.tsx
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div className="text-center mt-2">
      <button
        onClick={onClick}
        className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        Voltar
      </button>
    </div>
  );
};

export default BackButton;