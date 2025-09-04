import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Tipos para organizar os dados do currículo ---
interface Address {
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
}

interface Experience {
    id: number;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Education {
    id: number;
    course: string;
    institution: string;
    conclusionYear: string;
}

interface Language {
    id: number;
    language: string;
    level: 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente';
}

const CreateCvPage: React.FC = () => {
    const navigate = useNavigate();

    // --- Estados para guardar as informações do formulário ---
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState<Address>({ cep: '', street: '', number: '', neighborhood: '', city: '', state: '' });
    const [summary, setSummary] = useState('');

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [educations, setEducations] = useState<Education[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);

    // Estado para armazenar os erros de validação
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // --- Funções para Lidar com Mudanças nos Campos ---

    const handleDynamicChange = <T,>(
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        state: T[],
        setter: React.Dispatch<React.SetStateAction<T[]>>
    ) => {
        const { name, value } = event.target;
        const list = [...state];
        list[index] = { ...list[index], [name]: value };
        setter(list);
    };

    // --- Máscara para o campo de telefone ---
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses nos dois primeiros dígitos
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca hífen depois do quinto dígito (para celular)
        setPhone(value.substring(0, 15)); // Limita o tamanho
    };

    // --- Funções para Adicionar e Remover seções ---

    const addExperience = () => setExperiences([...experiences, { id: Date.now(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]);
    const removeExperience = (index: number) => setExperiences(experiences.filter((_, i) => i !== index));

    const addEducation = () => setEducations([...educations, { id: Date.now(), course: '', institution: '', conclusionYear: '' }]);
    const removeEducation = (index: number) => setEducations(educations.filter((_, i) => i !== index));

    const addLanguage = () => setLanguages([...languages, { id: Date.now(), language: '', level: 'Básico' }]);
    const removeLanguage = (index: number) => setLanguages(languages.filter((_, i) => i !== index));

    // --- Validação do Formulário ---
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        // Validação de Campos Obrigatórios
        if (!fullName.trim()) newErrors.fullName = 'O nome completo é obrigatório.';
        if (!email.trim()) {
            newErrors.email = 'O email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(email)) { // Validação de Tipo de Conteúdo (formato de email)
            newErrors.email = 'O formato do email é inválido.';
        }

        // Validação de Quantidade de Caracteres
        const cepDigits = address.cep.replace(/\D/g, '');
        if (cepDigits.length > 0 && cepDigits.length < 8) {
            newErrors.cep = 'O CEP deve conter 8 dígitos.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    };

    // --- Funções para os Botões ---

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const cvData = { fullName, email, phone, address, summary, experiences, educations, languages };
            console.log('Dados do Currículo Salvo:', cvData);
            alert('Currículo salvo com sucesso!');
            setErrors({});
        } else {
            console.log("Validação falhou. Por favor, corrija os erros.");
        }
    };

    const handleCancel = () => {
        navigate('/'); // Volta para a página inicial
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-sky-100 p-4 sm:p-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
                <h1 className="text-center text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
                    Adicione seu Currículo
                </h1>

                <form onSubmit={handleSave} className="space-y-12" noValidate>

                    <fieldset className="space-y-4">
                        <legend className="text-xl font-extrabold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">Informações Pessoais</legend>
                        <div>
                            <input name="fullName" type="text" placeholder="Nome Completo" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input name="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <input name="phone" type="tel" placeholder="Telefone" value={phone} onChange={handlePhoneChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <input name="cep" type="text" placeholder="CEP" maxLength={9} value={address.cep} onChange={e => setAddress({ ...address, cep: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
                            </div>
                            <input name="street" type="text" placeholder="Rua" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition col-span-2" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input name="number" type="text" placeholder="Número" value={address.number} onChange={e => setAddress({ ...address, number: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            <input name="neighborhood" type="text" placeholder="Bairro" value={address.neighborhood} onChange={e => setAddress({ ...address, neighborhood: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition col-span-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="city" type="text" placeholder="Cidade" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            <input name="state" type="text" placeholder="Estado" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="text-xl font-extrabold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">Resumo Profissional</legend>
                        <textarea name="summary" placeholder="Um breve resumo sobre você..." value={summary} onChange={e => setSummary(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-32"></textarea>
                    </fieldset>

                    <fieldset>
                        <legend className="text-xl font-extrabold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">Experiência Profissional</legend>
                        {experiences.map((exp, index) => (
                            <div key={exp.id} className="space-y-3 border p-4 rounded-lg mb-4 bg-gray-50 relative">
                                <input name="jobTitle" type="text" placeholder="Cargo" value={exp.jobTitle} onChange={e => handleDynamicChange(index, e, experiences, setExperiences)} className="w-full p-2 border rounded-md" />
                                <input name="company" type="text" placeholder="Empresa" value={exp.company} onChange={e => handleDynamicChange(index, e, experiences, setExperiences)} className="w-full p-2 border rounded-md" />
                                <div className="flex gap-4">
                                    <input name="startDate" type="text" placeholder="Data de Início" value={exp.startDate} onChange={e => handleDynamicChange(index, e, experiences, setExperiences)} className="w-full p-2 border rounded-md" />
                                    <input name="endDate" type="text" placeholder="Data de Fim" value={exp.endDate} onChange={e => handleDynamicChange(index, e, experiences, setExperiences)} className="w-full p-2 border rounded-md" />
                                </div>
                                <textarea name="description" placeholder="Descrição das atividades" value={exp.description} onChange={e => handleDynamicChange(index, e, experiences, setExperiences)} className="w-full p-2 border rounded-md h-24" />
                                <button type="button" onClick={() => removeExperience(index)} className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm hover:bg-red-600 transition-transform hover:scale-110 cursor-pointer">X</button>
                            </div>
                        ))}
                        <button type="button" onClick={addExperience} className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer">+ Adicionar Experiência</button>
                    </fieldset>

                    <fieldset>
                        <legend className="text-xl font-extrabold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">Formação Acadêmica</legend>
                        {educations.map((edu, index) => (
                            <div key={edu.id} className="space-y-3 border p-4 rounded-lg mb-4 bg-gray-50 relative">
                                <input name="course" type="text" placeholder="Curso" value={edu.course} onChange={e => handleDynamicChange(index, e, educations, setEducations)} className="w-full p-2 border rounded-md" />
                                <input name="institution" type="text" placeholder="Instituição de Ensino" value={edu.institution} onChange={e => handleDynamicChange(index, e, educations, setEducations)} className="w-full p-2 border rounded-md" />
                                <input name="conclusionYear" type="text" placeholder="Ano de Conclusão" value={edu.conclusionYear} onChange={e => handleDynamicChange(index, e, educations, setEducations)} className="w-full p-2 border rounded-md" />
                                <button type="button" onClick={() => removeEducation(index)} className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm hover:bg-red-600 transition-transform hover:scale-110 cursor-pointer">X</button>
                            </div>
                        ))}
                        <button type="button" onClick={addEducation} className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer">+ Adicionar Formação</button>
                    </fieldset>

                    <fieldset>
                        <legend className="text-xl font-extrabold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">Idiomas</legend>
                        {languages.map((lang, index) => (
                            <div key={lang.id} className="flex items-center gap-4 border p-4 rounded-lg mb-4 bg-gray-50 relative">
                                <input name="language" type="text" placeholder="Idioma" value={lang.language} onChange={e => handleDynamicChange(index, e, languages, setLanguages)} className="w-full p-2 border rounded-md" />
                                <select name="level" value={lang.level} onChange={e => handleDynamicChange(index, e, languages, setLanguages)} className="w-full p-2 border rounded-md bg-white">
                                    <option>Básico</option>
                                    <option>Intermediário</option>
                                    <option>Avançado</option>
                                    <option>Fluente</option>
                                </select>
                                <button type="button" onClick={() => removeLanguage(index)} className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm hover:bg-red-600 flex-shrink-0 cursor-pointer">X</button>
                            </div>
                        ))}
                        <button type="button" onClick={addLanguage} className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer">+ Adicionar Idioma</button>
                    </fieldset>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t mt-8">
                        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer">Salvar Currículo</button>
                        <button type="button" onClick={handleCancel} className="w-full bg-white text-blue-700 font-bold py-4 px-10 rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCvPage;

