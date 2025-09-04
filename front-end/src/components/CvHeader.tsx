// src/components/CvHeader.tsx
import React from 'react';

interface CvHeaderProps {
  fullName: string;
  email: string;
  phone?: string;
  address?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

const formatarEndereco = (address: CvHeaderProps['address']) => {
  if (!address) return '';
  return `${address.rua}, ${address.numero} — ${address.bairro}, ${address.cidade} - ${address.estado}`;
};

const CvHeader: React.FC<CvHeaderProps> = ({ fullName, email, phone, address }) => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800">{fullName}</h2>
    <p className="text-blue-600 font-medium">{email}</p>
    {phone && <p className="text-gray-600">{phone}</p>}
    {address && <p className="text-gray-500 text-sm">{formatarEndereco(address)}</p>}
  </div>
);

export default CvHeader;