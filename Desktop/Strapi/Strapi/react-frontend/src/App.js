import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicPage from './components/DynamicPage';
import Navbar from './components/navBar';
import HomePage from './Page/HomePage';
import ContactForm from './Page/ContactForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<DynamicPage />} />
        <Route path="/contact" element={<ContactForm />} /> {/* Ajoutez la nouvelle route ici */}
      </Routes>
    </Router>
  );
}

export default App;