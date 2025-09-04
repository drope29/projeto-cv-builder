// src/pages/CreateCvPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormHeader from '../components/FormHeader';
import FormSection from '../components/FormSection';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import DynamicList from '../components/DynamicList';
import ExperienceItem from '../components/ExperienceItem';
import EducationItem from '../components/EducationItem';
import LanguageItem from '../components/LanguageItem';
import ActionButtons from '../components/ActionButtons';
import LoadingScreen from '../components/Loading';

// Interfaces
interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
}

interface ExperienciaProfissional {
    cargo: string;
    empresa: string;
    dataInicio: string;
    dataFim?: string;
    descricao: string;
}

interface FormacaoAcademica {
    curso: string;
    instituicao: string;
    anoConclusao: string | number;
}

interface Idioma {
    idioma: string;
    nivel: string;
}

const CreateCvPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState<Endereco>({ cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '' });
    const [summary, setSummary] = useState('');
    const [experiences, setExperiences] = useState<ExperienciaProfissional[]>([]);
    const [educations, setEducations] = useState<FormacaoAcademica[]>([]);
    const [languages, setLanguages] = useState<Idioma[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    // Carregar dados se for edição
    useEffect(() => {
        if (!id) return;

        const loadCurriculo = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/curriculos/${id}`);
                if (!response.ok) throw new Error('Currículo não encontrado');
                const data = await response.json();

                setFullName(data.nomeCompleto);
                setEmail(data.email);
                setPhone(data.telefone || '');
                if (data.endereco) setAddress(data.endereco);
                setSummary(data.resumoProfissional || '');
                setExperiences(data.experienciaProfissional || []);
                setEducations(data.formacaoAcademica || []);
                setLanguages(data.idiomas || []);
            } catch (err) {
                setErrors({ fetch: 'Erro ao carregar currículo' });
            } finally {
                setLoading(false);
            }
        };

        loadCurriculo();
    }, [id]);

    // Máscara de telefone
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        setPhone(value.substring(0, 15));
    };

    // Funções de adicionar/remover
    const addExperience = () => setExperiences([...experiences, { cargo: '', empresa: '', dataInicio: '', dataFim: '', descricao: '' }]);
    const removeExperience = (index: number) => setExperiences(experiences.filter((_, i) => i !== index));

    const addEducation = () => setEducations([...educations, { curso: '', instituicao: '', anoConclusao: '' }]);
    const removeEducation = (index: number) => setEducations(educations.filter((_, i) => i !== index));

    const addLanguage = () => setLanguages([...languages, { idioma: '', nivel: 'Básico' }]);
    const removeLanguage = (index: number) => setLanguages(languages.filter((_, i) => i !== index));

    // Funções de alteração
    const handleExperienceChange = (index: number, field: string, value: string) => {
        const list = [...experiences];
        list[index] = { ...list[index], [field]: value };
        setExperiences(list);
    };

    const handleEducationChange = (index: number, field: string, value: string) => {
        const list = [...educations];
        list[index] = { ...list[index], [field]: value };
        setEducations(list);
    };

    const handleLanguageChange = (index: number, field: string, value: string) => {
        const list = [...languages];
        list[index] = { ...list[index], [field]: value };
        setLanguages(list);
    };

    // Validação
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!fullName.trim()) newErrors.fullName = 'O nome completo é obrigatório.';
        if (!email.trim()) {
            newErrors.email = 'O email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Formato inválido de email.';
        }
        const cepDigits = address.cep.replace(/\D/g, '');
        if (cepDigits.length > 0 && cepDigits.length < 8) {
            newErrors.cep = 'CEP deve ter 8 dígitos.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Envio
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:8000/curriculos/${id}` : 'http://localhost:8000/curriculos';

        const payload = {
            nomeCompleto: fullName,
            email,
            telefone: phone || undefined,
            endereco: Object.values(address).some(Boolean) ? address : undefined,
            resumoProfissional: summary || undefined,
            experienciaProfissional: experiences.length > 0 ? experiences : undefined,
            formacaoAcademica: educations.length > 0 ? educations : undefined,
            idiomas: languages.length > 0 ? languages : undefined,
        };

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(`Erro ao ${id ? 'atualizar' : 'criar'} currículo`);
            alert(`Currículo ${id ? 'atualizado' : 'criado'} com sucesso!`);
            navigate('/visualizar-curriculos');
        } catch (err) {
            setErrors({ submit: err instanceof Error ? err.message : 'Erro ao salvar' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => navigate('/visualizar-curriculos');

    if (loading && id) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-sky-100 p-4 sm:p-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
                <FormHeader isEditing={!!id} />

                {errors.submit && (
                    <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6 text-center">
                        🚨 {errors.submit}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-12" noValidate>
                    {/* Informações Pessoais */}
                    <FormSection title="Informações Pessoais">
                        <InputField
                            name="fullName"
                            placeholder="Nome Completo"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            error={errors.fullName}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                            <InputField
                                name="phone"
                                type="tel"
                                placeholder="Telefone"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField
                                name="cep"
                                placeholder="CEP"
                                value={address.cep}
                                onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                                maxLength={9}
                                error={errors.cep}
                            />
                            <InputField
                                name="street"
                                placeholder="Rua"
                                value={address.rua}
                                onChange={(e) => setAddress({ ...address, rua: e.target.value })}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <InputField
                                name="number"
                                placeholder="Número"
                                value={address.numero}
                                onChange={(e) => setAddress({ ...address, numero: e.target.value })}
                            />
                            <InputField
                                name="neighborhood"
                                placeholder="Bairro"
                                value={address.bairro}
                                onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                name="city"
                                placeholder="Cidade"
                                value={address.cidade}
                                onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
                            />
                            <InputField
                                name="state"
                                placeholder="Estado"
                                value={address.estado}
                                onChange={(e) => setAddress({ ...address, estado: e.target.value })}
                            />
                        </div>
                    </FormSection>

                    {/* Resumo Profissional */}
                    <FormSection title="Resumo Profissional">
                        <TextAreaField
                            name="summary"
                            placeholder="Um breve resumo sobre você..."
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </FormSection>

                    {/* Experiência Profissional */}
                    <FormSection title="Experiência Profissional">
                        <DynamicList
                            items={experiences}
                            onAdd={addExperience}
                            onRemove={removeExperience}
                            addButtonLabel="Adicionar Experiência"
                            renderItem={(exp, index) => (
                                <ExperienceItem
                                    experience={exp}
                                    index={index}
                                    onChange={handleExperienceChange}
                                    onRemove={removeExperience}
                                />
                            )}
                        />
                    </FormSection>

                    {/* Formação Acadêmica */}
                    <FormSection title="Formação Acadêmica">
                        <DynamicList
                            items={educations}
                            onAdd={addEducation}
                            onRemove={removeEducation}
                            addButtonLabel="Adicionar Formação"
                            renderItem={(edu, index) => (
                                <EducationItem
                                    education={edu}
                                    index={index}
                                    onChange={handleEducationChange}
                                    onRemove={removeEducation}
                                />
                            )}
                        />
                    </FormSection>

                    {/* Idiomas */}
                    <FormSection title="Idiomas">
                        <DynamicList
                            items={languages}
                            onAdd={addLanguage}
                            onRemove={removeLanguage}
                            addButtonLabel="Adicionar Idioma"
                            renderItem={(lang, index) => (
                                <LanguageItem
                                    language={lang}
                                    index={index}
                                    onChange={handleLanguageChange}
                                    onRemove={removeLanguage}
                                />
                            )}
                        />
                    </FormSection>

                    {/* Botões */}
                    <ActionButtons
                        onCancel={handleCancel}
                        isSubmitting={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateCvPage;