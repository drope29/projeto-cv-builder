// src/components/RecentCvsList.tsx
import React from 'react';
import Card from './Card';

interface Curriculum {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
}

interface RecentCvsListProps {
  curriculos: Curriculum[];
  loading: boolean;
  error: string | null;
}

const RecentCvsList: React.FC<RecentCvsListProps> = ({ curriculos, loading, error }) => {
  if (loading) return <Card><p className="text-gray-500">Carregando...</p></Card>;
  if (error) return <Card><p className="text-red-500">Erro: {error}</p></Card>;
  if (curriculos.length === 0) return <Card><p className="text-gray-500">Nenhum currículo encontrado.</p></Card>;

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Últimos Currículos Criados</h2>
      <ul className="space-y-4">
        {curriculos.map((curriculo) => (
          <li
            key={curriculo.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
          >
            <p className="font-semibold text-gray-800">{curriculo.nomeCompleto}</p>
            <p className="text-sm text-gray-600">📧 {curriculo.email}</p>
            {curriculo.telefone && (
              <p className="text-sm text-gray-600">📞 {curriculo.telefone}</p>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentCvsList;