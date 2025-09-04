// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DashboardCard from '../components/DashboardCard';
import RecentCvsList from '../components/RecentCvsList';

interface Curriculum {
    id: string;
    nomeCompleto: string;
    email: string;
    telefone?: string;
    criadoEm: string;
}

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [curriculosRecentes, setCurriculosRecentes] = useState<Curriculum[]>([]);
    const [totalCurriculos, setTotalCurriculos] = useState<number>(0);
    const [criadosHoje, setCriadosHoje] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleCreateCvClick = () => navigate('/criar-curriculo');
    const handleViewCvsClick = () => navigate('/visualizar-curriculos');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [responseRecentes, responseTodos] = await Promise.all([
                    fetch('http://localhost:8000/curriculos/recentes'),
                    fetch('http://localhost:8000/curriculos'),
                ]);

                if (!responseRecentes.ok) throw new Error('Erro ao carregar currículos recentes');
                if (!responseTodos.ok) throw new Error('Erro ao carregar todos os currículos');

                const dadosRecentes: Curriculum[] = await responseRecentes.json();
                const todos: Curriculum[] = await responseTodos.json();

                setCurriculosRecentes(dadosRecentes);
                setTotalCurriculos(todos.length);

                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                const count = todos.filter((curriculo) => {
                    const dataCriacao = new Date(curriculo.criadoEm);
                    dataCriacao.setHours(0, 0, 0, 0);
                    return dataCriacao.getTime() === hoje.getTime();
                }).length;

                setCriadosHoje(count);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center pt-20 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <HeroSection onCreateClick={handleCreateCvClick} onViewClick={handleViewCvsClick} />

            <div className="flex flex-col justify-center md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full">
                <DashboardCard
                    stats={[
                        { icon: '🆕', label: 'Criados Hoje', value: criadosHoje, bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
                        { icon: '📊', label: 'Total de Currículos', value: totalCurriculos, bgColor: 'bg-green-100', textColor: 'text-green-700' },
                    ]}
                    loading={loading}
                    error={error}
                />

                <RecentCvsList curriculos={curriculosRecentes} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default HomePage;