import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import AboutPage from './pages/AboutPage';
import { Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
