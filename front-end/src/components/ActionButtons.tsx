// src/components/ActionButtons.tsx
import React from 'react';

interface ActionButtonsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({onCancel, isSubmitting }) => (
  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t mt-8">
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isSubmitting ? 'Salvando...' : 'Salvar Currículo'}
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="w-full bg-white text-blue-700 font-bold py-4 px-10 rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
      disabled={isSubmitting}
    >
      Cancelar
    </button>
  </div>
);

export default ActionButtons;