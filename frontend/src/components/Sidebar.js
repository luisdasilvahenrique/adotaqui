import { Menu, X, Info, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sidebar">
      <div className="navbar-content">
        <h1 className="logo">AdotAqui</h1>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

<nav className="desktop-menu">
          <a href="#" about='Conheça o nosso projeto' aria-details='Informações sobre o projeto'> Conheça o nosso projeto</a>
          <a href="#" about='Localização' aria-details='Informações sobre a localização'> Localização</a>
          <a href="#" about='Contate-nos' aria-details='Informações de contato'> Contate-nos</a>
      </nav>

      {menuOpen && (
        <nav className="mobile-menu" onClick={toggleMenu} > 
          <a href="#" about='Conheça o nosso projeto' aria-details='Informações sobre o projeto'><Info size={20} /> Conheça o nosso projeto</a>
          <a href="#" about='Localização' aria-details='Informações sobre a localização'><MapPin size={20} /> Localização</a>
          <a href="#" about='Contate-nos' aria-details='Informações de contato'><Phone size={20} /> Contate-nos</a>
        </nav>
      )}
    </header>
  );
}

export default Sidebar;