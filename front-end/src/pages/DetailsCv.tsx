// src/pages/DetailsCvPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import Loading from '../components/Loading';
import Error from '../components/Error';
import BackButton from '../components/BackButton';
import CvHeader from '../components/CvHeader';
import ExperienceList from '../components/ExperienceList';
import EducationList from '../components/EducationList';
import SkillTags from '../components/SkillTags';
import SummarySection from '../components/SummarySection';
import LanguageList from '../components/LanguageList';
import CreatedAt from '../components/CreatedAt';

interface Curriculum {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  endereco?: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  resumoProfissional?: string;
  experienciaProfissional?: Array<{
    cargo: string;
    empresa: string;
    dataInicio: string;
    dataFim?: string;
    descricao?: string;
  }>;
  formacaoAcademica?: Array<{
    curso: string;
    instituicao: string;
    anoConclusao: string | number;
  }>;
  idiomas?: Array<{
    idioma: string;
    nivel: string;
  }>;
  habilidades?: string[];
  criadoEm: string;
}

const DetailsCvPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [curriculo, setCurriculo] = useState<Curriculum | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurriculo = async () => {
      if (!id) {
        setError('ID não fornecido');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/curriculos/${id}`);
        if (!response.ok) throw new Error(response.status === 404 ? 'Currículo não encontrado' : 'Erro ao carregar currículo');
        const data: Curriculum = await response.json();
        setCurriculo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro de conexão');
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculo();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Botões de navegação */}
        <div className="mb-6 flex justify-between">
          <BackButton onClick={() => navigate('/visualizar-curriculos')} label="← Voltar para lista" />

          {curriculo && (
            <button
              onClick={() => navigate(`/criar-curriculo/${curriculo.id}`)}
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 h-10 rounded-full shadow transition-all duration-200 hover:scale-105 focus:outline-none"
              aria-label="Editar currículo"
            >
              ✏️ <span className="ml-2">Editar</span>
            </button>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Detalhes do Currículo
        </h1>

        {curriculo && (
          <Card>
            <CvHeader
              fullName={curriculo.nomeCompleto}
              email={curriculo.email}
              phone={curriculo.telefone}
              address={curriculo.endereco}
            />

            {curriculo.resumoProfissional && <SummarySection summary={curriculo.resumoProfissional} />}

            {curriculo.experienciaProfissional && curriculo.experienciaProfissional.length > 0 && (
              <ExperienceList experiences={curriculo.experienciaProfissional} />
            )}

            {curriculo.formacaoAcademica && curriculo.formacaoAcademica.length > 0 && (
              <EducationList educations={curriculo.formacaoAcademica} />
            )}

            {curriculo.habilidades && curriculo.habilidades.length > 0 && (
              <SkillTags skills={curriculo.habilidades} />
            )}

            {curriculo.idiomas && curriculo.idiomas.length > 0 && (
              <LanguageList languages={curriculo.idiomas} />
            )}

            <CreatedAt createdAt={curriculo.criadoEm} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetailsCvPage;