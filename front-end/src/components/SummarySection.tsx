// src/components/SummarySection.tsx
import React from 'react';
import Section from './Section';

interface SummarySectionProps {
  summary: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => (
  <Section title="Resumo Profissional" icon="💬">
    <p className="text-gray-700 leading-relaxed">{summary}</p>
  </Section>
);

export default SummarySection;