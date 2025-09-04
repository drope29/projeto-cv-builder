// src/components/Error.tsx
interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <p className="text-red-500">Erro: {message}</p>
);

export default Error;