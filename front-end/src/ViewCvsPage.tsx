import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Dados de Exemplo (substituir por dados reais do banco de dados no futuro) ---
const mockCvData = [
    {
        id: 1,
        fullName: 'Ana Silva',
        imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AS',
    },
    {
        id: 2,
        fullName: 'Bruno Costa',
        imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=BC',
    },
    {
        id: 3,
        fullName: 'Carla Martins',
        imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=CM',
    },
    {
        id: 4,
        fullName: 'Daniel Pereira',
        imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=DP',
    },
];

const ViewCvsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-sky-100 p-4 sm:p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-center text-5xl md:text-6xl font-extrabold text-blue-900 mb-4">
                    Currículos
                </h1>

                <div className="space-y-4">
                    {mockCvData.map((cv) => (
                        <div
                            key={cv.id}
                            className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                        >
                            <img
                                src={cv.imageUrl}
                                alt={`Foto de ${cv.fullName}`}
                                className="w-16 h-16 rounded-full border-2 border-blue-200"
                            />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{cv.fullName}</h2>
                                <p className="text-gray-500">Clique para ver mais detalhes</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCvsPage;
