// src/components/DashboardCard.tsx
import React from 'react';
import Card from './Card';

interface Stat {
  icon: string;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

interface DashboardCardProps {
  stats: Stat[];
  loading: boolean;
  error: string | null;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ stats, loading, error }) => {
  if (loading) return <Card><p className="text-gray-500">Carregando estatísticas...</p></Card>;
  if (error) return <Card><p className="text-red-500">Erro: {error}</p></Card>;

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="space-y-5">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mr-4`}>
              <span className={`font-bold text-lg ${stat.textColor}`}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DashboardCard;