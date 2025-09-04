// src/components/SkillTags.tsx
import React from 'react';
import Section from './Section';

interface SkillTagsProps {
  skills: string[];
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => (
  <Section title="Habilidades" icon="⚡">
    <div className="flex flex-wrap gap-2">
      {skills.map((hab, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
        >
          {hab}
        </span>
      ))}
    </div>
  </Section>
);

export default SkillTags;