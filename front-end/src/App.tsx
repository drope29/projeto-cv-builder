import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CreateCvPage from './pages/CreateCv';
import ViewCvsPage from './pages/ViewCvs';
import DetailsCvPage from './pages/DetailsCv';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criar-curriculo" element={<CreateCvPage />} />
        <Route path="/criar-curriculo/:id" element={<CreateCvPage />} />
        <Route path="/visualizar-curriculos" element={<ViewCvsPage />} />
        <Route path="/curriculo/:id" element={<DetailsCvPage/>} />
      </Routes>
    </Router>
  );
};

export default App;