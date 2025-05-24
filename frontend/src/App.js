import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PawPrint, Search, List, Menu } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CardPet from './components/CardPet';

import AdoptionQueue from './pages/AdoptionQueue';

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
            <CardPet icon={<PawPrint size={36} />} title="Cadastrar Pet" />
            <CardPet icon={<Search size={36} />} title="Buscar Pets" />
            <CardPet icon={<List size={36} />} title="Fila de Adoção" to="adoption-queue" />
          </section>
        </main>

        <footer className="footer">
          <p className="system">Pet Adoption System</p>
          <p className="copyright">© 2025 Pet Adoption</p>
        </footer>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="adoption-queue" element={<AdoptionQueue />} />
      </Routes>
    </BrowserRouter>
  );
}