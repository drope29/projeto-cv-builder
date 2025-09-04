// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CreateCvPage from './CreateCvPage';
import ViewCvsPage from './ViewCvsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criar-curriculo" element={<CreateCvPage />} />
        <Route path="/visualizar-curriculos" element={<ViewCvsPage />} />
      </Routes>
    </Router>
  );
};

export default App;