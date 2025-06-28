import { Menu, X, Info, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import SidebarFilters from './SidebarFilters';

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

     <SidebarFilters className = "desktop-menu"
  onFilter={(filters) => console.log(filters)}
  onClear={() => console.log('Filtros limpos')}
/>

 {menuOpen && (
        <SidebarFilters className="mobile-menu" onClick={toggleMenu}
  onFilter={(filters) => console.log(filters)}
  onClear={() => console.log('Filtros limpos')}
/>
      )}
    </header>
  );
}

export default Sidebar;