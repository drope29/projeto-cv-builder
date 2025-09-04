// src/components/CvList.tsx
import React from 'react';
import CvItem from './CvItem';
import Loading from './Loading';
import Error from './Error';

interface Curriculum {
  id: string;
  nomeCompleto: string;
  email: string;
}

interface CvListProps {
  curriculos: Curriculum[];
  loading: boolean;
  error: string | null;
  onCvClick: (id: string) => void;
  onDelete: (id: string, nome: string) => void;
}

const CvList: React.FC<CvListProps> = ({ curriculos, loading, error, onCvClick, onDelete }) => {
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (curriculos.length === 0) return <p className="text-center text-gray-500">Nenhum currículo encontrado.</p>;

  return (
    <div className="space-y-4">
      {curriculos.map((cv) => (
        <CvItem
          key={cv.id}
          id={cv.id}
          nomeCompleto={cv.nomeCompleto}
          email={cv.email}
          onClick={() => onCvClick(cv.id)}
          onDelete={() => onDelete(cv.id, cv.nomeCompleto)}
        />
      ))}
    </div>
  );
};

export default CvList;