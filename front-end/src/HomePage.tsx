import React from 'react';

import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateCvClick = () => {
        navigate('/criar-curriculo');
    };

    const handleViewCvsClick = () => {
        navigate('/visualizar-curriculos');
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-20 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
                    CV Builder
                </h1>
            </div>

            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6">
                <button
                    onClick={handleCreateCvClick}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
                >
                    Criar Meu Currículo
                </button>

                <button
                    onClick={handleViewCvsClick}
                    className="bg-white text-blue-700 font-bold py-4 px-10 rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
                >
                    Visualizar Currículos
                </button>
            </div>

            <div className='flex flex-row mt-20'>
                <div className='h-200 w-140 bg-white rounded-2xl'>
                    <p className='text-4xl font-bold text-gray-800 ml-5 mt-3 underline'>Dashboard</p>
                    <div className='flex flex-row mt-30'>
                        <p className='text-2xl font-bold text-gray-800 ml-9 mt-3'>Criados Hoje:</p>
                        <p className='text-2xl font-bold text-gray-800 ml-25 mt-3'>Total de Usuarios:</p>
                    </div>
                </div>

                <div className='ml-20 text-4xl font-bold text-gray-800'>
                    <p>Ultimos Curriculos Criados</p>
                    <div className='h-30 w-160 bg-white rounded-2xl mt-6'></div>
                    <div className='h-30 w-160 bg-white rounded-2xl mt-6'></div>
                    <div className='h-30 w-160 bg-white rounded-2xl mt-6'></div>
                    <div className='h-30 w-160 bg-white rounded-2xl mt-6'></div>
                </div>

            </div>

        </div>
    );


};



export default HomePage;