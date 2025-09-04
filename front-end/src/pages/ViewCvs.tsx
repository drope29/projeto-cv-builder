// src/pages/ViewCvsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CvList from '../components/CvList';
import BackButton from '../components/BackButton';
import PageHeader from '../components/PageHeader';

interface Curriculum {
    id: string;
    nomeCompleto: string;
    email: string;
    criadoEm: string;
}

const ViewCvsPage: React.FC = () => {
    const navigate = useNavigate();

    const [curriculos, setCurriculos] = useState<Curriculum[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Buscar currículos ao carregar
    useEffect(() => {
        const fetchCurriculos = async () => {
            try {
                const response = await fetch('http://localhost:8000/curriculos');
                if (!response.ok) throw new Error('Falha ao carregar currículos');
                const data: Curriculum[] = await response.json();
                setCurriculos(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };

        fetchCurriculos();
    }, []);

    // Função para deletar currículo
    const handleDelete = async (id: string, nome: string) => {
        const confirmado = window.confirm(
            `Tem certeza que deseja excluir o currículo de ${nome}? Esta ação não pode ser desfeita.`
        );

        if (!confirmado) return;

        try {
            const response = await fetch(`http://localhost:8000/curriculos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.error || 'Erro ao excluir currículo');
            }

            setCurriculos(curriculos.filter((cv) => cv.id !== id));
            alert('Currículo excluído com sucesso!');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao excluir currículo');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-sky-100 p-4 sm:p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <PageHeader />

                <CvList
                    curriculos={curriculos}
                    loading={loading}
                    error={error}
                    onCvClick={(id) => navigate(`/curriculo/${id}`)}
                    onDelete={handleDelete}
                />

                <BackButton onClick={() => navigate('/')} />
            </div>
        </div>
    );
};

export default ViewCvsPage;