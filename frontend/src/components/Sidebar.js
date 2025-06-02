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
          <a href="#"> Conheça o nosso projeto</a>
          <a href="#"> Localização</a>
          <a href="#"> Contate-nos</a>
      </nav>

      {menuOpen && (
        <nav className="mobile-menu" onClick={toggleMenu} > 
          <a href="#"><Info size={20} /> Conheça o nosso projeto</a>
          <a href="#"><MapPin size={20} /> Localização</a>
          <a href="#"><Phone size={20} /> Contate-nos</a>
        </nav>
      )}
    </header>
  );
}

export default Sidebar;