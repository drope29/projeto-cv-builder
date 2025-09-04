// src/components/ExperienceList.tsx
import React from 'react';
import Section from './Section';

interface Experience {
  cargo: string;
  empresa: string;
  dataInicio: string;
  dataFim?: string;
  descricao?: string;
}

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => (
  <Section title="Experiência Profissional" icon="🏢">
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <div key={index} className="border-l-4 border-blue-400 pl-4 ml-2">
          <p className="font-semibold text-gray-800">{exp.cargo}</p>
          <p className="text-blue-600">{exp.empresa}</p>
          <p className="text-sm text-gray-500">
            {exp.dataInicio} → {exp.dataFim || 'Atual'}
          </p>
          {exp.descricao && <p className="text-gray-600 text-sm mt-1">{exp.descricao}</p>}
        </div>
      ))}
    </div>
  </Section>
);

export default ExperienceList;