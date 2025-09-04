// src/components/HeroSection.tsx
import React from 'react';

interface HeroSectionProps {
  onCreateClick: () => void;
  onViewClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCreateClick, onViewClick }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">CV Builder</h1>

      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6">
        <button
          onClick={onCreateClick}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
        >
          Criar Meu Currículo
        </button>

        <button
          onClick={onViewClick}
          className="bg-white text-blue-700 font-bold py-4 px-10 rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
        >
          Visualizar Currículos
        </button>
      </div>
    </div>
  );
};

export default HeroSection;