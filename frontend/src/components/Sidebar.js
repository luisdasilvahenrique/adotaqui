import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import '../css/Sidebar.css';
import logo from '../assets/logo1.svg';
function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sidebar">
      <div className="navbar-content">
        <h1 className="logo" alt="AdotAqui">
          <img src={logo} alt="AdotAqui Logo" />
        </h1>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="desktop-menu">
        <a href="#" about='Conheça o nosso projeto' aria-details='Informações sobre o projeto'> Conheça o nosso projeto</a>
        <a href="#" about='Localização' aria-details='Informações sobre a localização'> Localização</a>
        <a href="#" about='Contate-nos' aria-details='Informações de contato'> Contate-nos</a>
      </nav>

    </header>
  );
}

export default Sidebar;