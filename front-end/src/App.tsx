// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Importe a página que você acabou de criar

// Crie estes componentes depois, por enquanto podem ser simples
// import CreateCvPage from './CreateCvPage';
// import ViewCvsPage from './ViewCvsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/criar-curriculo" element={<CreateCvPage />} /> */}
        {/* <Route path="/visualizar-curriculos" element={<ViewCvsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;