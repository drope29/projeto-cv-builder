// src/components/CreatedAt.tsx
import React from 'react';

interface CreatedAtProps {
  createdAt: string;
}

const formatarData = (isoString: string) => {
  const data = new Date(isoString);
  return data.toLocaleDateString('pt-BR');
};

const CreatedAt: React.FC<CreatedAtProps> = ({ createdAt }) => (
  <div className="mt-6 text-right">
    <p className="text-sm text-gray-400">Criado em: {formatarData(createdAt)}</p>
  </div>
);

export default CreatedAt;