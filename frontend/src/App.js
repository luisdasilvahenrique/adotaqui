import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PawPrint, Search, List } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CardPet from './components/CardPet';
import Footer from './components/Footer';

import RegisteredAnimal from './pages/RegisteredAnimal';
import RegisterPet from './pages/RegisterPet';
import SearchForPets from './pages/SearchForPets';

import './css/App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
      </div>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="content" onClick={() => menuOpen && setMenuOpen(false)}>
        <main className="main">
          <Header />
          <section className="options">
            <CardPet icon={<PawPrint size={36} />} title="Cadastrar Animal" to="register-pet" />
            <CardPet icon={<Search size={36} />} title="Buscar Animais"  to="search-for-pets" />
            <CardPet icon={<List size={36} />} title="Animais Cadastrados" to="registered-animal" />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="registered-animal" element={<RegisteredAnimal />} />
        <Route path="register-pet" element={<RegisterPet />} />
        <Route path="search-for-pets" element={<SearchForPets />} />
      </Routes>
    </BrowserRouter>
  );
}