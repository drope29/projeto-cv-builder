// src/components/EducationList.tsx
import React from 'react';
import Section from './Section';

interface Education {
  curso: string;
  instituicao: string;
  anoConclusao: string | number;
}

interface EducationListProps {
  educations: Education[];
}

const EducationList: React.FC<EducationListProps> = ({ educations }) => (
  <Section title="Formação Acadêmica" icon="🎓">
    <div className="space-y-4">
      {educations.map((edu, index) => (
        <div key={index} className="border-l-4 border-green-400 pl-4 ml-2">
          <p className="font-semibold text-gray-800">{edu.curso}</p>
          <p className="text-green-600">{edu.instituicao}</p>
          <p className="text-sm text-gray-500">Conclusão: {edu.anoConclusao}</p>
        </div>
      ))}
    </div>
  </Section>
);

export default EducationList;